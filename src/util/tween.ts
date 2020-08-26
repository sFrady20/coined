import { tween, TweenProps } from "popmotion";

export default <T extends string | number>(
  tweenProps: TweenProps,
  update: (v: T) => {}
) =>
  new Promise((resolve, reject) => {
    tween(tweenProps).start({
      update: update,
      complete: resolve,
      error: reject,
    });
  });
