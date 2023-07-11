import { useBoolean } from "@chakra-ui/react";
import dayjs from "dayjs";
import { useCallback, useMemo, useRef, useState } from "react";
import { backendURL } from "../../../config/fe";
import { useWindowSize } from "../../../hooks/useWindowSize";
import { UseAddPopup } from "../../../state/application/hooks";
import { UseLogout } from "../../../state/auth/hooks";
import { UseGetSession } from "../../../state/session/hooks";
import { PopupType } from "../../../types/PopUp";
import User from "../../../types/User";
import { getArrayItems } from "../../../utils/array";
import { truncateString } from "../../../utils/text";
import { data as tableData } from "./data";
import Details from "./Details";
import CustomTable from "./Table";

export interface Upload {
  id: string;
  uuid: string;
  description: string;
  images: string[];
  created_at: string;
  updated_at: string;
}

export interface Result {
  id: string;
  image: string;
  results: string;
  result_image: string;
  created_at: string;
  updated_at: string;
}

// export interface Result {
//   id: string;
//   image: string;
//   image_class: string;
//   results: string;
//   // result_image: string;
//   created_at: string;
//   updated_at: string;
// }

export interface ParsedResult {
  image_class: string;
  results: string;
  image: string;
  created_at: string;
  updated_at: string;
  image_upload: string;
}

export type ParsedResults = ParsedResult[];

export interface TableData {
  id: string;
  uuid: string;
  description: string;
  date: Date;
}

// export interface DetailsType
//   extends Pick<
//     Result,
//     "id" | "image" | "result_image" | "created_at" | "updated_at"
//   > {
//   results: ParsedResults;
// }

export type DetailsType = ParsedResult;

interface UploadResponse {
  message: string;
  count: number;
  next: unknown;
  previous: unknown;
  uploads: Upload[];
}

type ResutProps = {
  user: User;
  token: string;
};

const Results: React.FunctionComponent<ResutProps> = ({ token }) => {
  const [pageCount, setPageCount] = useState(0);
  const [analysisData, setAnalysisData] = useState([]);
  const [activeResult, setActiveResult] = useState<number>();
  const [loading, setLoading] = useBoolean(false);
  const fetchIdRef = useRef(0);
  const { width } = useWindowSize();
  const isTinyScreen = useCallback(() => width < 480, [width]);

  const addPopup = UseAddPopup();
  const logout = UseLogout();

  const columns = useMemo(
    () => [
      {
        Header: "ID",
        accessor: "uuid",
        Cell: ({ value }: { value: string }) => value.slice(0, 8),
      },
      {
        Header: "Description",
        accessor: "description",
        Cell: ({ value }: { value: string }) => truncateString(value, 45),
      },
      {
        Header: "Date",
        accessor: "date",
        Cell: ({ value }: { value: Date }) =>
          dayjs(value).format("ddd Do MMM YYYY"),
      },
    ],
    []
  );

  const fetchData = useCallback(async ({ pageSize, pageIndex }) => {
    const fetchId = ++fetchIdRef.current;
    setLoading.on();
    const startRow = pageSize * pageIndex;
    const endRow = startRow + pageSize;
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    if (fetchId === fetchIdRef.current) {
      const response = await fetch(`${backendURL}/uploads/`, {
        method: "GET",
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
      const json = (await response.json()) as UploadResponse;
      if (json.uploads) {
        const mappedData: TableData[] = json.uploads.map((upload: Upload) => ({
          id: upload.id,
          uuid: upload.uuid,
          description: upload.description,
          date: new Date(upload.created_at),
        }));
        setAnalysisData(getArrayItems(mappedData, startRow, endRow));
        setPageCount(Math.ceil(tableData.length / pageSize));
      }
      setLoading.off();
    }
  }, []);

  if (activeResult) {
    return <Details id={activeResult} setActiveResult={setActiveResult} />;
  }

  return (
    <CustomTable
      columns={columns}
      data={analysisData}
      fetchData={fetchData}
      pageCount={pageCount}
      loading={loading}
      setActiveResult={setActiveResult}
    />
  );
};

export default Results;
