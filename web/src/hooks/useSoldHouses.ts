import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { LOGIN_ROUTE } from "../config/route";
import { getSoldHouses } from "../logic/firebase";
import { objectSort } from "../logic/utils";
import { displaySoldHousesState, soldHousesState } from "../recoil/atom";
import { HouseDetail, HouseDetailList } from "../types/house";

export function useSoldHouses() {
  const navigate = useNavigate();
  const [soldHouses, setSoldHouses] = useRecoilState(soldHousesState);
  const [displaySoldHouses, setDisplaySoldHouses] = useRecoilState(
    displaySoldHousesState
  );

  useEffect(() => {
    getSoldHouses()
      .then((houses: HouseDetailList) => {
        const houseList: HouseDetail[] = objectSort(
          Object.values(houses),
          "更新日時",
          "desc"
        ).map((h: HouseDetail) => ({
          ...h,
          割引額: h.初期販売最低価格 - h.現在販売最低価格,
        }));
        setSoldHouses(houseList);
        setDisplaySoldHouses(houseList);
      })
      .catch((e: any) => {
        console.warn(e.message);
        navigate(`/${LOGIN_ROUTE}`);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { soldHouses, displaySoldHouses, setDisplaySoldHouses };
}
