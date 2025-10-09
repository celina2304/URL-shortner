const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const config = require('./config.js');

// Connect to MongoDB

// avoid unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection:', reason)
})

async function connectMongo(retries = 5, delay = 3000) {
  if (!config.mongouri) {
    console.error('MongoDB URI is missing in config')
    process.exit(1)
  }

  try {
    // Secure connection options
    const options = {
      serverSelectionTimeoutMS: 10000, // 10s timeout for server selection
      maxPoolSize: 10, // limit connections
      minPoolSize: 1,
      autoIndex: false, // disable auto-indexing in production
      connectTimeoutMS: 10000,
    }

    await mongoose.connect(config.mongouri, options)
    console.log('MongoDB connected successfully')

    // Optional: handle runtime disconnects
    mongoose.connection.on('disconnected', () => {
      console.warn('MongoDB disconnected')
    })

    mongoose.connection.on('reconnected', () => {
      console.log('MongoDB reconnected')
    })

    mongoose.connection.on('error', (err) => {
      console.error('MongoDB runtime error:', err.message)
    })

  } catch (error) {
    console.error(`MongoDB connection error: ${error.message}`)

    if (retries > 0) {
      console.log(`Retrying connection in ${delay / 1000}s... (${retries} attempts left)`)
      await new Promise((res) => setTimeout(res, delay))
      return connectMongo(retries - 1, delay)
    } else {
      console.error('Could not connect to MongoDB after multiple attempts. Exiting.')
      process.exit(1)
    }
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