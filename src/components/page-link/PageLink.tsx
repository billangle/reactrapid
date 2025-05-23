import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Box } from '@mui/system';
import { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import { colorMap } from '../../types/constants';

type Props = {
  title?: string | ReactElement;
  text?: string | ReactElement | ReactElement[];
  url: string;
  disabled?: boolean;
};

const PageLink = ({ title, text, url, disabled }: Props) => {
  return (
    <Box>
      <Link
        style={{
          textDecoration: 'none',
          pointerEvents: disabled ? 'none' : 'auto',
          color: disabled ? colorMap.greyLabel : colorMap.primaryBlue,
          cursor: disabled ? 'not-allowed' : 'pointer',
        }}
        to={url}
      >
        <h2 style={{ textDecoration: 'underline', marginBottom: '.5rem' }}>
          {title}
        </h2>
        <div className="display-flex flex-row flex-align-center flex-justify">
          <p style={{ color: colorMap.midnightGray }}>{text}</p>
          <FontAwesomeIcon icon={faChevronRight} />
        </div>
      </Link>
    </Box>
  );
};

export default PageLink;
