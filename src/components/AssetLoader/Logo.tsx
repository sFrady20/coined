import React, { memo, useContext } from "react";
import styles from "./Logo.module.scss";
import { SessionContext } from "../Session";
import { AnimatePresence, motion } from "framer-motion";
import { ReactComponent as SVG } from "../../media/logo.svg";
//import { ReactComponent as CoinedSvg } from "../../media/coined.svg";

const Logo = memo(() => {
  const { sessionState } = useContext(SessionContext);
  const { phase } = sessionState;

  const logoType = phase === "scan" || phase === "intro" ? "title" : "logo";

  return (
    <AnimatePresence exitBeforeEnter>
      <motion.div
        className={styles[logoType]}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        key={logoType}
      >
        {logoType === "title" ? <SVG /> : undefined}
      </motion.div>
    </AnimatePresence>
  );
});

export default Logo;
