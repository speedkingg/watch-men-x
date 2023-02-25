import { Badge, Flex, Text } from "@chakra-ui/react";
import { faCity, faMountain } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { memo } from "react";

export const TCardItemCityBadge = memo(
  ({ city }: { city: string }): JSX.Element => {
    return (
      <Badge
        variant="subtle"
        colorScheme={city === "市街化区域" ? "green" : "pink"}
        mt="auto"
      >
        <Flex align="center">
          <FontAwesomeIcon icon={city === "市街化区域" ? faCity : faMountain} />
          <Text fontSize="lg" ml={2}>
            {city.replace(/(\(.+)/, "")}
          </Text>
        </Flex>
      </Badge>
    );
  }
);
