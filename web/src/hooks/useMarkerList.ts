import { useEffect, useState } from "react";
import { Location } from "../components/utils/GMap";
import { average } from "../logic/utils";
import { HouseDetail } from "../types/house";
import { MapMode } from "../types/map";

const colorList = ["cyan", "blue", "teal", "green", "yellow", "orange", "red"];
const colorListLimit = colorList.length - 1;

export function useMarkerList(
  houses: HouseDetail[],
  mode: MapMode,
  onOpen: () => void
) {
  const [targetHouseList, setTargetHouseList] = useState<HouseDetail[]>([]);
  const [center, setCenter] = useState<Location>({} as Location);

  const markerList: Location[] = [];
  houses.forEach((v: HouseDetail) => {
    if (
      markerList.filter(
        (l: Location) => l.lat === Number(v.緯度) && l.lng === Number(v.経度)
      ).length
    ) {
      return;
    }

    let text;
    let color;
    switch (mode) {
      case "price":
        text = `￥${v.現在販売最高価格.toLocaleString()}`;
        const priceNum = Math.round(v.現在販売最高価格 / 1000) - 1;
        color =
          priceNum > colorListLimit
            ? colorList[colorListLimit]
            : colorList[priceNum];
        break;
      case "houseArea":
        text = `${v.建物面積}`;
        color = Number(v.建物面積) < 100 ? "red" : "green";
        break;
      case "area":
        const area = Number(v.土地面積);
        text = `${area}`;
        if (area < 100) {
          color = "red";
        } else if (area < 150) {
          color = "green";
        } else if (area < 200) {
          color = "blue";
        } else {
          color = "cyan";
        }
        break;
    }

    markerList.push({
      lat: Number(v.緯度),
      lng: Number(v.経度),
      text: text,
      color: color,
    });
  });

  const onMarkerClick = (event: any) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    const targetHouse = houses.filter(
      (h) => Number(h.緯度) === lat && Number(h.経度) === lng
    );
    if (targetHouse.length === 0) return;
    setTargetHouseList(targetHouse);
    setCenter({ lat: lat, lng: lng });
    onOpen();
  };

  useEffect(() => {
    const latList: number[] = markerList
      .map((location: Location) => location.lat)
      .filter((n: number) => n !== 0);

    const lngList: number[] = markerList
      .map((location: Location) => location.lng)
      .filter((n: number) => n !== 0);

    const center: Location = {
      lat: average(latList),
      lng: average(lngList),
    };
    setCenter(center);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { targetHouseList, onMarkerClick, center, markerList };
}
