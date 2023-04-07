import React from "react";
import styles from "./Button.module.css";

type Props = {
  children: React.ReactNode;
  type?: "primary" | "secondary";
  style?: Record<string, string | number>;
  className?: string;
  onPress?: (withArgs?: any) => void;
};

const mapBtnStyleToType = {
  primary: "btnPrimary",
  secondary: "btnSecondary",
};

const Button: React.FC<Props> = ({
  children,
  type = "primary",
  style = {},
  className = "",
  onPress
}) => {

  return (
    <button
      className={`${styles.butn} ${styles[mapBtnStyleToType[type]]} ${className}`}
      style={style}
      onClick={onPress}
    >
      {children}
    </button>
  );
};

export default Button;
