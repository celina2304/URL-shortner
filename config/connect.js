const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const config = require('./config.js');

// Connect to MongoDB
async function connectMongo() {
  try {
    await mongoose.connect(config.mongouri);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
}

// Create session middleware using MongoDB as store
const sessionMiddleware = session({
  secret: config.expressSessionScrt,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: config.mongouri }),
  cookie: {
    maxAge: 1000 * 60 * 60, // 1 hour
    secure: false,
  },
});

module.exports = {
    connectMongo,
    sessionMiddleware
}