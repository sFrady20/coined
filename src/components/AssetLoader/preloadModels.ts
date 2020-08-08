import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";

const preloadModels = async (onProgress: (pct: number) => void) => {
  const loader = new FBXLoader();
  var progress = 0;

  const trackProgress = (r: any) => {
    progress += 1 / 6; //remember to change if you add more models
    onProgress(progress);
    return r;
  };

  return {
    idle: await loader.loadAsync("/models/GW_Idle_05.fbx").then(trackProgress),
    appear: await loader
      .loadAsync("/models/GW_Appear_09.fbx")
      .then(trackProgress),
    applause: await loader
      .loadAsync("/models/GW_Applause_01.fbx")
      .then(trackProgress),
    laugh: await loader
      .loadAsync("/models/GW_Laughing_01.fbx")
      .then(trackProgress),
    easterEgg: await loader
      .loadAsync("/models/GW_EasterEgg_01.fbx")
      .then(trackProgress),
    endGame: await loader
      .loadAsync("/models/GW_EndGame_01.fbx")
      .then(trackProgress),
    /*
    moonwalk: await loader.loadAsync("/models/GW_MoonWalking_0522.fbx")
      .then(trackProgress),
    thumbsUp: await loader.loadAsync("/models/GW_ThumbUp_0522.fbx")
      .then(trackProgress),*/
  };
};

export default preloadModels;
