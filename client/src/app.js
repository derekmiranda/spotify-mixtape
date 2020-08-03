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
  selectTrackDataList
} from './lib/utils';
import {
  PlaylistUI
} from './ui/PlaylistUI';

const PLAYBACK_TOKEN = 'BQCIjHeU_V9vvZt_n-EYHo7nDMnx26q7klS9ATuSJd3SSTOJx32sfnZAT2rCnnvJGjnocofngxvN2Ih46PzpyyvBO1wxX81eXssR7Kg0h7fR2_-1GUVHCA_fNNte7cWcl9AtSEbDb8CxNmd4wM_hYo6aZuohGmDUCA'
// Jame mixtape <3
const PLAYLIST_ID = '76Catc5pShxh2vNFvZ13xh'

const root = document.getElementById('main-container')
// const playerManager = new PlayerManager()
const playlistManager = new PlaylistManager({
  playlistID: PLAYLIST_ID
})

create3DScene(root)

const playlistUI = new PlaylistUI({
  playlistManager,
  root
})
playlistUI.render(root)

playlistManager.publishPlaylist()

// playerManager.init()
//   .then(() => {
//     const player = new PlayerUI({
//       playerManager,
//       root
//     })
//     player.render()
//   })