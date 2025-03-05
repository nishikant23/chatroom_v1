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
exports.updateRoomParticipants = void 0;
const db_1 = require("./db");
const updateRoomParticipants = (roomId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (db_1.prisma === null || db_1.prisma === void 0 ? void 0 : db_1.prisma.room.update({
        where: {
            id: roomId,
        },
        data: {
            participants: {
                increment: 1,
            }
        }
    }));
});
exports.updateRoomParticipants = updateRoomParticipants;
