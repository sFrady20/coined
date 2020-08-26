import { spring, SpringProps } from "popmotion";

export default <T extends string | number>(
  springOptions: SpringProps,
  update: (v: T) => {}
) => {
  return new Promise((resolve) => {
    spring(springOptions).start({ update: update, complete: resolve });
  });
};
