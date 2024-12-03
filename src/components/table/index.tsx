import Lottie from "react-lottie";

import EmptyLottie from "~/lottie/empty.json";

export interface Columns<T> {
  fieldId: keyof T | "index";
  fieldId2?: string;
  fieldId3?: string;
  label: string;
  render?: (data: T) => React.ReactElement | string;
  renderHeader?: () => React.ReactElement | string;
}

interface Props<T> {
  data?: any[];
  columns: Columns<T>[];
  ranked?: boolean;
  loading?: boolean | null;
  action?: boolean;
  currentPage?: number;
  limit?: number;
  onRowClick?: (item: T) => void;
}

function classNames(...classes: string[]): string {
  return classes.filter(Boolean).join(" ");
}

export function Table<T>({
  data = [],
  columns = [],
  ranked = false,
  loading = false,
  action = false,
  currentPage = 1,
  limit = 0,
  onRowClick,
}: Props<T>): React.ReactElement {
  const handleRowClick = (item: T): void => {
    if (onRowClick !== undefined) {
      onRowClick(item);
    }
  };
  return (
    <div className="max-w-full overflow-y-scroll">
      <table className="w-full border border-gray-600 rounded-lg !m-0">
        <thead className="bg-[#61A9FA]">
          <tr className="divide-x divide-[#BDBDBD]">
            {columns.map((column, index) => (
              <th
                key={index}
                scope="col"
                className="p-4 text-center whitespace-nowrap text-sm font-semibold text-san-juan-50"
              >
                <div className="flex">
                  {column.label}
                  {column?.renderHeader !== undefined && column?.renderHeader()}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white">
          {loading !== true &&
            data &&
            data?.map((data, index) => (
              <tr
                key={index}
                className={classNames(
                  ranked
                    ? index === 0
                      ? "bg-[#EDFCD3]"
                      : index === 1
                        ? "bg-[#DCE1FE]"
                        : index === 2
                          ? "bg-[#FFF7D2]"
                          : ""
                    : "",
                  "divide-x divide-[#BDBDBD]",
                  onRowClick ? "hover:bg-gray-200 cursor-pointer" : "",
                )}
                onClick={(): void => {
                  handleRowClick(data);
                }}
                role={action ? "button" : undefined}
              >
                {columns.map((column, row) => (
                  <td
                    key={row}
                    className={`p-4 text-center whitespace-nowrap text-sm leading-7 ${row === 7 || row === 8 ? "" : ""
                      }`}
                  >
                    {column.fieldId === "index" &&
                      index + 1 + (currentPage - 1) * limit}
                    {column?.render === undefined && data[column.fieldId]}
                    <p className="text-gray-500">
                      {column?.fieldId2 !== undefined && data[column.fieldId2]}
                    </p>
                    {column?.render !== undefined && column.render(data)}
                    <span>
                      {column?.fieldId3 !== undefined && data[column.fieldId3]}
                    </span>
                  </td>
                ))}
              </tr>
            ))}
          {loading !== true && data.length === 0 && (
            <tr className="divide-x divide-[#BDBDBD]">
              <td
                colSpan={columns.length}
                className="p-4 text-center whitespace-nowrap text-sm text-[#201B1C]"
              >
                <div className="flex flex-col items-center">
                  <Lottie
                    options={{
                      loop: true,
                      autoplay: true,
                      animationData: EmptyLottie,
                      rendererSettings: {
                        preserveAspectRatio: "xMidYMid slice",
                      },
                    }}
                    height={100}
                    width={100}
                  />
                  <span className="text-base text-[#7C7C7C] ">
                    No Data Found
                  </span>
                </div>
              </td>
            </tr>
          )}
          {loading === true && (
            <tr className="divide-x divide-[#BDBDBD]">
              <td
                colSpan={columns.length}
                className="p-4 text-center whitespace-nowrap text-sm text-[#201B1C]"
              >
                Loading...
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
