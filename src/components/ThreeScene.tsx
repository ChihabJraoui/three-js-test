import React, {useEffect, useRef} from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js"
import { OrbitControls } from "three/addons/controls/OrbitControls.js"

const ThreeScene: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(window.devicePixelRatio);
      containerRef.current?.appendChild(renderer.domElement);

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
      const controls =  new OrbitControls(camera, renderer.domElement);
      controls.enablePan = false;
      controls.autoRotate = true;
      controls.update();

      camera.position.set(0, 5, 5);
      // camera.rotation.set(-50, 0, 0);
      camera.lookAt(0, 1, 0);

      // const groundGeometry = new THREE.PlaneGeometry(20, 20, 32, 32);
      // groundGeometry.rotateX(-Math.PI / 2);
      // const groundMaterial = new THREE.MeshStandardMaterial({
      //   color: 0x555555,
      //   side: THREE.DoubleSide,
      // });
      // const groundMesh = new THREE.Mesh(groundGeometry, groundMaterial);
      // scene.add(groundMesh);

      const spotlight = new THREE.SpotLight(0xffffff, 5000, 100, 0.2, 0.5);
      spotlight.position.set(10, 30, -10);
      spotlight.lookAt(0, 0, 0);
      scene.add(spotlight);

      const spotlight2 = new THREE.SpotLight(0xffffff, 5000, 100, 0.2, 0.5);
      spotlight2.position.set(-10, 30, -10);
      spotlight2.lookAt(0, 0, 0);
      scene.add(spotlight2);

      const spotlight3 = new THREE.SpotLight(0xffffff, 5000, 100, 0.2, 0.5);
      spotlight3.position.set(-0, -30, -10);
      spotlight3.lookAt(0, 0, 0);
      scene.add(spotlight3);

      // const geometry = new THREE.BoxGeometry();
      // const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
      // const cube = new THREE.Mesh(geometry, material);
      // scene.add(cube);

      // // Render the scene and camera
      // renderer.render(scene, camera);

      const loader = new GLTFLoader().setPath("/3d_models/");
      loader.load("buoy.gltf", (gltf) => {
        const mesh = gltf.scene;
        mesh.position.set(0, 0, 0);
        // mesh.scale.set(10, 10, 0);
        scene.add(mesh);
      });

      const renderScene = () => {
        // cube.rotation.x += 0.01;
        // cube.rotation.y += 0.01;
        requestAnimationFrame(renderScene);
        renderer.render(scene, camera);
      };

      // Call the renderScene function to start the animation loop
      renderScene();

      // const handleResize = () => {
      //   const width = window.innerWidth;
      //   const height = window.innerHeight;
      //
      //   camera.aspect = width / height;
      //   camera.updateProjectionMatrix();
      //
      //   renderer.setSize(width, height);
      // };
      //
      // window.addEventListener('resize', handleResize);
      //
      // // Clean up the event listener when the component is unmounted
      // return () => {
      //   window.removeEventListener('resize', handleResize);
      // };
    }
  },);

  return (
    <div ref={containerRef}></div>
  );
}

export default ThreeScene;
