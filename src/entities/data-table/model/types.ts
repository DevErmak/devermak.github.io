export interface IDataTableSlice {
  ids: Array<string>;
  items: Array<IItem>;
  isLoading: boolean;
  countIds: number;
  page: number;
  limit: number;
}
export interface IItem {
  id: string;
  product: string;
  brand: string;
  price: number;
}
