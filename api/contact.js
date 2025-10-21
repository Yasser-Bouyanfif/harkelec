const RESEND_API_URL = "https://api.resend.com/emails";

const escapeHtml = (value = "") =>
  String(value).replace(/[&<>"']/g, (character) => {
    switch (character) {
      case "&":
        return "&amp;";
      case "<":
        return "&lt;";
      case ">":
        return "&gt;";
      case '"':
        return "&quot;";
      case "'":
        return "&#39;";
      default:
        return character;
    }
  });

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Méthode non autorisée" });
  }

  if (!process.env.RESEND_API_KEY) {
    return res
      .status(500)
      .json({ error: "Configuration du serveur incomplète" });
  }

  let body = {};

  if (typeof req.body === "string" && req.body.length > 0) {
    try {
      body = JSON.parse(req.body);
    } catch (error) {
      return res.status(400).json({ error: "Corps de requête invalide" });
    }
  } else {
    body = req.body || {};
  }

  const { fullName, phone, email, service, serviceLabel, message } = body;

  if (!fullName || !phone || !service || !message) {
    return res.status(400).json({
      error:
        "Merci de renseigner le nom, le téléphone, la nature du besoin et votre message.",
    });
  }

  const safeFullName = escapeHtml(fullName);
  const safePhone = escapeHtml(phone);
  const safeEmail = email ? escapeHtml(email) : null;
  const safeService = escapeHtml(serviceLabel || service);
  const safeMessage = escapeHtml(message).replace(/\n/g, "<br />");
  const textContent = `Nom : ${fullName}\nTéléphone : ${phone}\nEmail : ${email || "Non communiqué"}\nService : ${serviceLabel || service}\n\nMessage :\n${message}`;

  const subject = `Nouvelle demande depuis le site - ${safeFullName}`;

  const htmlContent = `
    <div style="font-family: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; line-height: 1.6; color: #0f172a;">
      <h2 style="margin-bottom: 16px;">Nouveau message via le formulaire de contact</h2>
      <p style="margin: 0 0 12px;"><strong>Nom :</strong> ${safeFullName}</p>
      <p style="margin: 0 0 12px;"><strong>Téléphone :</strong> ${safePhone}</p>
      ${safeEmail ? `<p style="margin: 0 0 12px;"><strong>Email :</strong> ${safeEmail}</p>` : ""}
      <p style="margin: 0 0 12px;"><strong>Service demandé :</strong> ${safeService}</p>
      <p style="margin: 16px 0 8px;"><strong>Message :</strong></p>
      <p style="margin: 0; white-space: pre-wrap;">${safeMessage}</p>
    </div>
  `;

  try {
    const response = await fetch(RESEND_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Hark-Elec 31 <send@hark-elec31.fr>",
        to: ["contact@hark-elec31.fr"],
        subject,
        html: htmlContent,
        text: textContent,
        reply_to: safeEmail || undefined,
      }),
    });

    if (!response.ok) {
      const errorPayload = await response.json().catch(() => ({}));
      console.error("Resend API error", errorPayload);
      return res.status(502).json({
        error: "L'envoi de l'email a échoué. Merci de réessayer plus tard.",
      });
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Contact API error", error);
    return res.status(500).json({
      error: "Une erreur interne est survenue. Merci de réessayer plus tard.",
    });
  }
}
