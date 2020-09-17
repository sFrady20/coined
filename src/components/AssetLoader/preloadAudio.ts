import _ from "lodash";
import { Howl } from "howler";

const files = {
  correct: "/sfx/correct.mp3",
  wrong: "/sfx/wrong.mp3",
  timer: "/sfx/theme.mp3",
  scan: "/sfx/scan.mp3",
  intro: "/sfx/GW_intro.mp3",
  huzzah: "/sfx/GW_huzzah.mp3",
  gwCorrect: _.times(10, (i) => `/sfx/GW_right_${i + 1}.mp3`),
  gwWrong: _.times(10, (i) => `/sfx/GW_wrong_${i + 1}.mp3`),
  gwEnd: _.times(7, (i) => `/sfx/GW_end_${i + 1}.mp3`),
  gwVictory: _.times(3, (i) => `/sfx/GW_victory_${i + 1}.mp3`),
};

const preloadAudio = async (onProgress: (pct: number) => void) => {
  var current = 0;

  const results = _.fromPairs(
    await Promise.all<[string, Howl[]]>(
      _(files)
        .map((path, key) => {
          if (typeof path === "string") {
            path = [path];
          }
          return new Promise<[string, Howl[]]>(async (resolveGroup) => {
            const sounds = await Promise.all(
              _.map(
                path,
                (subpath) =>
                  new Promise<Howl>((resolve) => {
                    const sound = new Howl({ src: [subpath], preload: true });
                    sound.once("loaderror", () => {
                      onProgress(++current / _.flatMap(files).length);
                      console.warn(`Could not load sound "${subpath}"`);
                    });
                    sound.once("load", () => {
                      onProgress(++current / _.flatMap(files).length);
                      resolve(sound);
                    });
                  })
              )
            );
            resolveGroup([key, sounds]);
          });
        })
        .value()
    )
  );

  return results;
};

export default preloadAudio;
