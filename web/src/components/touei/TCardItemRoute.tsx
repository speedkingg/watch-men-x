import { ExternalLinkIcon } from "@chakra-ui/icons";
import { Button, Flex, Input } from "@chakra-ui/react";
import { memo, useState } from "react";
import { DOMAIN_GMAP_DIR } from "../../config/url";

export const TCardItemRoute = memo(
  ({ lat, lng }: { lat: string; lng: string }) => {
    const [destination, setDestination] = useState<string>("品川駅");
    return (
      <Flex>
        <Input
          value={destination}
          onChange={(e: { target: { value: string } }) =>
            setDestination(e.target.value)
          }
          w={100}
          borderRightRadius={0}
        />

        <Button
          onClick={() =>
            window.open(
              `${DOMAIN_GMAP_DIR}?api=1&origin=${lat},${lng}&destination=${destination}&travelmode=transit`
            )
          }
          rightIcon={<ExternalLinkIcon />}
          borderLeftRadius={0}
        >
          経路を検索
        </Button>
      </Flex>
    );
  }
);
