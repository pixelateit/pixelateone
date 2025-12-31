"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { useTexture } from "@react-three/drei";

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  varying vec2 vUv;
  uniform sampler2D u_texture;    
  uniform vec2 u_mouse;
  uniform vec2 u_prevMouse;
  uniform float u_aberrationIntensity;

  void main() {
    vec2 centerOfPixel = vUv;
    
    vec2 mouseDirection = u_mouse - u_prevMouse;
    
    vec2 pixelToMouseDirection = centerOfPixel - u_mouse;
    float pixelDistanceToMouse = length(pixelToMouseDirection);
    float strength = smoothstep(0.3, 0.0, pixelDistanceToMouse);

    vec2 uvOffset = strength * -mouseDirection * 0.5;
    vec2 uv = vUv - uvOffset;
    vec2 safeUV = clamp(uv, 0.0, 1.0);

    vec4 colorR = texture(u_texture, safeUV + vec2(strength * u_aberrationIntensity * 0.01, 0.0));
    vec4 colorG = texture(u_texture, safeUV);
    vec4 colorB = texture(u_texture, safeUV - vec2(strength * u_aberrationIntensity * 0.01, 0.0));

    gl_FragColor = vec4(colorR.r, colorG.g, colorB.b, 1.0);
  }
`;

function ChromaticAberrationPlane({ imageUrl }) {
  const shaderRef = useRef();
  const mouse = useRef(new THREE.Vector2(0.5, 0.5));
  const prevMouse = useRef(new THREE.Vector2(0.5, 0.5));
  const targetMouse = useRef(new THREE.Vector2(0.5, 0.5));
  const intensity = useRef(0.0);

  const texture = useTexture(imageUrl || "/home/MyImage.jpg");
  const [planeSize, setPlaneSize] = useState([1, 1]);

  const { viewport } = useThree();
  const viewportWidth = viewport.width;
  const viewportHeight = viewport.height;

  const uniforms = useMemo(
    () => ({
      u_texture: { value: texture },
      u_mouse: { value: new THREE.Vector2(0.5, 0.5) },
      u_prevMouse: { value: new THREE.Vector2(0.5, 0.5) },
      u_aberrationIntensity: { value: 0 },
    }),
    [texture]
  );

  useFrame(() => {
    // Eased mouse interpolation
    mouse.current.lerp(targetMouse.current, 0.02);

    shaderRef.current.uniforms.u_mouse.value.copy(mouse.current);
    shaderRef.current.uniforms.u_prevMouse.value.copy(prevMouse.current);
    shaderRef.current.uniforms.u_aberrationIntensity.value = intensity.current;

    // Decay aberration over time
    intensity.current = Math.max(0, intensity.current - 0.05);

    // Save current mouse as previous for next frame
    prevMouse.current.copy(mouse.current);
  });

  useEffect(() => {
    if (texture.image) {
      const imgAspect = texture.image.width / texture.image.height;
      const viewportAspect = viewportWidth / viewportHeight;

      let width, height;
      if (imgAspect > viewportAspect) {
        width = viewportWidth;
        height = viewportWidth / imgAspect;
      } else {
        height = viewportHeight;
        width = viewportHeight * imgAspect;
      }

      setPlaneSize([width, height]);
    }
  }, [texture.image, viewportWidth, viewportHeight]);

  const handlePointerMove = (e) => {
    const x = e.uv?.x ?? 0.5;
    const y = e.uv?.y ?? 0.5;
    targetMouse.current.set(x, y);
    intensity.current = 1.0;
  };

  const handlePointerEnter = (e) => {
    const x = e.uv?.x ?? 0.5;
    const y = e.uv?.y ?? 0.5;
    mouse.current.set(x, y);
    targetMouse.current.set(x, y);
  };

  const handlePointerLeave = () => {
    targetMouse.current.copy(prevMouse.current);
  };

  return (
    <mesh
      onPointerMove={handlePointerMove}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
    >
      <planeGeometry args={planeSize} />
      <shaderMaterial
        ref={shaderRef}
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent
      />
    </mesh>
  );
}

export default function ImageBgCanvas({ imageUrl }) {
  return (
    <Canvas
      orthographic
      camera={{ zoom: 1000, position: [0, 0, 100] }}
      dpr={[1, 2]}
      gl={{ antialias: true }}
      style={{ width: "100vw", height: "112.96vw" }}
    >
      <ChromaticAberrationPlane imageUrl={imageUrl} />
    </Canvas>
  );
}
