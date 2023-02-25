export function average(numList: number[]) {
  const sum = numList.reduce((a, c) => a + c, 0);
  return sum / numList.length;
}

export const objectSort = <T>(
  objectList: T[],
  key: string,
  order: "asc" | "desc"
): T[] => [...objectList].sort(compareValues(key, order));

const compareValues = <T>(
  key: string,
  order: "asc" | "desc"
): ((a: T, b: T) => number) => {
  return function (a: any, b: any) {
    if (!(key in a) || !(key in b)) return 0;

    let comparison = 0;
    if (a[key] > b[key]) {
      comparison = 1;
    } else if (a[key] < b[key]) {
      comparison = -1;
    }
    return order === "desc" ? comparison * -1 : comparison;
  };
};
