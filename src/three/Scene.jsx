import { useEffect, useRef } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

gsap.registerPlugin(ScrollTrigger);

export default function Scene() {
  const ref = useRef(null);

  useEffect(() => {
    const container = ref.current;

    // ---- Renderer (mobile-friendly) ----
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);

    // تقليل التقطيع على الجوال: pixelRatio أقل
    const isMobile = Math.min(window.innerWidth, window.innerHeight) < 768;
    renderer.setPixelRatio(isMobile ? 1 : Math.min(1.6, window.devicePixelRatio));

    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;

    container.appendChild(renderer.domElement);

    // ---- Scene / Camera ----
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 140);
    camera.position.set(0, 0.15, 6.9);

    // Environment (soft reflections)
    const pmrem = new THREE.PMREMGenerator(renderer);
    scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;

    // Lights (stable – no flicker)
    const key = new THREE.DirectionalLight(0xffffff, 1.55);
    key.position.set(5.5, 3.2, 6.5);
    scene.add(key);

    const fill = new THREE.DirectionalLight(0xffffff, 0.55);
    fill.position.set(-4.2, 1.2, 5.5);
    scene.add(fill);

    const rim = new THREE.DirectionalLight(0xffffff, 1.1);
    rim.position.set(-6.5, 1.8, -4.5);
    scene.add(rim);

    scene.add(new THREE.AmbientLight(0xffffff, 0.35));

    // ---- Groups ----
    const rig = new THREE.Group();      // كل الحركة تكون هنا (مستقرة)
    const hero = new THREE.Group();     // الحبة الرئيسية
    const cluster = new THREE.Group();  // حبوب ثانوية (مشهد واحد)
    cluster.visible = false;

    rig.add(hero);
    rig.add(cluster);
    scene.add(rig);

    // ---- Dust (خفيف) ----
    const makeDust = (count = isMobile ? 420 : 700) => {
      const g = new THREE.BufferGeometry();
      const p = new Float32Array(count * 3);
      for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        p[i3 + 0] = (Math.random() - 0.5) * 9;
        p[i3 + 1] = (Math.random() - 0.5) * 5;
        p[i3 + 2] = (Math.random() - 0.5) * 9;
      }
      g.setAttribute("position", new THREE.BufferAttribute(p, 3));
      const m = new THREE.PointsMaterial({
        color: new THREE.Color("#d7d2c6"),
        size: isMobile ? 0.014 : 0.016,
        transparent: true,
        opacity: 0.40,
        depthWrite: false
      });
      const pts = new THREE.Points(g, m);
      return pts;
    };
    const dust = makeDust();
    scene.add(dust);

    // ---- Helpers ----
    const normalizeObject = (obj, targetSize = 2.35) => {
      const box = new THREE.Box3().setFromObject(obj);
      const size = new THREE.Vector3();
      box.getSize(size);
      const maxAxis = Math.max(size.x, size.y, size.z) || 1;
      const s = targetSize / maxAxis;
      obj.scale.setScalar(s);

      const box2 = new THREE.Box3().setFromObject(obj);
      const center = new THREE.Vector3();
      box2.getCenter(center);
      obj.position.sub(center);
    };

    const applyGreenBeanLook = (root) => {
      const tint = new THREE.Color("#95ad72"); // بن أخضر
      root.traverse((o) => {
        if (!o.isMesh) return;
        const mats = Array.isArray(o.material) ? o.material : [o.material];
        const cloned = mats.map((m) => {
          if (!m) return m;
          const nm = new THREE.MeshStandardMaterial({
            map: m.map || null,
            normalMap: m.normalMap || null,
            roughnessMap: m.roughnessMap || null,
            aoMap: m.aoMap || null,
            color: (m.color ? m.color.clone() : new THREE.Color("#c7c7c7")).multiply(tint),
            roughness: 0.72,
            metalness: 0.02
          });
          nm.envMapIntensity = 0.85;
          return nm;
        });
        o.material = Array.isArray(o.material) ? cloned : cloned[0];
      });
    };

    // ---- Load GLB ----
    const loader = new GLTFLoader();
    let heroModel = null;

    loader.load(
      "/assets/models/bean.glb",
      (gltf) => {
        heroModel = gltf.scene;
        normalizeObject(heroModel, 2.45);
        applyGreenBeanLook(heroModel);
        hero.add(heroModel);

        // cluster beans (خفيفة)
        for (let i = 0; i < (isMobile ? 8 : 12); i++) {
          const c = heroModel.clone(true);
          applyGreenBeanLook(c);

          const a = (i / (isMobile ? 8 : 12)) * Math.PI * 2;
          const r = 2.45;
          c.position.set(Math.cos(a) * r, (Math.random() - 0.5) * 0.8, Math.sin(a) * (r * 0.65));
          c.rotation.set(Math.random() * 1.0, Math.random() * 6.2, Math.random() * 1.0);
          const s = 0.26 + Math.random() * 0.07;
          c.scale.multiplyScalar(s);
          cluster.add(c);
        }

        // ---- One coherent scroll timeline (no snapping, no fighting) ----
        gsap.ticker.lagSmoothing(0);

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: document.querySelector("main"),
            start: "top top",
            end: "bottom bottom",
            scrub: 1.15,
            fastScrollEnd: true,
            invalidateOnRefresh: true
          }
        });

        // Scene 1: Intro (قريب/مهيب)
        tl.to(camera.position, { x: 0.0, y: 0.15, z: 5.6, ease: "none" }, 0);
        tl.to(hero.rotation, { x: 0.22, y: 0.35, z: 0.0, ease: "none" }, 0);
        tl.to(hero.position, { x: 0.0, y: 0.0, z: 0.0, ease: "none" }, 0);

        // Scene 2: Story (زاوية مائلة + حركة أفقية)
        tl.to(camera.position, { x: 1.05, y: 0.55, z: 5.9, ease: "none" }, 0.9);
        tl.to(hero.rotation, { x: 0.55, y: 1.25, z: 0.10, ease: "none" }, 0.9);
        tl.to(hero.position, { x: -0.25, y: -0.06, z: 0.0, ease: "none" }, 0.9);

        // Scene 3: Quality (تجميع/إظهار Cluster)
        tl.add(() => { cluster.visible = true; }, 1.8);
        tl.to(camera.position, { x: -1.15, y: 0.85, z: 5.7, ease: "none" }, 1.8);
        tl.to(hero.rotation, { x: 1.00, y: 2.55, z: 0.12, ease: "none" }, 1.8);
        tl.to(hero.position, { x: 0.95, y: -0.10, z: 0.0, ease: "none" }, 1.8);

        // Scene 4: Services (هدوء + رجوع للوسط)
        tl.add(() => { cluster.visible = false; }, 2.7);
        tl.to(camera.position, { x: 0.25, y: 0.28, z: 6.45, ease: "none" }, 2.7);
        tl.to(hero.rotation, { x: 0.55, y: 3.65, z: 0.0, ease: "none" }, 2.7);
        tl.to(hero.position, { x: 0.35, y: -0.06, z: 0.0, ease: "none" }, 2.7);

        // Scene 5: Investors/Contact (wide + premium finish)
        tl.to(camera.position, { x: 0.0, y: 0.12, z: 7.05, ease: "none" }, 3.5);
        tl.to(hero.rotation, { x: 0.28, y: 4.65, z: 0.0, ease: "none" }, 3.5);

        // Exposure slight breathing (premium)
        tl.to(renderer, { toneMappingExposure: 1.10, ease: "none" }, 3.5);

        ScrollTrigger.refresh();
      },
      undefined,
      () => {}
    );

    // ---- Stable render loop (no camera edits here) ----
    const clock = new THREE.Clock();
    let raf = 0;

    const animate = () => {
      raf = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      // gentle continuous motion (غير متعارض مع الـtimeline)
      rig.rotation.y = t * 0.12;                 // دوران عالمي خفيف
      hero.position.y = Math.sin(t * 1.2) * 0.03; // طفو بسيط

      if (cluster.visible) {
        cluster.rotation.y = t * 0.35;
        cluster.rotation.x = Math.sin(t * 0.35) * 0.06;
      }

      dust.rotation.y = t * 0.03;

      camera.lookAt(0, 0, 0);
      renderer.render(scene, camera);
    };
    animate();

    // ---- Resize ----
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();

      renderer.setSize(window.innerWidth, window.innerHeight);
      const mobile = Math.min(window.innerWidth, window.innerHeight) < 768;
      renderer.setPixelRatio(mobile ? 1 : Math.min(1.6, window.devicePixelRatio));

      ScrollTrigger.refresh();
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      ScrollTrigger.getAll().forEach((t) => t.kill());

      renderer.dispose();
      pmrem.dispose();

      if (renderer.domElement?.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={ref} style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }} />;
}