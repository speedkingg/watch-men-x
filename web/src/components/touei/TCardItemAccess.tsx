import { Badge, Box, Flex, Heading, Text, Tooltip } from "@chakra-ui/react";
import { memo } from "react";

export const TCardItemAccess = memo(
  ({ access }: { access: string }): JSX.Element => {
    const accessList: string[] = access
      .replaceAll("　", "")
      .replaceAll(/([0-9]+分)(?!$)/g, "$1\\")
      .split("\\");

    return (
      <Flex gap={2} wrap="wrap">
        {accessList
          .filter((a: string) => a.includes("駅まで徒歩"))
          .map((access: string, i: number) => {
            const regex = access.includes("～")
              ? /(.+) (.+駅)まで徒歩[0-9]{0,2}[～]{0,1}([0-9]+)分/
              : /(.+) (.+駅)まで徒歩([0-9]+)分/;
            const accessInfo = access.replace(regex, "$1/$2/$3").split("/");
            if (accessInfo.length !== 3) return <></>;
            return (
              <Flex key={i} bg="whiteAlpha.50" borderRadius={8} gap={8} p={2}>
                {/* 線名 */}
                <Flex
                  direction="column"
                  align="center"
                  justify="center"
                  gap={2}
                >
                  <Flex>
                    <Text fontSize="sm" key={i}>
                      {accessInfo[0].split(",")[0]}
                    </Text>
                    {accessInfo[0].split(",").length > 1 && (
                      <Tooltip
                        placement="top"
                        label={accessInfo[0]
                          .split(",")
                          .slice(1)
                          .map((line: string, i: number) => (
                            <Box>{line}</Box>
                          ))}
                      >
                        <Badge variant="subtle" ml={2}>
                          他
                        </Badge>
                      </Tooltip>
                    )}
                  </Flex>

                  {/* 駅名 */}
                  <Badge variant="subtle" colorScheme="teal">
                    <Heading size="md">{accessInfo[1]}</Heading>
                  </Badge>
                </Flex>

                {/* 駅徒歩 */}
                <Flex direction="column" justify="center">
                  <Box>徒歩</Box>
                  <Flex>
                    <Heading size="2xl">{accessInfo[2]}</Heading>
                    <Box mt="auto">分</Box>
                  </Flex>
                </Flex>
              </Flex>
            );
          })}
      </Flex>
    );
  }
);
