import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../ChannelPage.js';

const ChannelPage = () => {
  const { channelId } = useParams();  // Get the channelId from the URL
  const [channelData, setChannelData] = useState(null);
  const [videos, setVideos] = useState([]);

  // Fetch channel info and videos
  useEffect(() => {
    const fetchChannelData = async () => {
      try {
        const response = await axios.get(`/api/channel/${channelId}`);
        setChannelData(response.data.channel);
        setVideos(response.data.videos);
      } catch (error) {
        console.error('Error fetching channel data:', error);
      }
    };

    fetchChannelData();
  }, [channelId]);

  if (!channelData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="channel-page">
      <header className="channel-header">
        <img
          src={channelData.channelBanner}
          alt="Channel Banner"
          className="channel-banner"
        />
        <h1>{channelData.channelName}</h1>
        <p>{channelData.description}</p>
        <p>{channelData.subscribers} Subscribers</p>
      </header>

      <section className="videos">
        <h2>Videos</h2>
        <div className="video-grid">
          {videos.map((video) => (
            <div key={video.videoId} className="video-card">
              <img
                src={video.thumbnailUrl}
                alt={video.title}
                className="video-thumbnail"
              />
              <h3>{video.title}</h3>
              <p>{video.views} Views</p>
              {/* Buttons to edit or delete the video */}
              <button>Edit</button>
              <button>Delete</button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ChannelPage;
