import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { LOGIN_ROUTE } from "../config/route";
import { getHouses } from "../logic/firebase";
import { objectSort } from "../logic/utils";
import { displayHousesState, housesState } from "../recoil/atom";
import { HouseDetail, HouseDetailList } from "../types/house";

export function useHouses() {
  const navigate = useNavigate();
  const [houses, setHouses] = useRecoilState(housesState);
  const [displayHouses, setDisplayHouses] = useRecoilState(displayHousesState);

  useEffect(() => {
    getHouses()
      .then((houses: HouseDetailList) => {
        const houseList: HouseDetail[] = objectSort(
          Object.values(houses),
          "作成日時",
          "desc"
        ).map((h: HouseDetail) => ({
          ...h,
          割引額: h.初期販売最低価格 - h.現在販売最低価格,
        }));
        setHouses(houseList);
        setDisplayHouses(houseList);
      })
      .catch((e: any) => {
        console.warn(e.message);
        navigate(`/${LOGIN_ROUTE}`);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { houses, displayHouses, setDisplayHouses };
}
