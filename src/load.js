import {
  OBJLoader
} from './vendor/OBJLoader'
import {
  MTLLoader
} from './vendor/MTLLoader'

function objPromise(materials) {
  const loader = new OBJLoader().setMaterials(materials);
  return new Promise((resolve, reject) => {
    loader.load(
      '/assets/cassette/Cassette.obj',
      function (obj) {
        resolve(obj)
      },
      null,
      function (error) {
        reject(error)
      }
    )
  })
}

function mtlPromise() {
  const loader = new MTLLoader()
  return new Promise((resolve, reject) => {
    loader.load(
      '/assets/cassette/Cassette.mtl',
      function (materials) {
        materials.preload()
        resolve(materials)
      },
      null,
      function (error) {
        reject(error)
      }
    )
  })
}

function load() {
  return mtlPromise()
    .then(materials => {
      return objPromise(materials)
    })
    .catch(err => {
      console.error(err)
    })
}

export {
  load
}