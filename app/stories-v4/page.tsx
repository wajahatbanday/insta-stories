"use client";

import { Box, Column, Row, Text } from "sentinal-ui";
import Stories from "react-insta-stories";
import { useCallback, useState, useEffect, SetStateAction } from "react";
import { useId } from "react";
type User = {
  user: string;
};

const StoryComponent = ({ user }: User) => {
  return (
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
};

const users = [
  {
    id: 1,
    name: "Suhaib",
    profileImage: "https://randomuser.me/api/portraits/men/1.jpg",
    stories: [
      {
        storyId: 11,
        content: () => <StoryComponent user="Suhaib" />,
      },
      {
        storyId: 12,
        content: () => <StoryComponent user="Suhaib" />,
      },
      {
        storyId: 13,
        content: () => <StoryComponent user="Suhaib" />,
      },
    ],
  },
  {
    id: 2,
    name: "Wajahat",
    profileImage: "https://randomuser.me/api/portraits/men/2.jpg",
    stories: [
      {
        storyId: 14,
        content: () => <StoryComponent user="Wajahat" />,
      },
      {
        storyId: 15,
        content: () => <StoryComponent user="Wajahat" />,
      },
      {
        storyId: 16,
        content: () => <StoryComponent user="Wajahat" />,
      },
    ],
  },
  {
    id: 3,
    name: "Iqram",
    profileImage: "https://randomuser.me/api/portraits/men/3.jpg",
    stories: [
      {
        storyId: 17,
        content: () => <StoryComponent user="Iqram" />,
      },
      {
        storyId: 18,
        content: () => <StoryComponent user="Iqram" />,
      },
      {
        storyId: 19,
        content: () => <StoryComponent user="Iqram" />,
      },
    ],
  },
  {
    id: 4,
    name: "Imran",
    profileImage: "https://randomuser.me/api/portraits/men/4.jpg",
    stories: [
      {
        storyId: 20,
        content: () => <StoryComponent user="Imran" />,
      },
      {
        storyId: 21,
        content: () => <StoryComponent user="Imran" />,
      },

      {
        storyId: 22,
        content: () => <StoryComponent user="Imran" />,
      },
    ],
  },
];

const Loader = () => <Text>Loading..</Text>;

export default function StoriesV3() {
  const [activeStoryGroup, setActiveStoryGroup] = useState(null);
  const [storyIndex, setStoryIndex] = useState(0);
  const [message, setMessage] = useState("");
  const [viewedStories, setViewedStories] = useState<number[]>([]);
  const [viewedIndividualStories, setViewedIndividualStories] = useState([]);

  useEffect(() => {
    localStorage.setItem(
      "viewedIndividualStories",
      JSON.stringify(viewedIndividualStories)
    );
  }, [viewedIndividualStories]);

  const handleOpenStory = (index: SetStateAction<null>) => {
    setActiveStoryGroup(index);
    setStoryIndex(0);
    if (!viewedStories.includes(index)) {
      setViewedStories((prev) => [...prev, index]);
    }
  };

  const handleCloseStory = useCallback(() => {
    setActiveStoryGroup(null);
    setStoryIndex(0);
  }, []);

  const onStoryStart = (index: string | number, story: any) => {
    const currentStoryIndex = users[activeStoryGroup].stories[index].storyId;
    if (!viewedStories.includes(currentStoryIndex)) {
      setViewedIndividualStories((prev) => [...prev, currentStoryIndex]);
    }
  };

  const onStoryEnd = (index: any, story: any) => {
    setMessage("nothing as of now");
  };

  const onAllStoriesEnd = useCallback(() => {
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
  }, [activeStoryGroup, viewedStories, handleCloseStory]);

  const onNext = useCallback(() => {
    setStoryIndex((prevIndex) => prevIndex + 1);
  }, []);

  const onPrevious = useCallback(() => {
    setStoryIndex((prevIndex) => Math.max(0, prevIndex - 1));
  }, []);

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
        {activeStoryGroup !== null ? (
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
              onNext={onNext}
              onPrevious={onPrevious}
              currentIndex={storyIndex}
            />
          </Box>
        ) : null}
      </Box>
      <Text>{message}</Text>
    </Box>
  );
}
