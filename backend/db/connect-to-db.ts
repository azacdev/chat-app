import mongoose from "mongoose";

const connectToDB = async () => {
  try {
    const URL = process.env.MONGODB_URL;

    if (!URL) {
      throw new Error(
        "MONGODB_URL is not defined in the environment variables"
      );
    }
    await mongoose.connect(URL);
    console.log("Connnected to MongoDB");
  } catch (error: any) {
    console.log("Error connecting to MongoDb", error.message);
  }
};

export default connectToDB;
