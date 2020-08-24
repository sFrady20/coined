import React, { memo, useState, useMemo } from "react";
import styles from "./index.module.scss";
import _ from "lodash";
import {
  PerspectiveCamera,
  WebGLRenderer,
  Scene,
  AmbientLight,
  GridHelper,
  Mesh,
  Clock,
  CylinderBufferGeometry,
  ShaderMaterial,
  CustomBlending,
  PlaneBufferGeometry,
  MeshPhongMaterial,
  MathUtils,
} from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import vertexShader from "!raw-loader!./vert.glsl";
import coneFragmentShader from "!raw-loader!./coneFragment.glsl";
import planeFragmentShader from "!raw-loader!./planeFragment.glsl";

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

  let cone = new Mesh(
    new CylinderBufferGeometry(1.1, 0.9, 1, 32, 2),
    new ShaderMaterial({
      fragmentShader: coneFragmentShader,
      vertexShader,
      blending: CustomBlending,
    })
  );
  cone.position.set(0, 0.5, 0);
  scene.add(cone);

  let plane = new Mesh(
    new PlaneBufferGeometry(3, 3, 1, 1),
    new ShaderMaterial({
      fragmentShader: planeFragmentShader,
      vertexShader,
      blending: CustomBlending,
    })
  );
  plane.rotateX(-90 * MathUtils.DEG2RAD);
  scene.add(plane);

  const animate = () => {
    const delta = clock.getDelta();
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

  const controller = useMemo(() => rootRef && Controller(), [rootRef]);

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
