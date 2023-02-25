import { HouseDetail, HouseDetailTable } from "../types/house";

const header: string[] = [
  "所在地",
  "アクセス",
  "土地面積",
  "建物面積",
  "価格",
  "構造",
  "間取り",
  "用途地域",
  "都市計画",
  "設備",
  "接道",
];

export const convertForTable = (
  houses: HouseDetail[]
): {
  header: string[];
  convertedData: HouseDetailTable[];
} => {
  const convertedData: HouseDetailTable[] = houses.map(
    (houses: HouseDetail) => {
      const {
        所在地,
        アクセス,
        土地面積,
        建物面積,
        現在販売最低価格,
        現在販売最高価格,
        構造,
        間取り,
        用途地域,
        都市計画,
        設備,
        接道,
        土地ID,
        物件ID,
      } = houses;

      const price =
        現在販売最低価格 === 現在販売最高価格
          ? `${現在販売最低価格.toLocaleString()}`
          : `${現在販売最低価格.toLocaleString()} - ${現在販売最高価格.toLocaleString()}`;

      return {
        所在地,
        アクセス: アクセス.replaceAll("　", ""),
        土地面積,
        建物面積,
        価格: price,
        構造,
        間取り,
        用途地域,
        都市計画,
        設備,
        接道,
        土地ID,
        物件ID,
      };
    }
  );
  return { convertedData, header };
};
