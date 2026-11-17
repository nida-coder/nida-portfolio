import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

const LABELS = ["React", "Python", "AI Agents", "Django", "Figma", "SQL", "Node.js", "UI/UX", "LLMs", "Tailwind", "Three.js", "QA"];

export default function Globe() {
  const wrap = useRef(null);

  useEffect(() => {
    const el = wrap.current;
    const size = () => el.clientWidth;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.z = 3.2;
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(size(), size());
    el.appendChild(renderer.domElement);

    const group = new THREE.Group();
    group.rotation.z = 0.35;
    group.rotation.x = 0.25;
    scene.add(group);

    // dotted sphere (fibonacci lattice)
    const N = 2600, pos = new Float32Array(N * 3), col = new Float32Array(N * 3);
    const c1 = new THREE.Color("#a78bfa"), c2 = new THREE.Color("#f0abfc");
    for (let i = 0; i < N; i++) {
      const y = 1 - (i / (N - 1)) * 2, r = Math.sqrt(1 - y * y), th = i * 2.399963;
      pos.set([Math.cos(th) * r, y, Math.sin(th) * r], i * 3);
      const c = c1.clone().lerp(c2, Math.random());
      col.set([c.r, c.g, c.b], i * 3);
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    g.setAttribute("color", new THREE.BufferAttribute(col, 3));
    group.add(new THREE.Points(g, new THREE.PointsMaterial({ size: 0.014, vertexColors: true, transparent: true, opacity: 0.95 })));
    group.add(new THREE.Mesh(new THREE.SphereGeometry(0.985, 48, 48), new THREE.MeshBasicMaterial({ color: "#1a0f3d", transparent: true, opacity: 0.85 })));

    // atmosphere
    const glow = new THREE.Mesh(
      new THREE.SphereGeometry(1.08, 48, 48),
      new THREE.ShaderMaterial({
        transparent: true, side: THREE.BackSide, blending: THREE.AdditiveBlending, depthWrite: false,
        vertexShader: "varying vec3 n; void main(){ n = normalize(normalMatrix*normal); gl_Position = projectionMatrix*modelViewMatrix*vec4(position,1.); }",
        fragmentShader: "varying vec3 n; void main(){ float i = pow(.72 - dot(n, vec3(0.,0.,1.)), 3.); gl_FragColor = vec4(.85,.35,.95,1.) * i; }",
      })
    );
    scene.add(glow);

    // skill labels floating on the surface
    LABELS.forEach((label, i) => {
      const cv = document.createElement("canvas"); cv.width = 256; cv.height = 64;
      const x = cv.getContext("2d");
      x.font = "600 30px Space Grotesk, Arial"; x.textAlign = "center"; x.textBaseline = "middle";
      x.fillStyle = "#fff"; x.shadowColor = "#d946ef"; x.shadowBlur = 12; x.fillText(label, 128, 32);
      const sp = new THREE.Sprite(new THREE.SpriteMaterial({ map: new THREE.CanvasTexture(cv), transparent: true, depthTest: false }));
      const phi = Math.acos(-1 + (2 * (i + 0.5)) / LABELS.length), th = Math.sqrt(LABELS.length * Math.PI) * phi;
      sp.position.set(1.12 * Math.cos(th) * Math.sin(phi), 1.12 * Math.cos(phi), 1.12 * Math.sin(th) * Math.sin(phi));
      sp.scale.set(0.5, 0.125, 1);
      group.add(sp);
    });

    const oc = new OrbitControls(camera, renderer.domElement);
    oc.enableZoom = false; oc.enablePan = false; oc.enableDamping = true;
    oc.autoRotate = true; oc.autoRotateSpeed = 1.2;
    oc.minPolarAngle = oc.maxPolarAngle = Math.PI / 2; // rotate around the vertical axis only

    let raf, visible = true;
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; });
    io.observe(el);
    const loop = () => { raf = requestAnimationFrame(loop); if (!visible) return; oc.update(); renderer.render(scene, camera); };
    loop();
    const onResize = () => renderer.setSize(size(), size());
    const ro = new ResizeObserver(onResize);
    ro.observe(el);
    return () => { cancelAnimationFrame(raf); ro.disconnect(); io.disconnect(); oc.dispose(); renderer.dispose(); el.removeChild(renderer.domElement); };
  }, []);

  return <div ref={wrap} className="aspect-square w-full cursor-grab active:cursor-grabbing [&_canvas]:!h-full [&_canvas]:!w-full" />;
}
