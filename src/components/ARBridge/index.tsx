import ARController from "./ARController";
import { createContext, useEffect, useContext } from "react";

export * from "./ARController";

export type ARContextType = {
  arController: ARController;
};
//@ts-ignore
const defaultARContext: ARContextType = {};
export const ARContext = createContext(defaultARContext);

//hook to normalize imperitive settings between screens
const useArSettings = (settings?: {
  isGeorgeFloatLocked?: boolean;
  isGeorgeCentered?: boolean;
  isCoinDetectionEnabled?: boolean;
  shouldGeorgeStopTalking?: boolean;
}) => {
  const {
    isGeorgeFloatLocked = false,
    isGeorgeCentered = true,
    isCoinDetectionEnabled = true,
    shouldGeorgeStopTalking = false,
  } = settings || {};
  const { arController } = useContext(ARContext);

  useEffect(() => {
    arController.george.floatLocked = isGeorgeFloatLocked;
    arController.george.isCentered = isGeorgeCentered;
    arController.isCoinDetectionEnabled = isCoinDetectionEnabled;
    return () => {
      //reset to default settings
      arController.george.floatLocked = true;
      arController.george.isCentered = false;
      arController.isCoinDetectionEnabled = false;
      if (shouldGeorgeStopTalking) {
        arController.george.shutup();
        if (arController.music) arController.music.stop();
      }
    };
  }, [
    arController,
    isGeorgeFloatLocked,
    isGeorgeCentered,
    isCoinDetectionEnabled,
    shouldGeorgeStopTalking,
  ]);
};
export { useArSettings };
