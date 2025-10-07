const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
const ENC_KEY = crypto.randomBytes(32); // AES-256
const IV = crypto.randomBytes(16); // 16 bytes IV

// Function to encrypt text
function encrypt(text) {
  const cipher = crypto.createCipheriv('aes-256-cbc', ENC_KEY, IV);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return { iv: IV.toString('hex'), data: encrypted };
}

// Function to decrypt text
function decrypt(encrypted) {
  const decipher = crypto.createDecipheriv(
    'aes-256-cbc',
    ENC_KEY,
    Buffer.from(encrypted.iv, 'hex')
  );
  let decrypted = decipher.update(encrypted.data, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}

module.exports = {
    encrypt,
    decrypt
}