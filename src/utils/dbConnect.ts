import mongoose from "mongoose";
if (!process.env.MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}
const MONGODB_URI = process.env.MONGODB_URI;
async function dbConnect() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log(error);
  }
}
export default dbConnect;
