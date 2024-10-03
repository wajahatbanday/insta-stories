"use client";

import { Box, Text } from "sentinal-ui";
import Stories from "react-insta-stories";
import { useEffect } from "react";

// const stories = [
//   "https://images.unsplash.com/photo-1503803548695-c2a7b4a5b875?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//   {
//     content: (props) => (
//       <div style={{ background: "pink", padding: 20 }}>
//         <h1 style={{ marginTop: "100%", marginBottom: 0 }}>🌝</h1>
//         <h1 style={{ marginTop: 5 }}>A custom title can go here.</h1>
//       </div>
//     ),
//   },
// ];

const TestComponent = ({ action, isPaused }: any) => {
  return (
    <Box style={{ background: "pink", padding: 20 }}>
      <Text style={{ marginTop: "100%", marginBottom: 0 }}>🌝</Text>
      <Text color={"white"}>{isPaused ? "Paused" : "Playing"}</Text>
    </Box>
  );
};

const stories = [
  "https://images.unsplash.com/photo-1503803548695-c2a7b4a5b875?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  {
    url: "https://picsum.photos/500/500",
    duration: 5000,
    seeMore: ({ close }) => {
      return <div onClick={close}>Hello, click to close this.</div>;
    },
    header: {
      heading: "Mohit Karekar",
      subheading: "Posted 30m ago",
      profileImage: "https://picsum.photos/100/100",
    },
  },
  { content: TestComponent },
  //   {
  //     content: ({ action, isPaused }) => {
  //       useEffect(() => {
  //         setTimeout(() => {
  //           action("pause");
  //           setTimeout(() => {
  //             action("play");
  //           }, 2000);
  //         }, 2000);
  //       }, []);
  //       return (
  //         <Box style={{ background: "pink", padding: 20 }}>
  //           <Text style={{ marginTop: "100%", marginBottom: 0 }}>🌝</Text>
  //           <Text color={"white"}>{isPaused ? "Paused" : "Playing"}</Text>
  //         </Box>
  //       );
  //     },
  //   },
];
export default function StoriesV3() {
  return (
    <Box color="white">
      <Stories stories={stories} />
    </Box>
  );
}
