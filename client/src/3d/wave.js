import * as THREE from 'three';

import {
  perlin3
} from './perlin'

let mesh, geom, mat

function renderWaveMesh(scene) {
  geom = new THREE.PlaneGeometry(100, 100, 16, 16)
  mat = new THREE.MeshBasicMaterial({
    color: 0xff6347,
    wireframe: true
  });
  mesh = new THREE.Mesh(geom, mat)

  mesh.position.y = -10
  mesh.position.z = -100
  mesh.rotateX(-0.4 * Math.PI)

  scene.add(mesh)
}

function updateWave({
  magnitude,
  scale,
  moveSpeed,
  speed,
  time
}) {
  geom.verticesNeedUpdate = true
  for (let vertex of geom.vertices) {
    vertex.z = magnitude * perlin3(
      scale * vertex.x,
      scale * vertex.y + time * moveSpeed,
      time * speed
    )
  }
}

export {
  renderWaveMesh,
  updateWave
}