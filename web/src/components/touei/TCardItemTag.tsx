import { Badge, Flex, Heading } from "@chakra-ui/react";
import { memo } from "react";

export const TCardItemTag = memo(
  ({ tags }: { tags?: string[] }): JSX.Element => {
    return (
      <>
        {tags && (
          <Flex gap={4}>
            <Heading as="h4" size="sm" minWidth="80px">
              タグ
            </Heading>
            <Flex gap={1} wrap="wrap">
              {tags?.map((tag: string) => (
                <Badge key={tag} fontSize="sm">
                  {tag}
                </Badge>
              ))}
            </Flex>
          </Flex>
        )}
      </>
    );
  }
);
