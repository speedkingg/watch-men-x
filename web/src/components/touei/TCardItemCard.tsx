import { Flex } from "@chakra-ui/react";
import React, { memo } from "react";

export const TCardItemCard = memo(
  ({
    children,
    color = "whiteAlpha.50",
  }: {
    children: React.ReactNode;
    color?: string;
  }) => (
    <Flex
      direction="column"
      align="start"
      bg={color}
      borderRadius={8}
      p={4}
      gap={2}
    >
      {children}
    </Flex>
  )
);
