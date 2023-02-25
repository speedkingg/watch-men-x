import {
  Box,
  Flex,
  Highlight,
  Progress,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";
import InfiniteScroll from "react-infinite-scroller";
import { infinitDisplayUnit } from "../../config/count";
import { convertForTable } from "../../logic/houses";
import { HouseDetail, HouseDetailTable } from "../../types/house";
import { UModal } from "../utils/UModal";
import { TCard } from "./TCard";

export function TTable({ houses }: { houses: HouseDetail[] }): JSX.Element {
  const { header, convertedData } = convertForTable(houses);
  const [targetHouse, setTargetHouse] = useState<HouseDetail>(
    {} as HouseDetail
  );
  const modalProps = useDisclosure();

  const onRowClick = (土地ID: string, 物件ID: string | undefined) => {
    const filter =
      物件ID === undefined
        ? (v: HouseDetail) => v.土地ID === 土地ID
        : (v: HouseDetail) => v.土地ID === 土地ID && v.物件ID === 物件ID;
    const target = houses.filter(filter);
    if (target.length === 0) return;
    setTargetHouse(target[0]);
    modalProps.onOpen();
  };

  const [displayNum, setDisplayNum] = useState<number>(infinitDisplayUnit);
  const hasMore = displayNum < convertedData.length;
  const loadMore = () =>
    setDisplayNum((current: number) => current + infinitDisplayUnit);
  const loader = <Progress colorScheme="teal" isIndeterminate key="loader" />;

  return (
    <>
      <TableContainer>
        <InfiniteScroll loadMore={loadMore} hasMore={hasMore} loader={loader}>
          <Table variant="simple">
            <Thead>
              <Tr>
                {header.map((header: string, index: number) => (
                  <Th key={index}>{header}</Th>
                ))}
              </Tr>
            </Thead>

            <Tbody>
              {convertedData
                .slice(0, displayNum)
                .map((values: HouseDetailTable, index: number) => (
                  <Tr
                    key={index}
                    _hover={{
                      background: "whiteAlpha.300",
                    }}
                    style={{ cursor: "pointer" }}
                    onClick={() => onRowClick(values.土地ID, values.物件ID)}
                  >
                    {Object.entries(values).map(
                      ([key, value]: [key: string, value: string | number]) => {
                        // eslint-disable-next-line array-callback-return
                        if (key === "土地ID" || key === "物件ID") return;
                        return <Ttd k={key} value={value} key={key} />;
                      }
                    )}
                  </Tr>
                ))}
            </Tbody>
          </Table>
        </InfiniteScroll>
      </TableContainer>

      <UModal {...modalProps}>
        <TCard values={targetHouse} />
      </UModal>
    </>
  );
}

const Ttd = ({ k, value }: { k: string; value: string | number }) => {
  if (k === "アクセス" && typeof value === "string") {
    return <AccessTd value={value} />;
  } else if (
    (k === "所在地" || k === "設備" || k === "接道") &&
    typeof value === "string"
  ) {
    return <SpritTd value={value} splitValue={"、"} />;
  } else if (k === "間取り" && typeof value === "string") {
    return <SpritTd value={value} splitValue={"+"} />;
  } else if (k === "用途地域" && typeof value === "string") {
    return <SpritTd value={value} splitValue={"・"} />;
  } else {
    return <Td>{value}</Td>;
  }
};

const AccessTd = ({ value }: { value: string }) => (
  <Td>
    <Flex direction="column">
      {value
        .replaceAll(/([0-9]+分)(?!$)/g, "$1\\")
        .split(/\\|,/)
        .map((access: string, i: number) => (
          <Box key={i}>
            <Highlight
              query={"駅まで徒歩"}
              styles={{
                color: "teal.200",
              }}
            >
              {access}
            </Highlight>
          </Box>
        ))}
    </Flex>
  </Td>
);

const SpritTd = ({
  value,
  splitValue,
}: {
  value: string;
  splitValue: string;
}) => (
  <Td>
    <Flex direction="column">
      {value.split(splitValue).map((access: string, i: number) => (
        <Box key={i}>{access}</Box>
      ))}
    </Flex>
  </Td>
);
