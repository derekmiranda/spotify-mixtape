import * as THREE from 'three';
import {
  OrbitControls
} from '../vendor/OrbitControls'
import {
  load
} from './load';
import {
  perlin3
} from './perlin'

const RENDERER_WIDTH = window.innerWidth
const RENDERER_HEIGHT = window.innerHeight
const WAVE_MAGNITUDE = 5
const WAVE_SPEED = 0.00001
const WAVE_MOVESPEED = 0.0005
const NOISE_SCALE = 10

// factors for determining how much of a 180-degree range camera can orbit in
const HORIZ_ROTATION_PERCENT = 0.6
const VERT_ROTATION_PERCENT = 0.7

let renderer, scene, camera, controls

function create3DScene(root, {
  currentTime
}) {
  renderer = new THREE.WebGLRenderer({
    logarithmicDepthBuffer: true
  });
  // renderer.setClearAlpha(0.0);
  renderer.setSize(RENDERER_WIDTH, RENDERER_HEIGHT);
  renderer.outputEncoding = THREE.sRGBEncoding;
  root.appendChild(renderer.domElement);

  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(45, RENDERER_WIDTH / RENDERER_HEIGHT, 1, 10000);
  // TODO: position in relation to canvas dimensions
  camera.position.set(0, 0, 3);

  renderWaveMesh(scene)
  renderCassette(scene)
}

let waveMesh

function renderWaveMesh(scene) {
  const geom = new THREE.PlaneGeometry(100, 100, 16, 16)
  const mat = new THREE.MeshBasicMaterial({
    color: 0xff6347,
    wireframe: true
  });
  waveMesh = new THREE.Mesh(geom, mat)

  waveMesh.position.y = -10
  waveMesh.position.z = -100
  waveMesh.rotateX(-0.4 * Math.PI)

  scene.add(waveMesh)
}

function updateWave({
  magnitude,
  scale,
  moveSpeed,
  speed,
  time
}) {
  const geom = waveMesh.geometry
  geom.verticesNeedUpdate = true
  for (let vertex of geom.vertices) {
    vertex.z = magnitude * perlin3(
      scale * vertex.x,
      scale * vertex.y + time * moveSpeed,
      time * speed
    )
  }
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
    requestAnimationFrame(animate)
  })
}

function animate(timestamp) {
  requestAnimationFrame(animate);

  updateWave({
    magnitude: WAVE_MAGNITUDE,
    scale: NOISE_SCALE,
    speed: WAVE_SPEED,
    moveSpeed: WAVE_MOVESPEED,
    time: timestamp
  })

  // required if controls.enableDamping or controls.autoRotate are set to true
  controls.update();

  renderer.render(scene, camera);
}

export {
  create3DScene
}