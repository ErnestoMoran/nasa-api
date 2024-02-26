import mongoose from 'mongoose'

/**
 * Connection to Atlas
 */
async function connectToCluster() {
  try {
    return await mongoose.createConnection('mongodb+srv://m001-student:admin@sandbox.blhgoau.mongodb.net/nasa?retryWrites=true&w=majority&appName=Sandbox');
  } catch (error) {
    console.error('Error connecting to MongoDB cluster:', error);
  }
}

export default connectToCluster;
