import { FBXLoader as NoTextureFBXLoader } from "./FBXLoader";
import _ from "lodash";
import { Group } from "three";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";

const baseModel = "/models/GW_Idle_05.fbx";
const modelPaths = {
  idle: "/models/GW_Idle_05.fbx",
  appear: "/models/GW_R2_Seq_02.fbx",
  applause: "/models/GW_Applause_01.fbx",
  laugh: "/models/GW_Laughing_01.fbx",
  easterEgg: "/models/GW_EasterEgg_01.fbx",
  endGame: "/models/GW_EndGame_01.fbx",
  challenging: "/models/GW_R2_Challenging.fbx",
  shrug: "/models/GW_R2_SHRUG_01.fbx",
  throwsCane: "/models/GW_R2_ThrowsCane.fbx",
  welcome: "/models/GW_R2_WELCOME_01.fbx",
};
const optionalModels = {};

const loader = new FBXLoader();
//@ts-ignore
const noTextureFbxLoader = new NoTextureFBXLoader();

type ModelDictionaryKeys = keyof typeof modelPaths;

type ModelWithAnimation = Group & { animations: any };
type ModelDictionary = {
  base: ModelWithAnimation;
} & {
  [key in ModelDictionaryKeys]: ModelWithAnimation;
} &
  Partial<{ [key in keyof typeof optionalModels]: ModelWithAnimation }>;

const preloadModels = async (onProgress: (pct: number) => void) => {
  var progress = 0;

  const trackProgress = (r: any) => {
    progress += 1 / (1 + _.keys(modelPaths).length);
    onProgress(progress);
    return r;
  };

  const models: Partial<ModelDictionary> = {
    base: await loader.loadAsync(baseModel).then(trackProgress),
  };

  const modelKeys = _.keys(modelPaths);
  for (var modelKey of modelKeys) {
    models[
      modelKey as keyof typeof modelPaths
    ] = await noTextureFbxLoader
      .loadAsync(modelPaths[modelKey as keyof typeof modelPaths])
      .then(trackProgress);
  }

  return models as ModelDictionary;
};

export const loadOptionalModels = (models: ModelDictionary) => {
  //load option models in background
  _.forEach(optionalModels, async (path, key) => {
    await noTextureFbxLoader
      .loadAsync(path)
      //@ts-ignore
      .then((m) => (models[key as keyof typeof optionalModels] = m));
  });
};

export default preloadModels;
