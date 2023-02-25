import { Button, Flex, IconButton, Tooltip } from "@chakra-ui/react";
import {
  faExclamationCircle,
  faFlag,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { HOUSES_ROUTE, LOGIN_ROUTE, SOLD_HOUSES_ROUTE } from "../config/route";
import { logOut } from "../logic/firebase";

export function HeaderMenu(): JSX.Element {
  const navigate = useNavigate();

  return (
    <Flex gap={8}>
      <Button
        variant="link"
        leftIcon={<FontAwesomeIcon icon={faExclamationCircle} />}
        onClick={() => navigate(`/${SOLD_HOUSES_ROUTE}`)}
      >
        完売
      </Button>
      <Button
        variant="link"
        leftIcon={<FontAwesomeIcon icon={faFlag} />}
        onClick={() => navigate(`/${HOUSES_ROUTE}`)}
      >
        販売中
      </Button>
      <Tooltip label="ログアウト">
        <IconButton
          ml={4}
          icon={<FontAwesomeIcon icon={faSignOutAlt} />}
          aria-label="logout"
          onClick={() => logOut().then(() => navigate(`/${LOGIN_ROUTE}`))}
        />
      </Tooltip>
    </Flex>
  );
}
