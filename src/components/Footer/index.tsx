import React, { memo } from "react";
import styles from "./index.module.scss";
import { ReactComponent as Flag } from "../../media/usFlag.svg";

const Footer = memo(() => {
  return (
    <div className={styles.root}>
      <div className={styles.branding}>
        <a
          href="https://www.usmint.gov/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Flag className={styles.flag} />
          United States Mint
        </a>
      </div>
      <div className={styles.links}>
        <a
          href="https://www.usmint.gov/policies/terms-of-use"
          target="_blank"
          rel="noopener noreferrer"
        >
          Terms of Use
        </a>
        {" | "}
        <a
          href="https://www.usmint.gov/policies/privacy-policy"
          target="_blank"
          rel="noopener noreferrer"
        >
          Privacy
        </a>
      </div>
    </div>
  );
});

export default Footer;
