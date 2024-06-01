import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

async function connect() {
  const dbURL = process.env.MONGO_URL || "";
  try {
    if (!dbURL) throw new Error("no mongo url found");
    await mongoose.connect(dbURL);
    console.log("DB connected successfully");
  } catch (error: any) {
    console.log("Database Error", error.message);
    throw new Error("could not connect to db");
  }
}


export default connect;