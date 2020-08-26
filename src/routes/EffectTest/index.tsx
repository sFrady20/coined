import React, { memo, useState, useMemo } from "react";
import styles from "./index.module.scss";
import {
  PerspectiveCamera,
  WebGLRenderer,
  Scene,
  AmbientLight,
  GridHelper,
  Clock,
} from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import makeGlowEffect from "../../3d/glowEffect";

const Controller = () => {
  const clock = new Clock();
  const canvas = document.getElementById("testCanvas") as HTMLCanvasElement;

  const scene = new Scene();
  const camera = new PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.z = 5;

  const renderer = new WebGLRenderer({
    canvas,
  });
  renderer.setSize(window.innerWidth, window.innerHeight);

  scene.add(new AmbientLight(0x404040, 5));

  const controls = new OrbitControls(camera, canvas);
  controls.update();

  const grid = new GridHelper(2000, 20, 0x333333, 0x333333);
  scene.add(grid);

  const glowEffect = makeGlowEffect(scene);

  const animate = () => {
    glowEffect.update();

    glowEffect.uniforms["time"].value = clock.elapsedTime;
    glowEffect.uniforms["glow"].value = Math.sin(clock.elapsedTime) * 0.5 + 0.5;

    renderer.render(scene, camera);

    requestAnimationFrame(animate);
  };
  requestAnimationFrame(animate);

  return {
    camera,
    renderer,
    scene,
    controls,
    grid,
    canvas,
    animate,
  };
};

const AnimationExample = () => {
  const [rootRef, setRootRef] = useState<HTMLDivElement>();

  const size = useMemo(() => {
    if (rootRef) {
      const rect = rootRef?.getBoundingClientRect();
      return [rect.width, rect.height];
    }
    return [500, 500];
  }, [rootRef]);

  useMemo(() => rootRef && Controller(), [rootRef]);

  return (
    <div className={styles.root}>
      <div className={styles.renderer} ref={(r) => setRootRef(r || undefined)}>
        <canvas
          className={styles.mainCanvas}
          id={"testCanvas"}
          width={size[0]}
          height={size[1]}
        />
      </div>
    </div>
  );
};

export default memo(AnimationExample);
