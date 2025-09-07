"use client";

import React, { Suspense, useRef, useEffect } from "react";
import { Canvas, useLoader, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Html } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { ClipLoader } from "react-spinners";
import * as THREE from "three";
import { useState } from "react";

// 🔷 BookModel
// 🔷 BookModel.tsx
const BookModel = () => {
  const modelRef = useRef();
  const gltf = useLoader(GLTFLoader, "/models/blue-book.glb");
  const [rotated, setRotated] = useState(false);
  const [scale, setScale] = useState(0.23); // default scale for md and up

  // 🔍 Responsive scale based on screen width
  useEffect(() => {
    const handleResize = () => {
      const isSmallScreen = window.innerWidth < 768; // Tailwind's md breakpoint
      setScale(isSmallScreen ? 0.22 : 0.25); // Adjust scale as needed
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ✨ Center model
  useEffect(() => {
    if (modelRef.current) {
      const box = new THREE.Box3().setFromObject(modelRef.current);
      const center = new THREE.Vector3();
      box.getCenter(center);

      // Move model to the center of the scene
      modelRef.current.position.x -= center.x;
      modelRef.current.position.y -= center.y;
      modelRef.current.position.z -= center.z;
    }
  }, [gltf]);

  // 🌀 Rotation animation
  useFrame((_, delta) => {
    if (modelRef.current && !rotated) {
      const targetRotation = -Math.PI / 3;
      const currentRotation = modelRef.current.rotation.y;

      if (currentRotation > targetRotation) {
        modelRef.current.rotation.y -= delta * 1;
      } else {
        modelRef.current.rotation.y = targetRotation;
        setRotated(true);
      }
    }
  });

  return <primitive ref={modelRef} object={gltf.scene} scale={scale} />;
};

// 🔷 AdjustCamera
const AdjustCamera = () => {
  const { camera } = useThree();

  useEffect(() => {
    const handleResize = () => {
      const isSmallScreen = window.innerWidth < 768;

      // Adjust camera height and target based on screen size
      const yPos = isSmallScreen ? 0.15 : 0.3;
      camera.position.set(0, yPos, 3);
      camera.lookAt(new THREE.Vector3(0, yPos, 0));
    };

    handleResize(); // Initial set
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [camera]);

  return null;
};

// 🔷 BookViewerModel
const BookViewerModel = () => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <Canvas
        camera={{ position: [0, 1.5, 3], fov: 45 }}
        className="w-full h-full"
      >
        <ambientLight intensity={0.8} />
        <directionalLight position={[5, 5, 5]} intensity={1} />

        <Suspense
          fallback={
            <Html center>
              <ClipLoader color="white" size={50} />
            </Html>
          }
        >
          <AdjustCamera />
          <BookModel />
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            enableDamping
            dampingFactor={0.05}
            minPolarAngle={Math.PI / 3}
            maxPolarAngle={Math.PI / 1.8}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default BookViewerModel;
