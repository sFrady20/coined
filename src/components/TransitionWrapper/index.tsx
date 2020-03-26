import React from "react";
import { motion, MotionStyle } from "framer-motion";
import _ from "lodash";

export type TransitionType = "fade" | "scale" | "up" | "down";

export default (props: {
  type: TransitionType[] | TransitionType;
  className?: string;
  style?: MotionStyle;
  children: React.ReactNode;
}) => {
  const { children, type, ...divProps } = props;

  const types = typeof type === "string" ? [type] : type;

  return (
    <motion.div
      initial={{
        opacity: _.includes(types, "fade") ? 0 : 1,
        scale: _.includes(types, "scale") ? 0.8 : 1,
        translateY: _.includes(types, "up")
          ? 20
          : _.includes(types, "down")
          ? -20
          : 0
      }}
      animate={{ opacity: 1, scale: 1, translateY: 0 }}
      exit={{
        opacity: _.includes(types, "fade") ? 0 : 1,
        scale: _.includes(types, "scale") ? 0.8 : 1,
        translateY: _.includes(types, "up")
          ? 20
          : _.includes(types, "down")
          ? -20
          : 0
      }}
      {...divProps}
    >
      {children}
    </motion.div>
  );
};
