import {
  create3DScene
} from './3d'
import {
  PlayerUI
} from '../PlayerUI';
import {
  PlayerManager
} from './api/PlayerManager';

const TOKEN = 'BQBcnFK9ff4HdG-c8kcxGAZCxxvhB9bIuTjYe4cLgLIsmMzE9vWPOxt2kONJT2a3ZABPx-ME9TYF2vFyCUP5vx3XqZAvWKxcO-eR8v8zcMo-XQpiYdhEnaMzaD89is7bvynapxBD37EU0lAYDfnV4s6tistIvrQBNA'
// Jame mixtape <3
const PLAYLIST_URI = 'spotify:playlist:76Catc5pShxh2vNFvZ13xh'

const root = document.getElementById('main-container')
const playerManager = new PlayerManager({
  token: TOKEN,
  playlistURI: PLAYLIST_URI
})
// const playlistManager

create3DScene(root)
playerManager.init()
  .then(() => {
    const player = new PlayerUI({
      playerManager,
    })
    player.render(root)
  })