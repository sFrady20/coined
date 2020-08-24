/*
* Original shader from: https://www.shadertoy.com/view/wdKSWw
*/

#ifdef GL_ES
precision mediump float;
#endif

// glslsandbox uniforms
uniform float time;
uniform vec2 resolution;

varying mediump vec3 vPos;
varying mediump vec3 vNormal;

// shadertoy emulation
#define iTime time
#define iResolution resolution

// --------[ Original ShaderToy begins here ]---------- //
// --------[ Original ShaderToy ends here ]---------- //

void main(void)
{
  vec4 col;
  float tb=1.-step((1.-dot(vNormal,vec3(0.,1.,0.)))*(1.-dot(vNormal,vec3(0.,-1.,0.))),.1);
  //float r=atan(vNormal.z,vNormal.x)*.5+.5;
  float y=1.-smoothstep(-1.,1.,vPos.y);
  col=vec4(y,y,y,y*tb);
  gl_FragColor=col;
}