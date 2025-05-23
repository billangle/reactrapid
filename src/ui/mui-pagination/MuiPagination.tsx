import * as React from 'react';
import usePagination from '@mui/material/usePagination';
import { styled } from '@mui/material/styles';
import {
  faEllipsis,
  faChevronRight,
  faChevronLeft,
} from '@fortawesome/free-solid-svg-icons';
import { Button } from '@trussworks/react-uswds';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type Props = {
  currentPage: number;
  pageCount: number;
  onChangePage?: (page: number | null) => void;
};

const List = styled('ul')({
  listStyle: 'none',
  padding: 0,
  margin: 0,
  display: 'flex',
});

const StyledButton = styled(Button)({
  border: '1px solid #DFE1E2',
  boxShadow: 'none',
});

const SelectedStyledButton = styled(StyledButton)({
  background: '#1D202B',
  color: 'white',
});

const UnstyledButton = styled(Button)({
  height: '100%',
  marginLeft: '10px',
  marginRight: '10px',
  textDecoration: 'none!important',
  fontFamily: 'Roboto',
  fontSize: '16px',
  fontWeight: '700',
  lineHeight: '22px',
  letterSpacing: '0em',
  textAlign: 'left',
  '&:disabled': {
    backgroundColor: 'white!important',
  },
});

export default function MuiPagination(props: Props) {
  const { pageCount, currentPage, onChangePage } = props;
  const { items } = usePagination({
    count: pageCount,
    page: currentPage,
  });

  const onClickBtn = (page: number | null) => {
    if (onChangePage) {
      onChangePage(page);
    }
  };
  return (
    <nav>
      <List>
        {items.map(({ page, type, selected, onClick, ...item }, index) => {
          let children = null;

          if (type === 'start-ellipsis' || type === 'end-ellipsis') {
            children = (
              <div className="height-full display-flex flex-align-center margin-right-1">
                <FontAwesomeIcon icon={faEllipsis} />
              </div>
            );
          } else if (type === 'page') {
            children = selected ? (
              <SelectedStyledButton
                outline
                type="button"
                onClick={(evt) => {
                  onClick(evt);
                  onClickBtn(page);
                }}
                {...item}
              >
                {page}
              </SelectedStyledButton>
            ) : (
              <StyledButton
                outline
                type="button"
                onClick={(evt) => {
                  onClick(evt);
                  onClickBtn(page);
                }}
                {...item}
              >
                {page}
              </StyledButton>
            );
          } else {
            children = !item.disabled && (
              <UnstyledButton
                unstyled
                type="button"
                onClick={(evt) => {
                  onClick(evt);
                  onClickBtn(page);
                }}
                {...item}
              >
                {type === 'previous' && (
                  <div className="height-full display-flex flex-align-center margin-right-1 display-inline">
                    <FontAwesomeIcon icon={faChevronLeft} />
                  </div>
                )}
                {type.replace(/^\w/, (c) => c.toUpperCase())}
                {type === 'next' && (
                  <div className="height-full display-flex flex-align-center margin-left-1 display-inline">
                    <FontAwesomeIcon icon={faChevronRight} />
                  </div>
                )}
              </UnstyledButton>
            );
          }

          return <li key={index}>{children}</li>;
        })}
      </List>
    </nav>
  );
}
