import { Text } from "@chakra-ui/react";
import { emit } from "process";
import { ChangeEvent, LegacyRef, useRef, useState } from "react";
import { cloudName, uploadPreset } from "../../../../config/fe";
import { UseErrorMessages } from "../../../../hooks/UseErrorMessages";
import { updateUserDetails } from "../../../../requests/user";
import { UseUpdateUser } from "../../../../state/user/hooks";
import User from "../../../../types/User";
import { upload } from "../../../../utils/cloudinary";
import { clean } from "../../../../utils/object";
import CustomInput from "../../../auth/Forms/CustomInput";
import { gravatar } from "../../../auth/Forms/Login";
import MyDropZone from "../../Analyze/MyDropZone";
import Container from "./Container";
import _ from "lodash";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  user: User;
  token: string;
}

export default function Edit({ isOpen, onClose, user, token }: Props) {
  const formRef = useRef<HTMLFormElement>();
  const [userInfo, setUserInfo] = useState(user);
  const [files, setFiles] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const handleErrorMessages = UseErrorMessages();
  const updateUserData = UseUpdateUser();
  const updateUserInfo =
    (key: keyof User) => (event: ChangeEvent<HTMLInputElement>) => {
      setUserInfo({ ...userInfo, [key]: event.target.value });
    };

  const handleSubmit = async () => {
    try {
      if (!formRef.current?.checkValidity()) {
        return formRef.current?.reportValidity();
      }
      setIsLoading(true);
      let avatar: string;
      if (files.length > 0) {
        avatar = (await upload(files, cloudName, uploadPreset))[0];
      }
      const cleaned = _.omit(
        clean({
          ...userInfo,
          avatar: avatar || gravatar(userInfo.email),
        } as unknown as Record<string, unknown>),
        ["id", "email"]
      );
      const { user } = await updateUserDetails(userInfo.id, token, cleaned);
      updateUserData(user);
      onClose();
    } catch (error) {
      handleErrorMessages(error as Error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container
      isOpen={isOpen}
      onClose={onClose}
      isLoading={isLoading}
      handleSubmit={handleSubmit}
    >
      <form ref={formRef as LegacyRef<HTMLFormElement>}>
        <CustomInput
          label="First name"
          placeholder="Eg. John"
          type="text"
          value={userInfo.first_name}
          onChange={updateUserInfo("first_name")}
          invalidText="First name should be greater than 3 characters"
        />
        <CustomInput
          label="Last name"
          placeholder="Eg. Doe"
          type="text"
          value={userInfo.last_name}
          onChange={updateUserInfo("last_name")}
          invalidText="Last name should be greater than 3 characters"
        />
        <CustomInput
          label="Email address"
          placeholder="e.g name@user.com"
          type="email"
          value={userInfo.email}
          onChange={updateUserInfo("email")}
          invalidText="Enter valid email address"
        />
        <Text mb="0.5rem">Avatar</Text>
        <MyDropZone setFiles={setFiles} />
      </form>
    </Container>
  );
}
