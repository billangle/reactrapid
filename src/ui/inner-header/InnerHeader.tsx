import styles from './InnerHeader.module.scss';
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';

type Props = {
  title?: string;
  subtitle?: string | ReactJSXElement;
};
function InnerHeader(props: Props) {
  const { title, subtitle } = props;
  return (
    <div>
      <div className={styles['inner-header']}>
        {title && <h1>{title}</h1>}
        <div className={styles.subtitle}>{subtitle && subtitle}</div>
      </div>
    </div>
  );
}

export default InnerHeader;
