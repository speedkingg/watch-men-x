import {
  Badge,
  Box,
  Button,
  Collapse,
  Divider,
  Flex,
  Heading,
  Link,
  Spacer,
  Stat,
  StatArrow,
  StatHelpText,
  Tag,
  useDisclosure,
} from "@chakra-ui/react";
import { faAngleDown, faAngleUp, faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { memo } from "react";
import { DOMAIN_TOUEI } from "../../config/url";
import { HouseDetail } from "../../types/house";
import { FImage } from "../utils/FImage";
import GMap from "../utils/GMap";
import { TCardItemAccess } from "./TCardItemAccess";
import { TCardItemBaseInfo } from "./TCardItemBaseInfo";
import { TCardItemDetail } from "./TCardItemDetail";
import { TCardItemHouseImages } from "./TCardItemHouseImages";
import { TCardItemOpenGoogleMapButton } from "./TCardItemOpenGoogleMapButton";
import { TCardItemRoute } from "./TCardItemRoute";

export const TCard = memo(({ values, withMap = true }: { values: HouseDetail; withMap?: boolean }): JSX.Element => {
  const v: HouseDetail = values;
  const { isOpen, onToggle } = useDisclosure();
  const pathList: string[] = v.間取り図 ? [v.全体区画図, v.間取り図] : [v.全体区画図];

  return (
    <Flex bg="whiteAlpha.50" p="8" direction="column" m={4}>
      <Flex>
        <Heading as="h4" size="md" mb={8}>
          <Link href={v.パス.replace("/", DOMAIN_TOUEI)} isExternal>
            <Flex>
              <Box>{`${v.所在地}`}</Box>
              <Box ml={4}>
                <FontAwesomeIcon icon={faExternalLinkAlt} />
              </Box>
            </Flex>
          </Link>
        </Heading>
        <Spacer />
        <Badge variant="subtle" h={5} mr={2}>
          {v.土地ID}
        </Badge>
        <Badge variant="subtle" h={5}>
          {v.物件ID}
        </Badge>
      </Flex>

      <Flex gap={4}>
        <FImage image={{ path: pathList, targetNum: 0 }} width={400} />
        <FImage image={{ path: pathList, targetNum: 1 }} width={400} />
        {withMap && (
          <Box w="400px">
            <GMap
              locations={[{ lat: Number(v.緯度), lng: Number(v.経度) }]}
              center={{ lat: Number(v.緯度), lng: Number(v.経度) }}
            />
          </Box>
        )}
      </Flex>

      <Divider mt={4} mb={8} />

      <Flex direction="column" align="end" ml="auto">
        <Flex>
          {v.現在販売最低価格 !== v.現在販売最高価格 && (
            <Box mt="auto">{` ${v.現在販売最低価格.toLocaleString()} 〜 `}</Box>
          )}
          <Heading size="2xl">{v.現在販売最高価格.toLocaleString()}</Heading>
          <Box mt="auto">万円</Box>
        </Flex>
        {v.割引額 !== undefined && v.割引額 > 0 && (
          <Stat mr={9}>
            <StatHelpText>
              <StatArrow type="decrease" />
              {v.割引額}
            </StatHelpText>
          </Stat>
        )}
      </Flex>

      <TCardItemAccess access={v.アクセス} />

      <Box mt={8} />

      <TCardItemBaseInfo houseInfo={v} />

      <Flex mt={4} gap={4} ml="auto">
        <TCardItemHouseImages pid={v.土地ID} />

        <TCardItemOpenGoogleMapButton lat={v.緯度} lng={v.経度} />

        <TCardItemRoute lat={v.緯度} lng={v.経度} />

        <Button
          onClick={onToggle}
          rightIcon={isOpen ? <FontAwesomeIcon icon={faAngleUp} /> : <FontAwesomeIcon icon={faAngleDown} />}
        >
          詳細
        </Button>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <Box p={8} bg="whiteAlpha.50" mt={4}>
          <TCardItemDetail houseInfo={v} />
        </Box>
      </Collapse>

      <Divider my={4} />

      <Flex gap={4} mt={4}>
        <Heading as="h4" size="sm" minWidth="80px">
          日時情報
        </Heading>
        <Box>
          <Tag>完成予定日</Tag>
          {` ${v.完成予定日}`}
        </Box>
        <Box>
          <Tag>入居予定日</Tag>
          {` ${v.入居予定日}`}
        </Box>
        <Box>
          <Tag>作成日時</Tag>
          {` ${v.作成日時}`}
        </Box>
        <Box>
          <Tag>更新日時</Tag>
          {` ${v.更新日時}`}
        </Box>
      </Flex>
    </Flex>
  );
});
