import * as THREE from 'three';
import {
  OrbitControls
} from '../vendor/OrbitControls'
import {
  load
} from './load';

const RENDERER_WIDTH = window.innerWidth
const RENDERER_HEIGHT = window.innerHeight

// factors for determining how much of a 180-degree range camera can orbit in
const HORIZ_ROTATION_PERCENT = 0.6
const VERT_ROTATION_PERCENT = 0.7

let renderer, scene, camera, controls

function create3DScene(root) {
  renderer = new THREE.WebGLRenderer({
    logarithmicDepthBuffer: true
  });
  // renderer.setClearAlpha(0.0);
  renderer.setSize(RENDERER_WIDTH, RENDERER_HEIGHT);
  renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.domElement.classList.add('cassette-canvas')
  root.appendChild(renderer.domElement);

  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(45, RENDERER_WIDTH / RENDERER_HEIGHT, 1, 10000);
  // TODO: position in relation to canvas dimensions
  camera.position.set(0, 0, 3);

  renderWaveMesh(scene)
  renderCassette(scene)
}

function renderWaveMesh(scene) {
  const geom = new THREE.PlaneGeometry(100, 100, 32, 32)
  const mat = new THREE.MeshBasicMaterial({
    color: 0xff6347,
    wireframe: true
  });
  const mesh = new THREE.Mesh(geom, mat)

  mesh.position.z = -100
  mesh.rotateX(Math.PI * 2 / 3)

  scene.add(mesh)
}

function renderCassette(scene) {
  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableZoom = false
  controls.enablePan = false
  controls.enableKeys = false
  controls.maxAzimuthAngle = HORIZ_ROTATION_PERCENT * Math.PI / 2
  controls.minAzimuthAngle = HORIZ_ROTATION_PERCENT * -Math.PI / 2
  controls.maxPolarAngle = VERT_ROTATION_PERCENT * Math.PI
  controls.minPolarAngle = (1 - VERT_ROTATION_PERCENT) * Math.PI
  controls.update();

  const ambientLight = new THREE.AmbientLight(0xFFFFFF, 0.2)
  scene.add(ambientLight)

  const spotLight = new THREE.SpotLight(0xFFFFFF)
  spotLight.position.set(-1, 1, 1)
  spotLight.lookAt(0, 0, 0)
  scene.add(spotLight)

  load().then(res => {
    const [dae, textureMap] = res
    scene.add(dae.scene)
    const mat = new THREE.MeshStandardMaterial(textureMap)
    dae.scene.children[0].material = mat
    animate()
  })
}

function animate() {
  requestAnimationFrame(animate);

  // required if controls.enableDamping or controls.autoRotate are set to true
  controls.update();

  renderer.render(scene, camera);
}

export {
  create3DScene
}