declare type WebARRocksDetectState = {
  distance: number;
  label: string | false;
  positionScale: number[];
  detectScore: number;
  yaw: number;
  pitch: number;
  roll: number;
  avgDetectScore: number;
  scoreHistory: number[];
};
