import {
  Box,
  Grid,
  Image,
  Text,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import _ from "lodash";
import dynamic from "next/dynamic";
import {
  ChangeEvent,
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useReducer,
} from "react";
import { v4 as uuid4 } from "uuid";
import { backendURL, cloudName, uploadPreset } from "../../../config/fe";
import { HttpError } from "../../../error";
import { UseAddPopup } from "../../../state/application/hooks";
import { UseLogout } from "../../../state/auth/hooks";
import { UseGetSession } from "../../../state/session/hooks";
import { IActivePage } from "../../../types/manage";
import { PopupType } from "../../../types/PopUp";
import User from "../../../types/User";
import { toBase64, upload } from "../../../utils/cloudinary";
import CustomButton from "../../CustomButton";
import MyDropZone from "./MyDropZone";

const DynamicViewerWithNoSSR = dynamic(() => import("react-viewer"), {
  ssr: false,
});

interface State {
  files: File[];
  isLoading: boolean;
  description: string;
  id: string;
  base64: string[];
  activeImage: string;
  error: string;
}
type Value = Partial<State>;
type Key = keyof State;

interface Props {
  token: string;
  setActivePage: Dispatch<SetStateAction<IActivePage>>;
}

interface UploadResponse {
  message: string;
  error?: Record<string, unknown>;
}

const Analyze: FC<Props> = ({ setActivePage, token }) => {
  const addPopup = UseAddPopup();
  const logout = UseLogout();
  const { data: session } = UseGetSession();

  const initialState = {
    files: [],
    base64: [],
    isLoading: false,
    description: "",
    id: uuid4(),
    activeImage: "",
    error: "",
  };
  const reducer = (state: State, value: Value) => ({ ...state, ...value });
  const [state, dispatch] = useReducer(reducer, initialState);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const onChange = (key: Key) => (e: ChangeEvent<HTMLTextAreaElement>) => {
    dispatch({ [key]: e.target.value });
  };

  const setFiles = (files: File[]) =>
    dispatch({ files: _.uniqBy([...files, ...state.files], "name") });

  const onSubmit = async () => {
    dispatch({ isLoading: true });
    dispatch({ error: "" });
    try {
      if (!state.files.length) {
        throw new Error("Please upload at least one image");
      }
      if (!state.description) {
        throw new Error("Please enter a description");
      }
      const images = await upload(state.files, cloudName, uploadPreset);
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      const body = JSON.stringify({
        description: state.description,
        images,
        uuid: state.id,
      });
      const response = await fetch(`${backendURL}/uploads/`, {
        body,
        method: "POST",
        headers,
      });
      if (response.status === 401) {
        addPopup({
          content: {
            summary: "Please login again to continue",
            title: "Session expired",
            type: PopupType.error,
          },
        });
        return logout();
      }
      console.log({ response });
      if ([400, 500].includes(response.status)) {
        throw new HttpError(await response.text(), response.status);
      }
      (await response.json()) as UploadResponse;
      addPopup({
        content: {
          title: "Successfully uploaded images 🚀",
          summary: "Images successfully uploaded for analysis",
          type: PopupType.success,
        },
      });
      dispatch({ isLoading: false });
      setActivePage("results");
    } catch (error) {
      let message = (error as Error).message;
      if (message.includes(`description":["This field may not be blank.`)) {
        message = "Please enter a description";
      }
      if (message.includes(`"images":["empty values `)) {
        message = "Please upload at least one image";
      }
      addPopup({
        content: {
          title: "Validation Error 😢",
          summary: message,
          type: PopupType.error,
        },
      });
    } finally {
      dispatch({ isLoading: false });
    }
  };

  useEffect(() => {
    const convertToBase64 = async () => {
      const base64 = await Promise.all(
        state.files.map((file) => toBase64(file))
      );
      dispatch({ base64 });
    };
    convertToBase64();
  }, [state.files]);

  const onClickImage = (src: string) => {
    dispatch({ activeImage: src });
    onOpen();
  };

  return (
    <Box fontSize={{ lg: "1.5rem" }} px={{ xl: "2.5rem" }}>
      {state.error && (
        <Text color="red.500" fontSize="sm" maxW="460px">
          {state.error}
        </Text>
      )}
      <Grid my="1rem" templateColumns={{ base: "1fr 4fr" }}>
        <Text fontWeight="bold">ID:</Text>
        <Text>{state.id}</Text>
      </Grid>

      <Grid
        my="1rem"
        templateColumns={{ sm: "1fr 4fr", md: "1fr 4fr", lg: "1fr 4fr" }}
      >
        <Text fontWeight="bold">Description:</Text>
        <Textarea
          onChange={onChange("description")}
          placeholder="Enter any information you want to add about the eye images"
        />
      </Grid>

      <Grid
        my="1rem"
        templateColumns={{ sm: "1fr 4fr", md: "1fr 4fr", lg: "1fr 4fr" }}
      >
        <Text fontWeight="bold">Eye Images:</Text>
        <MyDropZone setFiles={setFiles} />
      </Grid>

      {state.base64.length > 0 && (
        <Grid
          my="1rem"
          templateColumns={{ sm: "1fr 4fr", md: "1fr 4fr", lg: "1fr 4fr" }}
        >
          <Text fontWeight="bold">Preview(s):</Text>
          <Grid
            templateColumns="repeat(auto-fit, minmax(250px, 1fr))"
            gap="8px"
          >
            {state.base64.map((file) => (
              <Image
                cursor="pointer"
                key={file}
                src={file}
                w="250px"
                h="300px"
                _hover={{
                  opacity: 0.5,
                }}
                onClick={() => onClickImage(file)}
              />
            ))}
          </Grid>
        </Grid>
      )}

      <Grid my="2rem" templateColumns={{ md: "1fr 4fr", lg: "1fr 4fr" }}>
        <Text />
        <CustomButton
          onClick={onSubmit}
          label="SUBMIT"
          props={{ w: { lg: "20rem" } }}
          isLoading={state.isLoading}
        />
      </Grid>

      <DynamicViewerWithNoSSR
        visible={isOpen}
        onClose={onClose}
        images={state.base64.map((file) => ({ src: file, alt: "" }))}
      />
    </Box>
  );
};

export default Analyze;
