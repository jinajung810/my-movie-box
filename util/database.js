import { MongoClient } from 'mongodb'

const url = 'mongodb+srv://admin:test1234@cluster0.lka1brg.mongodb.net/?retryWrites=true&w=majority'
let connectDB

if (process.env.NODE_ENV === 'development') {
  if (!global._mongo) {
    global._mongo = new MongoClient(url).connect()
  }
  connectDB = global._mongo
} else {
  connectDB = new MongoClient(url).connect()
}

export { connectDB }
