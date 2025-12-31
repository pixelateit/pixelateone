"use client";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import DragCursor from "./dragCursor";
import { LoaderCircle, X } from "lucide-react";
import gsap from "gsap";
import { trackClick } from "@/utils/analytics";

const MiscGrid = () => {
  const mountRef = useRef(null);
  const headerRef = useRef(null);
  const infoRef = useRef(null);
  const [cursorState, setCursorState] = useState("idle");
  const [infoShow, setInfoShow] = useState(false);
  const [miscs, setMiscs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    let timeoutId;
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setIsDesktop(window.innerWidth >= 768);
      }, 150);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const fetchMiscs = async () => {
    try {
      setLoading(true);
      const query = new URLSearchParams({
        isActive: true,
      }).toString();

      const res = await fetch(`/api/miscs?${query}`);

      if (!res.ok) throw new Error(`API error: ${res.status}`);

      const { miscs } = await res.json();

      setMiscs(miscs);
    } catch (err) {
      console.error("fetchMiscs failed:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMiscs();
  }, []);

  const handleInfoShow = () => {
    setInfoShow(true);
    requestAnimationFrame(() => {
      if (infoRef.current) {
        gsap.fromTo(
          infoRef.current,
          { opacity: 0, scale: 0.3 },
          { opacity: 1, scale: 1, duration: 0.8, ease: "power2.out" }
        );
      }
    });
  };

  const handleInfoHide = () => {
    if (infoRef.current) {
      gsap.fromTo(
        infoRef.current,
        { opacity: 1, scale: 1 },
        {
          opacity: 0,
          scale: 0.3,
          duration: 0.8,
          ease: "power2.out",
          onComplete: () => setInfoShow(false),
        }
      );
    }
  };

  useEffect(() => {
    // Show after 4s on first load
    const timer = setTimeout(handleInfoShow, 4000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!infoShow) {
      // Reopen after 50s if closed
      const timer = setTimeout(handleInfoShow, 50000);
      return () => clearTimeout(timer);
    }
  }, [infoShow]);

  const vertexShader = `
    varying vec2 vUv;
    void main() {
     vUv = uv;
     gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
`;

  const fragmentShader = `
    uniform vec2 uOffset;
    uniform vec2 uResolution;
    uniform vec4 uBorderColor;
    uniform vec4 uHoverColor;
    uniform vec4 uBackgroundColor;
    uniform vec2 uMousePos;
    uniform float uZoom;
    uniform float uCellSize;
    uniform float uTextureCount;
    uniform sampler2D uImageAtlas;
    uniform sampler2D uTextAtlas;
    varying vec2 vUv;

    void main() {
        vec2 screenUV = (vUv - 0.5) * 2.0;

        float radius = length(screenUV);
        float distortion = 1.0 - 0.08 * radius * radius;
        vec2 distortedUV = screenUV * distortion;

        vec2 aspectRatio = vec2(uResolution.x / uResolution.y, 1.0);
        vec2 worldCoord = distortedUV * aspectRatio;

        worldCoord *= uZoom;
        worldCoord += uOffset;

        vec2 cellPos = worldCoord / uCellSize;
        vec2 cellId = floor(cellPos);
        vec2 cellUV = fract(cellPos);

        vec2 mouseScreenUV = (uMousePos / uResolution) * 2.0 - 1.0;
        mouseScreenUV.y = -mouseScreenUV.y;

        float mouseRadius = length(mouseScreenUV);
        float mouseDistortion = 1.0 - 0.08 * mouseRadius * mouseRadius;
        vec2 mouseDistortedUV = mouseScreenUV * mouseDistortion;
        vec2 mouseWorldCoord = mouseDistortedUV * aspectRatio;

        mouseWorldCoord *= uZoom;
        mouseWorldCoord += uOffset;

        vec2 mouseCellPos = mouseWorldCoord / uCellSize;
        vec2 mouseCellId = floor(mouseCellPos);

        vec2 cellCenter = cellId + 0.5;
        vec2 mouseCellCenter = mouseCellId + 0.5;
        float cellDistance = length(cellCenter - mouseCellCenter);
        float hoverIntensity = 1.0 - smoothstep(0.4, 0.7, cellDistance);
        bool isHovered = hoverIntensity > 0.0 && uMousePos.x >= 0.0;

        vec3 backgroundColor = uBackgroundColor.rgb;
        if (isHovered) {
            backgroundColor = mix(uBackgroundColor.rgb, uHoverColor.rgb, hoverIntensity);
        }

        float lineWidth = 0.005;
        float gridX = smoothstep(0.0, lineWidth, cellUV.x) * smoothstep(0.0, lineWidth, 1.0 - cellUV.x);
        float gridY = smoothstep(0.0, lineWidth, cellUV.y) * smoothstep(0.0, lineWidth, 1.0 - cellUV.y);
        float gridMask = gridX * gridY;

        float imageSize = 0.6;
        float imageBorder = (1.0 - imageSize) * 0.5;

        vec2 imageUV = (cellUV - imageBorder) / imageSize;

        float edgeSmooth = 0.01;
        vec2 imageMask = smoothstep(-edgeSmooth, edgeSmooth, imageUV) * smoothstep(-edgeSmooth, edgeSmooth, 1.0 - imageUV);
        float imageAlpha = imageMask.x * imageMask.y;

        bool inImageArea = imageUV.x >= 0.0 && imageUV.x <= 1.0 && imageUV.y >= 0.0 && imageUV.y <= 1.0;

        float textHeight = 0.08;
        float textY = 0.88;

        bool inTextArea = cellUV.x >= 0.05 && cellUV.x <= 0.95 && cellUV.y >= textY && cellUV.y <= textY + textHeight;

        float texIndex = mod(cellId.x + cellId.y * 3.0, uTextureCount);

        vec3 color = backgroundColor;

        if (inImageArea && imageAlpha > 0.0) {
            float atlasSize = ceil(sqrt(uTextureCount));
            vec2 atlasPos = vec2(mod(texIndex, atlasSize), floor(texIndex / atlasSize));
            vec2 atlasUV = (atlasPos + imageUV) / atlasSize;
            atlasUV.y = 1.0 - atlasUV.y;

            vec3 imageColor = texture2D(uImageAtlas, atlasUV).rgb;
            color = mix(color, imageColor, imageAlpha);
        }

        if (inTextArea) {
            vec2 textCoord = vec2((cellUV.x - 0.05) / 0.9, (cellUV.y - textY) / textHeight);
            textCoord.y = 1.0 - textCoord.y;

            float atlasSize = ceil(sqrt(uTextureCount));
            vec2 atlasPos = vec2(mod(texIndex, atlasSize), floor(texIndex / atlasSize));
            vec2 atlasUV = (atlasPos + textCoord) / atlasSize;

            vec4 textColor = texture2D(uTextAtlas, atlasUV);

            vec3 textBgColor = backgroundColor;
            color = mix(textBgColor, textColor.rgb, textColor.a);
        }

        vec3 borderRGB = uBorderColor.rgb;
        float borderAlpha = uBorderColor.a;
        color = mix(color, borderRGB, (1.0 - gridMask) * borderAlpha);

        float fade = 1.0 - smoothstep(1.2, 1.8, radius);

        gl_FragColor = vec4(color * fade, 1.0);
    }
`;

  function formattedDate(date) {
    if (!date) {
      return "-"; // Handle null/invalid input gracefully
    }

    return new Date(date).toLocaleDateString("en-GB", {
      year: "numeric",
    });
  }

  useEffect(() => {
    if (!mountRef.current) return;

    const config = {
      cellSize: 0.85,
      zoomLevel: 1.25,
      lerpFactor: 0.075,
      borderColor: "rgba(255,255,255,0.15)",
      backgroundColor: "rgba(0,0,0,1)",
      textColor: "rgba(128,128,128,1)",
      hoverColor: "rgba(255,255,255,0)",
    };

    let scene, camera, renderer, plane;
    let cleanupFns = []; // keep track of cleanup functions
    let isDragging = false,
      isClick = true,
      clickStartTime = 0;
    let previousMouse = { x: 0, y: 0 };
    let offset = { x: 0, y: 0 },
      targetOffset = { x: 0, y: 0 };
    let mousePosition = { x: -1, y: -1 };
    let zoomLevel = 1.0,
      targetZoom = 1.0;
    let textTextures = [];

    const rgbaToArray = (rgba) => {
      const match = rgba.match(/rgba?\(([^)]+)\)/);
      if (!match) return [1, 1, 1, 1];
      return match[1]
        .split(",")
        .map((v, i) =>
          i < 3 ? parseFloat(v.trim()) / 255 : parseFloat(v.trim() || 1)
        );
    };

    const createTextTexture = (title, year) => {
      const canvas = document.createElement("canvas");
      canvas.width = 2048;
      canvas.height = 256;
      const ctx = canvas.getContext("2d");

      ctx.clearRect(0, 0, 2048, 256);
      ctx.font = "80px Archivo";
      ctx.fillStyle = config.textColor;
      ctx.textBaseline = "middle";
      ctx.imageSmoothingEnabled = false;

      ctx.textAlign = "left";
      ctx.fillText(title.toUpperCase(), 30, 128);
      ctx.textAlign = "right";
      ctx.fillText(year.toString().toUpperCase(), 2048 - 30, 128);

      const texture = new THREE.CanvasTexture(canvas);
      Object.assign(texture, {
        wrapS: THREE.ClampToEdgeWrapping,
        wrapT: THREE.ClampToEdgeWrapping,
        minFilter: THREE.NearestFilter,
        magFilter: THREE.NearestFilter,
        flipY: false,
        generateMipmaps: false,
        format: THREE.RGBAFormat,
      });

      return texture;
    };

    function drawImageWithFit(ctx, img, x, y, w, h, fit = "contain") {
      const imgAspect = img.width / img.height;
      const boxAspect = w / h;

      let drawWidth = w;
      let drawHeight = h;
      let offsetX = x;
      let offsetY = y;

      if (fit === "contain") {
        if (imgAspect > boxAspect) {
          drawWidth = w;
          drawHeight = w / imgAspect;
          offsetY = y + (h - drawHeight) / 2;
        } else {
          drawHeight = h;
          drawWidth = h * imgAspect;
          offsetX = x + (w - drawWidth) / 2;
        }
      } else if (fit === "cover") {
        if (imgAspect > boxAspect) {
          drawHeight = h;
          drawWidth = h * imgAspect;
          offsetX = x - (drawWidth - w) / 2;
        } else {
          drawWidth = w;
          drawHeight = w / imgAspect;
          offsetY = y - (drawHeight - h) / 2;
        }
      }

      ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    }

    const createTextureAtlas = (textures, isText = false) => {
      const atlasSize = Math.ceil(Math.sqrt(textures.length));
      const textureSize = 512;
      const canvas = document.createElement("canvas");
      canvas.width = canvas.height = atlasSize * textureSize;
      const ctx = canvas.getContext("2d");

      if (isText) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      } else {
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      textures.forEach((texture, index) => {
        const x = (index % atlasSize) * textureSize;
        const y = Math.floor(index / atlasSize) * textureSize;

        if (isText && texture.source?.data) {
          ctx.drawImage(texture.source.data, x, y, textureSize, textureSize);
        } else if (!isText && texture.image?.complete) {
          // ctx.drawImage(texture.image, x, y, textureSize, textureSize);
          drawImageWithFit(ctx, texture.image, x, y, textureSize, textureSize);
        }
      });

      const atlasTexture = new THREE.CanvasTexture(canvas);
      Object.assign(atlasTexture, {
        wrapS: THREE.ClampToEdgeWrapping,
        wrapT: THREE.ClampToEdgeWrapping,
        minFilter: THREE.LinearFilter,
        magFilter: THREE.LinearFilter,
        flipY: false,
      });

      return atlasTexture;
    };

    const loadTextures = () => {
      const textureLoader = new THREE.TextureLoader();
      const imageTextures = [];
      let loadedCount = 0;

      return new Promise((resolve) => {
        miscs.forEach((project) => {
          const texture = textureLoader.load(project.thumbnail, () => {
            if (++loadedCount === miscs.length) resolve(imageTextures);
          });

          Object.assign(texture, {
            wrapS: THREE.ClampToEdgeWrapping,
            wrapT: THREE.ClampToEdgeWrapping,
            minFilter: THREE.LinearFilter,
            magFilter: THREE.LinearFilter,
          });

          imageTextures.push(texture);
          textTextures.push(
            createTextTexture(project.title, formattedDate(project.date))
          );
        });
      });
    };

    const updateMousePosition = (event) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mousePosition.x = event.clientX - rect.left;
      mousePosition.y = event.clientY - rect.top;
      plane?.material.uniforms.uMousePos.value.set(
        mousePosition.x,
        mousePosition.y
      );
    };

    const startDrag = (x, y) => {
      isDragging = true;
      isClick = true;
      clickStartTime = Date.now();
      document.body.classList.add("dragging");
      previousMouse.x = x;
      previousMouse.y = y;
      setTimeout(() => isDragging && (targetZoom = config.zoomLevel), 150);
    };

    const isInHeader = (x, y) => {
      if (!headerRef.current) return false;
      const rect = headerRef.current.getBoundingClientRect();
      return (
        x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom
      );
    };

    const onPointerDown = (e) => {
      startDrag(e.clientX, e.clientY);
      if (isInHeader(e.clientX, e.clientY)) {
        setCursorState("idle");
      } else {
        setCursorState("drag");
      }
    };
    const onTouchStart = (e) => {
      e.preventDefault();
      const touch = e.touches[0];
      if (isInHeader(touch.clientX, touch.clientY)) {
        setCursorState("idle");
        return; // don’t start drag
      }
      // else start drag normally
      startDrag(touch.clientX, touch.clientY);
      setCursorState("drag");
    };

    const handleMove = (currentX, currentY) => {
      if (!isDragging || currentX === undefined || currentY === undefined)
        return;

      const deltaX = currentX - previousMouse.x;
      const deltaY = currentY - previousMouse.y;

      if (Math.abs(deltaX) > 2 || Math.abs(deltaY) > 2) {
        isClick = false;
        if (targetZoom === 1.0) targetZoom = config.zoomLevel;
      }

      targetOffset.x -= deltaX * 0.003;
      targetOffset.y += deltaY * 0.003;
      previousMouse.x = currentX;
      previousMouse.y = currentY;
    };

    const onPointerMove = (e) => {
      handleMove(e.clientX, e.clientY);
      if (isInHeader(e.clientX, e.clientY)) {
        setCursorState("idle");
      } else {
        setCursorState("drag");
      }
    };
    const onTouchMove = (e) => {
      e.preventDefault();
      handleMove(e.touches[0].clientX, e.touches[0].clientY);
    };

    const onPointerUp = (event) => {
      isDragging = false;
      // setCursorState("click");
      document.body.classList.remove("dragging");

      targetZoom = 1.0;

      if (isClick && Date.now() - clickStartTime < 200) {
        const endX = event.clientX || event.changedTouches?.[0]?.clientX;
        const endY = event.clientY || event.changedTouches?.[0]?.clientY;

        if (endX !== undefined && endY !== undefined) {
          const rect = renderer.domElement.getBoundingClientRect();
          const screenX = ((endX - rect.left) / rect.width) * 2 - 1;
          const screenY = -(((endY - rect.top) / rect.height) * 2 - 1);

          const radius = Math.sqrt(screenX * screenX + screenY * screenY);
          const distortion = 1.0 - 0.08 * radius * radius;

          let worldX =
            screenX * distortion * (rect.width / rect.height) * zoomLevel +
            offset.x;
          let worldY = screenY * distortion * zoomLevel + offset.y;

          const cellX = Math.floor(worldX / config.cellSize);
          const cellY = Math.floor(worldY / config.cellSize);
          const texIndex = Math.floor((cellX + cellY * 3.0) % miscs.length);
          const actualIndex = texIndex < 0 ? miscs.length + texIndex : texIndex;
        }
      }
    };

    const onWindowResize = () => {
      const container = mountRef.current;
      if (!container) return;
      camera.updateProjectionMatrix();
      renderer.setSize(container.offsetWidth, container.offsetHeight);
      renderer.setPixelRatio(window.devicePixelRatio);
      plane?.material.uniforms.uResolution.value.set(
        container.offsetWidth,
        container.offsetHeight
      );
    };

    const setupEventListeners = () => {
      document.addEventListener("mousedown", onPointerDown);
      document.addEventListener("mousemove", onPointerMove);
      document.addEventListener("mouseup", onPointerUp);
      document.addEventListener("mouseleave", onPointerUp);

      const passiveOpts = { passive: false };
      document.addEventListener("touchstart", onTouchStart, passiveOpts);
      document.addEventListener("touchmove", onTouchMove, passiveOpts);
      document.addEventListener("touchend", onPointerUp, passiveOpts);

      window.addEventListener("resize", onWindowResize);
      document.addEventListener("contextmenu", (e) => e.preventDefault());

      renderer.domElement.addEventListener("mousemove", updateMousePosition);
      renderer.domElement.addEventListener("mouseleave", () => {
        mousePosition.x = mousePosition.y = -1;
        plane?.material.uniforms.uMousePos.value.set(-1, -1);
      });

      // push cleanup
      cleanupFns.push(() => {
        document.removeEventListener("mousedown", onPointerDown);
        document.removeEventListener("mousemove", onPointerMove);
        document.removeEventListener("mouseup", onPointerUp);
        document.removeEventListener("mouseleave", onPointerUp);

        document.removeEventListener("touchstart", onTouchStart, passiveOpts);
        document.removeEventListener("touchmove", onTouchMove, passiveOpts);
        document.removeEventListener("touchend", onPointerUp, passiveOpts);

        window.removeEventListener("resize", onWindowResize);

        renderer.domElement.removeEventListener(
          "mousemove",
          updateMousePosition
        );
      });
    };

    const animate = () => {
      requestAnimationFrame(animate);

      offset.x += (targetOffset.x - offset.x) * config.lerpFactor;
      offset.y += (targetOffset.y - offset.y) * config.lerpFactor;
      zoomLevel += (targetZoom - zoomLevel) * config.lerpFactor;

      if (plane?.material.uniforms) {
        plane.material.uniforms.uOffset.value.set(offset.x, offset.y);
        plane.material.uniforms.uZoom.value = zoomLevel;
      }

      renderer.render(scene, camera);
    };

    const init = async () => {
      const container = mountRef.current;
      if (!container) return;

      scene = new THREE.Scene();
      camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
      camera.position.z = 1;

      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
      renderer.setSize(container.offsetWidth, container.offsetHeight);
      renderer.setPixelRatio(window.devicePixelRatio);

      const bgColor = rgbaToArray(config.backgroundColor);
      renderer.setClearColor(
        new THREE.Color(bgColor[0], bgColor[1], bgColor[2]),
        bgColor[3]
      );

      container.appendChild(renderer.domElement);

      const imageTextures = await loadTextures();
      const imageAtlas = createTextureAtlas(imageTextures, false);
      const textAtlas = createTextureAtlas(textTextures, true);

      const uniforms = {
        uOffset: { value: new THREE.Vector2(0, 0) },
        uResolution: {
          value: new THREE.Vector2(
            container.offsetWidth,
            container.offsetHeight
          ),
        },
        uBorderColor: {
          value: new THREE.Vector4(...rgbaToArray(config.borderColor)),
        },
        uHoverColor: {
          value: new THREE.Vector4(...rgbaToArray(config.hoverColor)),
        },
        uBackgroundColor: {
          value: new THREE.Vector4(...rgbaToArray(config.backgroundColor)),
        },
        uMousePos: { value: new THREE.Vector2(-1, -1) },
        uZoom: { value: 1.0 },
        uCellSize: { value: config.cellSize },
        uTextureCount: { value: miscs.length },
        uImageAtlas: { value: imageAtlas },
        uTextAtlas: { value: textAtlas },
      };

      const geometry = new THREE.PlaneGeometry(2, 2);
      const material = new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms,
      });

      plane = new THREE.Mesh(geometry, material);
      scene.add(plane);

      setupEventListeners();
      animate();
    };

    init();

    const mountR = mountRef.current;
    const mountRe = mountRef.current;

    // Cleanup
    return () => {
      // safely cleanup
      cleanupFns.forEach((fn) => fn());
      if (renderer) {
        if (renderer.domElement && mountR?.contains(renderer.domElement)) {
          mountRe?.removeChild(renderer.domElement);
        }
        renderer.dispose();
      }
      plane?.geometry?.dispose();
      plane?.material?.dispose();
    };
  }, [miscs]);

  if (loading) {
    return (
      <div className="w-full h-screen flex flex-row justify-center items-center">
        <span className="font-archivo flex flex-row gap-1 font-medium text-white text-base">
          <LoaderCircle className="w-5 text-white h-5 animate-spin" />
          <span>Loading...</span>
        </span>
      </div>
    );
  }

  if (miscs.length === 0) {
    return (
      <div className="w-full h-screen flex flex-row justify-center items-center px-5">
        <span className="font-archivo font-medium text-white text-base text-center">
          No miscellaneous projects found.
        </span>
      </div>
    );
  }

  return (
    <div className="w-full fixed inset-0" style={{ zIndex: 1 }}>
      <div
        className="w-full h-24 absolute top-0 left-0 right-0 z-20 "
        ref={headerRef}
      />
      <div className="w-full h-screen relative cursor-none" ref={mountRef}>
        <div
          className="w-full h-full absolute top-0 left-0 right-0 bottom-0 z-20"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.1) 60%, rgba(0,0,0,0.75) 80%, rgba(0,0,0,1) 100%)",
          }}
        />
      </div>
      <DragCursor state={cursorState} />
      {infoShow && (
        <div
          className="w-[240px] p-5 bg-black/80 backdrop-blur-sm border border-white/20 absolute top-[80px] right-6 z-[9999999]"
          ref={infoRef}
        >
          <div className="w-full flex flex-row justify-between items-center mb-2">
            <span className="w-fit font-archivo font-medium text-white/60 text-sm">
              Important
            </span>
            <button
              type="button"
              className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 transition duration-200 cursor-pointer"
              onClick={() => {
                handleInfoHide();
                trackClick("miscgrid_info_close");
              }}
            >
              <X className="w-4 h-4 text-white/60" />
            </button>
          </div>
          <div className="w-full">
            <span className="font-archivo font-medium text-white text-base">
              {isDesktop
                ? "Just press your mouse button and drag!"
                : "Just touch and drag!"}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default MiscGrid;
