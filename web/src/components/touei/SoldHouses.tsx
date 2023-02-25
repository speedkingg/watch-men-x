import { useSoldHouses } from "../../hooks/useSoldHouses";
import { TContent } from "./TContent";

export function SoldHouses(): JSX.Element {
  const { soldHouses, displaySoldHouses, setDisplaySoldHouses } =
    useSoldHouses();

  return (
    <TContent
      title="完売"
      houses={displaySoldHouses}
      setter={setDisplaySoldHouses}
      originalHouses={soldHouses}
    />
  );
}
