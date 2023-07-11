import {
  Flex,
  Input,
  InputGroup,
  InputRightAddon,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { useAsyncDebounce } from "react-table";
import { FaSearch } from "react-icons/fa";

export function GlobalFilter({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
}: {
  preGlobalFilteredRows: any[];
  globalFilter: string;
  setGlobalFilter: (value: string) => void;
}) {
  const count = preGlobalFilteredRows.length;
  const [value, setValue] = useState(globalFilter);
  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 200);

  return (
    <Flex alignItems="center" mt={{ base: "1rem", lg: 0 }}>
      <Text fontSize={{ lg: "1.3rem" }} mr="1rem">
        Search:{" "}
      </Text>
      <InputGroup maxW="20rem">
        <Input
          value={value || ""}
          onChange={(e) => {
            setValue(e.target.value);
            onChange(e.target.value);
          }}
          placeholder={`${count} records...`}
          fontSize="1.1rem"
        />
        <InputRightAddon bg="brand.raisinBlack.1" cursor="pointer">
          <FaSearch size={20} />
        </InputRightAddon>
      </InputGroup>
    </Flex>
  );
}
