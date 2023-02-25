import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import { Button, Flex } from "@chakra-ui/react";

export default function UPagenation({
  loadMore,
  loadMLess,
  totalNum,
  startNum,
  endNum,
  unitNum,
}: {
  loadMore: () => void;
  loadMLess: () => void;
  totalNum: number;
  startNum: number;
  endNum: number;
  unitNum: number;
}): JSX.Element {
  return (
    <>
      <Flex gap={2}>
        <Button
          leftIcon={<ArrowBackIcon />}
          onClick={loadMLess}
        >{`前の${unitNum}件`}</Button>

        <Button
          rightIcon={<ArrowForwardIcon />}
          onClick={loadMore}
        >{`次の${unitNum}件`}</Button>
      </Flex>
      <Flex justify="center" mt={2}>{`${totalNum}件中 ${
        startNum + 1
      } - ${endNum}件`}</Flex>
    </>
  );
}
