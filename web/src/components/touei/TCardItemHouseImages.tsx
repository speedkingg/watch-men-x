import { Button, Flex, useDisclosure } from "@chakra-ui/react";
import { faImages } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { memo } from "react";
import { TOUEI_PICTURE } from "../../config/url";
import { UImage } from "../utils/UImage";
import { UModal } from "../utils/UModal";

export const TCardItemHouseImages = memo(({ pid }: { pid: string }) => {
  const modalProps = useDisclosure();
  const imageUrlList: string[] = [...Array(9)].map(
    (_, i) => `${TOUEI_PICTURE}${pid}/1_${i + 1}-s.jpg`
  );

  return (
    <>
      <Button onClick={modalProps.onOpen} leftIcon={<FontAwesomeIcon icon={faImages} />}>
        画像一覧
      </Button>
      <UModal {...modalProps}>
        <Flex wrap="wrap" gap={4}>
          {imageUrlList.map((_, i) => (
            <UImage image={{ path: imageUrlList, targetNum: i }} width={350} key={i} />
          ))}
        </Flex>
      </UModal>
    </>
  );
});
