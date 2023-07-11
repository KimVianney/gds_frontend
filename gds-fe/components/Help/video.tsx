import { AspectRatio, Box, Text } from "@chakra-ui/react";

const Video = () => {
  return (
    <Box>
      <Text fontSize={{ md: "1.5rem", lg: "2rem" }}>Watch the intro video</Text>
      <AspectRatio ratio={16 / 9}>
        <iframe
          width="100%"
          height="100%"
          src="https://www.youtube.com/embed/5Cc4ofTgf10"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen;"
          // style={{
          //   position: "fixed",
          //   top: 0,
          //   left: 0,
          //   bottom: 0,
          //   right: 0,
          //   width: "100%",
          //   height: "100%",
          //   border: "none",
          //   margin: 0,
          //   padding: 0,
          //   overflow: "hidden",
          //   zIndex: 99999,
          // }}
        ></iframe>
      </AspectRatio>
    </Box>
  );
};

export default Video;
