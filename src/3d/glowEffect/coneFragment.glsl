/*
* Original shader from: https://www.shadertoy.com/view/wdKSWw
*/

#ifdef GL_ES
precision mediump float;
#endif

// glslsandbox uniforms
uniform float time;
uniform float glow;

varying mediump vec3 vPos;
varying mediump vec3 vNormal;

// shadertoy emulation
#define iTime time
#define iResolution resolution

// --------[ Original ShaderToy begins here ]---------- //
// --------[ Original ShaderToy ends here ]---------- //

void main(void)
{
  vec3 tint=vec3(.953,.895,.776);
  
  float tb=1.-step((1.-dot(vNormal,vec3(0.,1.,0.)))*(1.-dot(vNormal,vec3(0.,-1.,0.))),.1);
  
  float r=atan(vNormal.z,vNormal.x)*.5+.5;
  
  float y=smoothstep(.4,1.,pow(1.-smoothstep(-1.,1.,vPos.y+(sin((r+time*.5)*10.)*.05)+(sin((r-time*.2)*2.)*.05)+glow),1.2));
  
  gl_FragColor=vec4(vec3(y)*tint,y*tb);
}