import './style.scss'
import {
  create3DScene,
  changeCassetteColor,
  cassetteColor
} from './3d'
import {
  PlayWidget
} from './ui/PlayWidget'
import {
  ColorPickerUI
} from './ui/ColorPickerUI'

// Jame mixtape <3
const PLAYLIST_ID = '76Catc5pShxh2vNFvZ13xh'

const root = document.getElementById('main-container')
// const widget = new PlayWidget({
//   root,
//   contextId: PLAYLIST_ID
// })
const colorPicker = new ColorPickerUI({
  root,
  changeColor: changeCassetteColor,
  defaultColor: cassetteColor
})

create3DScene(root)
colorPicker.render()
// widget.render()