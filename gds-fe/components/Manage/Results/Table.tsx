// @ts-nocheck
import {
  Box,
  Table,
  TableCaption,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useCallback, useEffect, useMemo } from "react";
import {
  Cell,
  HeaderGroup,
  useGlobalFilter,
  usePagination,
  useTable,
} from "react-table";
import { useWindowSize } from "../../../hooks/useWindowSize";
import { fuzzyTextFilterFn } from "./fuzzyTextFilterFn";
import { GlobalFilter } from "./GlobalFilter";
import Pagination from "./Pagination";

const CustomTable = ({
  columns,
  data,
  fetchData,
  pageCount: controlledPageCount,
  loading,
  setActiveResult,
}: {
  columns: any[];
  data: any[];
  fetchData: ({
    pageSize,
    pageIndex,
  }: {
    pageSize: number;
    pageIndex: number;
  }) => void;
  loading: boolean;
  pageCount: number;
  setActiveResult: Dispatch<SetStateAction<number>>;
}) => {
  const filterTypes = useMemo(
    () => ({
      fuzzyText: fuzzyTextFilterFn,
    }),
    []
  );

  const tableInstance = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
      manualPagination: true,
      pageCount: controlledPageCount,
      filterTypes,
    },
    useGlobalFilter,
    usePagination
  );
  const { width } = useWindowSize();

  const {
    headerGroups,
    rows,
    prepareRow,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    preGlobalFilteredRows,
    setGlobalFilter,
    // Get the state from the instance
    state: { pageIndex, pageSize, globalFilter },
  } = tableInstance;

  useEffect(() => {
    fetchData({ pageSize, pageIndex });
  }, [fetchData, pageIndex, pageSize]);

  const isSmallScreen = width < 768;

  const getHeaders = useCallback(
    (headers: HeaderGroup<object>[]) =>
      isSmallScreen
        ? headers.filter((header) => header.id !== "date")
        : headers,
    [isSmallScreen]
  );

  const getCells = useCallback(
    (cells: Cell<object, any>[]) =>
      isSmallScreen ? cells.filter((cell) => cell.column.id !== "date") : cells,
    [isSmallScreen]
  );

  return (
    <Box p={{ lg: "2rem" }}>
      <GlobalFilter
        preGlobalFilteredRows={preGlobalFilteredRows}
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
      />
      <Table variant="striped" colorScheme="whiteAlpha">
        <TableCaption>ALL THE RESULTS YOU'VE ANALYZED SO FAR</TableCaption>
        <Thead>
          {headerGroups.map((headerGroup, idx) => {
            return (
              <Tr key={idx}>
                {getHeaders(headerGroup.headers).map((column) => (
                  <Th key={column.getHeaderProps().key}>
                    {column.render("Header")}
                  </Th>
                ))}
              </Tr>
            );
          })}
        </Thead>
        <Tbody>
          {rows.map((row, idx) => {
            prepareRow(row);
            return (
              <Tr
                key={row.getRowProps().key}
                cursor="pointer"
                _hover={{
                  bg: idx % 2 === 0 ? "brand.davysGrey" : "brand.raisinBlack.2",
                }}
                onClick={() => setActiveResult(row.original.id)}
              >
                {getCells(row.cells).map((cell) => (
                  <Td key={cell.getCellProps().key}>{cell.render("Cell")}</Td>
                ))}
              </Tr>
            );
          })}
        </Tbody>
      </Table>
      <Pagination
        canPreviousPage={canPreviousPage}
        canNextPage={canNextPage}
        gotoPage={gotoPage}
        previousPage={previousPage}
        nextPage={nextPage}
        pageCount={pageCount}
        pageIndex={pageIndex}
        pageOptions={pageOptions}
        pageSize={pageSize}
        setPageSize={setPageSize}
      />
    </Box>
  );
};

export default CustomTable;
