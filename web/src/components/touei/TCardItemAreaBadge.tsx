import { Badge, Flex, Text } from "@chakra-ui/react";
import { SizeProp } from "@fortawesome/fontawesome-svg-core";
import {
  faBuilding,
  faHouse,
  faIndustry,
  faStore,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { memo } from "react";

export const TCardItemAreaBadge = memo(
  ({ area }: { area: string }): JSX.Element => {
    let color = "";
    let icon = <></>;
    const iconSize: SizeProp = "sm";

    if (area.includes("工業")) {
      color = "pink";
      icon = <FontAwesomeIcon icon={faIndustry} size={iconSize} />;
    } else if (area.includes("商業")) {
      color = "blue";
      icon = <FontAwesomeIcon icon={faStore} size={iconSize} />;
    } else if (area.includes("住居")) {
      color = "green";
      icon = <FontAwesomeIcon icon={faHouse} size={iconSize} />;
    } else {
      color = "whiteAlpha.50";
      icon = <FontAwesomeIcon icon={faBuilding} size={iconSize} />;
    }

    return (
      <Badge variant="subtle" colorScheme={color}>
        <Flex align="center">
          {icon}
          <Flex direction="column">
            {area.split("・").map((s: string) => (
              <Text fontSize="lg" ml={2} key={s}>
                {s}
              </Text>
            ))}
          </Flex>
        </Flex>
      </Badge>
    );
  }
);
