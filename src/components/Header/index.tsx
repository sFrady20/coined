import React, { memo } from "react";
import styles from "./index.module.scss";
import { ReactComponent as Logo } from "../../media/header.svg";

const Header = memo(() => {
  return (
    <div className={styles.root}>
      <Logo className={styles.logo} />
    </div>
  );
});

export default Header;
