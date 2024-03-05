import { instance } from '.';

const getItems = async (ids: Array<string>, offset: number, limit: number) => {
  return await instance.post('/', {
    action: 'get_items',
    params: {
      ids: ids.slice(offset, ids.length <= offset ? ids.length : offset + limit),
    },
  });
};

const getIds = async () => {
  return await instance.post('/', {
    action: 'get_ids',
  });
};

const getFilterId = async (selectedFilter: string, filterValue: string | number) => {
  return await instance.post('/', {
    action: 'filter',
    params: { [selectedFilter]: filterValue },
  });
};

export const goodsApi = {
  getItems,
  getIds,
  getFilterId,
};
