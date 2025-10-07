const jwt = require("jsonwebtoken");
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const { encrypt, decrypt } = require("../services/encrypt");
function setUser(user) {
  try {
    const token = jwt.sign(
      {
        _id: user._id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        avatar: user.avatar,
        role: user.role,
      },
      JWT_SECRET_KEY,
      { expiresIn: "1h" }
    );
    const encryptedToken = encrypt(token);

    return JSON.stringify(encryptedToken);
  } catch (error) {
    return null;
  }
}

function getUser(token) {
  try {
    if (!token) return null;
    const encryptedToken = JSON.parse(token);
    const decryptedToken = decrypt(encryptedToken);
    return jwt.verify(decryptedToken, JWT_SECRET_KEY);
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
