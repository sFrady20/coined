import React, {
  memo,
  ReactNode,
  createContext,
  useState,
  useEffect,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import LoadingScreen from "./LoadingScreen";
import preloadImages from "./preloadImages";
import preloadAudio from "./preloadAudio";
import preloadQuestions from "./preloadQuestions";
import preloadModels, { loadOptionalModels } from "./preloadModels";
import waitForSeconds from "../../util/waitForSeconds";

type PromiseResolvedType<T> = T extends Promise<infer R> ? R : never;

export type AssetContextType = {
  images: PromiseResolvedType<ReturnType<typeof preloadImages>>;
  models: PromiseResolvedType<ReturnType<typeof preloadModels>>;
  questions: PromiseResolvedType<ReturnType<typeof preloadQuestions>>;
  sfx: PromiseResolvedType<ReturnType<typeof preloadAudio>>;
};
//@ts-ignore
const defaultAssetContext: AssetContextType = {};
export const AssetContext = createContext(defaultAssetContext);

const Preloader = memo((props: { children: ReactNode }) => {
  const { children } = props;
  const [isStarted, setStarted] = useState(false);
  const [images, setImages] = useState<AssetContextType["images"]>();
  const [models, setModels] = useState<AssetContextType["models"]>();
  const [questions, setQuestions] = useState<AssetContextType["questions"]>();
  const [sfx, setSfx] = useState<AssetContextType["sfx"]>();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    (async () => {
      var step = 0;
      const totalSteps = 4;

      await waitForSeconds(1.5);

      setQuestions(await preloadQuestions());
      step++;
      setProgress(step);
      setImages(
        await preloadImages((pct) => setProgress((step + pct) / totalSteps))
      );
      step++;
      const newModels = await preloadModels((pct) =>
        setProgress((step + pct) / totalSteps)
      );
      setModels(newModels);
      step++;
      setSfx(
        await preloadAudio((pct) => setProgress((step + pct) / totalSteps))
      );

      loadOptionalModels(newModels);
    })();
  }, [setProgress]);

  //TODO: if loading and model or questions arent present should throw error
  return (
    <AnimatePresence>
      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
          transition: { when: "beforeChildren" },
        }}
        exit={{
          opacity: 0,
          transition: { when: "afterChildren" },
        }}
        key={isStarted ? "started" : "loading"}
      >
        {!isStarted || !images || !questions || !models || !sfx ? (
          <LoadingScreen progress={progress} onStart={() => setStarted(true)} />
        ) : (
          <AssetContext.Provider value={{ images, questions, models, sfx }}>
            {children}
          </AssetContext.Provider>
        )}
      </motion.div>
    </AnimatePresence>
  );
});

export default Preloader;
