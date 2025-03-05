import dotenv from "dotenv";
dotenv.config();

export const JWT_REFRESH_SECRET = process.env.jwt_access_secret_key
export const JWT_ACCESS_SECRET = process.env.jwt_refresh_secret_key