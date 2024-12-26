import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Card from "../components/Card";
import axios from "axios";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const Content = styled.div`
  margin-top: 56px;
`;

const FiltersContainer = styled.div`
  display: flex;
  gap: 12px;
  margin: 20px 0;
  justify-content: flex-start;
  overflow-x: auto;
  padding: 10px 0;
`;

const FilterButton = styled.button`
  padding: 8px 16px;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  background-color: ${(props) => (props.active ? "black" : "#f1f1f1")};
  color: ${(props) => (props.active ? "white" : "black")};
`;

const Home = ({ type, searchTerm }) => {
  const [videos, setVideos] = useState([]);
  const [filteredVideos, setFilteredVideos] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("All");
  
  const filters = ["All", "React", "JavaScript", "Node.js", "MongoDB"];

  useEffect(() => {
    const fetchVideos = async () => {
      const res = await axios.get(`/videos/${type}`);
      setVideos(res.data);
      setFilteredVideos(res.data);  // Initialize with all videos
    };
    fetchVideos();
  }, [type]);

  useEffect(() => {
    const filtered = videos.filter((video) => {
      const title = video?.title || "";  // Safely handle undefined title
      const search = searchTerm || "";   // Safely handle undefined searchTerm
  
      const matchesSearch = title.toLowerCase().includes(search.toLowerCase());
      const matchesFilter = selectedFilter === "All" || video.category === selectedFilter;
      
      return matchesSearch && matchesFilter;
    });
    
    setFilteredVideos(filtered);
  }, [searchTerm, selectedFilter, videos]);
  
  

  const handleFilterClick = (filter) => {
    setSelectedFilter(filter);
  };

  return (
    <Content>
      <FiltersContainer>
        {filters.map((filter) => (
          <FilterButton
            key={filter}
            active={selectedFilter === filter}
            onClick={() => handleFilterClick(filter)}
          >
            {filter}
          </FilterButton>
        ))}
      </FiltersContainer>

      <Container>
        {filteredVideos.length > 0 ? (
          filteredVideos.map((video) => (
            <Card key={video._id} video={video} />
          ))
        ) : (
          <p>No videos found</p>
        )}
      </Container>
    </Content>
  );
};

export default Home;
