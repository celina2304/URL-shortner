function logRequestPath(req, res, next) {
  // console.log(`Request Path: ${req.path}`);
  res.locals.currentPath = req.path;
  next();
}
function sendToastOnRedirect(req, res, next) {
  res.locals.toast = req.flash("toast"); // toast will be available in EJS
  next();
}

module.exports = {
  logRequestPath,
  sendToastOnRedirect,
};
