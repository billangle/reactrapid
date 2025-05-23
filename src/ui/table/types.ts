import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';
import { PetsOption } from '../../types/types';

export type Order = 'asc' | 'desc';

export type TableItem = {
  [key: string]: string | number | ReactJSXElement;
};

export type IFilterItem = {
  title: string;
  options: PetsOption[];
  cellId: string;
  defaultSelection?: string;
};

export type HeadCell<T extends TableItem> = {
  id: keyof T;
  numeric: boolean;
  disablePadding: boolean;
  label: string;
  filterable?: boolean;
};

export interface CustomProps<T extends TableItem> {
  headCells: HeadCell<T>[];
  data: T[];
  enhancedTableHead?: boolean;
  enhancedTableToolbar?: boolean;
  showSelectCheckbox?: boolean;
  selectOnClick?: boolean;
  isPaginated?: boolean;
  filters?: IFilterItem[];
  slim?: boolean;
  onRowClicked?: (data: T) => void;
}

export interface EnhancedTableProps<T extends TableItem>
  extends CustomProps<T> {
  numSelected: number;
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof T) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: keyof T | undefined;
  rowCount: number;
}

export interface EnhancedTableToolbarProps {
  numSelected: number;
}

export type SelectedFilters<T> = {
  [key in IFilterItem['cellId']]?: string;
} & {
  [key in keyof T]?: string;
};
