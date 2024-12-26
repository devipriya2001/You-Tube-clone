const Channel = require('../models/Channel');
const Video = require('../models/Video');

// Create a new channel
const createChannel = async (req, res) => {
  const { channelName, description, channelBanner } = req.body;

  const newChannel = new Channel({
    channelName,
    owner: req.user._id,
    description,
    channelBanner,
  });

  try {
    await newChannel.save();
    res.status(201).json({ message: 'Channel created successfully', channel: newChannel });
  } catch (error) {
    res.status(400).json({ message: 'Error creating channel', error: error.message });
  }
};

// Get channel info by channel ID
const getChannelInfo = async (req, res) => {
  try {
    const channel = await Channel.findById(req.params.channelId)
      .populate('videos')
      .populate('owner', 'username');
    if (!channel) return res.status(404).json({ message: 'Channel not found' });
    res.status(200).json({ channel });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching channel', error: error.message });
  }
};

module.exports = { createChannel, getChannelInfo };
