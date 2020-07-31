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

// TODO: create Spotify auth service
const CLIENT_ID = process.env.CLIENT_ID
const CLIENT_SECRET = process.env.CLIENT_SECRET

const PLAYBACK_TOKEN = 'BQCIjHeU_V9vvZt_n-EYHo7nDMnx26q7klS9ATuSJd3SSTOJx32sfnZAT2rCnnvJGjnocofngxvN2Ih46PzpyyvBO1wxX81eXssR7Kg0h7fR2_-1GUVHCA_fNNte7cWcl9AtSEbDb8CxNmd4wM_hYo6aZuohGmDUCA'
// Jame mixtape <3
const PLAYLIST_ID = '76Catc5pShxh2vNFvZ13xh'

const root = document.getElementById('main-container')
const playerManager = new PlayerManager({
  token: PLAYBACK_TOKEN,
})
const playlistManager = new PlaylistManager({
  playlistID: PLAYLIST_ID
})

create3DScene(root)

playlistManager.refreshToken(CLIENT_ID, CLIENT_SECRET)
  .then(() => {
    playlistManager.getPlaylist()
      .then(playlistData => {
        // console.log('Playlist Data: ', playlistData)
        console.log('Track Data List: ', selectTrackDataList(playlistData))
      })
  })

playerManager.init()
  .then(() => {
    const player = new PlayerUI({
      playerManager,
    })
    player.render(root)
  })