"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWT_ACCESS_SECRET = exports.JWT_REFRESH_SECRET = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.JWT_REFRESH_SECRET = process.env.jwt_access_secret_key;
exports.JWT_ACCESS_SECRET = process.env.jwt_refresh_secret_key;
