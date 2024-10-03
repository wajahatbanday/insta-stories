/* eslint-disable @next/next/no-img-element */
import React from "react";
import { Box, Row, Text } from "sentinal-ui";

export type PostProps = {
  user: string;
};

export const StoryComponent: React.FC<PostProps> = ({ user }) => (
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
