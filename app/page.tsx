"use client";

import { Box, GlassBox, StyledInputBox, TextArea, Text } from "sentinal-ui";

export default function Home() {
  return (
    <Box
      width={"100vw"}
      height={"100vh"}
      background={"#c3c3c3"}
      gap={20}
      position={"relative"}
      justifyContent="center"
      alignItems="center"
    >
      <Text fontSize={32} color="#f9a602">
        Testing
      </Text>
      <GlassBox
        position={"absolute"}
        width={"100%"}
        height={"100%"}
        gap={20}
        borderRadius={"10px"}
        justifyContent="center"
        alignItems="center"
      >
        <Box
          width={"60%"}
          height={"60%"}
          bg={"#fff"}
          borderRadius={"10px"}
          p={"50px"}
          gap={"20px"}
        >
          <StyledInputBox
            background={"white"}
            height={"40px"}
            placeholderColor={"#000"}
            placeholder={"Label"}
            padding={"10px"}
            border={"none"}
            borderBottom={"1px solid grey"}
            color="#000"
          />
          <TextArea
            maxWidth={"100%"}
            backgroundColor={"white"}
            color={"black"}
            placeholder={"Text Area"}
            placeholderColor={"red"}
            p={"10px"}
            border={"1px solid grey"}
            borderRadius={"10px"}
          />
        </Box>
      </GlassBox>
    </Box>
  );
}
