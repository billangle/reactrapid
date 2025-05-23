import { CSSProperties } from 'react';
import classes from './ReturnToTop.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons';

type Props = {
  customStyles?: CSSProperties;
};

function ReturnToTop(props: Props) {
  const containerStyles: CSSProperties = {
    display: 'inline-block',
    cursor: 'pointer',
    ...props.customStyles,
  };
  return (
    <>
      <div
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        style={containerStyles}
      >
        <FontAwesomeIcon className={classes.icon} icon={faChevronUp} />
        <a className={classes['to-top']} type="button">
          Return to top
        </a>
      </div>
    </>
  );
}

export default ReturnToTop;
