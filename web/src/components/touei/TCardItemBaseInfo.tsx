import { Flex } from "@chakra-ui/react";
import { memo } from "react";
import { HouseDetail } from "../../types/house";
import { TCardItemAreaBadge } from "./TCardItemAreaBadge";
import { TCardItemCardInfo } from "./TCardItemCardInfo";
import { TCardItemCityBadge } from "./TCardItemCityBadge";
import { TCardItemInfra } from "./TCardItemInfra";
import { TCardItemPlan } from "./TCardItemPlan";
import { TCardItemWay } from "./TCardItemWay";

export const TCardItemBaseInfo = memo(
  ({ houseInfo }: { houseInfo: HouseDetail }): JSX.Element => {
    const h = houseInfo;
    return (
      <Flex direction={"column"} gap={4}>
        <Flex wrap="wrap" gap={2} mt="auto" direction={"row"}>
          <TCardItemCityBadge city={h.都市計画} />
          <TCardItemAreaBadge area={h.用途地域} />
        </Flex>

        <Flex wrap={"wrap"} gap={2}>
          <TCardItemCardInfo title="土地" value={`${h.土地面積}`} sufix="㎡" />
          <TCardItemCardInfo title="建物" value={`${h.建物面積}`} sufix="㎡" />

          <TCardItemPlan plan={h.間取り} />
        </Flex>

        <Flex wrap={"wrap"} gap={2}>
          <TCardItemCardInfo
            title="建ぺい率"
            value={`${h.建ぺい率.replace("％", "")}`}
            sufix="%"
            size="md"
          />
          <TCardItemCardInfo
            title="容積率"
            value={`${h.容積率.replace("％", "")}`}
            sufix="%"
            size="md"
          />

          <TCardItemWay way={h.接道} />
          <TCardItemInfra infra={h.設備} />
        </Flex>
      </Flex>
    );
  }
);
