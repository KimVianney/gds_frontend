import { Stack, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import { UseActivePopups, UseRemovePopup } from "../../state/application/hooks";
import { PopupContent } from "../../types/PopUp";

const mkToastContent =
  ({ title, summary }: PopupContent) =>
  () =>
    (
      <Stack>
        <Text fontSize="md">{title}</Text>
        <Text fontSize="sm">{summary}</Text>
      </Stack>
    );

export default function Popups(): JSX.Element {
  const popups = UseActivePopups();
  const removePopup = UseRemovePopup();

  useEffect(() => {
    popups.forEach((popup) => {
      toast(mkToastContent(popup.content), {
        type: popup.content.type,
        onClose: () => removePopup(popup.key),
      });
    });
  }, [popups, removePopup]);

  return (
    <ToastContainer
      position="top-right"
      autoClose={3500}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      draggable
      pauseOnHover
    />
  );
}
