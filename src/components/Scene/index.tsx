import React from "react";
import Model from "../../canvas/Model";
import SharedAnimations from "../../canvas/SharedAnimations";

export default () => {
  return (
    <>
      <spotLight position={[0, 3, 5]} rotation={[0, 180, 0]} />
      <hemisphereLight intensity={0.8} />
      <SharedAnimations>
        <Model />
      </SharedAnimations>
    </>
  );
};
