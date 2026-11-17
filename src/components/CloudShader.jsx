import { useEffect, useRef } from "react";

const hex = (h) => {
  const n = parseInt(h.replace("#", ""), 16);
  return [(n >> 16) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
};

const VERT = `attribute vec2 p; void main(){ gl_Position = vec4(p,0.,1.); }`;
const FRAG = `
precision highp float;
uniform vec2 uRes; uniform float uTime; uniform vec2 uMouse; uniform float uCount;
uniform vec3 uTop; uniform vec3 uBot; uniform vec3 uCloud;
float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7))) * 43758.5453); }
float noise(vec2 p){ vec2 i=floor(p), f=fract(p); vec2 u=f*f*(3.-2.*f);
  return mix(mix(hash(i),hash(i+vec2(1,0)),u.x), mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),u.x), u.y); }
float fbm(vec2 p){ float v=0., a=.5; for(int i=0;i<5;i++){ v+=a*noise(p); p=p*2.03+vec2(1.7,9.2); a*=.5; } return v; }
void main(){
  vec2 uv = gl_FragCoord.xy / uRes;
  float asp = uRes.x / uRes.y;
  vec3 sky = mix(uBot, uTop, pow(uv.y, .85));
  sky += vec3(1.,.82,1.) * pow(max(0., 1. - length((uv - vec2(.82,.92)) * vec2(asp,1.))), 3.) * .35;
  // far layer
  vec2 p1 = vec2(uv.x*asp, uv.y) * 3.2; p1.x -= uTime*.025; p1 += (uMouse-.5)*.08;
  float d1 = fbm(p1 + fbm(p1*.7 + uTime*.01));
  float th1 = .56 - uCount*.022;
  float c1 = smoothstep(th1, th1+.2, d1 - (uv.y-.35)*.14);
  vec3 col = mix(sky, mix(uCloud, uBot, .35), c1*.55);
  // near layer
  vec2 p2 = vec2(uv.x*asp, uv.y) * 1.9; p2.x -= uTime*.06; p2 += (uMouse-.5)*.2;
  float d2 = fbm(p2 + fbm(p2 + uTime*.02));
  float d2b = fbm(p2 + vec2(0., .14) + fbm(p2 + uTime*.02));
  float th2 = .54 - uCount*.025;
  float c2 = smoothstep(th2, th2+.2, d2 - (uv.y-.3)*.12);
  float light = clamp((d2 - d2b)*3.6 + .6, 0., 1.);
  vec3 shade = mix(uCloud*vec3(.72,.62,.92), uCloud, light);
  col = mix(col, shade, c2*.96);
  col *= 1. - .12*pow(length(uv-.5), 2.);
  gl_FragColor = vec4(col, 1.);
}`;

export default function CloudShader({ speed = 1, count = 6, cloudColor = "#fff6fd", skyTopColor = "#6d4ae0", skyBottomColor = "#e6d4ff", className = "" }) {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    const gl = canvas.getContext("webgl", { antialias: false, alpha: false });
    if (!gl) return;
    const sh = (type, src) => { const s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s); return s; };
    const prog = gl.createProgram();
    gl.attachShader(prog, sh(gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, sh(gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) { console.warn(gl.getProgramInfoLog(prog)); return; }
    gl.useProgram(prog);
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "p");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    const U = (n) => gl.getUniformLocation(prog, n);
    gl.uniform3fv(U("uTop"), hex(skyTopColor));
    gl.uniform3fv(U("uBot"), hex(skyBottomColor));
    gl.uniform3fv(U("uCloud"), hex(cloudColor));
    gl.uniform1f(U("uCount"), count);

    // render at half resolution — clouds are soft, GPU does a quarter of the work
    const resize = () => {
      const s = 0.5;
      canvas.width = Math.max(2, Math.floor(canvas.clientWidth * s));
      canvas.height = Math.max(2, Math.floor(canvas.clientHeight * s));
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(U("uRes"), canvas.width, canvas.height);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    let mx = 0.5, my = 0.5, tx = 0.5, ty = 0.5, raf, visible = true;
    const onMove = (e) => { tx = e.clientX / window.innerWidth; ty = 1 - e.clientY / window.innerHeight; };
    window.addEventListener("mousemove", onMove);
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; });
    io.observe(canvas);

    const t0 = performance.now();
    const loop = () => {
      raf = requestAnimationFrame(loop);
      if (!visible) return;
      mx += (tx - mx) * 0.04; my += (ty - my) * 0.04;
      gl.uniform1f(U("uTime"), ((performance.now() - t0) / 1000) * speed + 20.0);
      gl.uniform2f(U("uMouse"), mx, my);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };
    loop();
    return () => { cancelAnimationFrame(raf); ro.disconnect(); io.disconnect(); window.removeEventListener("mousemove", onMove); };
  }, [speed, count, cloudColor, skyTopColor, skyBottomColor]);

  return <canvas ref={ref} className={`h-full w-full ${className}`} style={{ background: `linear-gradient(to top, ${skyBottomColor}, ${skyTopColor})` }} />;
}
