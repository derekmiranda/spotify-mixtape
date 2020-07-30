import {
  create3DScene
} from './3d'
import {
  renderSpotifyPlayer,
  initSpotifyListeners
} from '../player';

const root = document.getElementById('main-container')
create3DScene(root)
window.onSpotifyWebPlaybackSDKReady = () => {
  initSpotifyListeners()
    .then(() => {
      renderSpotifyPlayer(root)
    })
}