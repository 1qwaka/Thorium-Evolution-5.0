const DEFAULT_VERT = "uniform mat4 u_projTrans; "+
"attribute vec4 a_position; "+
"attribute vec2 a_texCoord0; "+
"attribute vec4 a_color; "+
"varying vec4 v_color; "+
"varying vec2 v_texCoord; "+
"uniform vec2 u_viewportInverse; "+
"void main() { "+
"gl_Position = u_projTrans * a_position;"+
"v_texCoord = a_texCoord0; "+
"v_color = a_color; }";

const testShader = {
  shader: null
};
const shinsuShader = {
  shader: null
};
const dischargeShader = {
  shader: null
};

const TEshaders = [testShader,shinsuShader,dischargeShader];

if(!Vars.headless){
  importPackage(Packages.arc.graphics.gl);
  try{
    shinsuShader.shader = new JavaAdapter (Shader,{
      apply(){
        this.setUniformf("time", Time.time());
      }
    },DEFAULT_VERT,"#ifdef GL_ES\nprecision highp float;precision mediump int;\n#endif\nuniform sampler2D u_texture;uniform float time;varying vec4 v_color;varying vec2 v_texCoord;float s(float f, vec2 uv){return cos(sin(uv.x+sin(uv.y+time*0.15)+time*0.15+f));}void main(){vec4 c = texture2D(u_texture,v_texCoord);float PI = 3.1415;gl_FragColor = vec4(s(0.0,v_texCoord*8.0)*3.0,s(PI/2.0,v_texCoord*8.0)*0.55,s(2.*PI/3.,v_texCoord*8.0)*0.4, c.a);}");
    dischargeShader.shader = new JavaAdapter (Shader,{
      apply(){
        this.setUniformf("time", Time.time());
      }
    },DEFAULT_VERT,"#ifdef GL_ES\nprecision highp float;precision mediump int;\n#endif\nuniform sampler2D u_texture;uniform float time;varying vec4 v_color;varying vec2 v_texCoord;void main(){vec4 cc = texture2D(u_texture,v_texCoord+sin(v_texCoord.x*120.+time*0.2)*0.005);float c = sin(v_texCoord.x*36.0+time*0.1+cos(v_texCoord.x*360.+v_texCoord.y*36.+time*0.1-sin(v_texCoord.y*36.+time*0.1)));vec4 ccc = mix(cc,vec4(cos(c)*0.6,c+0.5,c+0.3,1.0),0.5);gl_FragColor =vec4(ccc.r,ccc.g,ccc.b,cc.a);}");
   
  } catch(e) {
    print(e);
    print(e.stack);
  }
}

for(var i = 0;i < TEshaders.length;i++){
  if(TEshaders[i].shader==null) TEshaders[i].shader = Shaders.water;
}

module.exports = {
  test: testShader,
  shinsu: shinsuShader,
  discharge: dischargeShader
};