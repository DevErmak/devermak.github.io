import { IStore } from '@/app/model/appStore';
import { IDataTableSlice } from './types';

export const selectorIds = (state: IStore): IDataTableSlice['ids'] => state.infoDataTable.ids;

export const selectorCountIds = (state: IStore): IDataTableSlice['countIds'] =>
  state.infoDataTable.countIds;

export const selectorItems = (state: IStore): IDataTableSlice['items'] => state.infoDataTable.items;

export const selectorIsLoading = (state: IStore): IDataTableSlice['isLoading'] =>
  state.infoDataTable.isLoading;

export const selectorPageNumber = (state: IStore): IDataTableSlice['page'] =>
  state.infoDataTable.page;

export const selectorLimit = (state: IStore): IDataTableSlice['limit'] => state.infoDataTable.limit;
