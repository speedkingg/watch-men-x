import {
  Badge,
  Box,
  Flex,
  Heading,
  ResponsiveValue,
  Text,
} from "@chakra-ui/react";
import { memo } from "react";
import { TCardItemCard } from "./TCardItemCard";

export const TCardItemWay = memo(({ way }: { way: string }): JSX.Element => {
  return (
    <Flex gap={2} wrap="wrap">
      {way.split("、").map((s: string, i: number) => {
        const way = s
          .replace(
            /([東|西|南|北]{1,2})\s*([0-9]{1,2}[.]{0,1}[0-9]{0,1})m(.+)/,
            "$1/$2/$3"
          )
          .split("/");
        if (way.length !== 3) return <div key={i} />;
        return (
          <CardInfoWay 方角={way[0]} 種類={way[2]} 広さ={way[1]} key={i} />
        );
      })}
    </Flex>
  );
});

const CardInfoWay = ({
  方角,
  種類,
  広さ,
  size = "xl",
}: {
  方角: string;
  種類: string;
  広さ: string;
  size?:
    | ResponsiveValue<
        "xl" | (string & {}) | "sm" | "md" | "lg" | "2xl" | "3xl" | "4xl" | "xs"
      >
    | undefined;
}): JSX.Element => (
  <TCardItemCard>
    <Badge
      colorScheme={種類 === "公道" && Number(広さ) >= 4 ? "green" : "pink"}
      variant="subtle"
      fontSize="md"
    >
      {種類}
    </Badge>
    <Flex>
      <Text mt="auto" fontSize="sm" ml="auto">
        {方角}
      </Text>
      <Heading size={size} mx={1}>
        {広さ}
      </Heading>
      <Box mt="auto">m</Box>
    </Flex>
  </TCardItemCard>
);
