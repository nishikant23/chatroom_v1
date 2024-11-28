"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
mongoose_1.default.connect('');
const userSchema = new mongoose_1.default.Schema({
    usename: {
        type: String,
        required: true,
        unique: true,
        minLenght: 3,
        maxLength: 100,
    }
});
exports.User = mongoose_1.default.model('User', userSchema);
const roomSchema = new mongoose_1.default.Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    roomId: {
        type: String,
        required: true,
        unique: true,
        minLenght: 3,
        maxLength: 200,
    },
    users: {
        type: String,
        required: true,
        userId: {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: exports.User
        }
    }
});
