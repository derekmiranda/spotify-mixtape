import {
  debounce
} from 'lodash'
import {
  el,
  mount
} from 'redom'

import './style.scss'
import {
  create3DScene,
  changeCassetteColor,
  cassetteColor,
  resize
} from './3d'
import {
  PlayWidget
} from './ui/PlayWidget'
import {
  ColorPickerUI
} from './ui/ColorPickerUI'
import {
  updateText
} from './3d/canvasTexture'
import {
  getPlaylistId
} from './lib/query'

// Jame mixtape <3
const PLAYLIST_ID = '76Catc5pShxh2vNFvZ13xh'

const root = document.getElementById('main-container')
const widget = new PlayWidget({
  root,
  contextId: getPlaylistId() || PLAYLIST_ID
})
const colorPicker = new ColorPickerUI({
  root,
  changeColor: changeCassetteColor,
  defaultColor: cassetteColor
})

// 
function renderMixtapeNameInput(root, onChange) {
  const inputEl = el('input.name-input')

  inputEl.addEventListener('input', event => {
    const text = event.target.value
    if (onChange) {
      onChange(text)
    }
  })

  mount(root, inputEl)
}
// 

create3DScene(root)
colorPicker.render()
widget.render()
renderMixtapeNameInput(root, updateText)

// resize listener
window.addEventListener('resize', debounce(resize, 100))