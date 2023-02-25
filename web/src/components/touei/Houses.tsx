import { useHouses } from "../../hooks/useHouses";
import { TContent } from "./TContent";

export function Houses(): JSX.Element {
  const { houses, displayHouses, setDisplayHouses } = useHouses();

  return (
    <TContent
      title="販売中"
      houses={displayHouses}
      setter={setDisplayHouses}
      originalHouses={houses}
    />
  );
}
