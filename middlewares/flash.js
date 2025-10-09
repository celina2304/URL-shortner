function flashMiddleware(req, res, next) {
  if (!req.session.flash) req.session.flash = [];

  req.flash = (type, messageObj) => {
    req.session.flash.push({ type, ...messageObj });
  };

  res.locals.toast = req.session.flash || [];
  req.session.flash = [];

  next();
}
module.exports = { flashMiddleware };
