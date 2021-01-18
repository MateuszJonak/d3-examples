export type Item = { name: string } & { [key: string]: number | string };
export type ChartProps = {
  width: number;
  height: number;
  data: Item[];
  keys: string[];
};
