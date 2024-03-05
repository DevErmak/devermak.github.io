import './data-table.scss';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectorCountIds,
  selectorIsLoading,
  selectorItems,
  selectorPageNumber,
} from '@/entities/data-table/model/selectors';
import { getItems, updatePageNumber } from '@/entities/data-table/model/slice';
import uuid from 'react-uuid';
import { TABLE_FIELDS } from '@/shared/constants';

interface IDataTableProps {}

export const DataTable: React.FC<IDataTableProps> = () => {
  const countIds = useSelector(selectorCountIds);
  const page = useSelector(selectorPageNumber);
  const items = useSelector(selectorItems);
  const isLoading = useSelector(selectorIsLoading);
  const dispatch = useDispatch();

  const handleChangePage = (_: unknown, newPage: number) => {
    dispatch(updatePageNumber(newPage));
    dispatch(getItems());
  };

  if (isLoading) {
    return (
      <div id="loader-container" className="loader-container">
        <span className="loader"></span>
      </div>
    );
  }

  return (
    <Paper>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {(Object.keys(TABLE_FIELDS) as Array<keyof typeof TABLE_FIELDS>).map((item) => (
                <TableCell
                  sx={{
                    fontWeight: 600,
                  }}
                  key={uuid()}
                >
                  {item}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {items.length > 0 ? (
              items.map((data) => (
                <TableRow key={uuid()}>
                  <TableCell>{data.id}</TableCell>
                  <TableCell>{data.product}</TableCell>
                  <TableCell>{data.price}</TableCell>
                  <TableCell>{data.brand}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow key={uuid()}>
                <TableCell colSpan={4}>
                  <Typography className="not-found" align="center">
                    Not found data
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        count={countIds}
        onPageChange={handleChangePage}
        page={page}
        rowsPerPage={50}
        rowsPerPageOptions={[50]}
        component="div"
      />
    </Paper>
  );
};
