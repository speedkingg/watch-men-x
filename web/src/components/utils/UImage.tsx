import { Box, Button, Flex, Image, useDisclosure } from "@chakra-ui/react";
import { useState } from "react";
import { useImage } from "../../hooks/useImage";
import { Image as ImageType } from "../../types/image";
import { UModal } from "./UModal";

export function UImage({ image, width }: { image: ImageType; width: number }): JSX.Element {
  const [isError, setIsError] = useState<boolean>(false);
  const [operation, setOperation] = useState<"increment" | "decrement" | null>(null);
  const { originalUrl, url, increment, decrement, reset } = useImage(image);
  const modalProps = useDisclosure();

  const onImageCick = () => {
    reset();
    // 切り替わるまでに遅延があるので、少し待つ
    setTimeout(() => modalProps.onOpen(), 100);
  };

  const Body = (width: number, src: string | undefined, onError: () => void): JSX.Element => (
    <Image src={src} width={`${width}px`} objectFit="contain" borderRadius="8" onError={onError} />
  );

  const ModalBody = (
    <Flex align="center">
      <Button
        onClick={() => {
          decrement();
          setOperation("decrement");
        }}
        mr={2}
        h={765}
      >
        {"<"}
      </Button>
      {Body(1100, url, () => {
        if (operation === "increment") increment();
        if (operation === "decrement") decrement();
      })}
      <Button
        onClick={() => {
          increment();
          setOperation("increment");
        }}
        ml={2}
        h={765}
      >
        {">"}
      </Button>
    </Flex>
  );

  return (
    <>
      <Box
        onClick={onImageCick}
        style={{ cursor: "pointer" }}
        visibility={isError ? "hidden" : "visible"}
      >
        {Body(width, originalUrl, () => setIsError(true))}
      </Box>
      <UModal {...modalProps} children={ModalBody} />
    </>
  );
}
