import { Badge, Flex, Text } from "@chakra-ui/react";
import { memo } from "react";
import { TCardItemCardInfo } from "./TCardItemCardInfo";

export const TCardItemPlan = memo(
  ({ plan }: { plan: string | undefined }): JSX.Element => {
    return (
      <Flex gap={2}>
        <TCardItemCardInfo
          title="間取り"
          value={`${plan?.replace(/([0-9]{1}LDK).*/, "$1")}`}
        />

        <Flex wrap={"wrap"} direction="column" gap={2} mt="auto">
          {plan
            ?.split("+")
            .slice(1)
            .map((s: string, i: number) => (
              <Badge key={i}>
                <Text fontSize="lg" mx={2}>
                  {s}
                </Text>
              </Badge>
            ))}
        </Flex>
      </Flex>
    );
  }
);
