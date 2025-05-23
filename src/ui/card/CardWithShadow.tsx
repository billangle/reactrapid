import { PropsWithChildren } from 'react';
import styles from './Card.module.scss';

const CardWithShadow = ({ children }: PropsWithChildren) => {
  return (
    <div style={{ height: '100%' }} className={styles.card}>
      {children}
    </div>
  );
};

export default CardWithShadow;
