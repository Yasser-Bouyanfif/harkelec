const { handleContactRequest } = require("../server/contact-handler");

const readRequestBody = async (req) => {
  if (req.body) {
    return req.body;
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
      resolve(rawBody);
    });

    req.on("error", reject);
  });
};

module.exports = async (req, res) => {
  const rawBody = await readRequestBody(req).catch(() => null);
  const result = await handleContactRequest({
    method: req.method,
    rawBody: rawBody ?? req.body,
  });

  res.statusCode = result.status;
  if (result.headers) {
    Object.entries(result.headers).forEach(([key, value]) => {
      res.setHeader(key, value);
    });
  }

  if (result.body) {
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.end(JSON.stringify(result.body));
  } else {
    res.end();
  }
};
