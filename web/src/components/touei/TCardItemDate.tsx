import { Flex, Text } from "@chakra-ui/react";
import dayjs from "dayjs";
import { memo } from "react";

export const TCardItemDate = memo(({ date }: { date: string }) => {
  const year = dayjs(date).format("YYYY");
  const month = dayjs(date).format("M");
  const day = dayjs(date).format("D");
  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      bg="whiteAlpha.50"
      borderRadius={8}
      p={4}
      gap={2}
    >
      <Text fontSize="xs">{year}</Text>
      <Flex gap={1}>
        <Text fontSize="2xl">{month}</Text>
        <Text fontSize="md">.</Text>
        <Text fontSize="2xl">{day}</Text>
      </Flex>
    </Flex>
  );
});
