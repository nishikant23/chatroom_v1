"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomType = exports.UserStatus = exports.Types = void 0;
var Types;
(function (Types) {
    Types["createRoom"] = "create";
    Types["joinRoom"] = "join";
    Types["enterRoom"] = "enterRoom";
    Types["exitRoom"] = "exitRoom";
    Types["chat"] = "chat";
})(Types || (exports.Types = Types = {}));
var UserStatus;
(function (UserStatus) {
    UserStatus["IsOnline"] = "online";
    UserStatus["IsOffline"] = "offline";
})(UserStatus || (exports.UserStatus = UserStatus = {}));
var RoomType;
(function (RoomType) {
    RoomType["Private"] = "private";
    RoomType["Public"] = "public";
})(RoomType || (exports.RoomType = RoomType = {}));
