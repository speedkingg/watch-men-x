import { Box, Flex, useDisclosure } from "@chakra-ui/react";
import { useState } from "react";
import { useMarkerList } from "../../hooks/useMarkerList";
import { HouseDetail } from "../../types/house";
import { MapMode } from "../../types/map";
import GMap from "../utils/GMap";
import { UModal } from "../utils/UModal";
import { TCard } from "./TCard";
import { TMapMenu } from "./TMapMenu";

export function TMap({ houses }: { houses: HouseDetail[] }): JSX.Element {
  const [mode, setMode] = useState<MapMode>("pine");
  const modalProps = useDisclosure();
  const { targetHouseList, onMarkerClick, center, markerList } = useMarkerList(
    houses,
    mode,
    modalProps.onOpen
  );

  return (
    <Flex w="97%">
      <Box mr={4} w={150}>
        <TMapMenu mode={mode} setMode={setMode} />
      </Box>
      <Box h="85vh" w="100%" mt={1}>
        <GMap
          locations={markerList}
          center={center}
          zoom={10}
          onMarckerClick={onMarkerClick}
        />
      </Box>
      <UModal {...modalProps}>
        <Flex direction="column" gap={4}>
          {targetHouseList.map((house: HouseDetail, index: number) => (
            <TCard values={house} key={index} />
          ))}
        </Flex>
      </UModal>
    </Flex>
  );
}
