"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkUserInRoom = void 0;
const db_1 = require("./db");
const checkUserInRoom = (userId, roomId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield db_1.prisma.userToRoom.findUnique({
        where: {
            user_id_room_id: {
                user_id: userId,
                room_id: roomId,
            }
        }
    });
});
exports.checkUserInRoom = checkUserInRoom;
