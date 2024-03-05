import './page.scss';
import { ChangeEvent, useEffect, useState } from 'react';

import {
  Button,
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { getFilter, getIds } from '@/entities/data-table/model/slice';
import { DataTable } from '@/widgets';
import { TABLE_FIELDS } from '@/shared/constants';

export const Home: React.FC = () => {
  const [isDirtyFilter, setIsDirtyFilter] = useState<boolean>(false);
  const [selectedFilter, setSelectedFilter] = useState<TABLE_FIELDS>();
  const [filterValue, setFilterValue] = useState<string>('');
  const dispatch = useDispatch();

  const handleChangeTypeFilter = (event: SelectChangeEvent) => {
    setSelectedFilter(event.target.value as TABLE_FIELDS);
  };

  const handleResetFilter = () => {
    setSelectedFilter(undefined);

    if (isDirtyFilter) {
      setIsDirtyFilter(false);
      dispatch(getIds());
    }
  };

  const handleChangeFilterValue = (event: ChangeEvent<HTMLInputElement>) => {
    setFilterValue(event.target.value);
  };

  const getFilterIds = () => {
    if (filterValue !== '') {
      let value: string | number = filterValue;

      if (selectedFilter === TABLE_FIELDS.PRICE) {
        value = Number(filterValue);

        if (isNaN(value)) {
          alert('Следует ввести число');
          setFilterValue('');

          return;
        }
      }

      setIsDirtyFilter(true);
      dispatch(getFilter({ field: selectedFilter, value: value }));
    }
  };

  useEffect(() => {
    dispatch(getIds());
  }, []);

  return (
    <div className="page-home">
      <div className="filter-container">
        <FormControl variant="filled" sx={{ minWidth: 200 }}>
          <InputLabel>Select filter</InputLabel>
          <Select sx={{ minWidth: 200 }} value={selectedFilter} onChange={handleChangeTypeFilter}>
            <MenuItem value={'product'}>Product</MenuItem>
            <MenuItem value={'price'}>Price</MenuItem>
            <MenuItem value={'brand'}>Brand</MenuItem>
          </Select>
        </FormControl>
        {selectedFilter ? (
          <div>
            <Input
              placeholder={'enter a value'}
              onChange={handleChangeFilterValue}
              value={filterValue}
            />
            <Button onClick={getFilterIds} variant="outlined" color="success" size="small">
              make filter
            </Button>
            {isDirtyFilter ? (
              <Button onClick={handleResetFilter} variant="outlined" color="error" size="small">
                reset filter
              </Button>
            ) : null}
          </div>
        ) : null}
      </div>
      <DataTable />
    </div>
  );
};
