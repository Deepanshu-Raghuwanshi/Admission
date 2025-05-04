import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

const config = {
  nodeEnv: process.env.NODE_ENV || "development",
  port: process.env.PORT || 5000,
  mongoUri: process.env.MONGO_URI || "mongodb://localhost:27017/admission_db",
  jwtSecret: process.env.JWT_SECRET || "your_jwt_secret",
  logLevel: process.env.LOG_LEVEL || "info",
};

export default config;
