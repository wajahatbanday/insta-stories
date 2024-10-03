"use client";

import { Box, Column, Row, Text } from "sentinal-ui";
import Stories from "react-insta-stories";
import { useCallback, useState, useEffect } from "react";

// Original StoryComponent from the first example
const StoryComponent = ({ user }) => (
  <Box
    width="100%"
    height="100%"
    display="flex"
    justifyContent="center"
    alignItems="center"
  >
    <Box
      width="350px"
      height="400px"
      borderRadius="10px"
      overflow="hidden"
      alignSelf="center"
    >
      <Row
        display="flex"
        flexDirection={"row"}
        alignItems="center"
        padding="10px"
        height="10%"
        backgroundColor="white"
      >
        <Box
          backgroundImage={`url("https://via.placeholder.com/40")`}
          backgroundPosition={"center"}
          backgroundSize={"contain"}
          width="30px"
          height="30px"
          borderRadius="50%"
          marginRight="10px"
          border={"1px solid black"}
        />
        <Text fontSize={14} color="black">
          {user}
        </Text>
      </Row>

      <Box width="100%" height="80%">
        <Box
          as="img"
          src="https://via.placeholder.com/400"
          alt="Post"
          width="100%"
          height="100%"
        />
      </Box>
      <Box
        display="flex"
        flexDirection={"row"}
        alignItems="center"
        justifyContent="space-around"
        padding="10px"
        height="10%"
        borderTop="1px solid #ddd"
        backgroundColor="white"
      >
        <Text fontSize={14} color="black">
          ❤️ Like
        </Text>
        <Text fontSize={14} color="black">
          💬 Comment
        </Text>
        <Text fontSize={14} color="black">
          🔗 Share
        </Text>
      </Box>
    </Box>
  </Box>
);

// Original users data from the first example
const users = [
  {
    id: 1,
    name: "Suhaib",
    profileImage: "https://randomuser.me/api/portraits/men/1.jpg",
    stories: [
      { content: ({ action, story }) => <StoryComponent user="Suhaib" /> },
      { content: ({ action, story }) => <StoryComponent user="Suhaib" /> },
      { content: ({ action, story }) => <StoryComponent user="Suhaib" /> },
    ],
  },
  {
    id: 2,
    name: "Wajahat",
    profileImage: "https://randomuser.me/api/portraits/men/2.jpg",
    stories: [
      { content: ({ action, story }) => <StoryComponent user="Wajahat" /> },
      { content: ({ action, story }) => <StoryComponent user="Wajahat" /> },
      { content: ({ action, story }) => <StoryComponent user="Wajahat" /> },
    ],
  },
  {
    id: 3,
    name: "Iqram",
    profileImage: "https://randomuser.me/api/portraits/men/3.jpg",
    stories: [
      { content: ({ action, story }) => <StoryComponent user="Iqram" /> },
      { content: ({ action, story }) => <StoryComponent user="Iqram" /> },
      { content: ({ action, story }) => <StoryComponent user="Iqram" /> },
    ],
  },
  {
    id: 4,
    name: "Imran",
    profileImage: "https://randomuser.me/api/portraits/men/4.jpg",
    stories: [
      { content: ({ action, story }) => <StoryComponent user="Imran" /> },
      { content: ({ action, story }) => <StoryComponent user="Imran" /> },
      { content: ({ action, story }) => <StoryComponent user="Imran" /> },
    ],
  },
];

const Loader = () => <Text>Loading..</Text>;

export default function StoriesV3() {
  const [activeStoryGroup, setActiveStoryGroup] = useState(null);
  const [storyIndex, setStoryIndex] = useState(0);
  const [message, setMessage] = useState("");
  const [viewedStories, setViewedStories] = useState([]);

  const handleOpenStory = useCallback(
    (index) => {
      setActiveStoryGroup(index);
      setStoryIndex(0);
      if (!viewedStories.includes(index)) {
        setViewedStories((prev) => [...prev, index]);
      }
    },
    [viewedStories]
  );

  const handleCloseStory = useCallback(() => {
    setActiveStoryGroup(null);
    setStoryIndex(0);
  }, []);

  const onStoryStart = (index, story) => {
    setMessage(`Story ${index + 1} has started!`);
  };

  const onStoryEnd = (index, story) => {
    setMessage(`Story ${index + 1} has ended!`);
  };

  const onAllStoriesEnd = useCallback(() => {
    setMessage("All Stories Viewed");
    const nextGroupIndex = activeStoryGroup + 1;
    if (nextGroupIndex < users.length) {
      setActiveStoryGroup(nextGroupIndex);
      setStoryIndex(0);
      if (!viewedStories.includes(nextGroupIndex)) {
        setViewedStories((prev) => [...prev, nextGroupIndex]);
      }
    } else {
      handleCloseStory();
    }
  }, [activeStoryGroup, users.length, viewedStories, handleCloseStory]);

  const onNext = useCallback(() => {
    setStoryIndex((prevIndex) => prevIndex + 1);
  }, []);

  const onPrevious = useCallback(() => {
    console.log("Moving to previous story");
    setStoryIndex((prevIndex) => Math.max(0, prevIndex - 1));
  }, []);
  console.log(viewedStories);

  return (
    <Box
      width={"100%"}
      height={"100%"}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Box
        width={"393px"}
        height={"852px"}
        position={"relative"}
        border={"1px solid blue"}
      >
        <Row
          position={"absolute"}
          top={0}
          left={0}
          width={"100%"}
          py={"10px"}
          px={"10px"}
          flexDirection={"row"}
          justifyContent={"start"}
          alignItems={"center"}
          gap={"20px"}
        >
          {users.map((user, index) => (
            <Box
              key={user.id}
              alignItems={"center"}
              style={{ cursor: "pointer" }}
              onClick={() => handleOpenStory(index)}
            >
              <Box
                width={"64px"}
                height={"64px"}
                border={
                  viewedStories.includes(index)
                    ? "2px solid grey"
                    : "2px solid red"
                }
                p={"2px"}
                borderRadius={"50%"}
              >
                <Box
                  width={"100%"}
                  height={"100%"}
                  borderRadius={"50%"}
                  backgroundImage={`url("${user.profileImage}")`}
                  backgroundPosition={"center"}
                  backgroundSize={"contain"}
                />
              </Box>
              <Text fontSize={12} color={"white"}>
                {user.name}
              </Text>
            </Box>
          ))}
        </Row>
        {activeStoryGroup !== null && (
          <Box
            width={"100%"}
            height={"100%"}
            justifyContent={"center"}
            alignItems={"center"}
            style={{ zIndex: 1 }}
          >
            <Stories
              key={activeStoryGroup}
              stories={users[activeStoryGroup].stories}
              defaultInterval={2000}
              width="100%"
              height="100%"
              loader={<Loader />}
              storyStyles={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
              loop={false}
              onStoryStart={onStoryStart}
              onStoryEnd={onStoryEnd}
              onAllStoriesEnd={onAllStoriesEnd}
              onNextItem={onNext}
              onPrevItem={onPrevious}
              currentIndex={storyIndex}
            />
          </Box>
        )}
      </Box>
      <Text>{message}</Text>
    </Box>
  );
}
