import { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import styles from './BackArrow.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { colorMap } from '../../types/constants';

type Props = {
  text: string | ReactElement;
  url: string;
  customStyles?: React.CSSProperties;
};

function BackArrow(props: Props) {
  return (
    <div className={styles.container}>
      <Link to={props.url}>
        <FontAwesomeIcon
          style={{ marginRight: '.4rem' }}
          color={colorMap.primaryBlue}
          icon={faChevronLeft}
        />
        {props.text}
      </Link>
    </div>
  );
}

export default BackArrow;
