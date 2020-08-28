import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import _ from "lodash";
import { Group } from "three";

const preloadModels = async (onProgress: (pct: number) => void) => {
  const loader = new FBXLoader();
  const gltfLoader = new GLTFLoader();
  var progress = 0;

  gltfLoader.setResourcePath("/models/");
  gltfLoader.setDRACOLoader(new DRACOLoader());

  const modelPaths = {
    base: "/models/GW_Idle_05.fbx",
    idle: "/models/GW_Idle_05.fbx",
    appear: "/models/GW_R2_Seq_02.fbx",
    applause: "/models/GW_Applause_01.fbx",
    laugh: "/models/GW_Laughing_01.fbx",
    easterEgg: "/models/GW_EasterEgg_01.fbx",
    endGame: "/models/GW_EndGame_01.fbx",
  };

  const gltfModelPaths = {};

  type ModelDictionaryKeys =
    | keyof typeof modelPaths
    | keyof typeof gltfModelPaths;

  const trackProgress = (r: any) => {
    progress += 1 / (_.keys(modelPaths).length + _.keys(gltfModelPaths).length); //remember to change if you add more models
    onProgress(progress);
    return r;
  };

  const models = _.fromPairs(
    await Promise.all([
      ..._.map<typeof gltfModelPaths, Promise<[ModelDictionaryKeys, Group][]>>(
        gltfModelPaths,
        (path, key) =>
          new Promise(async (resolve) =>
            resolve([key, await gltfLoader.loadAsync(path).then(trackProgress)])
          )
      ),
      ..._.map<typeof modelPaths, Promise<[ModelDictionaryKeys, Group][]>>(
        modelPaths,
        (path, key) =>
          new Promise(async (resolve) =>
            resolve([key, await loader.loadAsync(path).then(trackProgress)])
          )
      ),
    ])
  ) as { [key in ModelDictionaryKeys]: Group & { animations: any } };

  return models;
};

export default preloadModels;
