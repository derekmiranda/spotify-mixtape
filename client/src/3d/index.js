import * as THREE from 'three';

import {
  renderWaveMesh,
  updateWave
} from './wave'
import {
  load
} from './load';
import {
  ObjOrbitControls
} from './orbit';
import {
  Vector3
} from 'three';
import {
  drawCassette
} from './canvasTexture';

const RENDERER_WIDTH = window.innerWidth
const RENDERER_HEIGHT = window.innerHeight
const WAVE_MAGNITUDE = 5
const WAVE_SPEED = 0.00001
const WAVE_MOVESPEED = 0.0005
const NOISE_SCALE = 10

export const cassetteColor = '#09070E'

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
  root.appendChild(renderer.domElement);

  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(45, RENDERER_WIDTH / RENDERER_HEIGHT, 1, 10000);
  // TODO: position in relation to canvas dimensions
  camera.position.set(0, 0, 3);

  const spotLight = new THREE.SpotLight(0xFFFFFF)
  spotLight.position.set(-1, 1, 1)
  spotLight.lookAt(0, 0, 0)
  scene.add(spotLight)

  const ambientLight = new THREE.AmbientLight(0xFFFFFF, 0.2)
  scene.add(ambientLight)

  renderWaveMesh(scene)
  load().then(res => {
    const [model, textureMap] = res
    renderCassette(scene, model.scene, textureMap)

    // re-orient spotlight to cassette
    spotLight.position.addVectors(
      model.scene.position,
      new Vector3(2, 4, 5)
    )
    spotLight.lookAt(model.scene)
  })
}

let cassetteObj

function renderCassette(scene, cassetteScene, textureMap) {
  cassetteScene.position.set(-1, 0, -2)
  scene.add(cassetteScene)

  // cassette sticker texture
  const cassetteMat = new THREE.MeshStandardMaterial({
    ...textureMap,
  })

  cassetteObj = cassetteScene.children[0]
  cassetteObj.material = cassetteMat

  controls = new ObjOrbitControls(cassetteObj, renderer.domElement, {})

  requestAnimationFrame(animate)
}

function changeCassetteColor(color) {
  drawCassette(color)
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

  renderer.render(scene, camera);
}

export {
  create3DScene,
  changeCassetteColor
}