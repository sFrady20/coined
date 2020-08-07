import React, { memo } from "react";
import styles from "./index.module.scss";
import { ReactComponent as Flag } from "../../media/usFlag.svg";

const Footer = memo(() => {
  return (
    <div className={styles.root}>
      <div className={styles.branding}>
        <a href="">
          <Flag className={styles.flag} />
          United States Mint
        </a>
      </div>
      <div className={styles.links}>
        <a href="">Terms of Use</a>
        {" | "}
        <a href="">Privacy</a>
      </div>
    </div>
  );
});

export default Footer;
