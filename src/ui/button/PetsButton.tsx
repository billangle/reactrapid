import { CSSProperties } from "react";
import styles from "./PetsButton.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export interface PetsButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  role: "back" | "submit" | "save" | "cancel";
  icon?: JSX.Element | undefined;
  style?: CSSProperties;
}

function PetsButton(props: PetsButtonProps) {
  const { text, role, disabled, icon, style } = props;
  const combinedClassName = `${styles[role]} ${styles.button}`;
  return (
    <button
      style={style}
      className={combinedClassName}
      disabled={disabled}
      {...props}
    >
      {icon ?? icon} {text}
    </button>
  );
}

export default PetsButton;
