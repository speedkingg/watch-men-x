import { Select } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { SetterOrUpdater } from "recoil";
import { objectSort } from "../../logic/utils";
import { HouseDetail } from "../../types/house";

export function TSort({
  houses,
  setter,
  title,
}: {
  houses: HouseDetail[];
  setter: SetterOrUpdater<HouseDetail[]>;
  title: string;
}): JSX.Element {
  const keys: string[] = houses.length ? Object.keys(houses[0]) : [];
  const [key, setKey] = useState<string>("");
  const [order, setOrder] = useState<string>("desc");

  useEffect(() => {
    if (!(order === "asc" || order === "desc") || houses.length === 0) return;
    const sortedHouses: HouseDetail[] = objectSort(houses, key, order);
    setter(sortedHouses);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, order]);

  useEffect(
    () => {
      if (!(order === "asc" || order === "desc") || !houses.length) return;
      title === "完売" ? setKey("更新日時") : setKey("作成日時");
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [houses.length]
  );

  return (
    <>
      <Select
        w={110}
        borderRightRadius="none"
        onChange={(e) => setKey(e.target.value)}
        value={key}
      >
        {keys.map((key: string) => (
          <option value={key} key={key}>
            {key}
          </option>
        ))}
      </Select>

      <Select
        w={90}
        borderLeftRadius="none"
        onChange={(e) => setOrder(e.target.value)}
        value={order}
      >
        <option value="asc">昇順</option>
        <option value="desc">降順</option>
      </Select>
    </>
  );
}
