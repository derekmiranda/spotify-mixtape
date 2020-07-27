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

camera.position.set(0, 0, 5);
renderer.outputEncoding = THREE.sRGBEncoding;
controls.update();

const ambientLight = new THREE.AmbientLight(0xFFFFFF, 0.2)
scene.add(ambientLight)

const spotLight = new THREE.SpotLight(0xFFFFFF)
spotLight.position.set(-1, 1, 1)
spotLight.lookAt(0, 0, 0)
scene.add(spotLight)

function animate() {

  requestAnimationFrame(animate);

  // required if controls.enableDamping or controls.autoRotate are set to true
  controls.update();

  renderer.render(scene, camera);

}

load().then(res => {
  const [dae, textureMap] = res
  scene.add(dae.scene)
  const mat = new THREE.MeshStandardMaterial(textureMap)
  dae.scene.children[0].material = mat
  animate()
})