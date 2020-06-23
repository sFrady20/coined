import React, { useContext, memo } from "react";
import styles from "./index.module.scss";
import _ from "lodash";
import { motion, AnimatePresence } from "framer-motion";
import { SessionContext } from "../../components/Session";
import share from "../../util/share";
import { ReactComponent as CollectionBgSvg } from "../../media/collectionBg.svg";
import Button from "../../components/Button";
import quarters from "./quarters.json";
import CollectionItem from "./CollectionItem";

const Collection = () => {
  const { updateSessionState } = useContext(SessionContext);

  return (
    <>
      <motion.div
        className={styles.container}
        initial={{ translateY: `100%` }}
        animate={{ translateY: 0 }}
        exit={{ translateY: `100%` }}
      >
        <CollectionBgSvg />
        <div className={styles.content}>
          <AnimatePresence initial>
            <motion.div
              className={styles.items}
              variants={{
                hidden: {
                  transition: {
                    staggerChildren: 0.033,
                  },
                },
                missing: {
                  transition: {
                    staggerChildren: 0.033,
                  },
                },
                collected: {
                  transition: {
                    staggerChildren: 0.033,
                  },
                },
              }}
              initial={"hidden"}
              animate={"collected"}
              exit={"hidden"}
            >
              {_.map(quarters, (quarter, key: keyof typeof quarters) => (
                <CollectionItem key={key} quarterKey={key} />
              ))}
            </motion.div>
          </AnimatePresence>
          <div className={styles.actions}>
            <Button
              type="secondary"
              text="SHARE"
              onClick={() => {
                share({
                  url: window.location.href,
                  title: "title",
                  text: "text",
                });
              }}
            />
            <Button
              type="primary"
              text="PLAY AGAIN"
              onClick={() => {
                updateSessionState((s) => {
                  s.phase = "category";
                  s.selectedCategory = undefined;
                });
              }}
            />
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default memo(Collection);
