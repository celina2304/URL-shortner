const jwt = require("jsonwebtoken");
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

function setUser(user) {
  try {
    return jwt.sign(
      {
        _id: user._id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        avatar: user.avatar,
        role: user.role
      },
      JWT_SECRET_KEY
    );
  } catch (error) {
    return null;
  }
}

function getUser(token) {
  try {
    if (!token) return null;
    return jwt.verify(token, JWT_SECRET_KEY);
  } catch (error) {
    return null;
  }
}

module.exports = {
  setUser,
  getUser,
};
/*
// session based storage
const sessionIdToUserMap = new Map();

function setUser(id, user){
    sessionIdToUserMap.set(id, user);
}

function getUser(id){
    return sessionIdToUserMap.get(id);
}
*/
