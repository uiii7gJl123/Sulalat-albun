import { useEffect, useRef } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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
      100
    );
    camera.position.set(0, 0, 6.2);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(2, window.devicePixelRatio));
    container.appendChild(renderer.domElement);

    // “Bean-ish” shape
    const geo = new THREE.SphereGeometry(1.25, 96, 96);
    geo.scale(1.05, 0.72, 0.82);

    const mat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#6f4c2a"),
      roughness: 0.28,
      metalness: 0.08,
      clearcoat: 0.25,
      clearcoatRoughness: 0.35
    });

    const bean = new THREE.Mesh(geo, mat);
    scene.add(bean);

    // slight “crease” illusion
    const creaseGeo = new THREE.TorusGeometry(0.78, 0.07, 24, 140);
    const creaseMat = new THREE.MeshStandardMaterial({
      color: "#2a1a10",
      roughness: 0.8,
      metalness: 0.0
    });
    const crease = new THREE.Mesh(creaseGeo, creaseMat);
    crease.rotation.set(Math.PI / 2, 0, Math.PI / 10);
    crease.scale.set(1.0, 0.85, 1.0);
    bean.add(crease);

    // Lights
    const key = new THREE.DirectionalLight(0xffffff, 1.6);
    key.position.set(4, 3, 6);
    scene.add(key);

    const rim = new THREE.DirectionalLight(0xffffff, 1.2);
    rim.position.set(-5, 1.5, -2);
    scene.add(rim);

    scene.add(new THREE.AmbientLight(0xffffff, 0.55));

    // subtle floating
    gsap.to(bean.rotation, { y: "+=6.283", duration: 18, repeat: -1, ease: "none" });
    gsap.to(bean.position, { y: 0.12, duration: 2.8, yoyo: true, repeat: -1, ease: "sine.inOut" });

    // Scroll timeline
    gsap.timeline({
      scrollTrigger: {
        start: "top top",
        end: "bottom bottom",
        scrub: 1
      }
    })
      .to(camera.position, { z: 4.6, ease: "none" }, 0)
      .to(bean.rotation, { x: 0.6, ease: "none" }, 0.2)
      .to(bean.position, { x: 1.4, y: -0.15, ease: "none" }, 1)
      .to(bean.rotation, { y: 2.4, ease: "none" }, 1)
      .to(camera.position, { x: -1.1, y: 0.7, z: 5.4, ease: "none" }, 2)
      .to(bean.rotation, { y: 5.2, x: 1.15, ease: "none" }, 2);

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", onResize);

    let raf = 0;
    const animate = () => {
      raf = requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      ScrollTrigger.getAll().forEach((t) => t.kill());
      renderer.dispose();
      container.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={ref}
      style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }}
    />
  );
}