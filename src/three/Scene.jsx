import { useEffect, useRef } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function makeLeaf() {
  // Leaf shape (simple but nice)
  const shape = new THREE.Shape();
  shape.moveTo(0, 0);
  shape.quadraticCurveTo(0.6, 0.15, 0.9, 0.0);
  shape.quadraticCurveTo(0.6, -0.15, 0, 0);
  shape.quadraticCurveTo(-0.6, -0.15, -0.9, 0.0);
  shape.quadraticCurveTo(-0.6, 0.15, 0, 0);

  const geo = new THREE.ExtrudeGeometry(shape, {
    depth: 0.03,
    bevelEnabled: true,
    bevelThickness: 0.01,
    bevelSize: 0.02,
    bevelSegments: 2,
    curveSegments: 24
  });

  geo.rotateX(Math.PI / 2);
  geo.scale(1.2, 1.0, 1.2);

  const mat = new THREE.MeshStandardMaterial({
    color: new THREE.Color("#1f4a2a"),
    roughness: 0.65,
    metalness: 0.02
  });

  const leaf = new THREE.Mesh(geo, mat);
  leaf.castShadow = false;
  leaf.receiveShadow = false;
  return leaf;
}

function makeBean() {
  // Better bean-ish base
  const geo = new THREE.SphereGeometry(1.2, 128, 128);
  geo.scale(1.05, 0.72, 0.86);

  // Add a slight asymmetry by moving vertices (cheap sculpt feel)
  const pos = geo.attributes.position;
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i), y = pos.getY(i), z = pos.getZ(i);
    const n = Math.sin(x * 2.2) * 0.015 + Math.cos(z * 2.0) * 0.015 + Math.sin(y * 3.3) * 0.01;
    pos.setXYZ(i, x + n * (x * 0.4), y + n * 0.25, z + n * (z * 0.35));
  }
  pos.needsUpdate = true;
  geo.computeVertexNormals();

  const mat = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color("#6a4526"),
    roughness: 0.28,
    metalness: 0.08,
    clearcoat: 0.35,
    clearcoatRoughness: 0.35,
  });

  const bean = new THREE.Mesh(geo, mat);

  // Crease illusion (darker groove)
  const creaseGeo = new THREE.TorusGeometry(0.75, 0.065, 24, 160);
  const creaseMat = new THREE.MeshStandardMaterial({
    color: "#25150d",
    roughness: 0.9,
    metalness: 0.0
  });
  const crease = new THREE.Mesh(creaseGeo, creaseMat);
  crease.rotation.set(Math.PI / 2, 0, Math.PI / 14);
  crease.scale.set(1.0, 0.82, 1.0);
  bean.add(crease);

  return bean;
}

function makeLowPolyTree() {
  const group = new THREE.Group();

  const trunkGeo = new THREE.CylinderGeometry(0.12, 0.18, 1.2, 8);
  const trunkMat = new THREE.MeshStandardMaterial({ color: "#3a2a20", roughness: 0.9 });
  const trunk = new THREE.Mesh(trunkGeo, trunkMat);
  trunk.position.y = -0.2;

  const crownGeo = new THREE.IcosahedronGeometry(0.85, 0);
  const crownMat = new THREE.MeshStandardMaterial({ color: "#1a3b22", roughness: 0.85 });
  const crown = new THREE.Mesh(crownGeo, crownMat);
  crown.position.y = 0.55;

  group.add(trunk, crown);
  return group;
}

function makeParticles(count = 900) {
  const geo = new THREE.BufferGeometry();
  const positions = new Float32Array(count * 3);

  for (let i = 0; i < count; i++) {
    const i3 = i * 3;
    positions[i3 + 0] = (Math.random() - 0.5) * 10; // x
    positions[i3 + 1] = (Math.random() - 0.5) * 6;  // y
    positions[i3 + 2] = (Math.random() - 0.5) * 10; // z
  }

  geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));

  const mat = new THREE.PointsMaterial({
    color: new THREE.Color("#d9c7a6"),
    size: 0.018,
    sizeAttenuation: true,
    transparent: true,
    opacity: 0.55,
    depthWrite: false,
  });

  return new THREE.Points(geo, mat);
}

export default function Scene() {
  const ref = useRef(null);

  useEffect(() => {
    const container = ref.current;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 120);
    camera.position.set(0, 0, 6.4);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(2, window.devicePixelRatio));
    container.appendChild(renderer.domElement);

    // --- Lights (cinematic) ---
    const key = new THREE.DirectionalLight(0xffffff, 1.8);
    key.position.set(4.5, 3.2, 6);
    scene.add(key);

    const fill = new THREE.DirectionalLight(0xffffff, 0.7);
    fill.position.set(-3.5, 1.5, 4);
    scene.add(fill);

    const rim = new THREE.DirectionalLight(0xffffff, 1.25);
    rim.position.set(-6, 1.6, -3.5);
    scene.add(rim);

    scene.add(new THREE.AmbientLight(0xffffff, 0.45));

    // --- Objects ---
    const heroBean = makeBean();
    scene.add(heroBean);

    // Multiple beans (cluster) around hero
    const cluster = new THREE.Group();
    const beans = [];
    for (let i = 0; i < 10; i++) {
      const b = makeBean();
      b.scale.setScalar(0.32);
      const angle = (i / 10) * Math.PI * 2;
      b.position.set(Math.cos(angle) * 2.2, (Math.random() - 0.5) * 0.8, Math.sin(angle) * 1.3);
      b.rotation.set(Math.random() * 1.2, Math.random() * 6, Math.random() * 1.2);
      cluster.add(b);
      beans.push(b);
    }
    cluster.visible = false;
    scene.add(cluster);

    // Leaves group
    const leaves = new THREE.Group();
    for (let i = 0; i < 7; i++) {
      const leaf = makeLeaf();
      leaf.scale.setScalar(0.55 + Math.random() * 0.35);
      leaf.position.set((Math.random() - 0.5) * 4.8, (Math.random() - 0.5) * 2.2, (Math.random() - 0.5) * 3.2);
      leaf.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
      leaves.add(leaf);
    }
    leaves.visible = false;
    scene.add(leaves);

    // Low poly tree (background)
    const tree = makeLowPolyTree();
    tree.position.set(2.8, -1.1, -3.5);
    tree.scale.setScalar(1.35);
    tree.visible = false;
    scene.add(tree);

    // Particles
    const dust = makeParticles(1200);
    dust.visible = true;
    scene.add(dust);

    // --- Base floating (always) ---
    gsap.to(heroBean.position, { y: 0.12, duration: 2.8, yoyo: true, repeat: -1, ease: "sine.inOut" });
    gsap.to(heroBean.rotation, { y: "+=6.283", duration: 20, repeat: -1, ease: "none" });

    // Gentle particle drift
    gsap.to(dust.rotation, { y: "+=0.9", duration: 14, repeat: -1, ease: "none" });

    // --- Scroll choreography by sections (مميز أكثر) ---
    const sections = Array.from(document.querySelectorAll("section"));

    const showState = (idx) => {
      // idx: 0 Hero, 1 Story, 2 Quality, 3 Services, 4 Investors, 5 Contact
      // You can tweak these as you like
      if (idx === 0) {
        cluster.visible = false; leaves.visible = false; tree.visible = false;
        heroBean.visible = true;
      }
      if (idx === 1) {
        tree.visible = true; leaves.visible = true; cluster.visible = false;
      }
      if (idx === 2) {
        cluster.visible = true; leaves.visible = true; tree.visible = false;
      }
      if (idx >= 3) {
        cluster.visible = false; tree.visible = false; leaves.visible = true;
      }
    };

    sections.forEach((sec, idx) => {
      ScrollTrigger.create({
        trigger: sec,
        start: "top 60%",
        end: "bottom 40%",
        onEnter: () => showState(idx),
        onEnterBack: () => showState(idx),
      });
    });

    // Main scroll timeline (camera + hero)
    const tl = gsap.timeline({
      scrollTrigger: { start: "top top", end: "bottom bottom", scrub: 1 }
    });

    // 0 -> 1
    tl.to(camera.position, { z: 4.7, ease: "none" }, 0.0);
    tl.to(heroBean.rotation, { x: 0.55, ease: "none" }, 0.15);

    // 1 -> 2 (story)
    tl.to(camera.position, { x: 0.9, y: 0.35, z: 5.2, ease: "none" }, 0.8);
    tl.to(leaves.rotation, { y: "+=2.0", ease: "none" }, 0.8);

    // 2 -> 3 (quality)
    tl.to(camera.position, { x: -1.1, y: 0.75, z: 5.5, ease: "none" }, 1.6);
    tl.to(heroBean.rotation, { y: "+=3.2", x: 1.05, ease: "none" }, 1.6);

    // 3 -> 4 (services)
    tl.to(camera.position, { x: 0.2, y: 0.25, z: 6.1, ease: "none" }, 2.4);
    tl.to(heroBean.position, { x: 1.2, y: -0.1, ease: "none" }, 2.4);

    // 4 -> 5 (investors/contact)
    tl.to(camera.position, { x: 0, y: 0, z: 6.6, ease: "none" }, 3.2);
    tl.to(leaves.position, { x: 0.4, y: 0.0, ease: "none" }, 3.2);

    // Animate cluster orbit locally (every frame)
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
      const t = clock.getElapsedTime();

      // orbit beans if visible
      if (cluster.visible) {
        cluster.rotation.y = t * 0.35;
        beans.forEach((b, i) => {
          b.rotation.x += 0.002;
          b.rotation.z += 0.0015;
          b.position.y = Math.sin(t * 0.9 + i) * 0.25;
        });
      }

      // leaf drift
      if (leaves.visible) {
        leaves.rotation.y += 0.0012;
        leaves.rotation.x += 0.0005;
      }

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

  return <div ref={ref} style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }} />;
}