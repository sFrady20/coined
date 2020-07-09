import _ from "lodash";
import { Howl } from "howler";

const preloadAudio = async (onProgress: (pct: number) => void) => {
  const files = {
    correct: "/sfx/correct.mp3",
    wrong: "/sfx/wrong.mp3",
    intro: "/sfx/GW_intro.mp3",
    correct1: "/sfx/GW_correct_1.mp3",
    correct2: "/sfx/GW_correct_2.mp3",
    correct3: "/sfx/GW_correct_3.mp3",
    wrong1: "/sfx/GW_wrong_1.mp3",
    wrong2: "/sfx/GW_wrong_2.mp3",
    wrong3: "/sfx/GW_wrong_3.mp3",
    end1: "/sfx/GW_end_1.mp3",
    end2: "/sfx/GW_end_2.mp3",
    end3: "/sfx/GW_end_3.mp3",
    huzzah: "/sfx/GW_huzzah.mp3",
  };
  var current = 0;

  return _.fromPairs(
    await Promise.all(
      _(files)
        .map(
          (path, key) =>
            new Promise<[string, Howl]>((resolve) => {
              const sound = new Howl({ src: [path], preload: true });
              sound.once("load", () => {
                onProgress(++current / _.keys(files).length);
                resolve([key, sound]);
              });
            })
        )
        .value()
    )
  );
};

export default preloadAudio;
