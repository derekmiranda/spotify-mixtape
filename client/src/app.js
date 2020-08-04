import {
  createCassetteScene
} from './3d/cassette'
import {
  PlayWidget
} from './ui/PlayWidget'
import {
  createBackground
} from './3d/background'

// Jame mixtape <3
const PLAYLIST_ID = '76Catc5pShxh2vNFvZ13xh'

const root = document.getElementById('main-container')
const widget = new PlayWidget({
  root,
  contextId: PLAYLIST_ID
})

createBackground(root)
createCassetteScene(root)
widget.render()