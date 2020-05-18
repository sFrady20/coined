import { Vector3, Matrix4, Quaternion } from "three";

var lookat = function (vecstart: Vector3, vecEnd: Vector3, vecUp: Vector3) {
  var temp = new Matrix4() as any;
  temp.lookAt(vecstart, vecEnd, vecUp);

  var m00 = temp.n11,
    m10 = temp.n21,
    m20 = temp.n31,
    m01 = temp.n12,
    m11 = temp.n22,
    m21 = temp.n32,
    m02 = temp.n13,
    m12 = temp.n23,
    m22 = temp.n33;

  var t = m00 + m11 + m22,
    s,
    x,
    y,
    z,
    w;

  if (t > 0) {
    s = Math.sqrt(t + 1) * 2;
    w = 0.25 * s;
    x = (m21 - m12) / s;
    y = (m02 - m20) / s;
    z = (m10 - m01) / s;
  } else if (m00 > m11 && m00 > m22) {
    s = Math.sqrt(1.0 + m00 - m11 - m22) * 2;
    x = s * 0.25;
    y = (m10 + m01) / s;
    z = (m02 + m20) / s;
    w = (m21 - m12) / s;
  } else if (m11 > m22) {
    s = Math.sqrt(1.0 + m11 - m00 - m22) * 2;
    y = s * 0.25;
    x = (m10 + m01) / s;
    z = (m21 + m12) / s;
    w = (m02 - m20) / s;
  } else {
    s = Math.sqrt(1.0 + m22 - m00 - m11) * 2;
    z = s * 0.25;
    x = (m02 + m20) / s;
    y = (m21 + m12) / s;
    w = (m10 - m01) / s;
  }

  var rotation = new Quaternion(x, y, z, w);
  rotation.normalize();
  return rotation;
};

export default lookat;
