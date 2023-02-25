import { JsonOneDepth, JsonTwoDepth } from "../../types/utilType";
import { UTable } from "./UTable";

export function UTableforJson({ json }: { json: JsonTwoDepth }): JSX.Element {
  if (!Object.keys(json).length) return <>No Data</>;

  const headers: string[] = Object.keys(json[Object.keys(json)[0]]);
  const valuesList: JsonOneDepth[] = Object.values(json);
  return <UTable headers={headers} valuesList={valuesList} />;
}
