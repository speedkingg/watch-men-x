export interface JsonOneDepth {
  [key: string]: number | string;
}

export interface JsonTwoDepth {
  [key: string]: JsonOneDepth;
}
