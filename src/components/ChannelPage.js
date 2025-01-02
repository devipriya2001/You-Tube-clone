import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './ChannelPage.css';  

const ChannelPage = () => {
  const { channelId } = useParams();
  const [channelData, setChannelData] = useState(null);
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    // Fetch channel data (mock for now, replace with API call)
    const fetchChannelData = async () => {
      const response = await fetch(`/api/channel/${channelId}`);
      const data = await response.json();
      setChannelData(data);
    };
    fetchChannelData();
  }, [channelId]);

  const handleSubscribe = () => {
    setSubscribed(!subscribed);
  };

  if (!channelData) return <div>Loading...</div>;

  return (
    <div className="channel-container">
      {/* Channel Banner */}
      <div className="channel-banner">
        <img src={channelData.banner} alt="Channel Banner" />
      </div>
      
      {/* Channel Info */}
      <div className="channel-info">
        <img className="channel-profile" src={channelData.profilePic} alt="Profile" />
        <div>
          <h1>{channelData.name}</h1>
          <p>{channelData.subscribers} subscribers</p>
        </div>
        <button 
          className={subscribed ? 'subscribed' : 'subscribe-btn'} 
          onClick={handleSubscribe}
        >
          {subscribed ? 'Subscribed' : 'Subscribe'}
        </button>
      </div>

      {/* Videos Grid */}
      <div className="video-grid">
        {channelData.videos.map((video) => (
          <div className="video-card" key={video._id}>
            <img src={video.thumbnail} alt={video.title} />
            <h3>{video.title}</h3>
            <p>{video.views} views</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChannelPage;

