import { ReactNode } from 'react';
// eslint-disable-next-line import/named
import { Popper, PopperProps, Fade, Box } from '@mui/material';
import { colorMap } from '../../types/constants';

interface CustomPopperProps extends PopperProps {
  children: ReactNode;
  popperStyle?: { [key: string]: string };
  popperAnchorEl: HTMLElement | SVGElement | null;
}

function CustomPopper(props: CustomPopperProps) {
  return (
    <Popper
      anchorEl={props.popperAnchorEl}
      open={props.open}
      transition
      style={props.popperStyle}
    >
      {({ TransitionProps }) => (
        <Fade {...TransitionProps} timeout={350}>
          <Box
            style={{
              backgroundColor: 'white',
              borderRadius: '10px',
              border: `2px solid ${colorMap.primaryBlue}`,
              padding: '1rem',
            }}
          >
            {props.children}
          </Box>
        </Fade>
      )}
    </Popper>
  );
}

export default CustomPopper;
