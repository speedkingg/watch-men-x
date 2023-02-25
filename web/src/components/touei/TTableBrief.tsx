import {
  Badge,
  Box,
  Flex,
  Heading,
  Progress,
  Stat,
  StatArrow,
  StatHelpText,
  Table,
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
import { HouseDetail } from "../../types/house";
import { UModal } from "../utils/UModal";
import { TCard } from "./TCard";
import { TCardItemAccess } from "./TCardItemAccess";
import { TCardItemAreaBadge } from "./TCardItemAreaBadge";
import { TCardItemCardInfo } from "./TCardItemCardInfo";
import { TCardItemCityBadge } from "./TCardItemCityBadge";
import { TCardItemDate } from "./TCardItemDate";
import { TCardItemInfra } from "./TCardItemInfra";
import { TCardItemPlan } from "./TCardItemPlan";
import { TCardItemWay } from "./TCardItemWay";

export function TTableBrief({
  houses,
}: {
  houses: HouseDetail[];
}): JSX.Element {
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
  const hasMore = displayNum < houses.length;
  const loadMore = () =>
    setDisplayNum((current: number) => current + infinitDisplayUnit);
  const loader = <Progress colorScheme="teal" isIndeterminate key="loader" />;

  return (
    <>
      <Flex w="100vw">
        <InfiniteScroll loadMore={loadMore} hasMore={hasMore} loader={loader}>
          <Table variant="simple" w="100vw">
            <Thead>
              <Tr>
                <Th>価格</Th>
                <Th>アクセス</Th>
                <Th>概要</Th>
                <Th>区域</Th>
                <Th>接道</Th>
                <Th>インフラ</Th>
                <Th>作成日・更新日</Th>
              </Tr>
            </Thead>
            <Tbody>
              {houses
                .slice(0, displayNum)
                .map((h: HouseDetail, index: number) => (
                  <Tr
                    key={index}
                    _hover={{
                      background: "whiteAlpha.300",
                    }}
                    style={{ cursor: "pointer" }}
                    onClick={() => onRowClick(h.土地ID, h.物件ID)}
                  >
                    <Td>
                      <Flex direction="column" align="end">
                        <Flex>
                          <Heading size="2xl">
                            {h.現在販売最高価格.toLocaleString()}
                          </Heading>
                          <Box mt="auto">万円</Box>
                        </Flex>
                        {h.割引額 !== undefined && h.割引額 > 0 && (
                          <Stat mr={4}>
                            <StatHelpText>
                              <StatArrow type="decrease" />
                              {h.割引額}
                            </StatHelpText>
                          </Stat>
                        )}
                      </Flex>
                    </Td>

                    <Td>
                      <TCardItemAccess access={h.アクセス} />
                    </Td>

                    <Td>
                      <Flex gap={2}>
                        <TCardItemCardInfo
                          title="土地"
                          value={`${h.土地面積}`}
                          sufix="㎡"
                        />
                        <TCardItemCardInfo
                          title="建物"
                          value={`${h.建物面積}`}
                          sufix="㎡"
                        />
                        <TCardItemPlan plan={h.間取り} />
                      </Flex>
                    </Td>

                    <Td>
                      <Flex direction="column" gap={2}>
                        <Badge variant="subtiltle" color="gray">
                          {h.物件ID}
                        </Badge>
                        <TCardItemCityBadge city={h.都市計画} />
                        <TCardItemAreaBadge area={h.用途地域} />
                      </Flex>
                    </Td>

                    <Td>
                      <TCardItemWay way={h.接道} />
                    </Td>

                    <Td>
                      <TCardItemInfra infra={h.設備} />
                    </Td>

                    <Td>
                      <Flex gap={2}>
                        <TCardItemDate date={h.作成日時} />
                        <TCardItemDate date={h.更新日時} />
                      </Flex>
                    </Td>
                  </Tr>
                ))}
            </Tbody>
          </Table>
        </InfiniteScroll>
      </Flex>

      <UModal {...modalProps}>
        <TCard values={targetHouse} />
      </UModal>
    </>
  );
}
