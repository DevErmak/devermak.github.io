import { call, put, select, takeEvery } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';
import { goodsApi } from '@/shared/api/goods';
import { getIdsSuccess, getItemsSuccess } from './slice';
import { IItem } from './types';
import { selectorIds, selectorLimit, selectorPageNumber } from './selectors';

function* workerGetIds(): SagaIterator {
  const result = yield call(goodsApi.getIds);

  yield put(getIdsSuccess(Array.from(new Set(result.data.result))));

  yield put({
    type: 'infoDataTableSlice/getItems',
    payload: {},
  });
}

function* workerGetItems(): SagaIterator {
  const ids = yield select(selectorIds);
  const page = yield select(selectorPageNumber);
  const limit = yield select(selectorLimit);

  const { data } = yield call(goodsApi.getItems, ids, page * limit, limit);

  const res = data.result.reduce((acc: Array<IItem>, item: IItem) => {
    if (acc.find((itemAcc) => itemAcc.id === item.id)) {
      return acc;
    }

    return [...acc, item];
  }, []);

  yield put(getItemsSuccess(res));
}

function* workerGetFilter({
  payload,
}: {
  type: string;
  payload: { field: string; value: string };
}): SagaIterator {
  const { value, field } = payload;

  yield put({ type: 'infoDataTableSlice/updatePageNumber', payload: 0 });

  const resultIds = yield call(goodsApi.getFilterId, field, value);
  const uniqueIds: Array<string> = Array.from(new Set(resultIds.data.result));

  yield put(getIdsSuccess(uniqueIds));

  yield put({ type: 'infoDataTableSlice/setCountIds', payload: uniqueIds.length });
  yield put({
    type: 'infoDataTableSlice/getItems',
    payload: {},
  });
}

function* infoDataTableSaga() {
  yield takeEvery('infoDataTableSlice/getIds', workerGetIds);
  yield takeEvery('infoDataTableSlice/getItems', workerGetItems);
  yield takeEvery('infoDataTableSlice/getFilter', workerGetFilter);
}

export default infoDataTableSaga;
