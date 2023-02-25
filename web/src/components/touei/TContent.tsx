import { Badge, Box, Center, Flex, Heading, Spacer } from "@chakra-ui/react";
import { SetterOrUpdater, useRecoilState } from "recoil";
import { headerHeight, houseHeaderHeight } from "../../config/view";
import { toueiMenuState } from "../../recoil/atom";
import { HouseDetail } from "../../types/house";
import { TCardList } from "./TCardList";
import { TContentMenu } from "./TContentMenu";
import { TFilter } from "./TFilter";
import { TMap } from "./TMap";
import { TSort } from "./TSort";
import { TTableBrief } from "./TTableBrief";

export function TContent({
  title,
  houses,
  setter,
  originalHouses,
}: {
  title: string;
  houses: HouseDetail[];
  setter: SetterOrUpdater<HouseDetail[]>;
  originalHouses: HouseDetail[];
}): JSX.Element {
  const [selected, setSlected] = useRecoilState(toueiMenuState);

  return (
    <Flex direction="column">
      <Flex
        p={8}
        position="fixed"
        top={headerHeight}
        w="100%"
        h={houseHeaderHeight}
        bg="gray.800"
        zIndex={1}
      >
        <Flex>
          <Heading size="lg">{title}</Heading>

          <Badge variant="subtle" colorScheme="teal" mb="auto" mt={2} ml={4}>
            {`${houses.length} / ${originalHouses.length}`}
          </Badge>
        </Flex>
        <Spacer />
        <TContentMenu selected={selected} setSlected={setSlected} />
        <Spacer />

        <TSort houses={houses} setter={setter} title={title} />
        <Box ml={4}>
          <TFilter setter={setter} originalHouses={originalHouses} />
        </Box>
      </Flex>
      <Box w="100%" h={houseHeaderHeight} />

      <Center>
        {selected === "table" && <TTableBrief houses={houses} />}
        {selected === "card" && <TCardList valuesList={houses} />}
        {selected === "map" && <TMap houses={houses} />}
      </Center>
    </Flex>
  );
}
