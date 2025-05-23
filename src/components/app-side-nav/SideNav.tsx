import { useState, useRef, useLayoutEffect, useEffect } from 'react';
import styles from './SideNav.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronRight,
  faChevronLeft,
} from '@fortawesome/free-solid-svg-icons';
import { Button } from '@trussworks/react-uswds';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { AppDispatch } from '../../_store/store';
import { config } from '../../config/config';
import { alertTopBannerHeight } from '../../types/constants';
import InnerNavExpanded from './inner-nav-expanded/InnerNavExpanded';
import InnerNavSlim from '../../components/app-side-nav/inner-nav-slim/InnerNavSlim';
import { setSideNavStatus } from '../../_store/features/app/appSlice';

// If the url includes this urls, then the side bar will be kept as expanded
// we don't have a way to collapse the side bar.
const SIDEBAR_EXPAND_MANDATORY_URLS = ['something'];

let HEADER_HEIGHT = 145;
if (config.ENV != 'prod') {
  HEADER_HEIGHT += alertTopBannerHeight;
}
export default function SideNav() {
  const [isCollapsed, setCollapse] = useState(true);
  const [isExpandMandatory, setIsExpandMandatory] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const [navYPos, setNavYPos] = useState<number>(HEADER_HEIGHT);
  const location = useLocation();
  const { pathname } = location;

  useEffect(() => {
    const expandMand = SIDEBAR_EXPAND_MANDATORY_URLS?.some((ur) => {
      return pathname.includes(ur);
    });
    setIsExpandMandatory(expandMand);
    setCollapse(!expandMand);
    dispatch(
      setSideNavStatus({
        isCollapsed,
        isScreenNeedToPushRight: expandMand,
      }),
    );
  }, [pathname]);

  const stickyNav = useRef<HTMLInputElement>(null);
  useLayoutEffect(() => {
    const topNav = () => {
      if (stickyNav.current) {
        setNavYPos(
          HEADER_HEIGHT - window.pageYOffset > 0
            ? HEADER_HEIGHT - window.pageYOffset
            : 0,
        );
      }
    };
    window.addEventListener('scroll', topNav);
  }, []);

  return (
    <nav
      id="sideNav"
      className={`${styles.fullMinusHeader} ${'shadow-2'} ${
        isCollapsed ? `${styles.collapseNav}` : `${styles.expandNav}`
      }`}
      style={{ top: `${navYPos}px` }}
      ref={stickyNav}
    >
      {!isExpandMandatory && (
        <Button
          type="button"
          unstyled
          className={styles.UsaBtn}
          onClick={() => setCollapse(!isCollapsed)}
        >
          <span className={`${isCollapsed ? `${'opacity-show-hover'}` : ``}`}>
            {!isCollapsed ? 'Collapse' : 'Expand'}
          </span>
          {isCollapsed ? (
            <FontAwesomeIcon
              icon={faChevronRight}
              className="font-body-2xs padding-left-1"
            />
          ) : (
            <FontAwesomeIcon
              icon={faChevronLeft}
              className="font-body-2xs padding-left-1"
            />
          )}
        </Button>
      )}
      <div className={styles['nav-content']}>
        <div
          className={`${!isCollapsed ? 'display-none' : 'opacity-show-fast'}`}
        >
          <InnerNavSlim />
        </div>
        <div
          className={`${
            !isCollapsed ? 'display-block opacity-show-fast' : 'display-none'
          }`}
        >
          <InnerNavExpanded />
        </div>
      </div>
    </nav>
  );
}
