// config/config.js
const dotenv = require('dotenv')
const crypto = require('crypto')

dotenv.config()

const ENC_KEY = crypto.randomBytes(32) // AES-256

const config = {
  mongouri: process.env.MONGO_URI,
  port: process.env.PORT,
  jwt: {
    secret: process.env.JWT_SECRET,
    expires: process.env.JWT_EXPIRES,
  },
  encKey: ENC_KEY,
  cloudinary: {
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  },
  expressSessionScrt: process.env.EXPRESS_SESSION_SECRET,
}

module.exports = config
