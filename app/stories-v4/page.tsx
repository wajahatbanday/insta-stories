"use client";

import { Box, Column, Row, Text } from "sentinal-ui";
import Stories, { WithSeeMore } from "react-insta-stories";
import { useCallback, useState } from "react";

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
      { content: () => <StoryComponent user="Suhaib" /> },
      { content: () => <StoryComponent user="Suhaib" /> },
      { content: () => <StoryComponent user="Suhaib" /> },
    ],
  },
  {
    id: 2,
    name: "Wajahat",
    profileImage: "https://randomuser.me/api/portraits/men/2.jpg",
    stories: [
      { content: () => <StoryComponent user="Wajahat" /> },
      { content: () => <StoryComponent user="Wajahat" /> },
      { content: () => <StoryComponent user="Wajahat" /> },
    ],
  },
  // ... you can add more users here
];

// Function to adapt users data to the format expected by the second component
function adaptUsersToAllStories(users) {
  return users.map((user) => {
    return user.stories.map((story) => ({
      content: story.content,
      duration: 2000,
      header: {
        heading: user.name,
        subheading: "Posted recently",
        profileImage: user.profileImage,
      },
    }));
  });
}

// Loader component
const Loader = () => {
  return <Text>Loading..</Text>;
};

export default function StoriesV3() {
  const allStories = adaptUsersToAllStories(users);

  // State to log changes from story events
  const [storyIndex, setStoryIndex] = useState(0);
  const [message, setMessage] = useState("");
  const [endStories, setEndStories] = useState(false);
  const [changeColor, setChangeColor] = useState(false);
  const [viewedStories, setViewedStories] = useState([]);
  const [openStoryIndex, setOpenStoryIndex] = useState(null);

  const handleClick = useCallback(
    (index) => {
      setChangeColor(true);
      setOpenStoryIndex(openStoryIndex === index ? null : index);
      setViewedStories((prev) => {
        if (!prev.includes(index)) {
          return [...prev, index];
        }
        return prev;
      });
    },
    [openStoryIndex]
  );

  // Callback when a story starts
  const onStoryStart = (index, story) => {
    setMessage(`Story ${index + 1} has started!`);
  };

  // Callback when a story ends
  const onStoryEnd = (index, story) => {
    setMessage(`Story ${index + 1} has ended!`);
  };

  // Callback when all stories have ended
  const onAllStoriesEnd = () => {
    setMessage("All Stories Viewed");
    console.log("index", openStoryIndex);
    setOpenStoryIndex(openStoryIndex + 1);
    setEndStories(true);
    setViewedStories((prev) => {
      if (!prev.includes(openStoryIndex)) {
        return [...prev, openStoryIndex];
      }
      return prev;
    });
  };

  // Callback when user navigates to the next story
  const onNext = (index) => {
    setStoryIndex(index + 1);
    console.log("Proceeding to the next story");
  };

  // Callback when user navigates to the previous story
  const onPrevious = (index) => {
    setStoryIndex(index - 1);
    console.log("Going back to the previous story");
  };

  return (
    <Box flexDirection={"row"} border={"1px solid red"}>
      <Text color={"white"}>{message}</Text>
      {allStories.map((story, index) => (
        <Box key={index}>
          <Box
            border={
              viewedStories.includes(index) ? "2px solid grey" : "2px solid red"
            }
            width={50}
            height={50}
            borderRadius={"50px"}
            onClick={() => handleClick(index)}
          >
            <img
              src={story[0].header.profileImage}
              alt={story[0].header.heading}
              style={{ width: "100%", height: "100%", borderRadius: "50%" }}
            />
          </Box>

          {openStoryIndex === index && (
            <Stories
              stories={story}
              defaultInterval={1000}
              loader={<Loader />}
              storyContainerStyles={{ border: "1px solid white" }}
              width={"80vw"}
              progressContainerStyles={{ border: "1px solid blue" }}
              progressWrapperStyles={{ border: "1px solid green" }}
              loop={false}
              onNext={onNext}
              onStoryEnd={onStoryEnd}
              onAllStoriesEnd={onAllStoriesEnd}
              onPrevious={onPrevious}
              onStoryStart={onStoryStart}
              keyboardNavigation={true}
              currentIndex={storyIndex}
              preloadCount={1}
              progressStyles={{ border: "1px solid white" }}
            />
          )}
        </Box>
      ))}
      <Text>{message}</Text>
    </Box>
  );
}
