import mongoose from "mongoose"
import dotenv from 'dotenv'

dotenv.config()

async function connect() {
  const dbURL = process.env.MONGO_URL || '';
  try {
    if(!dbURL) throw new Error('no url')
      
      await mongoose.connect(dbURL)
  } catch (error) {
    throw new Error("could not connect to db")
  }
}


export default connect;