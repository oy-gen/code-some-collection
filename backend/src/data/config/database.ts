import mongoose from "mongoose";
require("dotenv").config();

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!",
    );
  } catch (error) {
    throw new Error("Error connecting tp MongoDB:" + error);
  }
};

export const disconnectDB = async () => {
  try {
    await mongoose.disconnect();
  } catch (error) {
    throw new Error("Error disconnecting from MongoDB:" + error);
  }
};
