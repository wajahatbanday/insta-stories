
"use client";

import { Box, Column, Row, Text } from "sentinal-ui";
import Stories, { WithSeeMore } from "react-insta-stories";
import { useCallback, useState } from "react";
import { backgroundColor } from "styled-system";
const Header = ({ url, name, time }) => {
  return (
    <Row gap={"12px"} flexDirection={"row"} alignItems={"center"} ml={"12px"}>
      <Box
        backgroundImage={`url(${url})`}
        backgroundRepeat={"no-repeat"}
        width={40}
        height={40}
        backgroundPosition={"center"}
        backgroundSize={"contain"}
        border={"2px solid white"}
        borderRadius={"50px"}
      ></Box>
      <Column>
        <Text color={"white"} fontSize={16}>
          {name}
        </Text>
        <Text color={"white"} fontSize={10}>
          {time}
        </Text>
      </Column>
    </Row>
  );
};
// Test component used in the stories
export const TestComponent = ({ header, isPaused }: any) => {
  return (
    <Box display={"flex"}>
      <Box position={"relative"} top={-22} left={0}>
        <Header
          url={"https://picsum.photos/50/50"}
          name={"Mohd Imran"}
          time={"posted 3 min ago"}
        />
      </Box>
      <Box width={"100vw"} justifyContent={"center"} display={"flex"}>
        <Box border={"1px solid red"} height={"70vh"} width={"22vw"}>
          <Text style={{ marginTop: "100%", marginBottom: 0 }}>🌝</Text>
          <Text color={"white"}>{isPaused ? "Paused" : "Playing"}</Text>
        </Box>
      </Box>
    </Box>
  );
};

// Custom content for the "See More" functionality
const CustomStoryContent = ({ story, action }) => {
  const [showSeeMore, setShowSeeMore] = useState(true);

  // Function to close the 'See More' section
  const closeSeeMore = () => {
    setShowSeeMore(false);
    action("play"); // Resume the story when 'See More' is closed
  };

  if (!story || !story.seeMore || !showSeeMore) {
    return null; // Safeguard against undefined story, seeMore, or when it's closed
  }

  return (
    <WithSeeMore story={story} action={action}>
      <div
        style={{
          position: "absolute",
          bottom: "10%",
          left: "0",
          right: "0",
          padding: "10px",
          backgroundColor: "rgba(0, 0, 0, 0.7)",
          color: "white",
          textAlign: "center",
        }}
      >
        <h1>Hello!</h1>
        <p>This story has a link at the bottom ✨</p>
        <button
          onClick={closeSeeMore}
          style={{
            marginTop: "10px",
            padding: "5px 10px",
            backgroundColor: "red",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Close See More
        </button>
      </div>
    </WithSeeMore>
  );
};

// Stories array with a combination of URLs, custom content, and video
const allStories = [
  [
    {
      url: "https://picsum.photos/450/450",
      duration: 1000,
      seeMore: ({ close }) => <div onClick={close}>Click to close this.</div>,
      header: {
        heading: "Mohit Karekar",
        subheading: "Posted 30m ago",
        profileImage: "https://picsum.photos/100/100",
      },
    },

    {
      content: TestComponent,
      header: {
        heading: "Mohit Karekar",
        subheading: "Posted 30m ago",
        profileImage: "https://picsum.photos/100/100",
      },
    },
    {
      url: "https://www.w3schools.com/html/mov_bbb.mp4", // Sample video URL
      type: "video",
      duration: 1000,
      width: "100%",
      seeMore: CustomStoryContent, // This will render the custom 'See More' component
    },
  ],
  [
    {
      url: "https://picsum.photos/500/700",
      duration: 1000,
      seeMore: ({ close }) => <div onClick={close}>Click to close this.</div>,
      header: {
        heading: "Mohit Karekar",
        subheading: "Posted 30m ago",
        profileImage: "https://picsum.photos/100/100",
      },
    },
    {
      content: TestComponent,
      header: {
        heading: "Mohit Karekar",
        subheading: "Posted 30m ago",
        profileImage: "https://picsum.photos/100/100",
      },
    },
    {
      url: "https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4", // Sample video URL
      type: "video",
      duration: 1000,
      width: "100%",
      seeMore: CustomStoryContent, // This will render the custom 'See More' component
    },
  ],
];

// Loader component
const Loader = () => {
  return <Text>Loading..</Text>;
};

export default function StoriesV3() {
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

  console.log(viewedStories);

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
    setMessage("Sab Stories Dekh li");
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

  console.log(viewedStories);
  return (
    <Box
      flexDirection={"row"}
      border={"1px solid red"}
      justifyContent={"center"}
    >
      <Text color={"white"}>{message}</Text>
      {allStories.map((story, index) => (
        <Box key={index}>
          <Box
            border={
              viewedStories.includes(index) ? "3px solid grey" : "3px solid red"
            }
            width={60}
            height={60}
            borderRadius={"50px"}
            onClick={() => handleClick(index)}
          ></Box>

          {openStoryIndex === index && (
            <Box width={["80vw", "40vw"]}>
              <Stories
                stories={story}
                defaultInterval={1000}
                loader={<Loader />}
                storyContainerStyles={{
                  border: "1px solid white",
                  backgroundColor: "grey",
                }}
                progressWrapperStyles={{ border: "1px solid red" }}
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
            </Box>
          )}
        </Box>
      ))}
      <Text>{message}</Text>
    </Box>
  );
}
