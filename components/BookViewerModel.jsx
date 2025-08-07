"use client";

import React, { Suspense, useRef, useEffect } from "react";
import { Canvas, useLoader, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Html } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { ClipLoader } from "react-spinners";
import * as THREE from "three";
import { useState } from "react";

// 🔷 BookModel
const BookModel = () => {
  const modelRef = useRef();
  const gltf = useLoader(GLTFLoader, "/models/blue-book.glb");
  const [rotated, setRotated] = useState(false);

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

  return (
    <primitive
      ref={modelRef}
      object={gltf.scene}
      scale={0.25}
      position={[0, -1, 0]}
    />
  );
};

// 🔷 AdjustCamera
const AdjustCamera = () => {
  const { camera } = useThree();

  useEffect(() => {
    camera.position.set(0, 0.3, 3);
    camera.lookAt(new THREE.Vector3(0, 0.3, 0));
  }, [camera]);

  return null;
};

// 🔷 BookViewerModel
const BookViewerModel = () => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <Canvas
        camera={{ position: [0, 1.5, 3], fov: 45 }}
        style={{ width: "100%", height: "100%" }}
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
