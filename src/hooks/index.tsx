import { useEffect } from "react";
import { useThree } from "react-three-fiber";
import { GridHelper } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const useGridAndControls = () => {
  const { scene, camera, gl } = useThree();

  useEffect(() => {
    if (gl && camera) {
      const controls = new OrbitControls(camera, gl.domElement);
      controls.update();

      var grid = new GridHelper(2000, 20, 0x000000, 0x000000);
      scene.add(grid);

      return () => {
        controls.dispose();
        scene.remove(grid);
      };
    }
  }, [gl, camera, scene]);

  return undefined;
};

export default useGridAndControls;
