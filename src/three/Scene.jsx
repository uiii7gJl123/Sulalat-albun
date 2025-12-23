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

    // --- Scene / Camera / Renderer ---
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      55,
      window.innerWidth / window.innerHeight,
      0.1,
      140
    );
    camera.position.set(0, 0, 6.6);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(2, window.devicePixelRatio));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    container.appendChild(renderer.domElement);

    // --- Environment (soft studio reflections) ---
    const pmrem = new THREE.PMREMGenerator(renderer);
    scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;

    // --- Lights (cinematic) ---
    const key = new THREE.DirectionalLight(0xffffff, 1.7);
    key.position.set(5.5, 3.5, 6.5);
    scene.add(key);

    const fill = new THREE.DirectionalLight(0xffffff, 0.55);
    fill.position.set(-4.2, 1.0, 5.5);
    scene.add(fill);

    const rim = new THREE.DirectionalLight(0xffffff, 1.15);
    rim.position.set(-6.5, 1.8, -4.5);
    scene.add(rim);

    scene.add(new THREE.AmbientLight(0xffffff, 0.35));

    // --- Groups ---
    const hero = new THREE.Group();
    const cluster = new THREE.Group();
    cluster.visible = false;

    scene.add(hero);
    scene.add(cluster);

    // --- Dust Particles (subtle premium) ---
    const makeDust = (count = 900) => {
      const g = new THREE.BufferGeometry();
      const p = new Float32Array(count * 3);
      for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        p[i3 + 0] = (Math.random() - 0.5) * 10;
        p[i3 + 1] = (Math.random() - 0.5) * 6;
        p[i3 + 2] = (Math.random() - 0.5) * 10;
      }
      g.setAttribute("position", new THREE.BufferAttribute(p, 3));
      const m = new THREE.PointsMaterial({
        color: new THREE.Color("#d7d2c6"),
        size: 0.016,
        transparent: true,
        opacity: 0.45,
        depthWrite: false
      });
      const pts = new THREE.Points(g, m);
      return pts;
    };
    const dust = makeDust();
    scene.add(dust);

    // --- Helpers ---
    const normalizeObject = (obj, targetSize = 2.3) => {
      const box = new THREE.Box3().setFromObject(obj);
      const size = new THREE.Vector3();
      box.getSize(size);
      const maxAxis = Math.max(size.x, size.y, size.z) || 1;
      const scale = targetSize / maxAxis;
      obj.scale.setScalar(scale);

      const box2 = new THREE.Box3().setFromObject(obj);
      const center = new THREE.Vector3();
      box2.getCenter(center);
      obj.position.sub(center);
    };

    const applyGreenBeanLook = (root) => {
      // "Green coffee" tint (عدله إذا تبي أخضر أكثر/أقل)
      const greenTint = new THREE.Color("#95ad72");

      root.traverse((o) => {
        if (!o.isMesh) return;

        // Clone materials to avoid sharing artifacts
        const mats = Array.isArray(o.material) ? o.material : [o.material];
        const newMats = mats.map((m) => {
          if (!m) return m;

          // Keep maps if exist, convert to Standard/Physical feel
          const nm = new THREE.MeshStandardMaterial({
            map: m.map || null,
            normalMap: m.normalMap || null,
            roughnessMap: m.roughnessMap || null,
            metalnessMap: m.metalnessMap || null,
            aoMap: m.aoMap || null,
            color: (m.color ? m.color.clone() : new THREE.Color("#c7c7c7")).multiply(greenTint),
            roughness: 0.72,
            metalness: 0.02,
            transparent: m.transparent || false,
            opacity: typeof m.opacity === "number" ? m.opacity : 1
          });

          // If model had emissive/specular, ignore for natural raw look
          nm.envMapIntensity = 0.85;

          // If it looks too flat, reduce roughness a bit:
          // nm.roughness = 0.62;

          return nm;
        });

        o.material = Array.isArray(o.material) ? newMats : newMats[0];
      });
    };

    // Smooth look-at target (avoid snapping)
    const lookTarget = new THREE.Vector3(0, 0, 0);
    const lookCurrent = new THREE.Vector3(0, 0, 0);

    // --- Cinematic States (لكل Section) ---
    // idx: 0 Hero, 1 Story, 2 Quality, 3 Services, 4 Investors, 5 Contact
    const STATES = [
      {
        camPos: new THREE.Vector3(0.0, 0.05, 6.6),
        lookAt: new THREE.Vector3(0.0, 0.0, 0.0),
        heroPos: new THREE.Vector3(0.0, 0.0, 0.0),
        heroRot: new THREE.Euler(0.15, 0.0, 0.0),
        heroScale: 1.0,
        showCluster: false,
        exposure: 1.08
      },
      {
        camPos: new THREE.Vector3(0.9, 0.45, 5.9),
        lookAt: new THREE.Vector3(0.0, 0.05, 0.0),
        heroPos: new THREE.Vector3(-0.25, -0.05, 0.0),
        heroRot: new THREE.Euler(0.35, 1.2, 0.0),
        heroScale: 1.02,
        showCluster: false,
        exposure: 1.05
      },
      {
        camPos: new THREE.Vector3(-1.15, 0.75, 5.7),
        lookAt: new THREE.Vector3(0.15, 0.0, 0.0),
        heroPos: new THREE.Vector3(0.95, -0.12, 0.0),
        heroRot: new THREE.Euler(0.95, 2.6, 0.15),
        heroScale: 1.0,
        showCluster: true,
        exposure: 1.03
      },
      {
        camPos: new THREE.Vector3(0.25, 0.25, 6.35),
        lookAt: new THREE.Vector3(0.0, 0.0, 0.0),
        heroPos: new THREE.Vector3(0.35, -0.08, 0.0),
        heroRot: new THREE.Euler(0.55, 3.6, 0.0),
        heroScale: 0.98,
        showCluster: false,
        exposure: 1.06
      },
      {
        camPos: new THREE.Vector3(0.0, 0.15, 6.75),
        lookAt: new THREE.Vector3(0.0, 0.0, 0.0),
        heroPos: new THREE.Vector3(0.0, -0.05, 0.0),
        heroRot: new THREE.Euler(0.25, 4.5, 0.0),
        heroScale: 1.0,
        showCluster: false,
        exposure: 1.08
      },
      {
        camPos: new THREE.Vector3(0.0, 0.05, 7.05),
        lookAt: new THREE.Vector3(0.0, 0.0, 0.0),
        heroPos: new THREE.Vector3(0.0, 0.0, 0.0),
        heroRot: new THREE.Euler(0.15, 5.1, 0.0),
        heroScale: 1.0,
        showCluster: false,
        exposure: 1.1
      }
    ];

    // GSAP "goToState" (احترافي: ease + مدة ثابتة + بدون تشويش)
    let activeTween = null;
    const goToState = (idx) => {
      const s = STATES[Math.max(0, Math.min(STATES.length - 1, idx))];

      // Toggle cluster cleanly (fade-like)
      if (s.showCluster) {
        cluster.visible = true;
        gsap.to(cluster, { duration: 0.8, ease: "power2.out", onUpdate: () => {} });
      } else {
        // hide after small delay for smoothness
        gsap.delayedCall(0.2, () => (cluster.visible = false));
      }

      // Kill previous to avoid fighting
      if (activeTween) activeTween.kill();

      activeTween = gsap.timeline({ defaults: { duration: 1.15, ease: "power3.inOut" } });

      activeTween.to(camera.position, { x: s.camPos.x, y: s.camPos.y, z: s.camPos.z }, 0);
      activeTween.to(hero.position, { x: s.heroPos.x, y: s.heroPos.y, z: s.heroPos.z }, 0);
      activeTween.to(hero.rotation, { x: s.heroRot.x, y: s.heroRot.y, z: s.heroRot.z }, 0);
      activeTween.to(hero.scale, { x: s.heroScale, y: s.heroScale, z: s.heroScale }, 0);
      activeTween.to(renderer, { toneMappingExposure: s.exposure }, 0);

      // Smooth lookAt target (interpolated in render loop)
      gsap.to(lookTarget, { duration: 1.15, ease: "power3.inOut", x: s.lookAt.x, y: s.lookAt.y, z: s.lookAt.z });
    };

    // --- Mouse parallax (very subtle, premium) ---
    const mouse = { x: 0, y: 0 };
    const onMouseMove = (e) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = (e.clientY / window.innerHeight) * 2 - 1;
      mouse.x = nx;
      mouse.y = ny;
    };
    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("touchmove", (e) => {
      if (!e.touches?.[0]) return;
      const t = e.touches[0];
      const nx = (t.clientX / window.innerWidth) * 2 - 1;
      const ny = (t.clientY / window.innerHeight) * 2 - 1;
      mouse.x = nx;
      mouse.y = ny;
    }, { passive: true });

    // --- Load model ---
    const loader = new GLTFLoader();
    let heroModel = null;

    loader.load(
      "/assets/models/bean.glb",
      (gltf) => {
        heroModel = gltf.scene;
        normalizeObject(heroModel, 2.35);
        applyGreenBeanLook(heroModel);
        hero.add(heroModel);

        // Create cluster (secondary beans) by cloning (small count; safe for web)
        for (let i = 0; i < 12; i++) {
          const c = heroModel.clone(true);
          applyGreenBeanLook(c);

          const a = (i / 12) * Math.PI * 2;
          const r = 2.35;
          c.position.set(Math.cos(a) * r, (Math.random() - 0.5) * 0.9, Math.sin(a) * (r * 0.65));
          c.rotation.set(Math.random() * 1.1, Math.random() * 6.2, Math.random() * 1.1);
          const s = 0.26 + Math.random() * 0.08;
          c.scale.multiplyScalar(s);
          cluster.add(c);
        }

        // Initial state (Hero)
        goToState(0);

        // Section triggers (clean Apple-style scene switching)
        const sections = Array.from(document.querySelectorAll("section"));
        sections.forEach((sec, idx) => {
          ScrollTrigger.create({
            trigger: sec,
            start: "top 55%",
            end: "bottom 45%",
            onEnter: () => goToState(idx),
            onEnterBack: () => goToState(idx)
          });
        });

        // Optional: snap to sections (feel premium). Uncomment إذا تبيه:
        // ScrollTrigger.normalizeScroll(true);
        // ScrollTrigger.config({ ignoreMobileResize: true });
      },
      undefined,
      () => {
        // fail silently
      }
    );

    // --- Resize ---
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", onResize);

    // --- Render loop ---
    const clock = new THREE.Clock();
    let raf = 0;

    const animate = () => {
      raf = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      // Subtle premium drift (continuous, not fighting the state)
      hero.rotation.y += 0.0025; // slow rotation always
      hero.position.y += Math.sin(t * 1.2) * 0.0006;

      // Cluster orbit (only when visible)
      if (cluster.visible) {
        cluster.rotation.y = t * 0.35;
        cluster.rotation.x = Math.sin(t * 0.35) * 0.06;
      }

      // Dust drift
      dust.rotation.y += 0.0009;

      // Mouse parallax (tiny)
      const parX = mouse.x * 0.12;
      const parY = -mouse.y * 0.08;
      camera.position.x += (parX - camera.position.x * 0.0) * 0.02; // tiny push
      camera.position.y += (parY - camera.position.y * 0.0) * 0.02;

      // Smooth lookAt
      lookCurrent.lerp(lookTarget, 0.08);
      camera.lookAt(lookCurrent);

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouseMove);
      ScrollTrigger.getAll().forEach((t) => t.kill());
      renderer.dispose();
      pmrem.dispose();

      // remove canvas safely
      if (renderer.domElement && renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={ref}
      style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }}
    />
  );
}