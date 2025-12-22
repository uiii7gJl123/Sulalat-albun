import { useEffect, useRef } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Scene() {
  const ref = useRef();

  useEffect(() => {
    const container = ref.current;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      55,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.z = 6;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(2, window.devicePixelRatio));
    container.appendChild(renderer.domElement);

    // Coffee bean (procedural)
    const geometry = new THREE.SphereGeometry(1.2, 64, 64);
    geometry.scale(1, 0.7, 0.7);

    const material = new THREE.MeshStandardMaterial({
      color: "#7a5534",
      roughness: 0.35,
      metalness: 0.15,
    });

    const bean = new THREE.Mesh(geometry, material);
    scene.add(bean);

    const light = new THREE.DirectionalLight(0xffffff, 1.4);
    light.position.set(4, 4, 6);
    scene.add(light);
    scene.add(new THREE.AmbientLight(0xffffff, 0.6));

    // Scroll animation
    gsap.timeline({
      scrollTrigger: {
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
      },
    })
      .to(bean.rotation, { y: Math.PI * 2 }, 0)
      .to(camera.position, { z: 4.5 }, 0)
      .to(bean.position, { x: 1.5 }, 1)
      .to(bean.rotation, { x: Math.PI * 0.5 }, 1)
      .to(camera.position, { x: -1.2, y: 0.8 }, 2);

    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();

    window.addEventListener("resize", () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });
  }, []);

  return (
    <div
      ref={ref}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
      }}
    />
  );
}