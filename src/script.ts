import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import gsap from "gsap";
import * as dat from "lil-gui";

// Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

const parameters = {
  color: 0xff0000,
  spin: () => {
    gsap.to(mesh.rotation, 1, { y: mesh.rotation.y + Math.PI * 2 });
  },
};

// Canvas
const canvas = document.getElementById("canvas");

// Scene
const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 10);
camera.position.z = 3;

scene.add(camera);

// Cursor
const cursor = {
  x: 0,
  y: 0,
};

// Axes Helper
const axesHelper = new THREE.AxesHelper(2);
scene.add(axesHelper);

// Objects
// Create an empty BufferGeometry
const geometry = new THREE.BufferGeometry();

// Create a Float32Array containing the vertices position (3 by 3)
const positionsArray = new Float32Array([
  0,
  0,
  0, // First vertex
  0,
  1,
  0, // Second vertex
  1,
  0,
  0, // Third vertex
]);

// Create the attribute and name it 'position'
const positionsAttribute = new THREE.BufferAttribute(positionsArray, 3);
geometry.setAttribute("position", positionsAttribute);

const material = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true });

const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);

// Update sizes
window.addEventListener("resize", () => {
  // update sizes object
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

window.addEventListener("dblclick", () => {
  if (!document.fullscreenElement) {
    canvas.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
});

window.addEventListener("mousemove", (event) => {
  cursor.x = event.clientX / sizes.width - 0.5;
  cursor.y = -(event.clientY / sizes.height - 0.5);
});

// Animate
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();

/**
 * Debug
 */
const gui = new dat.GUI({
  // closed: true,
  width: 400,
});
// gui.hide()
gui.add(mesh.position, "y").min(-3).max(3).step(0.01).name("elevation");
gui.add(mesh, "visible");
gui.add(material, "wireframe");

gui.addColor(parameters, "color").onChange(() => {
  material.color.set(parameters.color);
});

gui.add(parameters, "spin");
