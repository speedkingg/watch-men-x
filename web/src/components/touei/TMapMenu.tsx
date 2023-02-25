import { Radio, RadioGroup, Stack } from "@chakra-ui/react";
import { MapMode } from "../../types/map";
import { UCard } from "../utils/UCard";

export function TMapMenu({
  mode,
  setMode,
}: {
  mode: MapMode;
  setMode: React.Dispatch<React.SetStateAction<MapMode>>;
}): JSX.Element {
  return (
    <UCard>
      <RadioGroup onChange={(s: MapMode) => setMode(s)} value={mode}>
        <Stack direction="column">
          <Radio value="pine">ピン</Radio>
          <Radio value="price">価格</Radio>
          <Radio value="houseArea">建物面積</Radio>
          <Radio value="area">土地面積</Radio>
        </Stack>
      </RadioGroup>
    </UCard>
  );
}
