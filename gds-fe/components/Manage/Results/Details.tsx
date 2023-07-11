import {
  Box,
  Button,
  Center,
  Divider,
  Flex,
  Grid,
  HStack,
  Image,
  Spinner,
  Text,
  useBoolean,
  useDisclosure,
} from "@chakra-ui/react";
import axios from "axios";
import dayjs from "dayjs";
import dynamic from "next/dynamic";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { AiFillFilePdf } from "react-icons/ai";
import { BiArrowBack } from "react-icons/bi";
import { DetailsType, ParsedResults, Result, Upload } from ".";
import { backendURL } from "../../../config/fe";
import { UseAddPopup } from "../../../state/application/hooks";
import { UseLogout } from "../../../state/auth/hooks";
import { UseGetSession } from "../../../state/session/hooks";
import { PopupType } from "../../../types/PopUp";
import { scaleCloudinaryImage } from "../../../utils/cloudinary";
import { numberToPercentage } from "../../../utils/number";
import Section from "../Profile/Section";
import { html } from "./data";

interface Props {
  id: number;
  setActiveResult: Dispatch<SetStateAction<number>>;
}

interface Response {
  message?: string;
  xray_upload?: Upload;
  results: string;
  image: string;
  image_class: string;
  id: string;
  created_at: string;
  updated_at: string;
}

const DynamicViewerWithNoSSR = dynamic(() => import("react-viewer"), {
  ssr: false,
});

const Details = ({ id, setActiveResult }: Props) => {
  const [details, setDetails] = useState<Response[] | null>();
  const { data: session } = UseGetSession();
  const [activeImage, setActiveImage] = useState<string>();
  const addPopup = UseAddPopup();
  const logout = UseLogout();
  const [loading, setLoading] = useBoolean();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const onClickImage = (src: string) => {
    setActiveImage(src);
    onOpen();
  };

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    axios
      .get(`${backendURL}/uploads/${id}/results/`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.token}`,
        },
      })
      .then((res) => {
        const data = res.data as Response[];
        setDetails(data);
      })
      .catch((err) => console.log(err));
  }, [id]);

  useEffect(() => {
    console.log("Details=>: ", details);
  }, [id]);
  const leftProps = {
    fontWeight: "bold",
    color: "brand.maximumBlue",
  };

  // const generatePdfReport = async () => {
  //   setLoading.on();
  //   const result = await fetch("https://pdf-gen-v.herokuapp.com/doc", {
  //     body: JSON.stringify({ html: html(ref.current.outerHTML) }),
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     method: "POST",
  //   });
  //   const pdf = await result.blob();
  //   const file = new File([pdf], "report.pdf", {
  //     type: "application/pdf",
  //   });
  //   const url = URL.createObjectURL(file);
  //   const link = document.createElement("a");
  //   link.href = url;
  //   link.download = "report.pdf";
  //   link.click();
  //   setLoading.off();
  // };

  return (
    <Box p={{ lg: "2rem" }} ref={ref} id="container">
      <Flex
        cursor="pointer"
        align="center"
        color="brand.maximumBlue"
        mb={3}
        justify="space-between"
        id="flex-wrapper-1"
      >
        <HStack
          onClick={() => setActiveResult(null)}
          _hover={{ color: "brand.darkTurquoise" }}
          className="h-stack-1"
        >
          <BiArrowBack size={24} />
          <Text fontSize="xl">Go Back to Results</Text>
        </HStack>
      </Flex>
      <Section
        className="custom-section"
        left="ID"
        right={`${id}`}
        leftProps={leftProps}
      />
      {!details && (
        <Center minH="20rem" flexDir="column">
          <Text>Results still processing, please wait...</Text>
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        </Center>
      )}
      {details && (
        <Box>
          <Section
            className="custom-section"
            left="Created"
            right={dayjs(details[0]?.created_at).format("ddd Do MMM YYYY")}
            leftProps={leftProps}
          />
          <Text fontSize="2xl" className="custom-2xl">
            Image class detected
          </Text>
          {details && (
            <Box maxW="20rem" mb="1rem">
              <Section
                className="custom-section"
                left="Image Class"
                right={details[0].image_class}
                props={{ mb: "0.5rem" }}
                leftProps={leftProps}
              />
              <Divider />
            </Box>
          )}

          <Text fontSize="2xl" className="custom-2xl">
            Results Description
          </Text>
          <Section
            className="custom-section"
            left="Results Description"
            right={details[0].results}
            leftProps={leftProps}
          />

          <Grid
            templateColumns="repeat(auto-fit, minmax(250px, 1fr))"
            mb={4}
            gap={4}
          >
            <Box>
              <Text fontSize="2xl" className="custom-2xl">
                Analyzed Eye Image
              </Text>
              {details[0].image && (
                <Box className="image-container">
                  <Image
                    cursor="pointer"
                    key={details[0].image}
                    src={scaleCloudinaryImage(details[0].image, 250, 300)}
                    w="250px"
                    h="300px"
                    _hover={{
                      opacity: 0.5,
                    }}
                    onClick={() => onClickImage(details[0].image)}
                  />
                  <Box className="paper lined" />
                </Box>
              )}
            </Box>
            <Center>
              <Divider orientation="vertical" />
            </Center>
          </Grid>
          <Divider />
        </Box>
      )}
      <DynamicViewerWithNoSSR
        visible={isOpen}
        onClose={onClose}
        images={[activeImage].map((file) => ({ src: file, alt: "" }))}
      />
    </Box>
  );
};

export default Details;
