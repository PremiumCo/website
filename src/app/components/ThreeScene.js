// components/ThreeScene.js
import { useEffect } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const ThreeScene = () => {
  useEffect(() => {
    // Set up the scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Load the GLTF model from the new path
    const loader = new GLTFLoader();
    loader.load(
      '/assets/models/untitled.glb', // Correct path to the model
      (gltf) => {
        console.log('Model loaded successfully:', gltf);
        scene.add(gltf.scene);
        gltf.scene.position.set(0, 0, 0); // Adjust position
        gltf.scene.scale.set(1, 1, 1); // Adjust scale if needed
      },
      (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
      },
      (error) => {
        console.error('An error occurred while loading the model:', error);
      }
    );

    // Add lights to the scene
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    camera.position.z = 5;

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      if (scene.children.length > 0) {
        scene.children[0].rotation.y += 0.01; // Rotate the model
      }
      renderer.render(scene, camera);
    };

    animate();

    // Cleanup on unmount
    return () => {
      document.body.removeChild(renderer.domElement);
    };
  }, []);

  return null; // This component does not need to render anything
};

export default ThreeScene;
