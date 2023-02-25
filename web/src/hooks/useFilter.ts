import { useCallback, useState } from "react";
import { SetterOrUpdater } from "recoil";
import { HouseDetail } from "../types/house";

export interface Filter {
  バスを含まない: boolean;
  公道のみ: boolean;
  駅徒歩X分以内: number;
  予算: number;
  フリーテキスト: string;
  タグ: string[];
}
export const filterInitValue: Filter = {
  バスを含まない: false,
  公道のみ: false,
  駅徒歩X分以内: 0,
  予算: 0,
  フリーテキスト: "",
  タグ: [],
};

export function useFilter(
  setter: SetterOrUpdater<HouseDetail[]>,
  originalHouses: HouseDetail[]
): {
  filter: Filter;
  setFilter: React.Dispatch<React.SetStateAction<Filter>>;
  apply: () => void;
  reset: () => void;
  isFiltering: () => boolean;
} {
  const [filter, setFilter] = useState(filterInitValue);

  const isFiltering = useCallback(
    () =>
      Object.keys(filter).some(
        (key: string) =>
          filterInitValue[key as keyof Filter] !== filter[key as keyof Filter]
      ),
    [filter]
  );

  const apply = () => {
    let fd: HouseDetail[] = originalHouses;

    if (filter.バスを含まない) {
      fd = fd.filter((h: HouseDetail) => h.アクセス.includes("駅まで徒歩"));
    }

    if (filter.公道のみ) {
      fd = fd.filter((h: HouseDetail) => h.接道.includes("公道"));
    }

    if (filter.駅徒歩X分以内) {
      fd = fd.filter((h: HouseDetail) => {
        const walkTimeList: number[] = h.アクセス
          .split("分")
          .filter((s: string) => s.includes("駅まで徒歩"))
          .map((s: string) => Number(s.replace(/.+駅まで徒歩([0-9]+)/, "$1")));
        if (walkTimeList.length === 0) return false;
        const minTime: number = Math.min(...walkTimeList);
        return minTime <= filter.駅徒歩X分以内;
      });
    }

    if (filter.予算) {
      fd = fd.filter((h: HouseDetail) => h.現在販売最高価格 < filter.予算);
    }

    if (filter.フリーテキスト) {
      fd = fd.filter((h: HouseDetail) =>
        filter.フリーテキスト
          .split(/ |　/)
          .filter((text: string) => text !== "")
          .every((word: string) => JSON.stringify(h).includes(word))
      );
    }

    if (filter.タグ.length) {
      fd = fd.filter((h: HouseDetail) =>
        filter.タグ.every((word: string) => JSON.stringify(h).includes(word))
      );
    }

    setter(fd);
  };

  const reset = () => {
    setFilter(filterInitValue);
    setter(originalHouses);
  };

  return { filter, setFilter, apply, reset, isFiltering };
}
