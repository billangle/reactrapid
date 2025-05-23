import { MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { Box } from '@mui/system';
import { useState, CSSProperties } from 'react';
import { IFilterItem } from './types';

type Props = {
  title?: string;
  handleChange: (e: SelectChangeEvent<string>, cellId: string) => void;
  filter: IFilterItem;
  slim?: boolean;
  value?: any;
};

function SelectFilterBox(props: Props) {
  const { title = '', handleChange, filter, slim } = props;
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
    <Box sx={slim ? slimStyles : regularStyles}>
      <h3 style={{ fontSize: '18px' }}>{title}:</h3>
      <Select
        onChange={(e) => {
          setCurrentSelection(e.target.value);
          handleChange(e, filter.cellId);
        }}
        value={props?.value || currentSelection || filter.defaultSelection}
        sx={{ width: '60%', borderRadius: 0 }}
        defaultValue="All"
      >
        <MenuItem selected value="All">
          All
        </MenuItem>
        {filter.options?.map((option) => (
          <MenuItem key={option.id} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </Box>
  );
}

export default SelectFilterBox;
