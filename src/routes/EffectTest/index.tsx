import React, { memo, useState, useMemo, useEffect } from "react";
import styles from "./index.module.scss";
import _ from "lodash";
import {
  PerspectiveCamera,
  WebGLRenderer,
  Scene,
  AmbientLight,
  GridHelper,
  Mesh,
  MeshPhongMaterial,
  BoxBufferGeometry,
  Clock,
  MeshBasicMaterial,
  Vector3,
  CylinderBufferGeometry,
} from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import {
  EffectComposer,
  EffectPass,
  RenderPass,
  GodRaysEffect,
  //@ts-ignore
} from "postprocessing";

const clock = new Clock();

const AnimationExample = () => {
  const [rootRef, setRootRef] = useState<HTMLDivElement>();
  const size = useMemo(() => {
    if (rootRef) {
      const rect = rootRef?.getBoundingClientRect();
      return [rect.width, rect.height];
    }
    return [500, 500];
  }, [rootRef]);

  const {
    scene,
    camera,
    renderer,
    cube,
    composer,
    godraysEffect,
  } = useMemo(() => {
    if (!rootRef) return {};
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

    const cube = new Mesh(
      new BoxBufferGeometry(),
      new MeshPhongMaterial({ color: 0x00ff00 })
    );
    scene.add(cube);

    let circleGeo = new CylinderBufferGeometry(1.1, 0.9, 0.2, 32, 2);
    let circleMat = new MeshBasicMaterial({ color: 0xffccaa });
    let circle = new Mesh(circleGeo, circleMat);
    circle.position.set(0, 0, -1);
    scene.add(circle);

    let godraysEffect = new GodRaysEffect(camera, circle, {
      resolutionScale: 1,
      density: 2,
      decay: 0.95,
      weight: 0.5,
      samples: 100,
    });

    const composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));
    composer.addPass(new EffectPass(camera, godraysEffect));

    return {
      camera,
      renderer,
      scene,
      controls,
      grid,
      canvas,
      composer,
      cube,
      godraysEffect,
    };
  }, [rootRef]);

  useEffect(() => {
    if (!renderer || !scene || !camera || !composer || !cube || !godraysEffect)
      return;
    var request = 0;
    const animate = () => {
      const delta = clock.getDelta();
      request = requestAnimationFrame(animate);

      const intensity = Math.sin(clock.elapsedTime * 2) * 0.5 + 0.5;
      godraysEffect.lightSource.material.opacity = _.clamp(intensity / 1, 0, 1);

      const tv3 = new Vector3(0, 0, 1).unproject(camera);
      cube.position.lerp(tv3, 0.1);

      //renderer.render(scene, camera);
      composer.render(delta);
    };
    animate();
    return () => {
      cancelAnimationFrame(request);
    };
  }, [scene, camera, renderer, composer, godraysEffect, cube]);

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
