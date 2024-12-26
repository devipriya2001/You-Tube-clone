
import React, { useState } from "react";
import axios from "axios";

const VideoUpload = ({ channelId }) => {
  const [videoData, setVideoData] = useState({
    title: "",
    desc: "",
    imgUrl: "",
    videoUrl: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "/api/videos",
        { ...videoData, channelId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log("Video uploaded:", response.data);
    } catch (err) {
      console.error("Error uploading video:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title"
        value={videoData.title}
        onChange={(e) =>
          setVideoData({ ...videoData, title: e.target.value })
        }
      />
      <textarea
        placeholder="Description"
        value={videoData.desc}
        onChange={(e) =>
          setVideoData({ ...videoData, desc: e.target.value })
        }
      />
      <input
        type="text"
        placeholder="Image URL"
        value={videoData.imgUrl}
        onChange={(e) =>
          setVideoData({ ...videoData, imgUrl: e.target.value })
        }
      />
      <input
        type="text"
        placeholder="Video URL"
        value={videoData.videoUrl}
        onChange={(e) =>
          setVideoData({ ...videoData, videoUrl: e.target.value })
        }
      />
      <button type="submit">Upload Video</button>
    </form>
  );
};

export default VideoUpload;
