import * as THREE from 'three'

let canvas, ctx, img, texture, lastColor

function createCanvasTexture(texturePath, cassetteColor) {
  return loadImg(texturePath)
    .then(() => drawTextureCanvas(cassetteColor))
    .then(canvas => {
      texture = new THREE.CanvasTexture(canvas)
      return texture
    })
    .catch(err => {
      console.error('Error loading cassette map', err)
    })
}

function loadImg(texturePath) {
  return new Promise((resolve, reject) => {
    img = new Image()
    img.src = texturePath
    img.onload = function () {
      resolve(img)
    }
    img.onerror = reject
  })
}

function drawTextureCanvas(bgColor) {
  canvas = document.createElement('canvas')
  canvas.width = img.width
  canvas.height = img.height

  ctx = canvas.getContext('2d')
  drawCassette(bgColor)

  // cache bg color
  lastColor = bgColor

  return canvas
}

function drawText(text) {
  console.log('drawing')
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  drawCassette(lastColor)
  ctx.font = '200px Streamster'
  ctx.fillText(text, 1035, 932)
}

function drawCassette(color) {
  if (texture) {
    texture.needsUpdate = true
  }

  ctx.fillStyle = color
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  ctx.drawImage(img, 0, 0)

  // cache color
  lastColor = color
}

export {
  createCanvasTexture,
  drawCassette,
  drawText
}