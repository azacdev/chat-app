import mongoose from "mongoose";

const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Connnected to MongoDB");
  } catch (error) {
    console.log("Error connecting to MongoDb", error.message);
  }
};

export default connectToDB;
