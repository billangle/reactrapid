import { ReactElement } from 'react';
import CustomAlert from '../alert/CustomAlert';
import styles from './NoSearchFilterItems.module.scss';

type Props = {
  resetFiltersAndSearchTerm: () => void;
  text: string | ReactElement | ReactElement[];
};

function NoSearchFilterItems({ resetFiltersAndSearchTerm, text }: Props) {
  return (
    <div>
      <CustomAlert
        style={{ width: '80%' }}
        type="error"
        slim={true}
        flex={true}
        text={
          <div>
            <strong>{text} </strong> <br />
            Try a different set of terms or{' '}
            <span
              className={styles['reset-banner']}
              onClick={resetFiltersAndSearchTerm}
            >
              reset your parameters for search.
            </span>
          </div>
        }
      />
    </div>
  );
}

export default NoSearchFilterItems;
