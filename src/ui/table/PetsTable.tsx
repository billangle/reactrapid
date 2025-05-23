import { isValidElement, useMemo, useState } from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import { CustomProps, Order, SelectedFilters, TableItem } from './types';
import EnhancedTableHead from './EnhancedTableHead';
import EnhancedTableToolbar from './EnhancedTableToolbar';
import Filters from './Filters';
import { SelectChangeEvent } from '@mui/material';
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (isValidElement(a[orderBy])) {
    if (
      (b[orderBy] as unknown as ReactJSXElement).props?.filterKey <
      (a[orderBy] as unknown as ReactJSXElement).props?.filterKey
    ) {
      return -1;
    }
    if (
      (b[orderBy] as unknown as ReactJSXElement).props?.filterKey >
      (a[orderBy] as unknown as ReactJSXElement).props?.filterKey
    ) {
      return 1;
    }
    return 0;
  } else {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }
}

function getComparator<T, Key extends keyof T>(
  order: Order,
  orderBy: Key,
): (a: T, b: T) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(
  array: readonly T[],
  comparator: (a: T, b: T) => number,
) {
  const stabilizedThis = array?.map((el, index) => [el, index] as [T, number]);
  stabilizedThis?.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis?.map((el) => el[0]);
}

export default function PetsTable<T extends TableItem>({
  data,
  headCells,
  enhancedTableToolbar,
  selectOnClick,
  showSelectCheckbox,
  isPaginated,
  filters,
  slim,
  onRowClicked,
}: CustomProps<T>) {
  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<keyof T>(
    data && data.length && Object.keys(data[0])?.[0],
  );
  const [selected, setSelected] = useState<readonly string[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedFilters, setSelectedFilters] = useState<SelectedFilters<T>>(); // ex: {responsive: 'yes', firm: 'xyz'}
  const handleFilterSelectionChange = (
    e: SelectChangeEvent<string>,
    filter: string,
  ) => {
    const key = e.target.value;
    setSelectedFilters(
      (prevFilters) =>
        ({ ...prevFilters, [filter]: key } as SelectedFilters<T>),
    );
  };
  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof T,
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (
    event: React.ChangeEvent<HTMLInputElement>,
    items: any[],
  ) => {
    if (event.target.checked) {
      const newSelected = items?.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (
    event: React.MouseEvent<unknown>,
    name: string,
    row: T,
  ) => {
    if (onRowClicked) {
      onRowClicked(row);
    }
    if (!selectOnClick) return;
    const selectedIndex = selected.indexOf(name);
    let newSelected: readonly string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (name: string) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty props.data.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

  const visibleRows = useMemo(() => {
    const filteredData = data?.filter((item) => {
      // Check if each selected filter key has a matching value in the item [mdev]
      for (const key in selectedFilters) {
        const itemValue = isValidElement(item[key])
          ? (item[key] as ReactJSXElement).props?.filterKey
          : item[key];
        if (
          selectedFilters[key] &&
          selectedFilters[key] !== 'All' &&
          itemValue !== selectedFilters[key]
        ) {
          return false;
        }
      }
      return true;
    });
    if (isPaginated) {
      return stableSort(filteredData, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage,
      );
    }
    return stableSort(filteredData, getComparator(order, orderBy));
  }, [order, orderBy, page, rowsPerPage, data, selectedFilters]);

  return (
    <>
      {filters && filters?.length > 0 && (
        <div style={{ margin: '2rem 0' }}>
          <Filters
            slim={slim}
            filters={filters}
            handleChange={handleFilterSelectionChange}
          />
        </div>
      )}
      <Box sx={{ width: '100%' }}>
        <Paper sx={{ width: '100%', mb: 2 }}>
          {enhancedTableToolbar && (
            <EnhancedTableToolbar numSelected={selected.length} />
          )}
          <TableContainer>
            <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
              <EnhancedTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleSelectAllClick(e, data)
                }
                onRequestSort={handleRequestSort}
                rowCount={data.length}
                headCells={headCells}
                data={data}
              />

              <TableBody>
                {visibleRows?.map((row: any, index) => {
                  const isItemSelected = isSelected(row.name);
                  const labelId = `enhanced-table-checkbox-${index}`;
                  // @todo this is not a property of row
                  // define row uniqueness  properties
                  const key = row.name;
                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, key, row)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={key}
                      selected={isItemSelected}
                      sx={{ cursor: 'pointer' }}
                    >
                      {showSelectCheckbox && (
                        <TableCell padding="checkbox">
                          <Checkbox
                            color="primary"
                            checked={isItemSelected}
                            inputProps={{
                              'aria-labelledby': labelId,
                            }}
                          />
                        </TableCell>
                      )}
                      {headCells?.map((cell) => (
                        <TableCell
                          sx={{ width: '200px' }}
                          title={
                            typeof row[cell.id] === 'string' ? row[cell.id] : ''
                          }
                          key={cell.id as React.Key}
                          align="left"
                        >
                          {(row[cell.id] as string)?.length > 50
                            ? (row[cell.id] as string)?.substring(0, 50) + '...'
                            : row[cell.id]}
                        </TableCell>
                      ))}
                    </TableRow>
                  );
                })}
                {emptyRows > 0 && (
                  <TableRow
                    style={{
                      height: 53 * emptyRows,
                    }}
                  >
                    <TableCell colSpan={10} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          {isPaginated && (
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={data.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          )}
        </Paper>
      </Box>
    </>
  );
}
