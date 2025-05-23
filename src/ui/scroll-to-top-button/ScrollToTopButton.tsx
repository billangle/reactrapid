import { useState, useEffect } from 'react';
import styles from './ScrollToTopButton.module.scss';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function ScrollToTopButton(): JSX.Element {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const handleScroll = (): void => {
    if (window.scrollY > 200) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = (): void => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return (
    <button
      className={`${styles['scroll-to-top-button']} ${
        isVisible ? styles.visible : ''
      }`}
      onClick={scrollToTop}
    >
      <FontAwesomeIcon style={{ marginRight: '0.625rem' }} icon={faChevronUp} />
      Back to Top
    </button>
  );
}

export default ScrollToTopButton;
