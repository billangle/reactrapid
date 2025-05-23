import { useImperativeHandle, useRef, CSSProperties, forwardRef } from 'react';
import { IFilterItem } from '../table/types';
import { Paper, SelectChangeEvent } from '@mui/material';
import { colorMap } from '../../types/constants';
import SelectFilterBox from './SelectFilterBox';

export type FitlerGroupRef = {
  resetFilters: () => void;
};

type Props = {
  filters: IFilterItem[];
  handleChange: (e: SelectChangeEvent<string>, label: string) => void;
  slim?: boolean;
  filterSelectHeight?: string;
  customFilterItemStyles?: CSSProperties;
  customFilterStyles?: CSSProperties;
  noBorder?: boolean;
  hideTitle?: boolean;
};
const PetsFilterGroup = forwardRef<FitlerGroupRef, Props>(
  (props: Props, ref) => {
    useImperativeHandle(ref, () => ({
      resetFilters: resetFilters,
    }));
    const resetFilters = () => {
      filterChildRefs.current.forEach((filterRef) => {
        (filterRef as any)?.resetFilter();
      });
    };
    const {
      filters,
      handleChange,
      slim,
      customFilterStyles,
      filterSelectHeight,
      customFilterItemStyles,
    } = props;
    const filterChildRefs = useRef<React.RefObject<any>[]>([]);
    const addChildRef = (filterRef: React.RefObject<any>, id: number) => {
      filterChildRefs.current[id] = filterRef;
    };
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
        {!props.hideTitle && <h2>Filters</h2>}
        <Paper
          square={true}
          elevation={0}
          sx={{
            border: `${props.noBorder ? '0px' : '1px'} solid ${
              colorMap.silver
            }`,
            padding: '1.2rem',
          }}
        >
          <div
            style={
              customFilterStyles
                ? { ...regularStyles, ...customFilterStyles }
                : slim
                ? slimStyles
                : regularStyles
            }
          >
            {filters?.map((filter, idx) => (
              <SelectFilterBox
                key={filter.cellId}
                filter={filter}
                ref={(filterRef: any) => addChildRef(filterRef, idx)}
                handleChange={handleChange}
                title={filter.title}
                selectHeight={filterSelectHeight}
                customStyles={customFilterItemStyles}
                slim={slim}
              />
            ))}
          </div>
        </Paper>
      </>
    );
  },
);
PetsFilterGroup.displayName = 'PetsFilterGroup';
export default PetsFilterGroup;
