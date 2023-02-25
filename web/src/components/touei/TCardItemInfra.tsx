import { Box, Flex, ResponsiveValue, Text } from "@chakra-ui/react";
import { SizeProp } from "@fortawesome/fontawesome-svg-core";
import {
  faBolt,
  faBurn,
  faQuestion,
  faTint,
  faToilet,
  faWater,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { memo } from "react";
import { TCardItemCard } from "./TCardItemCard";

export const TCardItemInfra = memo(
  ({ infra }: { infra: string }): JSX.Element => {
    return (
      <Flex gap={2}>
        {infra.split("、").map((s: string, i: number) => (
          <CardInfra text={s} key={i} />
        ))}
      </Flex>
    );
  }
);

const CardInfra = ({
  text,
  size = "xl",
}: {
  text: string;
  size?: ResponsiveValue<
    "xl" | (string & {}) | "sm" | "md" | "lg" | "2xl" | "3xl" | "4xl" | "xs"
  >;
}): JSX.Element => {
  let color = "";
  let icon = <></>;
  const iconSize: SizeProp = "lg";
  if (text.includes("水道")) {
    color = "teal.800";
    icon = <FontAwesomeIcon icon={faTint} size={iconSize} />;
  } else if (text.includes("電力")) {
    color = "teal.900";
    icon = <FontAwesomeIcon icon={faBolt} size={iconSize} />;
  } else if (text.includes("都市ガス")) {
    color = "green.900";
    icon = <FontAwesomeIcon icon={faBurn} size={iconSize} />;
  } else if (text.includes("プロパン")) {
    color = "pink.900";
    icon = <FontAwesomeIcon icon={faBurn} size={iconSize} />;
  } else if (text.includes("下水")) {
    color = "blue.900";
    icon = <FontAwesomeIcon icon={faWater} size={iconSize} />;
  } else if (text.includes("個別合併浄化槽")) {
    color = "pink.800";
    icon = <FontAwesomeIcon icon={faToilet} size={iconSize} />;
  } else {
    color = "whiteAlpha.50";
    icon = <FontAwesomeIcon icon={faQuestion} size={iconSize} />;
  }

  return (
    <TCardItemCard color={color}>
      <Flex
        direction="column"
        align="center"
        justify="center"
        minWidth={"60px"}
      >
        <Box mx="auto" my={3}>
          {icon}
        </Box>
        <Text mt="auto" fontSize="sm" as="b">
          {text}
        </Text>
      </Flex>
    </TCardItemCard>
  );
};
