import { useEffect, useRef } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

export default function Scene() {
  const ref = useRef(null);

  useEffect(() => {
    const container = ref.current;

    // Renderer (خفيف للجوال)
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    const isMobile = Math.min(window.innerWidth, window.innerHeight) < 768;
    renderer.setPixelRatio(isMobile ? 1 : Math.min(1.6, window.devicePixelRatio));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 120);
    camera.position.set(0, 0.25, 7.2);

    // Environment
    const pmrem = new THREE.PMREMGenerator(renderer);
    scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;

    // Lights
    const key = new THREE.DirectionalLight(0xffffff, 1.35);
    key.position.set(5.5, 3.2, 6.5);
    scene.add(key);

    const fill = new THREE.DirectionalLight(0xffffff, 0.55);
    fill.position.set(-4.2, 1.2, 5.5);
    scene.add(fill);

    const rim = new THREE.DirectionalLight(0xffffff, 0.95);
    rim.position.set(-6.5, 1.8, -4.5);
    scene.add(rim);

    scene.add(new THREE.AmbientLight(0xffffff, 0.32));

    // Groups
    const rig = new THREE.Group();
    const bean = new THREE.Group();
    scene.add(rig);
    rig.add(bean);

    // Green coffee look
    const applyGreen = (root) => {
      const tint = new THREE.Color("#95ad72");
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

    const normalize = (obj, targetSize = 2.5) => {
      const box = new THREE.Box3().setFromObject(obj);
      const size = new THREE.Vector3();
      box.getSize(size);
      const maxAxis = Math.max(size.x, size.y, size.z) || 1;
      obj.scale.setScalar(targetSize / maxAxis);

      const box2 = new THREE.Box3().setFromObject(obj);
      const center = new THREE.Vector3();
      box2.getCenter(center);
      obj.position.sub(center);
    };

    // Load GLB
    const loader = new GLTFLoader();
    loader.load("/assets/models/bean.glb", (gltf) => {
      const model = gltf.scene;
      normalize(model, 2.55);
      applyGreen(model);
      bean.add(model);

      // دخول سينمائي أول الصفحة (مرة واحدة)
      gsap.fromTo(
        bean.rotation,
        { y: -1.2, x: 0.4 },
        { y: 0.2, x: 0.15, duration: 1.2, ease: "power3.out" }
      );
      gsap.fromTo(
        camera.position,
        { z: 9.0 },
        { z: 7.2, duration: 1.2, ease: "power3.out" }
      );
    });

    // Drag/orbit (ناعم جدًا)
    let dragging = false;
    let lastX = 0;
    let lastY = 0;
    const targetRot = { x: 0.15, y: 0.2 };
    const currentRot = { x: 0.15, y: 0.2 };

    const down = (x, y) => {
      dragging = true; lastX = x; lastY = y;
    };
    const move = (x, y) => {
      if (!dragging) return;
      const dx = (x - lastX) / window.innerWidth;
      const dy = (y - lastY) / window.innerHeight;
      lastX = x; lastY = y;

      targetRot.y += dx * 2.2;
      targetRot.x += dy * 1.6;
      targetRot.x = Math.max(-0.35, Math.min(0.55, targetRot.x));
    };
    const up = () => { dragging = false; };

    const onMouseDown = (e) => down(e.clientX, e.clientY);
    const onMouseMove = (e) => move(e.clientX, e.clientY);
    const onMouseUp = () => up();

    const onTouchStart = (e) => { if (e.touches?.[0]) down(e.touches[0].clientX, e.touches[0].clientY); };
    const onTouchMove = (e) => { if (e.touches?.[0]) move(e.touches[0].clientX, e.touches[0].clientY); };
    const onTouchEnd = () => up();

    window.addEventListener("mousedown", onMouseDown, { passive: true });
    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mouseup", onMouseUp, { passive: true });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });

    // مزاج المشاهد حسب القسم (بدون Timeline ثقيل)
    const setMood = (name) => {
      if (name === "hero") {
        gsap.to(camera.position, { x: 0, y: 0.25, z: 7.2, duration: 0.8, ease: "power2.out" });
        gsap.to(renderer, { toneMappingExposure: 1.05, duration: 0.8 });
      }
      if (name === "origin") {
        gsap.to(camera.position, { x: 0.8, y: 0.35, z: 7.6, duration: 0.9, ease: "power2.out" });
        gsap.to(renderer, { toneMappingExposure: 1.08, duration: 0.9 });
      }
      if (name === "story") {
        gsap.to(camera.position, { x: -0.9, y: 0.55, z: 7.9, duration: 0.9, ease: "power2.out" });
        gsap.to(renderer, { toneMappingExposure: 1.02, duration: 0.9 });
      }
      if (name === "quality") {
        gsap.to(camera.position, { x: 0.25, y: 0.2, z: 6.9, duration: 0.9, ease: "power2.out" });
        gsap.to(renderer, { toneMappingExposure: 1.10, duration: 0.9 });
      }
      if (name === "invest") {
        gsap.to(camera.position, { x: 0, y: 0.15, z: 8.2, duration: 0.9, ease: "power2.out" });
        gsap.to(renderer, { toneMappingExposure: 1.06, duration: 0.9 });
      }
      if (name === "contact") {
        gsap.to(camera.position, { x: 0, y: 0.25, z: 8.6, duration: 0.9, ease: "power2.out" });
        gsap.to(renderer, { toneMappingExposure: 1.00, duration: 0.9 });
      }
    };

    const mapIdToMood = (id) => {
      if (id === "top") return "hero";
      if (id === "origin") return "origin";
      if (id === "story") return "story";
      if (id === "quality") return "quality";
      if (id === "invest") return "invest";
      if (id === "contact") return "contact";
      return "hero";
    };

    const sections = Array.from(document.querySelectorAll("section"));
    const io = new IntersectionObserver(
      (entries) => {
        const best = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!best) return;
        setMood(mapIdToMood(best.target.id));
      },
      { threshold: [0.35, 0.5, 0.65] }
    );
    sections.forEach((s) => io.observe(s));

    // Render loop (خفيف/سلس)
    const clock = new THREE.Clock();
    let raf = 0;

    const animate = () => {
      raf = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      // سلاسة الدوران نحو الهدف (بدون تقطيع)
      currentRot.x += (targetRot.x - currentRot.x) * 0.08;
      currentRot.y += (targetRot.y - currentRot.y) * 0.08;

      bean.rotation.x = currentRot.x + Math.sin(t * 0.8) * 0.02;
      bean.rotation.y = currentRot.y + t * 0.08; // دوران بطيء مستمر
      bean.position.y = Math.sin(t * 1.0) * 0.08;

      camera.lookAt(0, 0, 0);
      renderer.render(scene, camera);
    };
    animate();

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      const mobile = Math.min(window.innerWidth, window.innerHeight) < 768;
      renderer.setPixelRatio(mobile ? 1 : Math.min(1.6, window.devicePixelRatio));
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", onResize);

      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);

      renderer.dispose();
      pmrem.dispose();
      if (renderer.domElement?.parentNode) renderer.domElement.parentNode.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={ref} style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }} />;
}