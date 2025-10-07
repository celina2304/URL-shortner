const { getUser } = require("../services/auth");

function checkForAuthentication(req, res, next) {
  // const authorizationHeaderValue = req.headers["authorization"]; // token based
  const tokenCookie = req.cookies?.token; // cookie based

  req.user = null;
  // if (
  //   !authorizationHeaderValue ||
  //   !authorizationHeaderValue.startsWith("Bearer")
  // )
  //   return next(); token
  if (!tokenCookie) return next();

  // const token = authorizationHeaderValue.split(" ")[1];
  // const user = getUser(token); // token

  const user = getUser(tokenCookie);

  req.user = user;
  return next();
}

// role based access control
function restrictTo(roles = []) {
  return function (req, res, next) {
    if (!req.user) return res.redirect("/login");
    if (!roles.includes(req.user.role)) return res.end("Forbidden");
    return next();
  };
}
module.exports = {
  checkForAuthentication,
  restrictTo,
};
