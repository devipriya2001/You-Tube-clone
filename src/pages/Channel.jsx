import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  display: flex;
  gap: 20px;
`;

const ChannelInfo = styled.div`
  flex: 1;
  margin-top: 20px;
`;

const ChannelTitle = styled.h1`
  font-size: 30px;
  font-weight: 500;
`;

const VideoList = styled.div`
  flex: 3;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;

const VideoCard = styled.div`
  width: 300px;
  height: 200px;
  background-color: #f0f0f0;
  border-radius: 10px;
  cursor: pointer;
  position: relative;
`;

const EditButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: #008cba;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
`;

const DeleteButton = styled.button`
  position: absolute;
  top: 40px;
  right: 10px;
  background-color: #f44336;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
`;

const Channel = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [videos, setVideos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchChannelVideos = async () => {
      try {
        const res = await axios.get(`/videos/user/${currentUser._id}`);
        setVideos(res.data);
      } catch (err) {
        console.error("Error fetching channel videos", err);
      }
    };

    if (currentUser) {
      fetchChannelVideos();
    } else {
      navigate("/login");
    }
  }, [currentUser, navigate]);

  const handleEdit = (videoId) => {
    navigate(`/edit-video/${videoId}`);
  };

  const handleDelete = async (videoId) => {
    try {
      await axios.delete(`/videos/${videoId}`);
      setVideos(videos.filter((video) => video._id !== videoId));
    } catch (err) {
      console.error("Error deleting video", err);
    }
  };

  return (
    <Container>
      <ChannelInfo>
        <ChannelTitle>{currentUser?.name}'s Channel</ChannelTitle>
        {/* Add more channel details here if necessary */}
      </ChannelInfo>

      <VideoList>
        {videos.map((video) => (
          <VideoCard key={video._id}>
            <img src={video.imgUrl} alt={video.title} style={{ width: "100%", height: "100%" }} />
            <EditButton onClick={() => handleEdit(video._id)}>Edit</EditButton>
            <DeleteButton onClick={() => handleDelete(video._id)}>Delete</DeleteButton>
          </VideoCard>
        ))}
      </VideoList>
    </Container>
  );
};

export default Channel;
