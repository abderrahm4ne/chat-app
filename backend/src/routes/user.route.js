import express from 'express'
import User from '../models/user.model.js'
import { protectedRoute } from '../middleware/message.middleware.js'



const router = express.Router()

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

export default router;