const Video = require('../models/Video');
const Channel = require('../models/Channel');

// Add a video
const addVideo = async (req, res) => {
  const { title, description, videoUrl, thumbnailUrl } = req.body;
  const newVideo = new Video({
    title,
    description,
    videoUrl,
    thumbnailUrl,
    uploader: req.user._id
  });

  try {
    await newVideo.save();
    // Update the channel's video list
    await Channel.findByIdAndUpdate(req.body.channelId, {
      $push: { videos: newVideo._id }
    });
    res.status(201).json({ message: 'Video added successfully', video: newVideo });
  } catch (error) {
    res.status(400).json({ message: 'Error adding video', error: error.message });
  }
};

// Edit a video
const editVideo = async (req, res) => {
  try {
    const video = await Video.findByIdAndUpdate(
      req.params.videoId,
      { ...req.body },
      { new: true }
    );
    if (!video) return res.status(404).json({ message: 'Video not found' });
    res.status(200).json({ message: 'Video updated successfully', video });
  } catch (error) {
    res.status(400).json({ message: 'Error updating video', error: error.message });
  }
};

// Delete a video
const deleteVideo = async (req, res) => {
  try {
    const video = await Video.findByIdAndDelete(req.params.videoId);
    if (!video) return res.status(404).json({ message: 'Video not found' });

    // Remove video from the channel's video list
    await Channel.findByIdAndUpdate(req.body.channelId, {
      $pull: { videos: req.params.videoId }
    });

    res.status(200).json({ message: 'Video deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Error deleting video', error: error.message });
  }
};

module.exports = { addVideo, editVideo, deleteVideo };
