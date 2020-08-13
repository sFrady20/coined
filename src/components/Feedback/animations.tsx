export const makeStarAnimation = (delay: number) => ({
  initial: {
    scale: 0,
    opacity: 0,
  },
  animate: {
    opacity: 1,
    scale: [0, 1, 0],
    transition: {
      delay,
    },
  },
  exit: {
    opacity: 0,
    scale: 0,
  },
});

export const containerAnimation = {
  initial: {
    filter: "brightness(25) drop-shadow(0 0 10vw rgba(255, 255, 255, 0.9))",
    opacity: 1,
  },
  animate: {
    filter: "brightness(1) drop-shadow(0 0 2vw rgba(255, 255, 255, 0.3))",
    transition: { duration: 0.5 },
    opacity: 1,
  },
  exit: {
    opacity: 0,
  },
};

export const graphicAnimation = {
  initial: {
    translateY: "20%",
    opacity: 0,
  },
  animate: {
    translateY: "0%",
    opacity: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
  exit: {},
};

export const iconAnimation = {
  initial: {
    scale: 0,
  },
  animate: {
    scale: 1,
    transition: { delay: 0.3 },
  },
  exit: {},
};
