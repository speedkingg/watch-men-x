import { Box, Flex, Heading, Highlight, Tag } from "@chakra-ui/react";
import { memo } from "react";
import { HouseDetail } from "../../types/house";
import { TCardItemTag } from "./TCardItemTag";

export const TCardItemDetail = memo(
  ({ houseInfo }: { houseInfo: HouseDetail }): JSX.Element => {
    const v = houseInfo;
    return (
      <Box>
        <Flex gap={4}>
          <Heading as="h4" size="sm" minWidth="80px">
            アクセス
          </Heading>

          <Flex direction="column">
            {v.アクセス
              .replaceAll("　", "")
              .replaceAll(/([0-9]+分)(?!$)/g, "$1\\")
              .split("\\")
              .map((access: string, i: number) => (
                <Box key={i}>
                  <Highlight
                    query={"駅まで徒歩"}
                    styles={{ color: "teal.200" }}
                  >
                    {access}
                  </Highlight>
                </Box>
              ))}
          </Flex>
        </Flex>

        <Flex gap={4} mt={4}>
          <Heading as="h4" size="sm" minWidth="80px">
            土地情報
          </Heading>
          <Flex direction="column" gap={1}>
            <Box>
              <Tag>土地面積</Tag>
              {` ${v.土地面積}㎡`}
            </Box>
            <Box>
              <Tag>都市計画</Tag>
              {` ${v.都市計画}`}
            </Box>
            <Box>
              <Tag>用途地域</Tag>
              {` ${v.用途地域}`}
            </Box>
            <Box>
              <Tag>建ぺい率</Tag>
              {` ${v.建ぺい率}`}
            </Box>
            <Box>
              <Tag>容積率</Tag>
              {` ${v.容積率}`}
            </Box>
            <Box>
              <Tag>接道</Tag>
              {` ${v.接道}`}
            </Box>
          </Flex>

          <Flex gap={4}>
            <Heading as="h4" size="sm" minWidth="80px">
              物件情報
            </Heading>
            <Flex direction="column" gap={1}>
              <Box>
                <Tag>間取り</Tag>
                {` ${v.間取り}`}
              </Box>
              <Box>
                <Tag>建物面積</Tag>
                {` ${v.建物面積}㎡`}
              </Box>
              <Box>
                <Tag>構造</Tag>
                {` ${v.構造}`}
              </Box>
              <Box>
                <Tag>設備</Tag>
                {` ${v.設備}`}
              </Box>
            </Flex>
          </Flex>
        </Flex>

        <Flex gap={4} mt={4}>
          <Heading as="h4" size="sm" minWidth="80px">
            価格
          </Heading>
          <Flex gap={4}>
            <Box>
              <Tag>初期価格</Tag>
              {` ${v.初期販売最低価格.toLocaleString()} 〜 ${v.初期販売最高価格.toLocaleString()}万円`}
            </Box>
          </Flex>
        </Flex>

        <Box mt={4}>
          <TCardItemTag tags={v.タグ} />
        </Box>
      </Box>
    );
  }
);
