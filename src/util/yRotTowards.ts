import { Vector3, Matrix4, Quaternion, MathUtils } from "three";

export default (origin: Vector3, target: Vector3, offset?: number) => {
  const dir = origin.sub(target).normalize();
  var mx = new Matrix4();
  mx.makeRotationY(
    Math.atan2(-dir.z, dir.x) + (offset || 0) * MathUtils.DEG2RAD
  );
  return new Quaternion().setFromRotationMatrix(mx);
};
