// config/database.ts
import mongoose from "mongoose";

let connected = false;

const connectDb = async () => {
  mongoose.set("strictQuery", true);

  // If database is already connected, don't connect again
  if (connected) {
    console.log("MongoDb is connected.");
    return;
  }

  // Connect to db
  try {
    await mongoose.connect(process.env.MONGODB_URI as string);
    connected = true;
  } catch (error) {
    console.log(error);
  }
};

export default connectDb;
