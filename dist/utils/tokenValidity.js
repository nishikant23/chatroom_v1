"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isTokenValid = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const isTokenValid = (token) => {
    try {
        //decode the token passed here
        const decode = jsonwebtoken_1.default.decode(token);
        //return boolean after token expiry check. Is token expired or not.
        return decode.exp ? decode.exp > Date.now() / 1000 : true; //if no expiry the token has return true/ else check
    }
    catch (error) {
        console.error("Erro decoding token", error);
        return false;
    }
};
exports.isTokenValid = isTokenValid;
