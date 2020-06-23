import React, { useContext, memo, useState } from "react";
import styles from "./index.module.scss";
import _ from "lodash";
import { motion, AnimatePresence } from "framer-motion";
import { SessionContext } from "../../components/Session";
import share from "../../util/share";
import { ReactComponent as CollectionBgSvg } from "../../media/collectionBg.svg";
import Button from "../../components/Button";
import quarters from "./quarters.json";
import CollectionItem from "./CollectionItem";
import useKeyPress from "../../hooks/useKeyPress";
import CollectionDetail from "./CollectionDetail";

const Collection = () => {
  const { updateSessionState, updateGameState } = useContext(SessionContext);
  const [selectedQuarter, setSelectedQuarter] = useState<
    keyof typeof quarters
  >();

  //clear collection for debugging
  useKeyPress("r", () => {
    updateGameState((gs) => {
      gs.collection = [];
      gs.visited = [];
      console.log(`Collection reset!`);
    });
  });

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
                <CollectionItem
                  key={key}
                  quarterKey={key}
                  onClick={() => {
                    setSelectedQuarter(key);
                    //remove new label by tracking view
                    updateGameState((gs) => {
                      gs.visited = _(gs.visited || [])
                        .push(key)
                        .uniq()
                        .value();
                    });
                  }}
                />
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

        {selectedQuarter && (
          <CollectionDetail
            quarterKey={selectedQuarter}
            onClose={() => {
              setSelectedQuarter(undefined);
            }}
          />
        )}
      </motion.div>
    </>
  );
};

export default memo(Collection);
