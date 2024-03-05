import { configureStore } from '@reduxjs/toolkit';

import createSagaMiddleware from 'redux-saga';
import dataTableSlice from '@/entities/data-table/model/slice';
import infoDataTableSaga from '@/entities/data-table/model/saga';
import { IDataTableSlice } from '@/entities/data-table/model/types';

export const saga = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    infoDataTable: dataTableSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(saga),
});

saga.run(infoDataTableSaga);

export interface IStore {
  infoDataTable: IDataTableSlice;
}
