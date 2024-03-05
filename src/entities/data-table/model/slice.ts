import { createSlice } from '@reduxjs/toolkit';

export const dataTableSlice = createSlice({
  name: 'infoDataTableSlice',
  initialState: {
    ids: [],
    items: [],
    countIds: 0,
    page: 0,
    limit: 50,
    isLoading: false,
  },
  reducers: {
    getIds: (state) => ({
      ...state,
    }),
    getIdsSuccess: (state, { payload }) => ({
      ...state,
      ids: payload,
      countIds: payload.length,
    }),
    updateIds: (state, { payload }) => ({
      ...state,
      page: payload,
    }),
    getItems: (state) => ({
      ...state,
      isLoading: true,
    }),
    getItemsSuccess: (state, { payload }) => ({
      ...state,
      items: payload,
      isLoading: false,
    }),
    setCountIds: (state, { payload }) => ({
      ...state,
      countIds: payload,
    }),
    getFilter: (state, { payload }) => ({
      ...state,
      isLoading: true,
    }),
    getFilterSuccess: (state, { payload }) => ({
      ...state,
      isLoading: false,
    }),
    updatePageNumber: (state, { payload }) => ({
      ...state,
      page: payload,
    }),
  },
});

export default dataTableSlice.reducer;

export const {
  getIds,
  getIdsSuccess,
  getItems,
  getItemsSuccess,
  setCountIds,
  getFilter,
  getFilterSuccess,
  updatePageNumber,
  updateIds,
} = dataTableSlice.actions;
