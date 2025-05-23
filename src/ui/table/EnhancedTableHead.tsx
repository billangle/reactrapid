import {
  Box,
  Checkbox,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  styled,
  tableCellClasses,
  tableSortLabelClasses,
} from '@mui/material';
import { EnhancedTableProps, TableItem } from './types';
import { visuallyHidden } from '@mui/utils';
import { colorMap } from '../../types/constants';

const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: colorMap.paleGrey,
    color: colorMap.midnightGray,
  },
}));

export default function EnhancedTableHead<T extends TableItem>(
  props: EnhancedTableProps<T>,
) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
    headCells,
  } = props;
  const createSortHandler = (
    event: React.MouseEvent<unknown>,
    property: keyof T,
  ) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {props.showSelectCheckbox && (
          <StyledTableCell padding="checkbox">
            <Checkbox
              color="primary"
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={onSelectAllClick}
              inputProps={{
                'aria-label': 'select all',
              }}
            />
          </StyledTableCell>
        )}

        {headCells?.map((headCell) => (
          <StyledTableCell
            sx={{ fontSize: '1.2rem' }}
            key={headCell.id as React.Key}
            align={'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={(e) => createSortHandler(e, headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </StyledTableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
