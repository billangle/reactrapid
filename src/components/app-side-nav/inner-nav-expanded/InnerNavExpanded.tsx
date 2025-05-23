import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleUser,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./InnerNavExpanded.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { signout } from "../../../_store/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../../../_store/hooks";
import { useCurrentModule } from "../../../modules/reports/hooks/useCurrentModule";
import { useNavItems } from "../../../hooks/useNavItems";
import { colorMap } from "../../../types/constants";
import { USER_ROLES } from "../../../types/enums";

export default function InnerNavExpanded() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [navItems, onSelectNavItem] = useNavItems();

  const signOut = () => {
    dispatch(signout());
    navigate("/");
  };
  const userInfo = useAppSelector((state) => state.auth.user);

  const userRole = userInfo?.isSuperUser
    ? USER_ROLES.SUPERUSER
    : USER_ROLES.USER;

  return (
    <>
      <div className="display-flex flex-column margin-top-05">
        <section className={styles["inner-header-container"]}>
          <FontAwesomeIcon
            icon={faCircleUser}
            className={styles["header-avatar"]}
            style={{ color: colorMap.paleBlue }}
          />
          <div className={styles["header-content"]}>
            <p className="margin-top-1 margin-bottom-05 padding-left-1">
              <span className={styles["header-content-user-info"]}>
                Welcome, {userInfo ? userInfo.name : ""}
              </span>
            </p>
            <div className="display-inline-flex margin-top-05 padding-left-05">
              <a className={styles["header-action-btn"]} onClick={signOut}>
                <p className="margin-y-0 margin-right-3">
                  <small>
                    <FontAwesomeIcon icon={faRightFromBracket} /> Sign out
                  </small>
                </p>
              </a>
              {/*<Link to="/user-help" style={{ textDecoration: 'none' }}>
                <a className={styles['header-action-btn-help']}>
                  <p className="margin-y-0 text-secondary-light">
                    <FontAwesomeIcon
                      icon={faCircleQuestion}
                      size="xs"
                      style={{ verticalAlign: 'middle' }}
                    />{' '}
                    <small>Get Help</small>
                  </p>
                </a>
              </Link>*/}
            </div>
          </div>
        </section>
        <section className={styles["inner-container"]}>
          {}
          {navItems?.map((item) => {
            if (!item.roles.includes(userRole)) {
              return <></>;
            }
            return (
              <Link
                key={item.key}
                to={item.url}
                onClick={() => onSelectNavItem(item)}
                className={styles["nav-item"]}
              >
                {item.isSelected && (
                  <div className={styles["selected-border"]}></div>
                )}
                <FontAwesomeIcon
                  icon={item.icon}
                  className={styles["nav-icon"]}
                />
                <p className={styles["nav-label"]}>{item.label}</p>
              </Link>
            );
          })}
        </section>
      </div>
    </>
  );
}
