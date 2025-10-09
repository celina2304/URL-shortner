function sanitizeInput(obj) {
  for (const key in obj) {
    const value = obj[key];

    if (typeof value === "object" && value !== null) {
      sanitizeInput(value);
    } else if (typeof value === "string") {
      // Trim extra spaces and normalize line breaks
      obj[key] = value.trim();
    }

    // Protect against dangerous object keys (not string content)
    if (key.startsWith("$") || key.includes(".")) {
      const safeKey = key.replace(/^\$+/g, "").replace(/\./g, "_");
      obj[safeKey] = obj[key];
      delete obj[key];
    }
  }
  return obj;
}

function mongoSanitize(req, res, next) {
  req.body = sanitizeInput(req.body);
  req.query = sanitizeInput(req.query);
  req.params = sanitizeInput(req.params);
  req.cookies = sanitizeInput(req.cookies);
  next();
}

module.exports = { sanitizeInput, mongoSanitize };
