import * as THREE from 'three';
import {
  OrbitControls
} from './vendor/OrbitControls'
import {
  load
} from './load';

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000);

const controls = new OrbitControls(camera, renderer.domElement);

const light = new THREE.PointLight(0xFFFFFF, 1, 100);
light.position.set(-5, 5, 0);
scene.add(light);

//controls.update() must be called after any manual changes to the camera's transform
camera.position.set(0, 2, 0);
renderer.setClearColor(0xFFFFFF, 1)
controls.update();

function animate() {

  requestAnimationFrame(animate);

  // required if controls.enableDamping or controls.autoRotate are set to true
  controls.update();

  renderer.render(scene, camera);

}
load().then(obj => {
  scene.add(obj)
  animate()
})