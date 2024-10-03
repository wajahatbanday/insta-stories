"use client";
import { useState } from "react";
import { Box, Button, Row, Text } from "sentinal-ui";
import Stories from "stories-react";

function TestComponent() {
  return (
    <div
      style={{
        // width: "396px",
        // height: "600px",
        width: "100%",
        height: "100%",
        textAlign: "center",
        backgroundColor: "yellow",
        padding: "20px",
      }}
    >
      <h1 style={{ color: "#333", fontSize: "24px" }}>
        This is Test Component
      </h1>
    </div>
  );
}
function TestComponent2() {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        textAlign: "center",
        backgroundColor: "grey",
        padding: "20px",
      }}
    >
      <h1 style={{ color: "#333", fontSize: "24px" }}>
        This is Test Component Two
      </h1>
    </div>
  );
}

const userStories = [
  {
    type: "component",
    component: TestComponent,
    duration: 2000,
  },
  {
    type: "component",
    component: TestComponent2,
    duration: 2000,
  },
];

const users = [
  { id: 1, name: "suhaib", stories: userStories },
  { id: 2, name: "wajahat", stories: userStories },
  { id: 3, name: "imran", stories: userStories },
  { id: 4, name: "iqram", stories: userStories },
];

const StoryModal = ({ closeModal, user }: any) => {
  return (
    <Box
      width={"100%"}
      height={"100%"}
      style={{ zIndex: 99, position: "absolute", top: 0, left: 0 }}
      backgroundColor={"blue"}
    >
      <Box width={"100%"} height={"100%"} position="relative">
        <Button
          position="absolute"
          top={2}
          right={2}
          onClick={closeModal}
          border={"none"}
          p={"5px"}
        >
          X
        </Button>
        <Stories
          width="396px"
          height="100%"
          stories={user.stories}
          style={{ backgroundColor: "#000" }}
        />
      </Box>
    </Box>
  );
};

export default function StoriesTest() {
  const [storyModal, setStoryModal] = useState(false);
  const [modalContent, setModalContent] = useState(undefined);

  const openModal = (user: any) => {
    setModalContent(user);
    setStoryModal(true);
  };

  const closeModal = () => {
    setModalContent(undefined);
    setStoryModal(false);
  };

  return (
    <Box
      width="100vw"
      height={"100vh"}
      backgroundColor={"red"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      {/* <Box
        width={"396px"}
        height={"90%"}
        backgroundColor={"white"}
        style={{ position: "relative" }}
      >
        {storyModal ? (
          <StoryModal user={modalContent} closeModal={closeModal} />
        ) : null}
        <Row
          py={"8px"}
          px={"20px"}
          backgroundColor={"yellow"}
          flexDirection="row"
          gap="15px"
        >
          {users.map((user, index) => (
            <Box
              key={index}
              alignItems="center"
              gap="5px"
              style={{ cursor: "pointer" }}
              onClick={() => openModal(user)}
            >
              <Box
                width="50px"
                height="50px"
                borderRadius={999}
                backgroundColor="blue"
                justifyContent={"center"}
                alignItems={"center"}
              >
                <Text color="red">{user.id}</Text>
              </Box>
              <Text color="red" fontSize={14}>
                {user.name}
              </Text>
            </Box>
          ))}
        </Row>
      </Box> */}
      <Box
        width={"396px"}
        height={"90%"}
        backgroundColor={"white"}
        style={{ position: "relative" }}
      >
        <Stories
          width="380px"
          height="100%"
          stories={userStories}
          style={{
            backgroundColor: "#000",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        />
      </Box>
    </Box>
  );
}
