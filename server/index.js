const http = require('http');
const https = require('https');
const { URL } = require('url');
const fs = require('fs');
const path = require('path');

const PORT = Number(process.env.PORT) || 5000;
const MAX_BODY_SIZE = 1 * 1024 * 1024; // 1MB
const DEFAULT_ALLOWED_ORIGIN = 'http://localhost:3000';
const CONTACT_ENDPOINT = '/api/contact';
const RESEND_API_URL = 'https://api.resend.com/emails';
const FROM_EMAIL = 'send@hark-elec31.fr';
const TO_EMAIL = 'contact@hark-elec31.fr';

loadDotEnv();

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const ALLOWED_ORIGIN = process.env.CLIENT_URL || DEFAULT_ALLOWED_ORIGIN;

if (!RESEND_API_KEY) {
  console.warn(
    'RESEND_API_KEY est introuvable. Vérifiez que la variable est définie avant de lancer le serveur.'
  );
}

const server = http.createServer(async (req, res) => {
  const requestUrl = new URL(req.url, `http://${req.headers.host}`);

  if (req.method === 'OPTIONS') {
    handleCors(res);
    res.writeHead(204, corsHeaders());
    res.end();
    return;
  }

  if (requestUrl.pathname === CONTACT_ENDPOINT && req.method === 'POST') {
    await handleContactRequest(req, res);
    return;
  }

  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: 'Route introuvable' }));
});

server.listen(PORT, () => {
  console.log(`Serveur d'API prêt sur http://localhost:${PORT}`);
});

function handleCors(res) {
  res.setHeader('Access-Control-Allow-Origin', ALLOWED_ORIGIN);
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

function corsHeaders() {
  return {
    'Access-Control-Allow-Origin': ALLOWED_ORIGIN,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };
}

async function handleContactRequest(req, res) {
  handleCors(res);

  if (!RESEND_API_KEY) {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(
      JSON.stringify({ error: "Le service d'envoi d'emails est momentanément indisponible." })
    );
    return;
  }

  try {
    const payload = await readRequestBody(req);
    const { nom, telephone, email, service, description } = validatePayload(payload);

    const html = buildEmailTemplate({ nom, telephone, email, service, description });

    const resendResponse = await sendResendEmail({
      nom,
      telephone,
      email,
      service,
      description,
      html,
    });

    if (!resendResponse.ok) {
      console.error('Erreur Resend:', resendResponse.body || resendResponse.status);
      const status = resendResponse.status === 429 ? 429 : 502;
      res.writeHead(status, { 'Content-Type': 'application/json' });
      res.end(
        JSON.stringify({
          error: "L'envoi de votre message a échoué. Merci de réessayer un peu plus tard.",
        })
      );
      return;
    }

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Votre message a bien été transmis.' }));
  } catch (error) {
    console.error('Erreur lors du traitement de la demande de contact:', error);
    const fallbackStatus =
      error.statusCode || (typeof error.code === 'string' ? 502 : 500);
    const message =
      fallbackStatus === 502
        ? "Le service d'envoi d'emails est momentanément indisponible. Merci de réessayer un peu plus tard."
        : error.message || 'Une erreur inattendue est survenue.';
    res.writeHead(fallbackStatus, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: message }));
  }
}

function readRequestBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';

    req.on('data', (chunk) => {
      body += chunk;
      if (body.length > MAX_BODY_SIZE) {
        reject({
          statusCode: 413,
          message: 'Votre message est trop volumineux.',
        });
        req.destroy();
      }
    });

    req.on('end', () => {
      try {
        const parsed = JSON.parse(body || '{}');
        resolve(parsed);
      } catch (error) {
        reject({ statusCode: 400, message: 'Format JSON invalide.' });
      }
    });

    req.on('error', () => {
      reject({ statusCode: 400, message: 'Impossible de lire la requête.' });
    });
  });
}

function validatePayload(payload) {
  const errors = [];

  const nom = sanitizeString(payload.nom);
  const telephone = sanitizeString(payload.telephone);
  const email = sanitizeString(payload.email || '');
  const service = sanitizeString(payload.service);
  const description = sanitizeString(payload.description);

  if (!nom) errors.push('Le nom est obligatoire.');
  if (!telephone) errors.push('Le téléphone est obligatoire.');
  if (!service) errors.push('Le type de prestation est obligatoire.');
  if (!description) errors.push('Le message est obligatoire.');
  if (email && !isValidEmail(email)) errors.push("L'adresse email est invalide.");

  if (errors.length > 0) {
    const error = new Error(errors.join(' '));
    error.statusCode = 400;
    throw error;
  }

  return { nom, telephone, email, service, description };
}

function sanitizeString(value) {
  return typeof value === 'string' ? value.trim().slice(0, 5000) : '';
}

function isValidEmail(value) {
  return /\S+@\S+\.\S+/.test(value);
}

function buildEmailTemplate({ nom, telephone, email, service, description }) {
  const readableService = serviceLabels[service] || service || 'Non précisé';
  return `
    <div style="font-family: Arial, sans-serif; color: #0f172a;">
      <h2>Nouvelle demande de contact</h2>
      <p>Vous avez reçu une nouvelle demande depuis le site Hark-Elec 31.</p>
      <table style="border-collapse: collapse; width: 100%; max-width: 640px;">
        <tbody>
          ${tableRow('Nom', escapeHtml(nom))}
          ${tableRow('Téléphone', escapeHtml(telephone))}
          ${email ? tableRow('Email', escapeHtml(email)) : ''}
          ${tableRow('Service souhaité', escapeHtml(readableService))}
        </tbody>
      </table>
      <h3 style="margin-top: 24px;">Message</h3>
      <p style="white-space: pre-wrap;">${escapeHtml(description)}</p>
    </div>
  `;
}

const serviceLabels = {
  installation: 'Installation ou rénovation électrique',
  depannage: 'Dépannage / Mise en sécurité',
  domotique: 'Domotique & automatismes',
  reseau: 'Réseaux informatiques / Fibre optique',
  irve: 'Borne de recharge véhicule électrique',
  autre: 'Autre demande',
};

function tableRow(label, value) {
  return `
    <tr>
      <td style="font-weight: bold; padding: 6px 12px; border: 1px solid #e2e8f0; width: 180px;">${label}</td>
      <td style="padding: 6px 12px; border: 1px solid #e2e8f0;">${value}</td>
    </tr>
  `;
}

function escapeHtml(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

async function sendResendEmail({ nom, telephone, email, service, description, html }) {
  const readableService = serviceLabels[service] || service || 'Non précisé';
  const payload = {
    from: FROM_EMAIL,
    to: [TO_EMAIL],
    subject: `Nouvelle demande de ${nom}`,
    html,
    text: [
      'Nouvelle demande de contact',
      `Nom : ${nom}`,
      `Téléphone : ${telephone}`,
      email ? `Email : ${email}` : null,
      `Service souhaité : ${readableService}`,
      '',
      description,
    ]
      .filter(Boolean)
      .join('\n'),
  };

  if (email) {
    payload.reply_to = [email];
  }

  const requestBody = JSON.stringify(payload);

  return new Promise((resolve, reject) => {
    const request = https.request(
      RESEND_API_URL,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${RESEND_API_KEY}`,
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(requestBody),
        },
      },
      (response) => {
        const statusCode =
          typeof response.statusCode === 'number' ? response.statusCode : 0;
        const chunks = [];
        response.on('data', (chunk) => chunks.push(chunk));
        response.on('end', () => {
          const body = Buffer.concat(chunks).toString('utf8');
          resolve({
            ok: statusCode >= 200 && statusCode < 300,
            status: statusCode,
            body,
          });
        });
      }
    );

    request.on('error', (error) => {
      reject(error);
    });

    request.write(requestBody);
    request.end();
  });
}

function loadDotEnv() {
  const envPath = path.join(__dirname, '..', '.env');
  if (!fs.existsSync(envPath)) {
    return;
  }

  const content = fs.readFileSync(envPath, 'utf8');
  content
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith('#'))
    .forEach((line) => {
      const [key, ...rest] = line.split('=');
      const value = rest.join('=').trim();
      if (!process.env[key]) {
        process.env[key] = value;
      }
    });
}
