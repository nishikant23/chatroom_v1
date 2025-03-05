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
exports.roomRouter = void 0;
const express_1 = require("express");
const authenticate_1 = require("../middlewares/authenticate");
const db_1 = require("../db/db");
const getIst_1 = require("../helpers/getIst");
const enum_1 = require("../types/enum");
const joinRoom_1 = require("../db/joinRoom");
const updateRoomParticipants_1 = require("../db/updateRoomParticipants");
const checkUserInRoom_1 = require("../db/checkUserInRoom");
const fetchAllRooms_1 = require("../db/fetchAllRooms");
exports.roomRouter = (0, express_1.Router)();
//................................ Room CREATE ...........................................//
exports.roomRouter.post("/create", [...authenticate_1.authenticate], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        console.log("User = " + user.id + ", " + user.username);
        if (!user) {
            res.status(404).json({ message: "User not found. Login again." });
            return;
        }
        const { roomName, roomDescription } = req.body;
        console.log("roomname = " + roomName + " & roomDescription = " + roomDescription);
        if (!roomName) {
            res.status(401).json({ message: "Roomname can't be empty" });
            return;
        }
        const dbRoom = yield db_1.prisma.room.findUnique({
            where: {
                room_name: roomName
            }
        });
        if (dbRoom) {
            res.status(200).json({ message: "Room already exist. Try to join." });
            return;
        }
        const newRoom = yield db_1.prisma.room.create({
            data: {
                room_name: roomName,
                room_description: roomDescription,
                participants: 0,
                creator_id: user.id,
                created_at: (0, getIst_1.getIst)(),
            }
        });
        yield (0, joinRoom_1.joinRoom)(user.id, newRoom.id); //as USER created a room he being a part of that room(joined Auto)
        yield (0, updateRoomParticipants_1.updateRoomParticipants)(newRoom.id); //update the new created room participants count.
        const roomCreatedPayload = {
            type: enum_1.Types.createRoom,
            payload: {
                roomId: newRoom.id,
                roomName: newRoom.room_name,
                roomDescription: newRoom.room_description,
                roomAdminId: newRoom.id,
                roomAdminName: user.username,
                roomParticipants: newRoom.participants,
                created_at: newRoom.created_at.toISOString(),
            }
        };
        res.status(201).json({
            message: "Room created Successfully.",
            payload: {
                roomId: newRoom.id,
                roomName: newRoom.room_name,
                roomDescription: newRoom.room_description,
                roomAdminId: user.id,
                roomAdminName: user.username,
                roomParticipants: newRoom.participants,
                Created_At: newRoom.created_at,
            }
        });
        return;
    }
    catch (error) {
        console.error("Room Creation Failed", error);
        res.status(500).json({ message: "Internal server error." });
    }
}));
//................................ Room JOIN ...........................................//
exports.roomRouter.post("/join", [...authenticate_1.authenticate], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        const { roomName } = req.body;
        const roomExists = yield db_1.prisma.room.findUnique({
            where: {
                room_name: roomName
            }
        });
        if (!roomExists) {
            res.status(404).json({ message: "Room not found." });
            return;
        }
        console.log("User ID:", user.id);
        console.log("Room ID:", roomExists === null || roomExists === void 0 ? void 0 : roomExists.id);
        const existingUser = yield (0, checkUserInRoom_1.checkUserInRoom)(user.id, roomExists.id);
        console.log("ID , User ID , Room ID: ", existingUser === null || existingUser === void 0 ? void 0 : existingUser.id, ", ", existingUser === null || existingUser === void 0 ? void 0 : existingUser.user_id, " & ", existingUser === null || existingUser === void 0 ? void 0 : existingUser.room_id);
        if (existingUser) {
            res.status(200).json({ message: "Already a part of room." });
            return;
        }
        const newUserJoinRoom = yield (0, joinRoom_1.joinRoom)(user.id, roomExists.id);
        const roomDetail = yield (0, updateRoomParticipants_1.updateRoomParticipants)(roomExists.id);
        console.log("Room participants count = ", roomDetail.participants);
        res.status(201).json({
            message: "User joined the room successfully.",
            payload: {
                newUserEntryId: newUserJoinRoom.id,
                roomId: roomExists.id,
                roomName: roomExists.room_name,
                roomDescription: roomExists.room_description,
                roomCreatedAt: roomExists.created_at.toISOString(),
                joinedUserId: user.id,
                joinedUserName: user.username,
            }
        });
        return;
    }
    catch (error) {
        console.error("Error updating room participants:", error);
        res.status(500).json({ message: "Internal server error." });
    }
}));
//................................ Room LIST ALL USERS  ...........................................//
exports.roomRouter.get("/members", [...authenticate_1.authenticate], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        const { roomId } = req.query;
        //If roomId id not provided
        if (!roomId) {
            res.status(400).json({ error: 'roomId is required' });
            return;
        }
        //Convert roomId to number
        const id = parseInt(roomId);
        //NaN - not a number
        //checks isNaN - is not a number(id)
        if (isNaN(id)) {
            res.status(400).json({ error: 'roomId must be a number' });
            return;
        }
        //Object of this Room
        //Object contains multiple K:V pairs,
        //And some Key = values - array of allUser to this found Room
        const usersInRoom = yield db_1.prisma.room.findUnique({
            where: { id }, //Find this 'id' of Room in DB
            include: {
                users: {
                    include: {
                        user: true //Returns list of users, which are part of this Room(group).
                    }
                }
            }
        });
        //Get on the array of allUsers from usersInRoom-Object.
        const usersArr = usersInRoom === null || usersInRoom === void 0 ? void 0 : usersInRoom.users.map((u) => ({
            userId: u.user.id,
            username: u.user.username,
            userBio: u.user.user_bio,
            joinedAt: u.user.joined_at.toISOString(),
        }));
        // console.log("BE USERS List = ",usersArr)
        res.status(200).json({
            message: "Listed all users.",
            //pass allUsers ARRAY, w.r.t this query Parameter - roomId 
            allUsersToThisRoom: usersArr,
        });
        //Debbugging : Check All users of this room fetched from DB or not.
        // console.log(usersArr?.map((u) => ({
        //     userId: u.userId,
        //     username : u.username,
        //     userBio : u.userBio,
        //     userJoinedAt : u.joinedAt,
        // })))
    }
    catch (error) {
        console.error("Error getting the room members:", error);
        res.status(500).json({ message: "Internal server error." });
    }
}));
//................................ All Rooms list  ...........................................//
exports.roomRouter.get("/allRooms", [...authenticate_1.authenticate], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    console.log("Curr. User =>  id is ", user.id, " & name is ", user.username);
    try {
        const fetchUserandRoomDetails = yield (0, fetchAllRooms_1.fetchAllRooms)(user.id); //to fetch all rooms in ./db folder
        //to get each room of thgis user, map througn the rooms:true -> array & store into new Empty-array = allRooms
        const allRooms = fetchUserandRoomDetails === null || fetchUserandRoomDetails === void 0 ? void 0 : fetchUserandRoomDetails.userDetails.map((r) => ({
            type: enum_1.Types.enterRoom,
            payload: {
                roomId: r.room.id,
                roomName: r.room.room_name,
                roomDescription: r.room.room_description,
                roomAdminId: r.room.creator_id,
                roomParticipants: r.room.participants,
                roomCreatedAt: r.room.created_at.toISOString(),
                currentUserId: user.id,
                currentUsername: user.username
            }
        }));
        if (allRooms === undefined) {
            res.status(404).json({
                message: "User Not a part of any Room."
            });
        }
        console.log("Length = ", allRooms === null || allRooms === void 0 ? void 0 : allRooms.length);
        res.status(200).json({
            message: "Rooms fetched Successsfully",
            roomsArray: allRooms,
        });
    }
    catch (error) {
        console.log("Internal Error", error);
        res.status(500).json({
            error: error
        });
    }
}));
