import { MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { Box } from '@mui/system';
import {
  useState,
  CSSProperties,
  useImperativeHandle,
  forwardRef,
} from 'react';
import { IFilterItem } from '../table/types';

export type FilterBoxRef = {
  resetFilter: () => void;
};

type Props = {
  title?: string;
  handleChange: (e: SelectChangeEvent<string>, cellId: string) => void;
  filter: IFilterItem;
  slim?: boolean;
  customStyles?: CSSProperties;
  selectHeight?: string;
};

const SelectFilterBox = forwardRef<FilterBoxRef, Props>((props: Props, ref) => {
  useImperativeHandle(ref, () => ({
    resetFilter: resetFilter,
  }));
  const {
    title = '',
    handleChange,
    filter,
    slim,
    customStyles,
    selectHeight,
  } = props;

  const resetFilter = () => {
    setCurrentSelection('');
  };
  const [currentSelection, setCurrentSelection] = useState<string>('');

  const slimStyles: CSSProperties = {
    width: '30%',
    display: 'flex',
    gap: '.5rem',
    justifyContent: 'space-between',
    height: '40px',
    alignItems: 'center',
  };
  const regularStyles: CSSProperties = {
    minWidth: '20.625rem',
    display: 'flex',
    height: '3rem',
    gap: '1rem',
    alignItems: 'center',
    justifyContent: 'end',
    margin: '0.625rem 0',
  };

  return (
    <Box sx={customStyles ? customStyles : slim ? slimStyles : regularStyles}>
      <h3 style={{ fontSize: '18px' }}>{title}:</h3>
      <Select
        onChange={(e) => {
          setCurrentSelection(e.target.value);
          handleChange(e, filter.cellId);
        }}
        value={currentSelection || filter.defaultSelection}
        sx={{
          width: '60%',
          borderRadius: 0,
          height: selectHeight ? selectHeight : undefined,
        }}
        defaultValue={filter.defaultSelection ? filter.defaultSelection : 'All'}
      >
        <MenuItem value="All">All</MenuItem>
        {filter.options?.map((option) => (
          <MenuItem key={option.id} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </Box>
  );
});

SelectFilterBox.displayName = 'SelectFilterBox';

export default SelectFilterBox;
