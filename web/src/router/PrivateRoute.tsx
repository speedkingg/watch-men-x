import { Navigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { LOGIN_ROUTE } from "../config/route";
import { userState } from "../recoil/atom";

export function PrivateRoute({
  element,
}: {
  element: JSX.Element;
}): JSX.Element {
  const [user] = useRecoilState(userState);
  return user ? element : <Navigate to={`/${LOGIN_ROUTE}`} replace />;
}
