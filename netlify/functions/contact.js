const { handleContactRequest } = require("../../server/contact-handler");

exports.handler = async (event) => {
  const rawBody = event.isBase64Encoded
    ? Buffer.from(event.body || "", "base64").toString("utf8")
    : event.body;

  const result = await handleContactRequest({
    method: event.httpMethod,
    rawBody,
  });

  return {
    statusCode: result.status,
    headers: result.headers,
    body: result.body ? JSON.stringify(result.body) : "",
  };
};
