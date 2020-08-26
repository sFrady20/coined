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
  
  float d=pow(1.-length(vPos.xy),.2)*4.*(1.-glow);
  
  gl_FragColor=vec4(vec3(d)*tint,d);
}