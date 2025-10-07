function logRequestPath(req, res, next) {
  // console.log(`Request Path: ${req.path}`);
  res.locals.currentPath = req.path;
  next();
}

module.exports = {
  logRequestPath,
};
