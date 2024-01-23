import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI
const connection = {}

export const connectToDb = async () => {
  try {
    if(connection.isConnected){
      console.log("Using existed connection")
      return
    }
    const db = await mongoose.connect(MONGODB_URI)
    connection.isConnected = db.connections[0].readyState
    console.log('connectd')
  }
  catch(error) {
    console.log(error)
    throw new Error(error)
  }
}