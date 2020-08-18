import * as THREE from 'three'

import {
  ColladaLoader
} from '../vendor/ColladaLoader.js';
import {
  createCanvasTexture
} from './createCanvasTexture.js';
import {
  cassetteColor
} from './index.js';

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
    map: 'mat_tape_albedo.png',
    aoMap: 'mat_tape_AO.jpg',
    roughnessMap: 'mat_tape_roughness.jpg',
    metalnessMap: 'mat_tape_metallic.jpg'
  }
  const promiseMap = {},
    resolvedTextureMap = {}

  Object.keys(texturePathMap).forEach(textureType => {
    const texturePath = basePath + texturePathMap[textureType]
    let loadPromise
    if (textureType === 'map') {
      loadPromise = createCanvasTexture(texturePath, cassetteColor)
    } else {
      loadPromise = createLoaderPromise(THREE.TextureLoader, texturePath)
    }
    promiseMap[textureType] = loadPromise
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
  load,
  createLoaderPromise
}