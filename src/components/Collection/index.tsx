import React, { useContext, memo, useState, useMemo } from "react";
import styles from "./index.module.scss";
import _ from "lodash";
import { motion, AnimatePresence } from "framer-motion";
import { SessionContext } from "../../components/Session";
import share from "../../util/share";
import { ReactComponent as CollectionBgSvg } from "../../media/collectionBg.svg";
import Button from "../../components/Button";
import Quarters from "./Quarters";
import CollectionItem from "./CollectionItem";
import useKeyPress from "../../hooks/useKeyPress";
import CollectionDetail from "./CollectionDetail";
import { ReactComponent as CollapseSvg } from "../../media/collapse.svg";

const Collection = () => {
  const {
    sessionState,
    gameState,
    updateSessionState,
    updateGameState,
  } = useContext(SessionContext);
  const [selectedQuarter, setSelectedQuarter] = useState<
    keyof typeof Quarters
  >();
  const { phase, isCollectionCollapsed } = sessionState;
  const isHidden = phase === "scan";
  const isAllCollected = useMemo(
    () =>
      _.every(_.keys(Quarters), (category) =>
        _.includes(gameState.collection, category)
      ),
    [gameState.collection]
  );

  //clear collection for debugging
  useKeyPress("r", () => {
    updateGameState((gs) => {
      gs.collection = [];
      gs.visited = [];
      gs.answeredQuestions = {};
    });
  });

  return (
    <>
      <motion.div
        className={styles.container}
        variants={{
          hidden: { translateY: 0 },
          expanded: {
            translateY: `-100%`,
            transition: {
              duration: 0.5,
              ease: "anticipate",
            },
          },
          collapsed: {
            translateY: `-13%`,
            transition: {
              ease: "easeOut",
            },
          },
        }}
        initial={"hidden"}
        animate={
          isHidden ? "hidden" : isCollectionCollapsed ? "collapsed" : "expanded"
        }
        exit={"hidden"}
      >
        <motion.div
          variants={{
            hidden: { opacity: 0 },
            expanded: { opacity: 1 },
            collapsed: { opacity: 1 },
          }}
          className={styles.collapseButton}
          onClick={() => {
            updateSessionState((state) => {
              state.isCollectionCollapsed = !isCollectionCollapsed;
            });
          }}
        >
          <motion.div
            variants={{
              hidden: { rotateZ: "180deg" },
              collapsed: {
                rotateZ: "180deg",
                transition: { ease: "easeInOut", duration: 0.5 },
              },
              expanded: {
                rotateZ: "0deg",
                transition: { ease: "easeInOut", duration: 0.5 },
              },
            }}
          >
            <CollapseSvg className={styles.collapseIcon} />
          </motion.div>
        </motion.div>
        <CollectionBgSvg />
        <div className={styles.content}>
          <p>
            {isAllCollected
              ? "Huzzah! You’ve collected all five of George’s quarters. We have a new Coined champion. Well done."
              : "To win, you have to collect all five of George’s quarters. Select a category below to challenge Washington to a round of True or False trivia"}
          </p>
          <motion.div
            className={styles.items}
            variants={{
              hidden: {
                transition: {},
              },
              expanded: {
                transition: {
                  staggerChildren: 0.1,
                },
              },
              collapsed: {
                transition: {},
              },
            }}
          >
            {_.map(Quarters, (quarter, key: keyof typeof Quarters) => (
              <CollectionItem
                key={key}
                category={key}
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
          <div className={styles.actions}>
            <Button
              type="secondary"
              text="SHARE"
              onClick={() => {
                share({
                  url: window.location.href,
                  text:
                    "Do you have what it takes to win George Washington’s quarter collection? Play Coined and test your knowledge.",
                });
              }}
            />
            <a
              href="https://www.usmint.gov"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                type="secondary"
                text="VISIT USMINT.GOV"
                onClick={() => {}}
              />
            </a>
          </div>
        </div>

        <AnimatePresence initial exitBeforeEnter>
          {selectedQuarter && (
            <CollectionDetail
              category={selectedQuarter}
              onClose={() => {
                setSelectedQuarter(undefined);
              }}
            />
          )}
        </AnimatePresence>
      </motion.div>
      <motion.div
        className={styles.fade}
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 0.5 },
        }}
        initial={"hidden"}
        animate={
          isHidden ? "hidden" : isCollectionCollapsed ? "visible" : "hidden"
        }
        exit="hidden"
      />
    </>
  );
};

export default memo(Collection);
