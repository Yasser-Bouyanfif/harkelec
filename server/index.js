const http = require("http");
const { existsSync, readFileSync } = require("fs");
const { resolve } = require("path");

const envPath = resolve(__dirname, "..", ".env");

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

const port = Number(process.env.PORT) || 5000;
const resendApiKey = process.env.RESEND_API_KEY;

if (!resendApiKey) {
  console.warn("[contact] RESEND_API_KEY is not defined. Emails will fail to send.");
}

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

const sendJson = (response, status, payload) => {
  const body = JSON.stringify(payload);
  response.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST,OPTIONS",
  });
  response.end(body);
};

const server = http.createServer(async (request, response) => {
  if (request.method === "OPTIONS") {
    response.writeHead(204, {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Methods": "POST,OPTIONS",
    });
    return response.end();
  }

  if (request.method !== "POST" || request.url !== "/api/contact") {
    response.writeHead(404, { "Content-Type": "application/json" });
    return response.end(JSON.stringify({ error: "Endpoint not found" }));
  }

  let rawBody = "";
  request.on("data", (chunk) => {
    rawBody += chunk;
    if (rawBody.length > 1e6) {
      request.socket.destroy();
    }
  });

  request.on("end", async () => {
    let data = {};
    try {
      data = JSON.parse(rawBody || "{}");
    } catch (error) {
      return sendJson(response, 400, { error: "Format de données invalide." });
    }

    const { name, phone, email, service, message } = data;

    if (!name || !phone || !service || !message) {
      return sendJson(response, 400, {
        error:
          "Merci de compléter les informations obligatoires avant d'envoyer votre demande.",
      });
    }

    if (!resendApiKey) {
      return sendJson(response, 500, {
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
          errorPayload?.message ||
          errorPayload?.error ||
          "Resend API a retourné une erreur.";
        throw new Error(errorMessage);
      }

      return sendJson(response, 200, { success: true });
    } catch (error) {
      console.error("[contact] Failed to send email", error);
      return sendJson(response, 502, {
        error:
          "Une erreur est survenue lors de l'envoi de votre message. Merci de réessayer ultérieurement.",
      });
    }
  });
});

server.listen(port, () => {
  console.log(`Contact form server listening on port ${port}`);
});
