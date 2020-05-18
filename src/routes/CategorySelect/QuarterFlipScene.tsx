import React, {
  useCallback,
  useImperativeHandle,
  forwardRef,
  useRef,
  memo,
  Ref,
} from "react";
import { Group, FontLoader } from "three";
import { useFrame, useLoader } from "react-three-fiber";
import { spring } from "popmotion";

const RESET_POSITION = -2;

export type QuarterFlipSceneHandle = {
  spin: () => void;
};

type Props = {
  onFlipStart?: () => void;
  category?: string;
};

const QuarterScene = (props: Props, ref: Ref<QuarterFlipSceneHandle>) => {
  const { onFlipStart, category } = props;
  const meshRef = useRef<Group>(null);

  const rotation = useRef(0);
  const position = useRef(RESET_POSITION);

  const spin = useCallback(async () => {
    await new Promise((resolve) => {
      spring({
        from: position.current,
        to: RESET_POSITION,
        stiffness: 100,
        damping: 10,
      }).start({
        update: (v: number) => {
          position.current = v;
        },
        complete: () => {
          resolve();
        },
      });
    });
    rotation.current = 0;
    !!onFlipStart && onFlipStart();
    await Promise.all([
      new Promise((resolve) => {
        spring({
          from: position.current,
          to: 0,
          damping: 10,
        }).start({
          update: (v: number) => {
            position.current = v;
          },
          complete: () => {
            resolve();
          },
        });
      }),
      new Promise((resolve) => {
        spring({
          from: rotation.current,
          to: -Math.PI * 2 * 1,
          damping: 9,
        }).start({
          update: (v: number) => {
            rotation.current = v;
          },
          complete: () => {
            resolve();
          },
        });
      }),
    ]);
  }, [position, rotation, onFlipStart]);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.position.y = position.current;
      meshRef.current.rotation.x = rotation.current + Math.PI / 2;
    }
  });

  useImperativeHandle(
    ref,
    () => ({
      spin,
    }),
    [spin]
  );

  const font = useLoader(FontLoader, "/helvetiker_regular.typeface.json");

  return (
    <group ref={meshRef}>
      <mesh>
        <meshPhongMaterial attach="material" reflectivity={1} color="grey" />
        <cylinderBufferGeometry attach="geometry" args={[1, 1, 0.1, 32]} />
      </mesh>
      <mesh position={[-0.2, 0.05, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <textBufferGeometry
          attach="geometry"
          args={[category || "", { font, height: 0.01, size: 0.2 }]}
        />
        <meshPhongMaterial attach="material" color="black" />
      </mesh>
    </group>
  );
};

export default memo(forwardRef<QuarterFlipSceneHandle, Props>(QuarterScene));
