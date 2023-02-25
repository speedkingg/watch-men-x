import { Box, Button, Flex, Image, useDisclosure } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { getImage } from "../../logic/firebase";
import { useImage } from "../../hooks/useImage";
import { Image as Img } from "../../types/image";
import { UModal } from "./UModal";

// for Firebase
export function FImage({ image, width }: { image: Img; width: number }): JSX.Element {
  const { originalUrl, url, increment, decrement, reset } = useImage(image);
  const [originalSrc, setOriginalSrc] = useState<string | undefined>(undefined);
  const [src, setSrc] = useState<string | undefined>(undefined);
  const modalProps = useDisclosure();

  useEffect(() => {
    originalUrl && getImage(originalUrl).then((src) => setOriginalSrc(src));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [originalUrl]);

  useEffect(() => {
    url && getImage(url).then((src) => setSrc(src));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  const onImageCick = () => {
    reset();
    // 切り替わるまでに遅延があるので、少し待つ
    setTimeout(() => modalProps.onOpen(), 100);
  };

  const Body = (width: number, src?: string): JSX.Element =>
    src ? (
      <Image src={src} w={`${width}px`} objectFit="contain" borderRadius="8" />
    ) : (
      <Box w={`${width}px`} h={`${width}px`} borderRadius="8" />
    );

  const ModalBody = (
    <Flex align="center">
      <Button onClick={decrement} mr={2} h={765}>
        {"<"}
      </Button>
      {Body(1100, src)}
      <Button onClick={increment} ml={2} h={765}>
        {">"}
      </Button>
    </Flex>
  );

  return (
    <>
      <Box onClick={onImageCick} style={{ cursor: "pointer" }}>
        {Body(width, originalSrc)}
      </Box>
      <UModal {...modalProps} children={ModalBody} />
    </>
  );
}
