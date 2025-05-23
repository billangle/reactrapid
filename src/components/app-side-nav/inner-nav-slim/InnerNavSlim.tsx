import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import styles from "./InnerNavSlim.module.scss";
import { useAppSelector } from "../../../_store/hooks";
import { useNavItems } from "../../../hooks/useNavItems";
import { USER_ROLES } from "../../../types/enums";

export default function InnerNavSlim() {
  const [navItems, onSelectNavItem] = useNavItems();

  const userInfo = useAppSelector((state) => state.auth.user);

  const userRole = userInfo?.isSuperUser
    ? USER_ROLES.SUPERUSER
    : USER_ROLES.USER;

  return (
    <>
      <div className={styles["inner-nav-container"]}>
        <FontAwesomeIcon
          icon={faCircleUser}
          style={{ color: "#EFF9FF", fontSize: "46px", marginBottom: "18px" }}
        />
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
              <FontAwesomeIcon
                icon={item.icon}
                className={styles["nav-icon"]}
              />
              <p className={styles["nav-label"]}>{item.label}</p>
              {item.isSelected && (
                <div className={styles["selected-border"]}></div>
              )}
            </Link>
          );
        })}
      </div>
    </>
  );
}
