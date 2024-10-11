// components/ThreeScene.js
import { useEffect } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const ThreeScene = () => {
  useEffect(() => {
    // Set up the scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0xffffff); // Set background color to white
    document.body.appendChild(renderer.domElement);

    // Load the GLTF model from the CDN
    const loader = new GLTFLoader();
    loader.load(
      'https://pub-3d3da1d69a7b46d3bf2a87d5a95aa2c6.r2.dev/untitled.glb', // CDN link
      (gltf) => {
        console.log('Model loaded successfully:', gltf);
        scene.add(gltf.scene);

        // Load the texture
        const textureLoader = new THREE.TextureLoader();
        const texture = textureLoader.load('https://pub-3d3da1d69a7b46d3bf2a87d5a95aa2c6.r2.dev/Part1_diff.png', () => {
          console.log('Texture loaded successfully.');
        });

        // Create a metallic material with the loaded texture
        const metalMaterial = new THREE.MeshStandardMaterial({
          map: texture, // Apply the loaded texture
          metalness: 1.0, // Fully metallic
          roughness: 0.1, // Slightly rough surface for reflection
        });

        // Apply the metallic material to all meshes in the model
        gltf.scene.traverse((child) => {
          if (child.isMesh) {
            child.material = metalMaterial; // Assign the metallic material to each mesh
          }
        });

        // Scale and center the model
        gltf.scene.scale.set(0.5, 0.5, 0.5);
        const box = new THREE.Box3().setFromObject(gltf.scene);
        const center = box.getCenter(new THREE.Vector3());
        gltf.scene.position.sub(center);
      },
      (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
      },
      (error) => {
        console.error('An error occurred while loading the model:', error);
      }
    );

    // Add lights to the scene
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4); // Soft white ambient light
    scene.add(ambientLight);

    // Multiple directional lights for better illumination
    const directionalLight1 = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight1.position.set(2, 2, 2); // Position the first directional light
    scene.add(directionalLight1);

    const directionalLight2 = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight2.position.set(-2, -2, -2); // Position the second directional light
    scene.add(directionalLight2);

    // Set camera position
    camera.position.set(0, 1, 5);

    // Add OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.screenSpacePanning = false;
    controls.maxPolarAngle = Math.PI / 2;

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    // Cleanup on unmount
    return () => {
      document.body.removeChild(renderer.domElement);
      controls.dispose();
    };
  }, []);

  return null; // This component does not need to render anything
};

export default ThreeScene;
