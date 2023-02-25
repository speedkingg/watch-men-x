import { useColorMode } from "@chakra-ui/react";
import { useEffect } from "react";

// 初期でダークモードにならないので、ダークモードに自分でする
export function useDarkMode(): void {
  const { colorMode, toggleColorMode } = useColorMode();

  useEffect(() => {
    if (colorMode === "light") toggleColorMode();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [colorMode]);
}
