import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

function ScrollToTop() {
  const location = useLocation();
  const prevLocationRef = useRef(location);

  useEffect(() => {
    // Compare previous and current locations
    const prevPathname = prevLocationRef.current.pathname;
    const currentPathname = location.pathname;

    // If only base url is changed, scroll to top
    if (prevPathname !== currentPathname) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Update the ref with the current location for the next comparison
    prevLocationRef.current = location;
  }, [location]);
  return null;
}

export default ScrollToTop;
