import {
  AnimationClip,
  AnimationMixer,
  LoopOnce,
  AnimationAction,
  EventDispatcher,
} from "three";

class QueueItem {
  queue: AnimationQueue;
  clip: AnimationClip;
  fadeIn = 0;
  fadeOut = 0;

  constructor(queue: AnimationQueue, clip: AnimationClip) {
    this.queue = queue;
    this.clip = clip;
  }

  execute = async () => {};
}

class AnimationQueueItem extends QueueItem {
  action?: AnimationAction;

  configure?: (
    action: AnimationAction,
    resolve?: (value: any) => void,
    reject?: (value: any) => void
  ) => void;

  timeout: NodeJS.Timeout | undefined = undefined;

  execute = async () => {
    const action = this.queue.mixer
      .clipAction(this.clip)
      .setLoop(LoopOnce, 1)
      .fadeIn(this.fadeIn);
    this.action = action;
    await new Promise((resolve, reject) => {
      if (this.configure) this.configure(action);
      action.play();
      this.timeout = setTimeout(
        resolve,
        (this.clip.duration - this.fadeOut) * 1000
      );
      this.queue.events.addEventListener("cancel", (e) => {
        reject({
          message: e.message,
          currentAction: action,
        });
      });
    });
    action.fadeOut(this.fadeOut);
  };
}

export default class AnimationQueue {
  items: AnimationQueueItem[] = [];
  mixer: AnimationMixer;
  events: EventDispatcher = new EventDispatcher();
  isCancelled = false;

  constructor(mixer: AnimationMixer) {
    this.mixer = mixer;
  }

  cancel = (message?: string) => {
    this.events.dispatchEvent({ type: "cancel", message });
    this.isCancelled = true;
  };

  animate = (
    to: AnimationClip,
    crossFade: number = 0,
    configure?: (action: AnimationAction) => void
  ) => {
    const prevItem =
      this.items.length > 0 ? this.items[this.items.length - 1] : undefined;
    if (prevItem) {
      prevItem.fadeOut = crossFade;
    }
    const newItem = new AnimationQueueItem(this, to);
    newItem.fadeIn = crossFade;
    newItem.configure = configure;
    this.items.push(newItem);
    return this;
  };

  play = async () => {
    for (var i = 0; i < this.items.length; ++i) {
      await this.items[i].execute();
      if (this.isCancelled) return;
    }
  };
}
