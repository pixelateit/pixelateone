"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { useTexture } from "@react-three/drei";
import { lenis } from "@/context/SmoothScroll";

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
    vec2 gridUV = floor(vUv * vec2(100.0, 100.0)) / vec2(100.0, 100.0);
    vec2 centerOfPixel = gridUV + vec2(1.0/100.0, 1.0/100.0);
    
    vec2 mouseDirection = u_mouse - u_prevMouse;
    
    vec2 pixelToMouseDirection = centerOfPixel - u_mouse;
    float pixelDistanceToMouse = length(pixelToMouseDirection);
    float strength = smoothstep(0.3, 0.0, pixelDistanceToMouse);

    vec2 uvOffset = strength * - mouseDirection * 0.2;
    vec2 uv = vUv - uvOffset;

    vec4 colorR = texture2D(u_texture, uv + vec2(strength * u_aberrationIntensity * 0.01, 0.0));
    vec4 colorG = texture2D(u_texture, uv);
    vec4 colorB = texture2D(u_texture, uv - vec2(strength * u_aberrationIntensity * 0.01, 0.0));

    gl_FragColor = vec4(colorR.r, colorG.g, colorB.b, 1.0);
  }
`;

function ChromaticAberrationPlane({ imageUrl }) {
  const shaderRef = useRef();
  const mouse = useRef(new THREE.Vector2(0.5, 0.5));
  const prevMouse = useRef(new THREE.Vector2(0.5, 0.5));
  const intensity = useRef(0.02);

  const { viewport } = useThree();

  const texture = useTexture("/home/MyImage.jpg" || imageUrl);

  useFrame((state) => {
    lenis?.raf(state.clock.elapsedTime * 1000);

    const { pointer } = state;

    const newMouseX = (pointer.x + 1) / 2;
    const newMouseY = (pointer.y + 1) / 2;

    prevMouse.current.copy(mouse.current);
    mouse.current.set(newMouseX, newMouseY);

    if (shaderRef.current) {
      shaderRef.current.uniforms.u_mouse.value.copy(mouse.current);
      shaderRef.current.uniforms.u_prevMouse.value.copy(prevMouse.current);

      intensity.current = Math.max(0, intensity.current - 0.05);
      shaderRef.current.uniforms.u_aberrationIntensity.value =
        intensity.current;
    }
  });

  const aspect = 1920 / 2169;

  const planeSize = useMemo(() => {
    let width, height;

    height = viewport.height;
    width = viewport.height * aspect;

    return [width, height];
  }, [viewport.height, aspect]);

  return (
    <mesh>
      <planeGeometry args={planeSize} />
      <shaderMaterial
        ref={shaderRef}
        uniforms={{
          u_texture: { value: texture },
          u_mouse: { value: new THREE.Vector2(0.5, 0.5) },
          u_prevMouse: { value: new THREE.Vector2(0.5, 0.5) },
          u_aberrationIntensity: { value: 0 },
        }}
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
      //   style={{ background: "#000" }}
    >
      <ChromaticAberrationPlane imageUrl={imageUrl} />
    </Canvas>
  );
}
