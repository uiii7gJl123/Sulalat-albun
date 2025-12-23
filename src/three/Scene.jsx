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

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      55,
      window.innerWidth / window.innerHeight,
      0.1,
      120
    );
    camera.position.set(0, 0, 6.2);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(2, window.devicePixelRatio));
    container.appendChild(renderer.domElement);

    // Environment for nicer reflections (cinematic feel)
    const pmrem = new THREE.PMREMGenerator(renderer);
    const envTex = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environment = envTex;

    // Lights (key / fill / rim)
    const key = new THREE.DirectionalLight(0xffffff, 1.7);
    key.position.set(4.5, 3.2, 6);
    scene.add(key);

    const fill = new THREE.DirectionalLight(0xffffff, 0.7);
    fill.position.set(-3.5, 1.4, 4);
    scene.add(fill);

    const rim = new THREE.DirectionalLight(0xffffff, 1.25);
    rim.position.set(-6, 1.6, -3.5);
    scene.add(rim);

    scene.add(new THREE.AmbientLight(0xffffff, 0.45));

    // Particles (light dust)
    const makeDust = (count = 1100) => {
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
        size: 0.018,
        transparent: true,
        opacity: 0.5,
        depthWrite: false,
      });
      return new THREE.Points(g, m);
    };

    const dust = makeDust();
    scene.add(dust);
    gsap.to(dust.rotation, { y: "+=0.9", duration: 14, repeat: -1, ease: "none" });

    // Groups
    const heroGroup = new THREE.Group();
    const clusterGroup = new THREE.Group();
    clusterGroup.visible = false;

    scene.add(heroGroup);
    scene.add(clusterGroup);

    // Helper: normalize model scale + center
    const normalizeObject = (obj, targetSize = 2.2) => {
      const box = new THREE.Box3().setFromObject(obj);
      const size = new THREE.Vector3();
      box.getSize(size);
      const maxAxis = Math.max(size.x, size.y, size.z) || 1;
      const scale = targetSize / maxAxis;

      obj.scale.setScalar(scale);

      // re-center after scaling
      const box2 = new THREE.Box3().setFromObject(obj);
      const center = new THREE.Vector3();
      box2.getCenter(center);
      obj.position.sub(center);
    };

    // Helper: apply "Green Coffee" material tuning (keeps textures if exist)
    const applyGreenBeanLook = (root) => {
      const greenTint = new THREE.Color("#8fa66a"); // green coffee vibe
      root.traverse((o) => {
        if (!o.isMesh) return;

        // Make sure materials are not shared unintentionally
        const mat = Array.isArray(o.material)
          ? o.material.map((m) => (m ? m.clone() : m))
          : o.material?.clone();

        if (!mat) return;

        const tune = (m) => {
          // Keep map if it exists, but tint towards green
          if (m.color) m.color.multiply(greenTint);

          // More "raw bean" surface
          if ("roughness" in m) m.roughness = 0.65;
          if ("metalness" in m) m.metalness = 0.02;

          // If it is Physical, add subtle clearcoat for premium sheen
          if ("clearcoat" in m) {
            m.clearcoat = 0.12;
            m.clearcoatRoughness = 0.55;
          }

          // Reduce overly dark look
          if ("envMapIntensity" in m) m.envMapIntensity = 0.85;
          m.needsUpdate = true;
          return m;
        };

        o.material = Array.isArray(mat) ? mat.map(tune) : tune(mat);
      });
    };

    // Load GLB
    const loader = new GLTFLoader();

    let heroBean = null;

    loader.load(
      "/assets/models/bean.glb",
      (gltf) => {
        // Hero
        heroBean = gltf.scene;
        normalizeObject(heroBean, 2.35);
        applyGreenBeanLook(heroBean);

        heroGroup.add(heroBean);

        // Secondary beans (clones)
        for (let i = 0; i < 10; i++) {
          const c = heroBean.clone(true);
          // Re-apply material clones/tint to avoid shared material weirdness
          applyGreenBeanLook(c);

          const angle = (i / 10) * Math.PI * 2;
          c.position.set(Math.cos(angle) * 2.3, (Math.random() - 0.5) * 0.9, Math.sin(angle) * 1.4);
          c.rotation.set(Math.random() * 1.2, Math.random() * 6.2, Math.random() * 1.2);
          c.scale.multiplyScalar(0.35 + Math.random() * 0.08);
          clusterGroup.add(c);
        }

        // Base motion (always)
        gsap.to(heroGroup.position, { y: 0.12, duration: 2.8, yoyo: true, repeat: -1, ease: "sine.inOut" });
        gsap.to(heroGroup.rotation, { y: "+=6.283", duration: 20, repeat: -1, ease: "none" });

        // Scroll choreography
        const tl = gsap.timeline({
          scrollTrigger: { start: "top top", end: "bottom bottom", scrub: 1 },
        });

        // Hero
        tl.to(camera.position, { z: 4.5, ease: "none" }, 0.0);
        tl.to(heroGroup.rotation, { x: 0.55, ease: "none" }, 0.15);

        // Story (move camera a bit)
        tl.to(camera.position, { x: 0.9, y: 0.35, z: 5.2, ease: "none" }, 0.9);

        // Quality (show cluster)
        tl.to(heroGroup.position, { x: 1.2, y: -0.08, ease: "none" }, 1.8);
        tl.to(heroGroup.rotation, { y: "+=2.6", x: 1.05, ease: "none" }, 1.8);

        // Services / Investors (calm out)
        tl.to(camera.position, { x: 0.2, y: 0.2, z: 6.1, ease: "none" }, 2.7);
        tl.to(camera.position, { x: 0, y: 0, z: 6.6, ease: "none" }, 3.4);

        // Toggle cluster visibility based on sections
        const sections = Array.from(document.querySelectorAll("section"));
        const setState = (idx) => {
          // 0 Hero, 1 Story, 2 Quality, 3 Services, 4 Investors, 5 Contact
          clusterGroup.visible = idx === 2;
        };

        sections.forEach((sec, idx) => {
          ScrollTrigger.create({
            trigger: sec,
            start: "top 60%",
            end: "bottom 40%",
            onEnter: () => setState(idx),
            onEnterBack: () => setState(idx),
          });
        });
      },
      undefined,
      () => {
        // لو فشل التحميل، لا نكسر الموقع
      }
    );

    const clock = new THREE.Clock();

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", onResize);

    let raf = 0;
    const animate = () => {
      raf = requestAnimationFrame(animate);

      // subtle orbit for cluster
      const t = clock.getElapsedTime();
      if (clusterGroup.visible) {
        clusterGroup.rotation.y = t * 0.35;
      }

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      ScrollTrigger.getAll().forEach((t) => t.kill());
      renderer.dispose();
      pmrem.dispose();
      if (container?.firstChild) container.removeChild(container.firstChild);
    };
  }, []);

  return (
    <div
      ref={ref}
      style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }}
    />
  );
}