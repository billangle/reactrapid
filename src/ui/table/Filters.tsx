import { Box } from '@mui/system';
import { IFilterItem } from './types';
import { Paper, SelectChangeEvent } from '@mui/material';
import { colorMap } from '../../types/constants';
import SelectFilterBox from './SelectFilterBox';
import { CSSProperties } from 'react';

type Props = {
  filters: IFilterItem[];
  handleChange: (e: SelectChangeEvent<string>, label: string) => void;
  slim?: boolean;
};
function Filters(props: Props) {
  const { filters, handleChange, slim } = props;
  const slimStyles: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    justifyContent: 'space-between',
  };

  const regularStyles: CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 1rem',
    flexWrap: 'wrap',
  };
  return (
    <>
      <h2>Filters</h2>
      <Paper
        square={true}
        elevation={0}
        sx={{ border: `1px solid ${colorMap.silver}`, padding: '1.2rem' }}
      >
        <div style={slim ? slimStyles : regularStyles}>
          {filters?.map((filter) => (
            <SelectFilterBox
              key={filter.cellId}
              filter={filter}
              handleChange={handleChange}
              title={filter.title}
              slim={slim}
            />
          ))}
        </div>
      </Paper>
    </>
  );
}

export default Filters;
