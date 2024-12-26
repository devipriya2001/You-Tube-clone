// ChannelCreation.jsx
import React, { useState } from "react";
import axios from "axios";

const ChannelCreation = () => {
  const [channelData, setChannelData] = useState({
    name: "",
    email: "",
    avatar: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/channel", channelData, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      console.log("Channel created:", response.data);
      // After creating channel, redirect to the channel page
      window.location.href = `/channel/${response.data._id}`;
    } catch (err) {
      console.error("Error creating channel:", err);
    }
  };

  return (
    <div>
      <h1>Create Channel</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Channel Name"
          value={channelData.name}
          onChange={(e) => setChannelData({ ...channelData, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          value={channelData.email}
          onChange={(e) => setChannelData({ ...channelData, email: e.target.value })}
        />
        <input
          type="text"
          placeholder="Avatar URL"
          value={channelData.avatar}
          onChange={(e) => setChannelData({ ...channelData, avatar: e.target.value })}
        />
        <button type="submit">Create Channel</button>
      </form>
    </div>
  );
};

export default ChannelCreation;
