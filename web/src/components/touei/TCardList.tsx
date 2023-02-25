import { Box, Flex } from "@chakra-ui/react";
import { cardDisplayUnit } from "../../config/count";
import { usePagenation } from "../../hooks/usePagenation";
import { HouseDetail } from "../../types/house";
import { ULoader } from "../utils/Uloader";
import UPagenation from "../utils/UPagenation";
import { TCard } from "./TCard";

export function TCardList({
  valuesList,
}: {
  valuesList: HouseDetail[];
}): JSX.Element {
  const { loadMore, loadLess, displayValueList, totalNum, startNum, endNum } =
    usePagenation(cardDisplayUnit, valuesList);

  return (
    <>
      {displayValueList.length ? (
        <Flex direction="column">
          <Flex direction="column">
            {displayValueList.map((values: HouseDetail, index: number) => (
              <TCard values={values} key={index} />
            ))}
          </Flex>
          <Box mx="auto" my={8}>
            <UPagenation
              loadMore={loadMore}
              loadMLess={loadLess}
              totalNum={totalNum}
              startNum={startNum}
              endNum={endNum}
              unitNum={cardDisplayUnit}
            />
          </Box>
        </Flex>
      ) : (
        <ULoader />
      )}
    </>
  );
}
