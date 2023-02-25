import { useState } from "react";

export function usePagenation<T>(
  displayUnit: number,
  valueList: T[]
): {
  loadMore: () => void;
  loadLess: () => void;
  displayValueList: T[];
  totalNum: number;
  startNum: number;
  endNum: number;
} {
  const [pageNum, setPageNum] = useState<number>(1);
  const loadMore = () => {
    setPageNum((current: number) => current + 1);
    window.scrollTo(0, 0);
  };

  const loadLess = () => {
    if (pageNum === 1) return;
    setPageNum((current: number) => current - 1);
    window.scrollTo(0, 0);
  };

  const totalNum = valueList.length;
  const startNum = (pageNum - 1) * displayUnit;
  const endNum =
    pageNum * displayUnit > totalNum ? totalNum : pageNum * displayUnit;
  const displayValueList = valueList.slice(startNum, endNum);

  return { loadMore, loadLess, displayValueList, totalNum, startNum, endNum };
}
