import React, { memo, useContext } from "react";
import styles from "./CollectionItem.module.scss";
import { motion } from "framer-motion";
import classnames from "classnames";
import _ from "lodash";
import quarters from "./quarters.json";
import { SessionContext } from "../../components/Session";
import { ReactComponent as InactiveBgSvg } from "../../media/collectionItemBg.svg";
import { ReactComponent as ActiveBgSvg } from "../../media/collectionItemBgActive.svg";

const CollectionItem = memo((props: { quarterKey: keyof typeof quarters }) => {
  const { quarterKey } = props;
  const { collection } = useContext(SessionContext);
  //const quarter = quarters[quarterKey];
  const isCollected = _.includes(collection, quarterKey);

  return (
    <motion.div
      className={classnames(
        styles.item,
        isCollected && styles[`item--collected`]
        //highlighted === key && styles[`item--highlighted`]
      )}
      variants={{
        hidden: { opacity: 0, scale: 0.6 },
        missing: { opacity: 0.7, scale: 1 },
        collected: { opacity: 1, scale: 1 },
      }}
      key={quarterKey}
    >
      {isCollected ? <ActiveBgSvg /> : <InactiveBgSvg />}
    </motion.div>
  );
});

export default CollectionItem;
