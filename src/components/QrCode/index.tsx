import React, { memo } from "react";
import styles from "./index.module.scss";
import { ReactComponent as CoinedLogo } from "../../media/logo.svg";
import { motion } from "framer-motion";
import QR from "qrcode.react";

const QrCode = memo(() => {
  return (
    <motion.div
      className={styles.root}
      variants={{
        showing: {
          transition: {
            staggerChildren: 0.1,
            when: "beforeChildren",
          },
        },
        hidden: {
          transition: { staggerChildren: 0.1, when: "afterChildren" },
        },
      }}
      initial={"hidden"}
      animate={"showing"}
      exit={"hidden"}
    >
      <div className={styles.container}>
        <motion.div
          variants={{
            showing: { opacity: 1, scale: 1 },
            hidden: { opacity: 0, scale: 0.9 },
          }}
        >
          <CoinedLogo className={styles.title} />
        </motion.div>
        <motion.p
          className={styles.info}
          variants={{
            showing: { opacity: 1, scale: 1 },
            hidden: { opacity: 0, scale: 0.9 },
          }}
        >
          George Washington’s quarter collection is up for grabs. Do you have
          what it takes to win? This is [NAME TBD], a game of fact vs. fiction,
          of you vs. George.
        </motion.p>
        <motion.div
          variants={{
            showing: { opacity: 1, scale: 1 },
            hidden: { opacity: 0, scale: 0.9 },
          }}
          className={styles.qrCode}
        >
          <QR
            renderAs="svg"
            fgColor="black"
            bgColor="white"
            includeMargin
            size={350}
            value={window.location.href.replace(/\/qr$/i, "")}
          />
        </motion.div>
        <motion.p
          variants={{
            showing: { opacity: 1, scale: 1 },
            hidden: { opacity: 0, scale: 0.9 },
          }}
          className={styles.instructions}
        >
          To play [NAME TBD], scan the QR code on your phone’s camera.
        </motion.p>
      </div>
    </motion.div>
  );
});

export default QrCode;
