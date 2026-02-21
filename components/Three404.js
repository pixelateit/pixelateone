"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export default function Three404() {
  const mountRef = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    // scene.background = new THREE.Color("#000000");

    const camera = new THREE.PerspectiveCamera(
      50,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    );
    camera.position.z = 90;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;

    mountRef.current.appendChild(renderer.domElement);

    // LIGHTS
    const light = new THREE.DirectionalLight(0xff3f2b, 10);
    light.position.set(24, 40, 80);
    scene.add(light);

    const ambient = new THREE.AmbientLight(0x0202ff, 40);
    scene.add(ambient);

    // LOAD FONT
    const loader = new FontLoader();
    loader.load(
      "https://threejs.org/examples/fonts/helvetiker_bold.typeface.json",
      (font) => {
        const geometry = new TextGeometry("404", {
          font: font,
          size: 24,
          depth: 24,
          height: 0.8,
          curveSegments: 12,
          bevelEnabled: true,
          bevelThickness: 3.2,
          bevelSize: 1.6,
          bevelSegments: 12,
        });

        geometry.center();

        const material = new THREE.MeshPhysicalMaterial({
          color: 0x363636,
          metalness: 0.32,
          roughness: 0.24,
          transmission: 1, // GLASS
          thickness: 2,
          ior: 1.2,
          clearcoat: 1,
          clearcoatRoughness: 0,
          reflectivity: 1,
        });

        const textMesh = new THREE.Mesh(geometry, material);
        scene.add(textMesh);

        // Mouse interaction
        window.addEventListener("mousemove", (e) => {
          const x = (e.clientX / window.innerWidth) * 2 - 1;
          const y = -(e.clientY / window.innerHeight) * 2 + 1;

          textMesh.rotation.y = x * 0.5;
          textMesh.rotation.x = y * 0.3;

          light.position.x = x * 10;
          light.position.y = y * 10;
        });

        // Floating animation
        const animate = () => {
          requestAnimationFrame(animate);

          textMesh.position.y = Math.sin(Date.now() * 0.001) * 0.3;

          renderer.render(scene, camera);
        };

        animate();
      },
    );

    // Resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      mountRef.current.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="w-full h-screen" />;
}
