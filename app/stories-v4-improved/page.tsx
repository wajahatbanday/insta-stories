"use client";

import { Box, Column, Row, Text } from "sentinal-ui";
import Stories from "react-insta-stories";
import { useCallback, useState, useEffect } from "react";

type User = {
  user: string;
};

type Story = {
  storyId: number;
  content: () => JSX.Element;
};

type UserData = {
  id: number;
  name: string;
  profileImage: string;
  stories: Story[];
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

const users: UserData[] = [
  {
    id: 100,
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
    id: 102,
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
    id: 103,
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
    id: 104,
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
  const [activeStoryGroup, setActiveStoryGroup] = useState<number | null>(null);
  const [storyIndex, setStoryIndex] = useState(0);
  const [message, setMessage] = useState("");
  const [viewedStories, setViewedStories] = useState<number[]>([]);
  const [viewedIndividualStories, setViewedIndividualStories] = useState<
    number[]
  >([]);

  useEffect(() => {
    localStorage.setItem(
      "viewedIndividualStories",
      JSON.stringify(viewedIndividualStories)
    );
  }, [viewedIndividualStories]);

  const handleOpenStory = useCallback(
    (userId: number) => {
      const userIndex = users.findIndex((user) => user.id === userId);
      if (userIndex !== -1) {
        setActiveStoryGroup(userIndex);
        setStoryIndex(0);
        if (!viewedStories.includes(userId)) {
          setViewedStories((prev) => [...prev, userId]);
        }
      }
    },
    [viewedStories]
  );

  const handleCloseStory = useCallback(() => {
    setActiveStoryGroup(null);
    setStoryIndex(0);
  }, []);

  const onStoryStart = (index: number) => {
    const currentStoryId =
      users[activeStoryGroup ?? 0]?.stories[index]?.storyId;
    if (currentStoryId && !viewedIndividualStories.includes(currentStoryId)) {
      setViewedIndividualStories((prev) => [...prev, currentStoryId]);
    }
  };

  const onStoryEnd = (index: number) => {
    setMessage("Story ended");
  };

  const onAllStoriesEnd = useCallback(() => {
    if (activeStoryGroup !== null) {
      const nextUserIndex = users.findIndex(
        (user) => user.id > users[activeStoryGroup].id
      );
      if (nextUserIndex !== -1) {
        setActiveStoryGroup(nextUserIndex);
        setStoryIndex(0);
        if (!viewedStories.includes(users[nextUserIndex].id)) {
          setViewedStories((prev) => [...prev, users[nextUserIndex].id]);
        }
      } else {
        handleCloseStory();
      }
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
          {users.map((user) => (
            <Box
              key={user.id}
              alignItems={"center"}
              style={{ cursor: "pointer" }}
              onClick={() => handleOpenStory(user.id)}
            >
              <Box
                width={"64px"}
                height={"64px"}
                border={
                  viewedStories.includes(user.id)
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
              key={users[activeStoryGroup].id}
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
        )}
      </Box>
    </Box>
  );
}
