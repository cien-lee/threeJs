import "./style.css";
import * as THREE from "three";
import gsap from "gsap";

// Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;

scene.add(camera);

/**
 * Axes Helper
 */
const axesHelper = new THREE.AxesHelper(2);
scene.add(axesHelper);

// Group
const group = new THREE.Group();
group.scale.y = 2;
group.rotation.y = 0.2;
scene.add(group);

// Objects
const cube1 = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial({ color: "red" }));
const cube2 = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial({ color: "green" }));
const cube3 = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial({ color: "blue" }));

cube1.position.x = -1.5;
cube3.position.x = 1.5;

group.add(cube1, cube2, cube3);

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);

// Animate
// 1. 그냥 animation
// const clock = new THREE.Clock();

// const tick = () => {
//   const elapsedTime = clock.getElapsedTime();
//   cube1.rotation.y = elapsedTime;
//   cube2.position.x = Math.cos(elapsedTime);

//   camera.position.y = Math.sin(elapsedTime);
//   camera.lookAt(cube2.position);

//   window.requestAnimationFrame(tick);
//   renderer.render(scene, camera);
// };

// tick();

// 2. Gsap을 사용한 animation
gsap.to(cube1.position, { duration: 1, delay: 1, x: 2 });

const tick = () => {
  // Render
  window.requestAnimationFrame(tick);
  // Call tick again on the next frame
  renderer.render(scene, camera);
};

tick();
