import {
  el,
  mount
} from 'redom'

function createBackground(root) {
  const canvas = el('canvas.bg-canvas')

  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  mount(root, canvas)
}

export {
  createBackground
}