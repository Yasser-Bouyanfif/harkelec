const { existsSync, readFileSync } = require("fs");
const { resolve } = require("path");

let resendApiKey = process.env.RESEND_API_KEY || "";
let envLoaded = false;

const ensureEnvLoaded = () => {
  if (resendApiKey) {
    return resendApiKey;
  }

  if (envLoaded) {
    return resendApiKey;
  }

  envLoaded = true;
  const envPath = resolve(process.cwd(), ".env");

  if (!existsSync(envPath)) {
    return resendApiKey;
  }

  const content = readFileSync(envPath, "utf8");
  content.split(/\r?\n/).forEach((line) => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) {
      return;
    }

    const [key, ...valueParts] = trimmed.split("=");
    const value = valueParts.join("=");

    if (key === "RESEND_API_KEY" && !resendApiKey) {
      resendApiKey = value;
    }

    if (!(key in process.env)) {
      process.env[key] = value;
    }
  });

  return resendApiKey;
};

const sanitize = (value) => {
  if (!value) {
    return "";
  }

  return String(value).replace(/[&<>"']/g, (character) => {
    const replacements = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };

    return replacements[character] || character;
  });
};

const parseBody = (rawBody) => {
  if (rawBody == null) {
    return {};
  }

  if (typeof rawBody === "string") {
    const trimmed = rawBody.trim();
    if (!trimmed) {
      return {};
    }

    return JSON.parse(trimmed);
  }

  if (typeof rawBody === "object") {
    return rawBody;
  }

  throw new Error("Unsupported payload type");
};

const validatePayload = (data = {}) => {
  const requiredFields = ["name", "phone", "service", "message"];
  const missing = requiredFields.filter((field) => !data[field] || !String(data[field]).trim());

  if (missing.length > 0) {
    return "Merci de compléter les informations obligatoires avant d'envoyer votre demande.";
  }

  return null;
};

const buildEmailPayload = (data) => {
  const { name, phone, email, service, message } = data;
  const subject = `Nouvelle demande de contact - ${name}`;

  const html = `
    <h2>Nouvelle demande depuis le site Hark-Elec 31</h2>
    <p><strong>Nom :</strong> ${sanitize(name)}</p>
    <p><strong>Téléphone :</strong> ${sanitize(phone)}</p>
    ${email ? `<p><strong>Email :</strong> ${sanitize(email)}</p>` : ""}
    <p><strong>Nature du besoin :</strong> ${sanitize(service)}</p>
    <p><strong>Message :</strong></p>
    <p>${sanitize(message).replace(/\n/g, "<br />")}</p>
  `;

  const text = `Nom : ${name}\nTéléphone : ${phone}\nEmail : ${email || "Non renseigné"}\nService : ${service}\n\nMessage :\n${message}`;

  return {
    subject,
    html,
    text,
    replyTo: email || undefined,
  };
};

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "POST,OPTIONS",
};

const sendEmailThroughResend = async (payload, apiKey) => {
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "Hark-Elec 31 <send@hark-elec31.fr>",
      to: ["contact@hark-elec31.fr"],
      reply_to: payload.replyTo,
      subject: payload.subject,
      html: payload.html,
      text: payload.text,
    }),
  });

  if (!response.ok) {
    const errorPayload = await response.json().catch(() => ({}));
    const errorMessage =
      errorPayload?.message || errorPayload?.error || "Resend API a retourné une erreur.";
    throw new Error(errorMessage);
  }
};

const handleContactRequest = async ({ method, rawBody }) => {
  if (method === "OPTIONS") {
    return { status: 204, headers: corsHeaders };
  }

  if (method !== "POST") {
    return {
      status: 405,
      headers: corsHeaders,
      body: { error: "Méthode non autorisée." },
    };
  }

  let data;
  try {
    data = parseBody(rawBody);
  } catch (error) {
    return {
      status: 400,
      headers: corsHeaders,
      body: { error: "Format de données invalide." },
    };
  }

  const validationError = validatePayload(data);
  if (validationError) {
    return {
      status: 400,
      headers: corsHeaders,
      body: { error: validationError },
    };
  }

  const apiKey = ensureEnvLoaded();
  if (!apiKey) {
    return {
      status: 500,
      headers: corsHeaders,
      body: { error: "Le service d'envoi d'emails n'est pas configuré." },
    };
  }

  try {
    const emailPayload = buildEmailPayload(data);
    await sendEmailThroughResend(emailPayload, apiKey);
    return {
      status: 200,
      headers: corsHeaders,
      body: { success: true },
    };
  } catch (error) {
    console.error("[contact] Failed to send email", error);
    return {
      status: 502,
      headers: corsHeaders,
      body: {
        error:
          "Une erreur est survenue lors de l'envoi de votre message. Merci de réessayer ultérieurement.",
      },
    };
  }
};

module.exports = { handleContactRequest };
