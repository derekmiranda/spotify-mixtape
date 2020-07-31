import {
  create3DScene
} from './3d'
import {
  PlayerUI
} from '../PlayerUI';
import {
  SpotifyManager
} from './api/SpotifyManager';

const TOKEN = 'BQDRfGOp0ZAw0K7FO5wlZnJrReCboWY5d3xQBQzXY04e7or6sAawsxueQl_bP8rvBb5k_dE_SRlplymgxlXoTdo6oPedLo8pscGKxgxl5w1-qXzC4dLvV3ORcdEc6RvenyLBxfT4IlCKpVTCgabxnLCq34TdMdfljQ'
// Jame mixtape <3
const PLAYLIST_URI = 'spotify:playlist:76Catc5pShxh2vNFvZ13xh'

const root = document.getElementById('main-container')
const spotifyManager = new SpotifyManager({
  token: TOKEN
})

spotifyManager.init()
  .then(() => {
    create3DScene(root)

    const player = new PlayerUI({
      spotifyManager,
      playlistURI: PLAYLIST_URI
    })
    player.render(root)
  })