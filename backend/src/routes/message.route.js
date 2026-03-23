import express from "express";
import { protectedRoute } from "../middleware/message.middleware.js";
import Message from '../models/message.model.js'

const router = express.Router();

router.get("/users", protectedRoute, async (req, res) => {
    try {
        const loggedInUserId = req.user._id;
        const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");

        res.status(200).json(filteredUsers);
    } catch (error) {
        console.error("Error in getUsersForSidebar: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
});


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

        await newMessage.save();
    }
    catch (error) {
        console.log("Errm.mior in sendMessage controller: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
});

export default router;