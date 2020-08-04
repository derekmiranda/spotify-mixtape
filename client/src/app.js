import {
  create3DScene
} from './3d'
import {
  PlayerUI
} from './ui/PlayerUI';
import {
  PlayerManager
} from './api/PlayerManager';
import {
  PlaylistManager
} from './api/PlaylistManager';
import {
  PlaylistUI
} from './ui/PlaylistUI';

// Jame mixtape <3
const PLAYLIST_ID = '76Catc5pShxh2vNFvZ13xh'

// TODO: read user agent to detect mobile clients 
const isMobile = false

let playerManager

// only show player if on desktop
if (!isMobile) {
  playerManager = new PlayerManager()
  // start loading Spotify Playback SDK 
  /*   playerManager.init()
      .catch(err => {
        console.error('Error w/ player manager init:')
        console.error(err)
      }) */
}

const root = document.getElementById('main-container')

const playlistManager = new PlaylistManager({
  playlistID: PLAYLIST_ID
})

create3DScene(root)

const playlistUI = new PlaylistUI({
  playlistManager,
  playerManager,
  root
})
playlistUI.render(root)

playlistManager.publishPlaylist()