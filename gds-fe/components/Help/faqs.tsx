import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Text,
} from "@chakra-ui/react";
import { data } from "./data";

const FAQs = () => {
  return (
    <Box>
      <Text fontSize={{ md: "1.5rem", lg: "2rem" }}>FAQs</Text>
      <Accordion defaultIndex={[0]} allowMultiple>
        {data.map(({ title, content }) => (
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box flex="1" textAlign="left" fontSize={{ lg: "1.3rem" }}>
                  {title}
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>{content}</AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </Box>
  );
};

export default FAQs;
