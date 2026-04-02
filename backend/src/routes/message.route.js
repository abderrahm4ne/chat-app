import express from "express";
import { protectedRoute } from "../middleware/message.middleware.js";
import Message from '../models/message.model.js'
import User from "../models/user.model.js";
import { v2 as cloudinary } from 'cloudinary'


const router = express.Router();


router.get("/:id", protectedRoute, async (req, res) => {
    try {
        const { id: userToChatId } = req.params;
        const myId = req.user._id;

        const messages = await Message.find({
        $or: [
            { senderId: myId, receiverId: userToChatId },   
            { senderId: userToChatId, receiverId: myId },
        ],
        });

        res.status(200).json(messages);
    } catch (error) {
        console.log("Error in getMessages controller: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.post("/send/:id", protectedRoute, async (req, res) => {
    try {
        const { text, image } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user._id;

        let imageUrl;
        if (image) {
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;
        }

        const newMessage = new Message({
        senderId,
        receiverId,
        text,
        image: imageUrl,
        });
        console.log(newMessage)

        await newMessage.save();
        res.status(201).json(newMessage);
    }
    catch (error) {
        console.log("Errm.mior in sendMessage controller: ", error.message, req.params._id, req.user._id);
        res.status(500).json({ error: "Internal server error" });
    }
});

export default router;