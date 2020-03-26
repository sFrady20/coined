import React, { useContext, useEffect, useState } from "react";
import styles from "./index.module.scss";
import _ from "lodash";
import { motion, AnimatePresence } from "framer-motion";
import { SessionContext } from "../../components/Session";
import classnames from "classnames";
import Panel from "../../components/Panel";
import ActionBar from "../../components/ActionBar";
import Banner from "../../components/Banner";
import { useHistory } from "react-router";
import { GAMEPLAY_SCREEN, SCAN_SCREEN } from "../../components/Router";

export const COLLECTION_ITEMS = [
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine"
];

export default () => {
  const { collection, itemCollected, markCollected } = useContext(
    SessionContext
  );
  const history = useHistory();
  const [highlighted, setHighlighted] = useState<string>();

  useEffect(() => {
    if (itemCollected) {
      setHighlighted(itemCollected);
      markCollected();
    }
  }, [itemCollected, markCollected]);

  return (
    <div className={styles.root}>
      <Banner transitions={["fade", "down"]}>
        <div className={styles.logo}>Coined Logo</div>
      </Banner>
      {highlighted && (
        <Panel>
          <h4>Congratulations!</h4>
          <p>You recieved {highlighted}</p>
        </Panel>
      )}
      <Panel>
        <AnimatePresence initial>
          <motion.div
            variants={{
              hidden: {
                transition: {
                  staggerChildren: 0.033
                }
              },
              missing: {
                transition: {
                  staggerChildren: 0.033
                }
              },
              collected: {
                transition: {
                  staggerChildren: 0.033
                }
              }
            }}
            initial={"hidden"}
            animate={"collected"}
            exit={"hidden"}
          >
            {_.map(COLLECTION_ITEMS, item => (
              <motion.div
                className={classnames(
                  styles.item,
                  _.includes(collection, item) && styles[`item--collected`],
                  highlighted === item && styles[`item--highlighted`]
                )}
                variants={{
                  hidden: { opacity: 0, scale: 0.6 },
                  missing: { opacity: 0.7, scale: 1 },
                  collected: { opacity: 1, scale: 1 }
                }}
                key={item}
              >
                {item}
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </Panel>
      <Banner>
        <ActionBar
          actions={{
            Quit: () => {
              history.push(SCAN_SCREEN);
            },
            "Play Again": () => {
              history.push(GAMEPLAY_SCREEN);
            }
          }}
        />
      </Banner>
    </div>
  );
};
