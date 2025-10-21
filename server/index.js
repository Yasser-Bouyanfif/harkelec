const http = require("http");
const https = require("https");
const { existsSync, readFileSync } = require("fs");
const { resolve } = require("path");

const port = process.env.PORT || 5000;
let resendApiKey = process.env.RESEND_API_KEY || "";

const envPath = resolve(process.cwd(), ".env");
if (!resendApiKey && existsSync(envPath)) {
  const envContent = readFileSync(envPath, "utf8");
  envContent.split(/\r?\n/).forEach((line) => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) {
      return;
    }
    const [key, ...valueParts] = trimmed.split("=");
    if (key === "RESEND_API_KEY" && valueParts.length > 0) {
      resendApiKey = valueParts.join("=");
    }
  });
}

const sendJson = (res, statusCode, payload) => {
  const data = JSON.stringify(payload);
  res.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8",
    "Access-Control-Allow-Origin": "*",
  });
  res.end(data);
};

const sendEmpty = (res, statusCode) => {
  res.writeHead(statusCode, {
    "Access-Control-Allow-Origin": "*",
  });
  res.end();
};

const sendEmailThroughResend = (payload, apiKey) => {
  return new Promise((resolvePromise, rejectPromise) => {
    const body = JSON.stringify(payload);
    const request = https.request(
      {
        hostname: "api.resend.com",
        path: "/emails",
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
          "Content-Length": Buffer.byteLength(body),
        },
      },
      (response) => {
        let responseBody = "";
        response.on("data", (chunk) => {
          responseBody += chunk;
        });
        response.on("end", () => {
          if (response.statusCode >= 200 && response.statusCode < 300) {
            resolvePromise();
            return;
          }

          let message = "Impossible d'envoyer l'email via Resend.";
          try {
            const parsed = JSON.parse(responseBody);
            message = parsed.message || parsed.error || message;
          } catch (error) {
            // ignore parse errors
          }
          rejectPromise(new Error(message));
        });
      }
    );

    request.on("error", (error) => {
      rejectPromise(error);
    });

    request.write(body);
    request.end();
  });
};

const buildEmailPayload = ({ name, phone, email, service, message }) => {
  return {
    from: "Hark-Elec 31 <send@hark-elec31.fr>",
    to: ["contact@hark-elec31.fr"],
    reply_to: email || undefined,
    subject: `Nouvelle demande de contact - ${name}`,
    html: `
      <h2>Nouvelle demande depuis le site Hark-Elec 31</h2>
      <p><strong>Nom :</strong> ${name}</p>
      <p><strong>Téléphone :</strong> ${phone}</p>
      ${email ? `<p><strong>Email :</strong> ${email}</p>` : ""}
      <p><strong>Service :</strong> ${service}</p>
      <p><strong>Message :</strong></p>
      <p>${(message || "").replace(/\n/g, "<br />")}</p>
    `,
    text: `Nom : ${name}\nTéléphone : ${phone}\nEmail : ${email ? email : "Non renseigné"}\nService : ${service}\n\nMessage :\n${message || ""}`,
  };
};

const server = http.createServer((req, res) => {
  if (req.url === "/api/contact" && req.method === "OPTIONS") {
    res.writeHead(204, {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Methods": "POST,OPTIONS",
    });
    res.end();
    return;
  }

  if (req.url === "/api/contact" && req.method === "POST") {
    let rawBody = "";

    req.on("data", (chunk) => {
      rawBody += chunk;
    });

    req.on("end", async () => {
      let data;
      try {
        data = JSON.parse(rawBody || "{}");
      } catch (error) {
        sendJson(res, 400, { error: "Format de données invalide." });
        return;
      }

      const { name, phone, service, message } = data;
      if (!name || !phone || !service || !message) {
        sendJson(res, 400, {
          error: "Merci de remplir les champs obligatoires avant d'envoyer votre demande.",
        });
        return;
      }

      if (!resendApiKey) {
        sendJson(res, 500, {
          error: "RESEND_API_KEY est manquant dans la configuration serveur.",
        });
        return;
      }

      try {
        const emailPayload = buildEmailPayload(data);
        await sendEmailThroughResend(emailPayload, resendApiKey);
        sendJson(res, 200, { success: true });
      } catch (error) {
        console.error("[contact] failed to send email", error);
        sendJson(res, 502, {
          error: "Une erreur est survenue pendant l'envoi. Merci de réessayer plus tard.",
        });
      }
    });

    req.on("error", () => {
      sendJson(res, 500, { error: "Impossible de lire la requête." });
    });

    return;
  }

  sendEmpty(res, 404);
});

server.listen(port, () => {
  console.log(`Contact API ready on port ${port}`);
});
