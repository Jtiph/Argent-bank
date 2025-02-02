const mongoose = require('mongoose')

const databaseUrl ="mongodb://Jtiph:ue8xI42NxiIS7z4Z@argentbankdb-shard-00-00.pm62q.mongodb.net:27017,argentbankdb-shard-00-01.pm62q.mongodb.net:27017,argentbankdb-shard-00-02.pm62q.mongodb.net:27017/?ssl=true&replicaSet=atlas-rioad6-shard-0&authSource=admin&retryWrites=true&w=majority&appName=argentBankDB"


module.exports = async () => {
  try {
    await mongoose.connect(databaseUrl, { useNewUrlParser: true })
    console.log('Database successfully connected')
  } catch (error) {
    console.error(`Database Connectivity Error: ${error}`)
    throw new Error(error)
  }
}

