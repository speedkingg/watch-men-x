import { Box, Flex, Spacer } from "@chakra-ui/react";
import { useRecoilState } from "recoil";
import "../css/typography.css";
import { userState } from "../recoil/atom";
import { HeaderMenu } from "./HeaderMenu";
import logo from "../asset/logo.png";
import { headerHeight } from "../config/view";

export function Header(): JSX.Element {
  const [user] = useRecoilState(userState);

  if (!user) return <></>;

  return (
    <>
      <Flex
        bg="gray.700"
        p={4}
        w="100%"
        h={headerHeight}
        style={{ position: "fixed", top: 0, zIndex: 1 }}
      >
        <img src={logo} alt="logo" />
        <Box className="logo" ml={4}>
          Watch-Men
        </Box>
        <Spacer />
        <HeaderMenu />
      </Flex>
      <Box w="100%" h={headerHeight} />
    </>
  );
}
