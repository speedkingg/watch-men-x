import { atom } from "recoil";
import { HouseDetail } from "../types/house";
import { ToueiSelected } from "../types/touei";

export const userState = atom<string | null>({
  key: "mail",
  default: null,
});

export const housesState = atom<HouseDetail[]>({
  key: "houses",
  default: [],
});

export const soldHousesState = atom<HouseDetail[]>({
  key: "soldHouses",
  default: [],
});

export const displayHousesState = atom<HouseDetail[]>({
  key: "displayHouses",
  default: [],
});

export const displaySoldHousesState = atom<HouseDetail[]>({
  key: "displaySoldHouses",
  default: [],
});

export const toueiMenuState = atom<ToueiSelected>({
  key: "toueiMenu",
  default: "table",
});
