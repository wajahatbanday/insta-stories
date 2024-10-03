"use client";

import { Box, Column, Row, Text } from "sentinal-ui";
import Stories, { WithSeeMore } from "react-insta-stories";
import { useCallback, useState } from "react";
const Header = ({ url, name, time }) => {
  return (
    <Box position={"relative"} top={0} left={0}>
      <Row>
        <Box>{url}</Box>
        <Column>
          <Text color={"black"}>{name}</Text>
          <Text>{time}</Text>
        </Column>
      </Row>
    </Box>
  );
};
// Test component used in the stories
export const TestComponent = ({ header, isPaused }: any) => {
  return (
    <Box position={"relative"}>
      <Box>
        <Header url={"hie"} name={"imran"} time={"undefined"} />
      </Box>

      <Box style={{ background: "green", padding: 20, width: "100%" }}>
        <Text style={{ marginTop: "100%", marginBottom: 0 }}>🌝</Text>
        <Text color={"white"}>{isPaused ? "Paused" : "Playing"}</Text>
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
      url: "https://picsum.photos/500/500",
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
          ></Box>

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
