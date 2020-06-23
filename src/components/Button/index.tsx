import React, { memo } from "react";
import styles from "./index.module.scss";

const Button = memo(
  (props: {
    text: string;
    type?: "default" | "primary" | "secondary";
    onClick?: () => void;
  }) => {
    const { type = "default", text, onClick } = props;
    return (
      <div
        className={styles[type]}
        onClick={() => onClick && setTimeout(onClick, 200)}
      >
        {text}
      </div>
    );
  }
);

export default Button;
