const { existsSync, readFileSync } = require("fs");
const { resolve } = require("path");

const envPath = resolve(process.cwd(), ".env");

if (!process.env.RESEND_API_KEY && existsSync(envPath)) {
  const content = readFileSync(envPath, "utf8");
  content.split(/\r?\n/).forEach((line) => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) {
      return;
    }

    const [key, ...valueParts] = trimmed.split("=");
    const value = valueParts.join("=");

    if (key && !(key in process.env)) {
      process.env[key] = value;
    }
  });
}

const resendApiKey = process.env.RESEND_API_KEY;

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

const sendJson = (res, status, payload) => {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Methods", "POST,OPTIONS");
  res.end(JSON.stringify(payload));
};

const readRequestBody = async (req) => {
  if (req.body) {
    return typeof req.body === "string" ? JSON.parse(req.body) : req.body;
  }

  return await new Promise((resolve, reject) => {
    let rawBody = "";

    req.on("data", (chunk) => {
      rawBody += chunk;
      if (rawBody.length > 1e6) {
        req.socket.destroy();
        reject(new Error("Payload trop volumineux."));
      }
    });

    req.on("end", () => {
      try {
        resolve(rawBody ? JSON.parse(rawBody) : {});
      } catch (error) {
        reject(error);
      }
    });

    req.on("error", reject);
  });
};

module.exports = async (req, res) => {
  if (req.method === "OPTIONS") {
    res.statusCode = 204;
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.setHeader("Access-Control-Allow-Methods", "POST,OPTIONS");
    return res.end();
  }

  if (req.method !== "POST") {
    return sendJson(res, 405, { error: "Méthode non autorisée." });
  }

  let data;

  try {
    data = await readRequestBody(req);
  } catch (error) {
    return sendJson(res, 400, { error: "Format de données invalide." });
  }

  const { name, phone, email, service, message } = data || {};

  if (!name || !phone || !service || !message) {
    return sendJson(res, 400, {
      error: "Merci de compléter les informations obligatoires avant d'envoyer votre demande.",
    });
  }

  if (!resendApiKey) {
    return sendJson(res, 500, {
      error: "Le service d'envoi d'emails n'est pas configuré.",
    });
  }

  const subject = `Nouvelle demande de contact - ${name}`;
  const htmlContent = `
    <h2>Nouvelle demande depuis le site Hark-Elec 31</h2>
    <p><strong>Nom :</strong> ${sanitize(name)}</p>
    <p><strong>Téléphone :</strong> ${sanitize(phone)}</p>
    ${email ? `<p><strong>Email :</strong> ${sanitize(email)}</p>` : ""}
    <p><strong>Nature du besoin :</strong> ${sanitize(service)}</p>
    <p><strong>Message :</strong></p>
    <p>${sanitize(message).replace(/\n/g, "<br />")}</p>
  `;

  try {
    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Hark-Elec 31 <send@hark-elec31.fr>",
        to: ["contact@hark-elec31.fr"],
        reply_to: email || undefined,
        subject,
        html: htmlContent,
        text: `Nom : ${name}\nTéléphone : ${phone}\nEmail : ${email || "Non renseigné"}\nService : ${service}\n\nMessage :\n${message}`,
      }),
    });

    if (!resendResponse.ok) {
      const errorPayload = await resendResponse.json().catch(() => ({}));
      const errorMessage =
        errorPayload?.message || errorPayload?.error || "Resend API a retourné une erreur.";
      throw new Error(errorMessage);
    }

    return sendJson(res, 200, { success: true });
  } catch (error) {
    console.error("[contact] Failed to send email", error);
    return sendJson(res, 502, {
      error: "Une erreur est survenue lors de l'envoi de votre message. Merci de réessayer ultérieurement.",
    });
  }
};
