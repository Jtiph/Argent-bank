const mongoose = require('mongoose')
require('dotenv').config();

const databaseUrl = process.env.MONGODB_URI; // Charge l'URL depuis le fichier .env

module.exports = async () => {
  try {
    await mongoose.connect(databaseUrl, { useNewUrlParser: true })
    console.log('Database successfully connected')
  } catch (error) {
    console.error(`Database Connectivity Error: ${error}`)
    throw new Error(error)
  }
}

