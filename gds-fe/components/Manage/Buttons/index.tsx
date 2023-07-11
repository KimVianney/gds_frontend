import { Box, Grid } from "@chakra-ui/react";
import { BiAnalyse } from "react-icons/bi";
import { DiGoogleAnalytics } from "react-icons/di";
import { FaEye } from "react-icons/fa";
import { MdAccountCircle } from "react-icons/md";
import { IActivePage } from "../../../types/manage";
import CustomButton from "../Button";

interface ButtonsProps {
  activePage: IActivePage;
  setActivePage: (page: IActivePage) => void;
}

export default function Buttons({ activePage, setActivePage }: ButtonsProps) {
  return (
    <Box borderTopWidth="3px" borderColor="brand.charcoal" width="100%">
      <Grid
        alignItems="stretch"
        display={["flex", "grid"]}
        templateColumns={{ sm: "repeat(3, 1fr)", xl: "1fr" }}
      >
        <CustomButton
          label="Analyze"
          active={activePage === "analyze"}
          icon={<BiAnalyse size={20} />}
          onClick={() => setActivePage("analyze")}
        />
        <CustomButton
          label="My Results"
          active={activePage === "results"}
          icon={<DiGoogleAnalytics size={20} />}
          onClick={() => setActivePage("results")}
        />
        <CustomButton
          label="EyeTips"
          active={activePage === "tips"}
          icon={<FaEye size={20} />}
          onClick={() => setActivePage("tips")}
        />
        <CustomButton
          label="Account"
          active={activePage === "account"}
          icon={<MdAccountCircle size={20} />}
          onClick={() => setActivePage("account")}
        />
      </Grid>
    </Box>
  );
}
