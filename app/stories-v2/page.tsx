"use client";
import React from "react";
import { useState, useEffect } from "react";
import styled from "styled-components";
import { layout, space, color, borderRadius } from "styled-system";
import {
  Post1,
  Post2,
  Post3,
  Post4,
  Post5,
  Post6,
  Post7,
  Post8,
  Post9,
} from "./posts";

// Full-screen story container
const FullScreenContainer = styled.div`
  ${layout}
  ${space}
  ${color}
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.9);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  z-index: 1000;
`;

// Story content
const StoryContent = styled.div`
  width: 100%;
  height: 100%;
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

// Image inside the story
const StoryImage = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: fill;
`;

// Top bar with progress bars for each story
const TopBar = styled.div`
  width: 100%;
  height: 20px;
  display: flex;
  gap: 5px;
  padding: 5px 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

// Progress bar background for each story
const ProgressBar = styled.div`
  flex-grow: 1;
  height: 5px;
  background-color: rgba(255, 255, 255, 0.2);
  position: relative;
  border-radius: 3px;
`;

// Progress that grows over time for each story
const Progress = styled.div`
  height: 100%;
  background-color: #fff;
  transition: width 0.1s linear;
  border-radius: 3px;
`;

// Close button for the story
const CloseButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 20px;
  cursor: pointer;
`;

const StoryHeaderContainer = styled.div`
  top: 20px;
  left: 0;
  width: 100%;
  padding: 5px 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StoryUserImage = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  object-fit: cover;
`;

// Circle component for user stories
const Circle = styled.div`
  ${space}
  ${layout}
  ${borderRadius}
  ${color}
  width: 60px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  border: 2px solid #f08080;
  border-radius: 50%;
  padding: 2px;
  cursor: pointer;
`;

// Image inside the story circle
const UserImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
`;

// Container for the story circles
const Container = styled.div`
  ${space}
  ${layout}
  display: flex;
  gap: 16px;
  overflow-x: auto;
  padding: 10px;
`;

// Sample users data with stories nested inside each user
const usersData = [
  {
    id: 1,
    name: "John",
    profileImageUrl: "https://randomuser.me/api/portraits/men/1.jpg",
    stories: [
      {
        id: 1,
        imageUrl: "https://picsum.photos/200/300",
        component: Post1,
        props: { user: "John" },
      },
      {
        id: 2,
        imageUrl: "https://picsum.photos/200/400",
        component: Post2,
        props: { user: "John" },
      },
      {
        id: 3,
        imageUrl: "https://picsum.photos/200/500",
        component: Post3,
        props: { user: "John" },
      },
    ],
  },
  {
    id: 2,
    name: "Alice",
    profileImageUrl: "https://randomuser.me/api/portraits/women/2.jpg",
    stories: [
      {
        id: 1,
        imageUrl: "https://picsum.photos/200/301",
        component: Post4,
        props: { user: "Alice" },
      },
      {
        id: 2,
        imageUrl: "https://picsum.photos/200/401",
        component: Post5,
        props: { user: "Alice" },
      },
      {
        id: 3,
        imageUrl: "https://picsum.photos/200/501",
        component: Post6,
        props: { user: "Alice" },
      },
    ],
  },
  {
    id: 3,
    name: "Bob",
    profileImageUrl: "https://randomuser.me/api/portraits/men/3.jpg",
    stories: [
      {
        id: 1,
        imageUrl: "https://picsum.photos/200/302",
        component: Post7,
        props: { user: "Bob" },
      },
      {
        id: 2,
        imageUrl: "https://picsum.photos/200/402",
        component: Post8,
        props: { user: "Bob" },
      },
      {
        id: 3,
        imageUrl: "https://picsum.photos/200/502",
        component: Post9,
        props: { user: "Bob" },
      },
    ],
  },
];

// Full-screen story component with multiple progress bars and multiple stories per user
export const FullScreenStory = ({ user, onClose }: any) => {
  const [storyIndex, setStoryIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const duration = 3000; // Story duration in milliseconds

  useEffect(() => {
    setProgress(0);
    setIsImageLoaded(false);

    const loadTimer = setTimeout(() => {
      setIsImageLoaded(true);
    }, 100);

    return () => {
      clearTimeout(loadTimer);
    };
  }, [storyIndex]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (isImageLoaded) {
        setProgress((prev) => {
          if (prev >= 100) {
            nextStory();
            return 0;
          }
          return prev + 1;
        });
      }
    }, duration / 100);

    return () => {
      clearInterval(interval);
    };
  }, [isImageLoaded, storyIndex]);

  const nextStory = () => {
    if (storyIndex < user.stories.length - 1) {
      setStoryIndex(storyIndex + 1);
    } else {
      onClose();
    }
  };

  const previousStory = () => {
    if (storyIndex > 0) {
      setStoryIndex(storyIndex - 1);
    }
  };

  const handleClick = (e: { clientX: any }) => {
    const { clientX } = e;
    const windowWidth = window.innerWidth;

    if (clientX < windowWidth / 2) {
      previousStory(); // Go to previous story
    } else {
      nextStory(); // Go to next story
    }
  };
  const StoryComponent = user.stories[storyIndex].component;
  return (
    <FullScreenContainer onClick={handleClick}>
      <TopBar>
        {user.stories.map((_: any, i: number) => (
          <ProgressBar key={i}>
            <Progress
              style={{
                width:
                  i === storyIndex
                    ? `${progress}%`
                    : i < storyIndex
                    ? "100%"
                    : "0%",
              }}
            />
          </ProgressBar>
        ))}
      </TopBar>
      <StoryHeaderContainer>
        <StoryUserImage src={user.profileImageUrl} alt={user.name} />
        <CloseButton onClick={onClose}>✕</CloseButton>
      </StoryHeaderContainer>
      <StoryContent>
        {!user.stories ? (
          <StoryImage
            src={user.stories[storyIndex].imageUrl}
            alt="Story"
            style={{ display: isImageLoaded ? "block" : "none" }}
          />
        ) : null}
        {user?.stories[storyIndex]?.component ? (
          <StoryComponent {...user.stories[storyIndex].props} />
        ) : null}
      </StoryContent>
    </FullScreenContainer>
  );
};

// Story circle component
export const StoryCircle = ({ imageUrl, onClick, name }: any) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "5px",
      }}
    >
      <Circle onClick={onClick}>
        <UserImage src={imageUrl} alt={name} />
      </Circle>
      <p style={{ fontSize: 12, color: "#fff" }}>{name}</p>
    </div>
  );
};

// Main container component to display stories
export const StoriesContainer = () => {
  const [showStory, setShowStory] = useState(false);
  const [currentUserIndex, setCurrentUserIndex] = useState<number | null>(null);

  const handleStoryClick = (index: number | null) => {
    setCurrentUserIndex(index);
    setShowStory(true);
  };

  const closeStory = () => {
    setShowStory(false);
    setCurrentUserIndex(null);
  };

  return (
    <>
      <Container>
        {usersData.map((user, index) => (
          <StoryCircle
            key={user.id}
            imageUrl={user.profileImageUrl}
            onClick={() => handleStoryClick(index)}
            name={user.name}
          />
        ))}
      </Container>

      {showStory && currentUserIndex !== null && (
        <FullScreenStory
          user={usersData[currentUserIndex]}
          onClose={closeStory}
        />
      )}
    </>
  );
};

// Main home page component
export default function Home() {
  return (
    <div>
      <StoriesContainer />
      {/* <Post1 name={"Wajahat"} /> */}
    </div>
  );
}
