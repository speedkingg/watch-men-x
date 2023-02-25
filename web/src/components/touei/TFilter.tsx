import { IconButton, useDisclosure } from "@chakra-ui/react";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SetterOrUpdater } from "recoil";
import { useFilter } from "../../hooks/useFilter";
import { HouseDetail } from "../../types/house";
import { UModal } from "../utils/UModal";
import { TFilterContent } from "./TFilterContent";

export function TFilter({
  setter,
  originalHouses,
}: {
  setter: SetterOrUpdater<HouseDetail[]>;
  originalHouses: HouseDetail[];
}): JSX.Element {
  const modalProps = useDisclosure();
  const { filter, setFilter, apply, reset, isFiltering } = useFilter(
    setter,
    originalHouses
  );

  const tagList: Set<string> = new Set();
  originalHouses.forEach((h: HouseDetail) => {
    h.タグ?.forEach((tag) => {
      tagList.add(tag);
    });
  });

  const applyFilter = () => {
    apply();
    modalProps.onClose();
  };

  const resetFilter = () => {
    reset();
    modalProps.onClose();
  };

  return (
    <>
      <IconButton
        aria-label="filter"
        variant="outline"
        icon={<FontAwesomeIcon icon={faFilter} />}
        onClick={modalProps.onOpen}
        colorScheme={isFiltering() ? "teal" : "gray"}
      />
      <UModal {...modalProps}>
        <TFilterContent
          filter={filter}
          setFilter={setFilter}
          applyFilter={applyFilter}
          resetFilter={resetFilter}
          tagList={tagList}
        />
      </UModal>
    </>
  );
}
