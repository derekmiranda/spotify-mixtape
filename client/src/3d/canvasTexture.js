import * as THREE from 'three'

const TEXT_COLOR = 'black'

let canvas, ctx, img, texture, text, lastColor

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

function updateText(_text) {
  text = _text
  drawCassette(lastColor)
}

function drawText(text) {
  ctx.font = '25px Streamster'
  ctx.fillStyle = TEXT_COLOR
  ctx.fillText(text, 129, 117)
}

function drawCassette(color) {
  if (texture) {
    texture.needsUpdate = true
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.fillStyle = color
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  ctx.drawImage(img, 0, 0)

  if (text && text.trim()) {
    drawText(text.trim())
  }

  // cache color
  lastColor = color
}

export {
  createCanvasTexture,
  drawCassette,
  updateText
}