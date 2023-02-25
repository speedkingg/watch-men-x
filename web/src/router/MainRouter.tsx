import { Navigate, Route, Routes } from "react-router-dom";
import { Login } from "../components/Login";
import { Houses } from "../components/touei/Houses";
import { SoldHouses } from "../components/touei/SoldHouses";
import { HOUSES_ROUTE, LOGIN_ROUTE, SOLD_HOUSES_ROUTE } from "../config/route";
import { PrivateRoute } from "./PrivateRoute";

export function MainRouter(): JSX.Element {
  return (
    <Routes>
      <Route path={LOGIN_ROUTE} element={<Login />} />
      <Route
        path={HOUSES_ROUTE}
        element={<PrivateRoute element={<Houses />} />}
      />
      <Route
        path={SOLD_HOUSES_ROUTE}
        element={<PrivateRoute element={<SoldHouses />} />}
      />

      <Route path="*" element={<Navigate to={`/${SOLD_HOUSES_ROUTE}`} />} />
    </Routes>
  );
}
