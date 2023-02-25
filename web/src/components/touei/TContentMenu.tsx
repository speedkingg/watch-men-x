import { Button, ButtonGroup } from "@chakra-ui/react";
import {
  faBorderAll,
  faMapMarkerAlt,
  faSheetPlastic,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SetterOrUpdater } from "recoil";
import { ToueiSelected } from "../../types/touei";

export function TContentMenu({
  selected,
  setSlected,
}: {
  selected: ToueiSelected;
  setSlected: SetterOrUpdater<ToueiSelected>;
}): JSX.Element {
  const variant = (choise: ToueiSelected) =>
    choise === selected ? "solid" : "outline";
  const colorScheme = (choise: ToueiSelected) =>
    choise === selected ? "teal" : "gray";

  return (
    <ButtonGroup isAttached variant="outline">
      <Button
        leftIcon={<FontAwesomeIcon icon={faBorderAll} />}
        variant={variant("table")}
        colorScheme={colorScheme("table")}
        onClick={() => setSlected("table")}
      >
        table
      </Button>
      <Button
        leftIcon={<FontAwesomeIcon icon={faSheetPlastic} />}
        variant={variant("card")}
        colorScheme={colorScheme("card")}
        onClick={() => setSlected("card")}
      >
        card
      </Button>
      <Button
        leftIcon={<FontAwesomeIcon icon={faMapMarkerAlt} />}
        variant={variant("map")}
        colorScheme={colorScheme("map")}
        onClick={() => setSlected("map")}
      >
        map
      </Button>
    </ButtonGroup>
  );
}
