function logRequestPath(req, res, next) {
  res.locals.currentPath = req.path;
  next();
}

module.exports = {
  logRequestPath,
};
