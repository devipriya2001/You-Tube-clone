import React from "react";
import styled from "styled-components";
import HomeIcon from "@mui/icons-material/Home";
import ExploreIcon from "@mui/icons-material/Explore";
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import HistoryIcon from "@mui/icons-material/History";
import MenuIcon from "@mui/icons-material/Menu";

const SidebarContainer = styled.div`
  width: ${(props) => (props.isOpen ? "240px" : "72px")};
  height: 100vh;
  background-color: #fff;
  position: fixed;
  top: 56px;
  left: 0;
  overflow: hidden;
  transition: width 0.3s ease;
  border-right: 1px solid #ddd;
  z-index: 1000;
`;

const SidebarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 0;
  align-items: ${(props) => (props.isOpen ? "flex-start" : "center")};
`;

const SidebarItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${(props) => (props.isOpen ? "20px" : "0px")};
  padding: 15px;
  cursor: pointer;
  width: 100%;
  justify-content: ${(props) => (props.isOpen ? "flex-start" : "center")};
  font-size: 14px;
  white-space: nowrap;
  transition: all 0.3s ease;

  &:hover {
    background-color: #f5f5f5;
  }
`;

const Sidebar = ({ isOpen }) => {
  return (
    <SidebarContainer isOpen={isOpen}>
      <SidebarWrapper isOpen={isOpen}>
        <SidebarItem isOpen={isOpen}>
          <HomeIcon /> {isOpen && "Home"}
        </SidebarItem>
        <SidebarItem isOpen={isOpen}>
          <ExploreIcon /> {isOpen && "Explore"}
        </SidebarItem>
        <SidebarItem isOpen={isOpen}>
          <SubscriptionsIcon /> {isOpen && "Subscriptions"}
        </SidebarItem>
        <SidebarItem isOpen={isOpen}>
          <VideoLibraryIcon /> {isOpen && "Library"}
        </SidebarItem>
        <SidebarItem isOpen={isOpen}>
          <HistoryIcon /> {isOpen && "History"}
        </SidebarItem>
      </SidebarWrapper>
    </SidebarContainer>
  );
};

export default Sidebar;
