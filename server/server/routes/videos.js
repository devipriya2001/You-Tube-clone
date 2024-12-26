import express from "express";
import { addVideo, addView, getByTag, getVideo, random, search, sub, trend, updateVideo, deleteVideo } from "../controllers/video.js";
import { verifyToken } from "../verifyToken.js";
import Video from "../models/Video.js";

const router = express.Router();

//create a video
router.post("/", verifyToken, addVideo)
router.put("/:id", verifyToken, updateVideo)
router.delete("/:id", verifyToken, deleteVideo)
router.get("/find/:id", getVideo)
router.put("/view/:id", addView)
router.get("/trend", trend)
router.get("/random", random)
router.get("/sub",verifyToken, sub)
router.get("/tags", getByTag)
router.get("/search", search)

// Get all videos by channel
router.get("/:channelId/videos", async (req, res) => {
    try {
      const videos = await Video.find({ channelId: req.params.channelId });
      res.status(200).json(videos);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
  // Edit video
  router.put("/:videoId", verifyToken, async (req, res) => {
    try {
      const updatedVideo = await Video.findByIdAndUpdate(
        req.params.videoId,
        req.body, 
        { new: true }
      );
      res.status(200).json(updatedVideo);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
  // Delete video
  router.delete("/:videoId", verifyToken, async (req, res) => {
    try {
      await Video.findByIdAndDelete(req.params.videoId);
      res.status(200).json({ message: "Video deleted successfully" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

export default router;