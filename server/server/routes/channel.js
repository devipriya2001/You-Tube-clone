
import express from "express";
import Channel from "../models/Channel.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();

// Create a new channel (only if user is signed in)
router.post("/", verifyToken, async (req, res) => {
  try {
    const newChannel = new Channel({
      userId: req.user.id,  // The logged-in user's ID
      name: req.body.name,
      email: req.body.email,
      avatar: req.body.avatar,  // Avatar image URL
    });

    const savedChannel = await newChannel.save();
    res.status(201).json(savedChannel);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
