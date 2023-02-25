import { Badge, Box, Flex, Heading, ResponsiveValue } from "@chakra-ui/react";
import React, { memo } from "react";
import { TCardItemCard } from "./TCardItemCard";

export const TCardItemCardInfo = memo(
  ({
    title,
    value,
    sufix,
    size = "xl",
  }: {
    title?: string;
    value: string;
    sufix?: string;
    size?:
      | ResponsiveValue<
          | "xl"
          | (string & {})
          | "sm"
          | "md"
          | "lg"
          | "2xl"
          | "3xl"
          | "4xl"
          | "xs"
        >
      | undefined;
  }): JSX.Element => (
    <TCardItemCard>
      <Badge variant="subtle" fontSize="md">
        {title}
      </Badge>
      <Flex ml="auto" mt="auto">
        <Heading size={size} ml="auto">
          {value}
        </Heading>
        <Box mt="auto">{sufix}</Box>
      </Flex>
    </TCardItemCard>
  )
);
