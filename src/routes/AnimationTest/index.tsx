import React, { Suspense, useState, memo, useMemo, useRef } from "react";
import styles from "./index.module.scss";
import { Canvas } from "react-three-fiber";
import useGridAndControls from "../../hooks";
import shortid from "shortid";
import SimpleModel from "./SimpleModel";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";

type DroppedFileType = string;

const Scene = (props: { droppedFile?: DroppedFileType; loader?: any }) => {
  useGridAndControls();
  const { droppedFile, loader = FBXLoader } = props;
  const key = useMemo(() => shortid(), [droppedFile]);

  return (
    <>
      <spotLight position={[0, 250, 0]} rotation={[0, 180, 0]} />
      <hemisphereLight intensity={0.8} />
      {droppedFile && (
        <SimpleModel key={key} url={droppedFile} loader={loader} />
      )}
    </>
  );
};

const AnimationExample = () => {
  const [droppedFile, setDroppedFile] = useState<DroppedFileType>();
  const loaderRef = useRef<any>(FBXLoader);

  return (
    <div className={styles.root}>
      <input
        style={{ position: "fixed", zIndex: 1000 }}
        type="file"
        onChange={(e) => {
          e.preventDefault();
          e.stopPropagation();
          const { files } = e.target;

          if (!files) {
            console.error(new Error("No files found"));
            return;
          }

          loaderRef.current = /\.(?:glb|gltf)$/i.test(files[0].name)
            ? GLTFLoader
            : FBXLoader;

          const reader = new FileReader();
          reader.onload = (f) =>
            setDroppedFile((f.target?.result as DroppedFileType) || undefined);
          reader.readAsDataURL(files[0]);
        }}
      />
      <Canvas className={styles.canvas} gl={{ antialias: true }}>
        <Suspense fallback={null}>
          <Scene droppedFile={droppedFile} loader={loaderRef.current} />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default memo(AnimationExample);
