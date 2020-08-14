import * as THREE from 'three'

import {
  ColladaLoader
} from '../vendor/ColladaLoader.js';

function createLoaderPromise(loaderType, assetPath) {
  return new Promise((resolve, reject) => {
    new loaderType().load(
      assetPath,
      function (result) {
        resolve(result)
      },
      function (xhr) {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
      },
      function (error) {
        reject(error)
      }
    )
  })
}

function daePromise() {
  return createLoaderPromise(ColladaLoader, 'assets/cassette/model.dae')
}

function cassetteTexturesPromise() {
  const basePath = 'assets/cassette/textures/'
  const texturePathMap = {
    // map: 'mat_tape_albedo.jpg',
    aoMap: 'mat_tape_AO.jpg',
    alphaMap: 'mat_tape_opacity.jpg',
    roughnessMap: 'mat_tape_roughness.jpg',
    metalnessMap: 'mat_tape_metallic.jpg'
  }
  const promiseMap = {},
    resolvedTextureMap = {}

  Object.keys(texturePathMap).forEach(textureType => {
    const texturePath = basePath + texturePathMap[textureType]
    promiseMap[textureType] = createLoaderPromise(THREE.TextureLoader, texturePath)
      .then(result => {
        resolvedTextureMap[textureType] = result
        return result
      })
  })

  return Promise.all(Object.values(promiseMap)).then(() => resolvedTextureMap)
}

function load() {
  return Promise.all([daePromise(), cassetteTexturesPromise()])
    .catch(error => {
      console.error('An error happened');
      console.error(error)
    })
}

export {
  load
}