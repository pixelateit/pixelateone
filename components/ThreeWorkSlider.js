"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { gsap } from "@/lib/gsapConfig";
import Image from "next/image";
import workImage from "@/public/Works.svg";
import DragCursor from "./dragCursor";
import usePageTransition from "@/hooks/usePageTransition";

const ThreeWorkSlider = () => {
  const canvasRef = useRef();
  const containerRef = useRef();
  const textRef = useRef();
  const [works, setWorks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cursorState, setCursorState] = useState("idle");
  const triggerTransition = usePageTransition();

  useEffect(() => {
    const fetchWorks = async () => {
      try {
        setLoading(true);
        const query = new URLSearchParams({
          showWork: true,
          fields: "title,createdBy,thumbnail",
        }).toString();
        const res = await fetch(`/api/work?${query}`);

        const data = await res.json();

        // ✅ Ensure you set `data.works` if API responds { works: [...] }
        setWorks(Array.isArray(data.works) ? data.works : data);
      } catch (err) {
        console.error("fetchWorks failed:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchWorks();
  }, []);

  const settings = useRef({
    wheelSensitivity: 0.01,
    touchSensitivity: 0.01,
    momentumMultiplier: 2,
    smoothing: 0.1,
    slideLerp: 0.075,
    distortionDecay: 0.95,
    maxDistortion: 2.5,
    distortionSensitivity: 0.15,
    distortionSmoothing: 0.075,
  }).current;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleEnter = () => setCursorState("scroll");
    const handleLeave = () => setCursorState("idle"); // or "default"

    canvas.addEventListener("mouseenter", handleEnter);
    canvas.addEventListener("mouseleave", handleLeave);

    return () => {
      canvas.removeEventListener("mouseenter", handleEnter);
      canvas.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  useEffect(() => {
    gsap.fromTo(
      textRef.current,
      { opacity: 0, y: 50, scale: 0.9 },
      { opacity: 1, y: 0, scale: 1.5, duration: 1.5, ease: "power2.out" }
    );
  }, []);

  useEffect(() => {
    if (loading) return; // ❗ DO NOTHING while loading

    const tl = gsap.timeline();

    tl.to(canvasRef.current, {
      opacity: 1,
      y: 50,
      filter: "blur(0px)",
      duration: 1.5,
      ease: "power2.out",
    });

    tl.to(
      textRef.current,
      {
        yPercent: 0,
        xPercent: 0,
        translateX: "0%",
        translateY: "0%",
        top: "120px",
        left: "20px",
        scale: 1,
        duration: 1.5,
        ease: "power2.out",
      },
      "-=1.2"
    );
  }, [loading]);

  useEffect(() => {
    // Only proceed if works data is available and not empty
    if (works.length === 0 || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      preserveDrawingBuffer: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    if (window.innerWidth < 500) {
      camera.position.z = 6;
    } else {
      camera.position.z = 5;
    }

    const slideWidth = 2.4,
      slideHeight = 1.6,
      gap = 0.4,
      slideCount = works.length,
      imagesCount = works.length,
      totalWidth = slideCount * (slideWidth + gap),
      slideUnit = slideWidth + gap;

    const slides = [];
    let currentPosition = 0,
      targetPosition = 0,
      isScrolling = false,
      autoScrollSpeed = 0,
      lastSpeed = 0,
      touchStartX = 0,
      touchLastX = 0,
      prevPosition = 0,
      currentDistortionFactor = 0,
      targetDistortionFactor = 0,
      peakVelocity = 0,
      velocityHistory = [0, 0, 0, 0, 0];

    //Label
    function createLabel(text) {
      const canvas = document.createElement("canvas");
      const size = 256; // Higher = sharper text
      canvas.width = size;
      canvas.height = size / 4;

      const ctx = canvas.getContext("2d");
      ctx.fillStyle = "#ffffff"; // Dark text
      ctx.font = `bold ${12}px archivo`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(text.toUpperCase(), size / 2, size / 4 / 2);

      const texture = new THREE.CanvasTexture(canvas);
      texture.minFilter = THREE.LinearFilter;
      texture.colorSpace = THREE.SRGBColorSpace;

      const material = new THREE.SpriteMaterial({
        map: texture,
        transparent: true,
      });

      return new THREE.Sprite(material);
    }

    const createSlide = (index) => {
      const geometry = new THREE.PlaneGeometry(slideWidth, slideHeight, 32, 16);
      const material = new THREE.MeshBasicMaterial({
        // color: 0xffffff,
        side: THREE.DoubleSide,
      });
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.x = index * slideUnit;
      mesh.userData = {
        originalVertices: [...geometry.attributes.position.array],
        index,
        scale: 1,
        targetScale: 1,
      };

      const imageIndex = (index % imagesCount) + 1;
      const imagePath = works[index % works.length]?.thumbnail;

      const textureLoader = new THREE.TextureLoader();
      textureLoader.setCrossOrigin("anonymous");

      textureLoader.load(
        imagePath,
        (texture) => {
          texture.minFilter = THREE.LinearFilter;
          texture.wrapS = THREE.ClampToEdgeWrapping;
          texture.wrapT = THREE.ClampToEdgeWrapping;
          texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
          texture.colorSpace = THREE.SRGBColorSpace;

          material.map = texture;
          material.needsUpdate = true;
        },
        undefined,
        (err) => console.warn("Image load failed", err)
      );

      const labelText =
        works[index % works.length]?.title || `Slide ${index + 1}`;
      const label = createLabel(labelText);
      label.scale.set(1.125, 0.3, 1.5);
      label.position.set(0, -slideHeight / 2 - 0.3, 0);
      label.position.set(-slideWidth / 2 + 0.25, -slideHeight / 2 - 0.1, 0);
      label.material.opacity = 0;
      mesh.add(label);
      mesh.userData.isSlide = true;
      mesh.userData.label = label;

      scene.add(mesh);
      slides.push(mesh);
    };

    for (let i = 0; i < slideCount; i++) {
      createSlide(i);
    }

    slides.forEach((slide) => {
      slide.position.x -= totalWidth / 2;
      slide.userData.targetX = slide.position.x;
      slide.userData.currentX = slide.position.x;
    });

    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();
    let hoveredSlide = null;

    const handleClick = (event) => {
      const bounds = renderer.domElement.getBoundingClientRect();
      pointer.x = ((event.clientX - bounds.left) / bounds.width) * 2 - 1;
      pointer.y = -((event.clientY - bounds.top) / bounds.height) * 2 + 1;

      raycaster.setFromCamera(pointer, camera);
      const intersects = raycaster.intersectObjects(slides);

      if (intersects.length > 0) {
        const clickedMesh = intersects[0].object;
        const index = clickedMesh.userData.index;
        const workId = works[index % works.length]?._id;
        const dynamicHref = `/works/${workId}`;

        setCursorState("click");

        const tlm = gsap.timeline();
        tlm.fromTo(
          containerRef.current,
          {
            background:
              "radial-gradient(182.46% 135.96% at 50.06% 135.96%, #000000 19.34%, #000000 36.62%, #000000 56.25%, #000000 77.71%, #000000 100%)",
          },
          {
            background:
              "radial-gradient(182.46% 135.96% at 50.06% 135.96%, #FF7C11 19.34%, #FF3F2B 36.62%, #E00E15 56.25%, #3F120D 77.71%, #000000 100%)",
            duration: 1,
            ease: "power4.out",
            onComplete: () => {
              triggerTransition(dynamicHref);
            },
          }
        );
      }
    };

    canvas.addEventListener("click", handleClick);

    const handleMouseMove = (event) => {
      const bounds = renderer.domElement.getBoundingClientRect();
      pointer.x = ((event.clientX - bounds.left) / bounds.width) * 2 - 1;
      pointer.y = -((event.clientY - bounds.top) / bounds.height) * 2 + 1;

      raycaster.setFromCamera(pointer, camera);
      const intersects = raycaster.intersectObjects(slides);

      if (intersects.length > 0) {
        const intersected = intersects[0].object;
        const mesh = intersected.userData.isSlide
          ? intersected
          : intersected.parent;

        setCursorState("view");

        if (hoveredSlide && hoveredSlide !== mesh) {
          hoveredSlide.userData.targetScale = 0.95;
          hoveredSlide.userData.label.material.opacity = 0; // Hide previous label
        }
        hoveredSlide = mesh;
        mesh.userData.targetScale = 1.25;
        mesh.userData.label.material.opacity = 1; // Show label on hover
      } else {
        setCursorState("scroll");

        if (hoveredSlide) {
          hoveredSlide.userData.targetScale = 0.95;
          hoveredSlide.userData.label.material.opacity = 0; // Hide label when not hovering
          hoveredSlide = null;
        }
      }
    };

    canvas.addEventListener("mousemove", handleMouseMove);

    const updateCurve = (mesh, worldX, distortion) => {
      const positionAttr = mesh.geometry.attributes.position;
      const original = mesh.userData.originalVertices;
      const radius = 2.0;
      const maxCurve = settings.maxDistortion * distortion;

      for (let i = 0; i < positionAttr.count; i++) {
        const x = original[i * 3],
          y = original[i * 3 + 1];
        const dist = Math.sqrt((worldX + x) ** 2 + y ** 2);
        const strength = Math.max(0, 1 - dist / radius);
        const curveZ =
          Math.pow(Math.sin((strength * Math.PI) / 2), 1.5) * maxCurve;
        positionAttr.setZ(i, curveZ);
      }

      positionAttr.needsUpdate = true;
      mesh.geometry.computeVertexNormals();
    };

    canvas.addEventListener(
      "wheel",
      (e) => {
        e.preventDefault();
        const wheelDelta = e.deltaY;
        targetDistortionFactor = Math.min(
          1.0,
          targetDistortionFactor + Math.abs(wheelDelta) * 0.001
        );
        targetPosition -= wheelDelta * settings.wheelSensitivity;
        isScrolling = true;
        autoScrollSpeed =
          Math.sign(wheelDelta) * Math.min(Math.abs(wheelDelta) * 0.0005, 0.05);
        clearTimeout(window.scrollTimeout);
        window.scrollTimeout = setTimeout(() => (isScrolling = false), 150);
      },
      { passive: false }
    );

    const handleTouchStart = (e) => {
      touchStartX = e.touches[0].clientX;
      touchLastX = touchStartX;
      isScrolling = false;
    };

    const handleTouchMove = (e) => {
      e.preventDefault();
      const touchX = e.touches[0].clientX;
      const deltaX = touchX - touchLastX;
      touchLastX = touchX;
      targetDistortionFactor = Math.min(
        1.0,
        targetDistortionFactor + Math.abs(deltaX) * 0.02
      );
      targetPosition -= deltaX * settings.touchSensitivity;
      isScrolling = true;
    };

    const handleTouchEnd = () => {
      const velocity = (touchLastX - touchStartX) * 0.005;
      if (Math.abs(velocity) > 0.5) {
        autoScrollSpeed = -velocity * settings.momentumMultiplier * 0.05;
        targetDistortionFactor = Math.min(
          1.0,
          Math.abs(velocity) * 3 * settings.distortionSensitivity
        );
      }
      isScrolling = true;
      setTimeout(() => (isScrolling = false), 800);
    };

    canvas.addEventListener("touchstart", handleTouchStart, { passive: false });
    canvas.addEventListener("touchmove", handleTouchMove, { passive: false });
    canvas.addEventListener("touchend", handleTouchEnd);

    window.addEventListener("resize", () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });

    let lastTime = performance.now();
    const animate = (time) => {
      requestAnimationFrame(animate);
      const dt = (time - lastTime) / 1000;
      lastTime = time;

      const prev = currentPosition;
      if (isScrolling) {
        targetPosition += autoScrollSpeed;
        autoScrollSpeed *= Math.max(
          0.92,
          0.97 - Math.abs(autoScrollSpeed) * 0.5
        );
        if (Math.abs(autoScrollSpeed) < 0.001) autoScrollSpeed = 0;
      }

      currentPosition +=
        (targetPosition - currentPosition) * settings.smoothing;
      const velocity = Math.abs(currentPosition - prev) / dt;
      velocityHistory.push(velocity);
      velocityHistory.shift();
      const avgVelocity =
        velocityHistory.reduce((a, b) => a + b) / velocityHistory.length;
      if (avgVelocity > peakVelocity) peakVelocity = avgVelocity;
      const velocityRatio = avgVelocity / (peakVelocity + 0.001);
      const decelerating = velocityRatio < 0.7 && peakVelocity > 0.5;
      peakVelocity *= 0.99;

      if (avgVelocity > 0.05) {
        targetDistortionFactor = Math.max(
          targetDistortionFactor,
          Math.min(1.0, velocity * 0.1)
        );
      }

      if (decelerating || avgVelocity < 0.2) {
        const decay = decelerating
          ? settings.distortionDecay
          : settings.distortionDecay * 0.9;
        targetDistortionFactor *= decay;
      }

      currentDistortionFactor +=
        (targetDistortionFactor - currentDistortionFactor) *
        settings.distortionSmoothing;

      slides.forEach((slide, i) => {
        let baseX = i * slideUnit - currentPosition;
        baseX = ((baseX % totalWidth) + totalWidth) % totalWidth;
        if (baseX > totalWidth / 2) baseX -= totalWidth;

        const wrapping =
          Math.abs(baseX - slide.userData.targetX) > slideWidth * 2;
        if (wrapping) slide.userData.currentX = baseX;

        slide.userData.targetX = baseX;
        slide.userData.currentX +=
          (slide.userData.targetX - slide.userData.currentX) *
          settings.slideLerp;

        slide.userData.scale +=
          (slide.userData.targetScale - slide.userData.scale) * 0.1;
        slide.scale.setScalar(slide.userData.scale);

        const wrapThreshold = totalWidth / 2 + slideWidth;
        if (Math.abs(slide.userData.currentX) < wrapThreshold * 1.5) {
          slide.position.x = slide.userData.currentX;
          updateCurve(slide, slide.position.x, currentDistortionFactor);
        }
      });

      slides.forEach((slide) => {
        const targetOpacity = slide === hoveredSlide ? 1 : 0;
        slide.userData.label.material.opacity +=
          (targetOpacity - slide.userData.label.material.opacity) * 0.1;
      });

      renderer.render(scene, camera);
    };

    animate(performance.now());

    return () => {
      canvas.removeEventListener("click", handleClick);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("touchstart", handleTouchStart);
      canvas.removeEventListener("touchmove", handleTouchMove);
      canvas.removeEventListener("touchend", handleTouchEnd);
    };
  }, [works]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full overflow-hidden h-screen bg-[radial-gradient(182.46%_135.96%_at_50.06%_135.96%,_#000000_19.34%,_#000000_36.62%,_#000000_56.25%,_#000000_77.71%,_#000000_100%)]`}
    >
      <DragCursor state={cursorState} />
      <div
        ref={textRef}
        className="flex flex-row absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none z-20 w-fit opacity-0 scale-50"
      >
        <h1
          className="w-fit font-bold flex flex-row"
          style={{ fontSize: "clamp(36px, 4.16vw, 80px)" }}
        >
          <span
            className="text-white font-bold font-archivo-narrow"
            style={{
              letterSpacing: "-0.05em",
              lineHeight: "clamp(36px, 4.16vw, 80px)",
            }}
          >
            My
          </span>
          <span
            className="text-white font-kings font-normal text-[84px]"
            style={{
              fontSize: "clamp(40px, 4.375vw, 84px)",
              lineHeight: "clamp(50px, 5.2vw, 100px)",
            }}
          >
            Selected
          </span>
          <Image
            src={workImage}
            alt="collection"
            height={54}
            width="auto"
            className="w-auto aspect-auto"
            style={{
              height: "clamp(24px, 2.81vw, 54px)",
              marginTop: "clamp(8px, 0.83vw, 16px)",
            }}
          />
        </h1>
        <div style={{ marginTop: "clamp(0px, 0.2vw, 10px)" }}>
          <span
            className="font-oswald font-medium text-white"
            style={{ fontSize: "clamp(10px, 0.83vw, 16px)" }}
          >
            ({works.length})
          </span>
        </div>
      </div>

      <canvas
        ref={canvasRef}
        className={`absolute top-0 left-0 w-full h-screen translate-y-full block opacity-0 blur-[500px] cursor-none`}
      />

      {works.length === 0 && (
        <div className="w-full z-10 h-screen absolute top-0 left-0  bg-black flex flex-col justify-center items-center px-5">
          <span className="font-archivo font-medium text-white text-base text-center">
            No work/project found.
          </span>
        </div>
      )}
    </div>
  );
};

export default ThreeWorkSlider;
