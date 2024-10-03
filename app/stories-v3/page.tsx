"use client";
import { Box, Row, Text } from "sentinal-ui";
import Stories from "react-insta-stories";
import { useEffect, useState } from "react";
import { StoryComponent } from "../stories-v2/posts";
import { backgroundColor } from "styled-system";

const users = [
  {
    id: 1,
    name: "Suhaib",
    profileImage: "https://randomuser.me/api/portraits/men/1.jpg",
    stories: [
      {
        content: () => <StoryComponent user="Suhaib" />,
      },
      {
        content: () => <StoryComponent user="Suhaib" />,
      },
      {
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
        content: () => <StoryComponent user="Wajahat" />,
      },
      {
        content: () => <StoryComponent user="Wajahat" />,
      },
      {
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
        content: () => <StoryComponent user="Iqram" />,
      },
      {
        content: () => <StoryComponent user="Iqram" />,
      },
      {
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
        content: () => <StoryComponent user="Imran" />,
      },
      {
        content: () => <StoryComponent user="Imran" />,
      },
      {
        content: () => <StoryComponent user="Imran" />,
      },
    ],
  },
];

export default function StoriesV3() {
  const [storyModal, setStoryModal] = useState<boolean>(false);
  const [storyContent, setStoryContent] = useState<(typeof users)[0] | null>(
    null
  );
  const [currentStoryIndex, setCurrentStoryIndex] = useState<
    number | undefined
  >(undefined);

  const handleOpenStory = (
    user: (typeof users)[0],
    storyIndex: number | undefined
  ) => {
    setStoryContent(user);
    setCurrentStoryIndex(storyIndex);
    setStoryModal(true);
  };

  const handleCloseStory = () => {
    setStoryContent(null);
    setCurrentStoryIndex(undefined);
    setStoryModal(false);
  };

  // const showNextUserStory = () => {
  //   if (
  //     currentStoryIndex !== undefined &&
  //     currentStoryIndex < users.length - 1
  //   ) {
  //     const nextIndex = currentStoryIndex + 1;
  //     setStoryContent(users[nextIndex]);
  //     setCurrentStoryIndex(nextIndex);
  //   } else {
  //     handleCloseStory();
  //   }
  // };

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
              key={index}
              alignItems={"center"}
              style={{ cursor: "pointer" }}
              onClick={() => handleOpenStory(user, index)}
            >
              <Box
                width={"64px"}
                height={"64px"}
                border={"2px solid red"}
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
        {storyModal ? (
          <Box
            width={"100%"}
            height={"100%"}
            justifyContent={"center"}
            alignItems={"center"}
            style={{ zIndex: 1 }}
          >
            {storyContent ? (
              <Stories
                stories={storyContent.stories}
                width={"100%"}
                height={"100%"}
                loader={storyContent ? undefined : <Loading />}
                onAllStoriesEnd={handleCloseStory}
                storyContainerStyles={{
                  backgroundColor: "rgba(0,0,0,0.9)",
                }}
                defaultInterval={2000}
              />
            ) : (
              <Loading />
            )}
          </Box>
        ) : null}
      </Box>
    </Box>
  );
}

const Loading = () => {
  return (
    <Box
      width={"100%"}
      height={"100%"}
      justifyContent={"center"}
      alignItems={"center"}
      backgroundColor={"rgba(0,0,0,0.9)"}
    >
      <Text fontSize={22} color={"white"}>
        Loading...
      </Text>
    </Box>
  );
};

// "use client";
// import { Box, Row, Text } from "sentinal-ui";
// import Stories from "react-insta-stories";
// import { useState } from "react";
// import { StoryComponent } from "../stories-v2/posts";

// const users = [
//   {
//     id: 1,
//     name: "Suhaib",
//     profileImage: "https://randomuser.me/api/portraits/men/1.jpg",
//     stories: [
//       {
//         content: () => <StoryComponent user="Suhaib" />,
//       },
//       {
//         content: () => <StoryComponent user="Suhaib" />,
//       },
//       {
//         content: () => <StoryComponent user="Suhaib" />,
//       },
//     ],
//   },
//   {
//     id: 2,
//     name: "Wajahat",
//     profileImage: "https://randomuser.me/api/portraits/men/2.jpg",
//     stories: [
//       {
//         content: () => <StoryComponent user="Wajahat" />,
//       },
//       {
//         content: () => <StoryComponent user="Wajahat" />,
//       },
//       {
//         content: () => <StoryComponent user="Wajahat" />,
//       },
//     ],
//   },
//   {
//     id: 3,
//     name: "Iqram",
//     profileImage: "https://randomuser.me/api/portraits/men/3.jpg",
//     stories: [
//       {
//         content: () => <StoryComponent user="Iqram" />,
//       },
//       {
//         content: () => <StoryComponent user="Iqram" />,
//       },
//       {
//         content: () => <StoryComponent user="Iqram" />,
//       },
//     ],
//   },
//   {
//     id: 4,
//     name: "Imran",
//     profileImage: "https://randomuser.me/api/portraits/men/4.jpg",
//     stories: [
//       {
//         content: () => <StoryComponent user="Imran" />,
//       },
//       {
//         content: () => <StoryComponent user="Imran" />,
//       },
//       {
//         content: () => <StoryComponent user="Imran" />,
//       },
//     ],
//   },
// ];

// export default function StoriesV3() {
//   const [storyModal, setStoryModal] = useState<boolean>(false);
//   const [storyContent, setStoryContent] = useState<(typeof users)[0] | null>(
//     null
//   );
//   const [currentStoryIndex, setCurrentStoryIndex] = useState<
//     number | undefined
//   >(undefined);
//   const [storyStartIndex, setStoryStartIndex] = useState<number>(0); // Track which story to start with

//   const handleOpenStory = (
//     user: (typeof users)[0],
//     storyIndex: number | undefined
//   ) => {
//     setStoryContent(user);
//     setCurrentStoryIndex(storyIndex);
//     setStoryStartIndex(0); // Reset story start index to 0 when opening new user's stories
//     setStoryModal(true);
//   };

//   const handleCloseStory = () => {
//     setStoryContent(null);
//     setCurrentStoryIndex(undefined);
//     setStoryModal(false);
//   };

//   const showNextUserStory = () => {
//     if (
//       currentStoryIndex !== undefined &&
//       currentStoryIndex < users.length - 1
//     ) {
//       const nextIndex = currentStoryIndex + 1;
//       setStoryContent(null); // Force re-render
//       setTimeout(() => {
//         setStoryContent(users[nextIndex]);
//         setCurrentStoryIndex(nextIndex);
//         setStoryStartIndex(0); // Reset the story start index to 0 for the next user
//       }, 100); // Small delay to ensure component re-renders properly
//     } else {
//       handleCloseStory();
//     }
//   };

//   return (
//     <Box
//       width={"100%"}
//       height={"100%"}
//       display={"flex"}
//       justifyContent={"center"}
//       alignItems={"center"}
//     >
//       <Box
//         width={"393px"}
//         height={"852px"}
//         position={"relative"}
//         border={"1px solid blue"}
//       >
//         <Row
//           position={"absolute"}
//           top={0}
//           left={0}
//           width={"100%"}
//           py={"10px"}
//           px={"10px"}
//           flexDirection={"row"}
//           justifyContent={"start"}
//           alignItems={"center"}
//           gap={"20px"}
//         >
//           {users.map((user, index) => (
//             <Box
//               key={index}
//               alignItems={"center"}
//               style={{ cursor: "pointer" }}
//               onClick={() => handleOpenStory(user, index)}
//             >
//               <Box
//                 width={"64px"}
//                 height={"64px"}
//                 border={"2px solid red"}
//                 p={"2px"}
//                 borderRadius={"50%"}
//               >
//                 <Box
//                   width={"100%"}
//                   height={"100%"}
//                   borderRadius={"50%"}
//                   backgroundImage={`url("${user.profileImage}")`}
//                   backgroundPosition={"center"}
//                   backgroundSize={"contain"}
//                 />
//               </Box>
//               <Text fontSize={12} color={"white"}>
//                 {user.name}
//               </Text>
//             </Box>
//           ))}
//         </Row>
//         {storyModal && storyContent ? (
//           <Box
//             width={"100%"}
//             height={"100%"}
//             justifyContent={"center"}
//             alignItems={"center"}
//             style={{ zIndex: 1 }}
//           >
//             <Stories
//               key={storyContent.id} // Use a unique key to force re-render
//               stories={storyContent.stories}
//               width={"100%"}
//               height={"100%"}
//               loader={storyContent ? undefined : <Loading />}
//               currentIndex={storyStartIndex} // This ensures that the next user's story starts from index 0
//               onStoryEnd={(currentStoryIndex: number, storyIndex: number) => {
//                 // Optional logic for when each story ends
//               }}
//               onAllStoriesEnd={showNextUserStory}
//               storyContainerStyles={{
//                 backgroundColor: "rgba(0,0,0,0.9)",
//               }}
//               defaultInterval={2000}
//             />
//           </Box>
//         ) : null}
//       </Box>
//     </Box>
//   );
// }

// const Loading = () => {
//   return (
//     <Box
//       width={"100%"}
//       height={"100%"}
//       justifyContent={"center"}
//       alignItems={"center"}
//       backgroundColor={"rgba(0,0,0,0.9)"}
//     >
//       <Text fontSize={22} color={"white"}>
//         Loading...
//       </Text>
//     </Box>
//   );
// };
