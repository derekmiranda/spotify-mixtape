import {
  createCassetteScene
} from './3d'
import {
  PlayWidget
} from './ui/PlayWidget'

// Jame mixtape <3
const PLAYLIST_ID = '76Catc5pShxh2vNFvZ13xh'

const root = document.getElementById('main-container')
const widget = new PlayWidget({
  root,
  contextId: PLAYLIST_ID
})

createCassetteScene(root)
widget.render()