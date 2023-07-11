import { Box, Input, Select, Flex, Center } from "@chakra-ui/react";
import CustomButton from "../../CustomButton";

interface Props {
  canPreviousPage: boolean;
  canNextPage: boolean;
  gotoPage: (page: number) => void;
  previousPage: () => void;
  nextPage: () => void;
  pageCount: number;
  pageIndex: number;
  pageOptions: { length: number };
  pageSize: number;
  setPageSize: (size: number) => void;
}

const Pagination = ({
  canNextPage,
  canPreviousPage,
  gotoPage,
  previousPage,
  nextPage,
  pageCount,
  pageOptions,
  pageIndex,
  pageSize,
  setPageSize,
}: Props) => {
  return (
    <Center flexDir={{ base: "column", md: "row" }}>
      <Flex>
        <CustomButton
          label="<<"
          onClick={() => gotoPage(0)}
          isDisabled={!canPreviousPage}
          props={{ mr: "1rem" }}
        />
        <CustomButton
          label="<"
          onClick={previousPage}
          isDisabled={!canPreviousPage}
          props={{ mr: "1rem" }}
        />
        <CustomButton
          label=">"
          onClick={nextPage}
          isDisabled={!canNextPage}
          props={{ mr: "1rem" }}
        />
        <CustomButton
          label=">>"
          onClick={() => gotoPage(pageCount - 1)}
          isDisabled={!canNextPage}
          props={{ mr: "1rem" }}
        />
      </Flex>
      <Box mr="1rem" my={{ base: "1rem", md: 0 }}>
        Page {pageIndex + 1} of {pageOptions.length}
      </Box>
      <Box>
        | Go to page:{" "}
        <Input
          type="number"
          defaultValue={pageIndex + 1}
          onChange={(e) => {
            const page = e.target.value ? Number(e.target.value) - 1 : 0;
            gotoPage(page);
          }}
          width={{ base: "50px", md: "60px" }}
          mr="1rem"
        />
      </Box>
      <Box my="1.5rem">
        <Select
          value={pageSize}
          onChange={(e) => setPageSize(Number(e.target.value))}
          bg="brand.raisinBlack.1"
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option
              key={pageSize}
              value={pageSize}
              style={{ background: "#33333E" }}
            >
              Show {pageSize}
            </option>
          ))}
        </Select>
      </Box>
    </Center>
  );
};

export default Pagination;
