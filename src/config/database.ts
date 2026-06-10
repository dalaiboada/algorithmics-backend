import mongoose from "mongoose";
import { config } from "@/config/index";

const connectDB = async (): Promise<void> => {
  try {
    const conn = await mongoose.connect(config.mongodbUri);
    console.log(`MongoDB conectado: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error al conectar a MongoDB: ${error}`);
    process.exit(1);
  }
};

export default connectDB;
