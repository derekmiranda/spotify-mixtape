import {
  el,
  mount,
} from 'redom'

// Carly Rae Jepsen - Run Away With Me
const TRACK_URI = 'spotify:track:7xGfFoTpQ2E7fRF5lN10tr'

class PlayerUI {
  constructor({
    spotifyManager,
    playlistURI
  }) {
    this.spotifyManager = spotifyManager
    this.playSong = this.playSong.bind(this)
    this.pause = this.pause.bind(this)
    this.playlistURI = playlistURI
  }

  awaitPlaylist() {
    if (!this.playlistURI) return Promise.resolve()

    if (!this.playlistPromise) {
      this.spotifyManager.fetchPlaylist(this.playlistURI)
    }
  }

  set playlistURI(value) {

  }

  render(root) {
    this.playBtnEl = el('button.player-btn', 'Play')
    this.pauseBtnEl = el('button.player-btn', 'Pause')
    this.prevBtnEl = el('button.player-btn', 'Prev')
    this.nextBtnEl = el('button.player-btn', 'Next')

    this.playBtnEl.addEventListener('click', this.playSong)
    this.pauseBtnEl.addEventListener('click', this.pause)

    this.playerContainerEl = el('#player-container', [this.playBtnEl, this.pauseBtnEl, this.prevBtnEl, this.nextBtnEl])

    if (this.playlistURI) {
      this.renderPlaylist(this.playerContainerEl)
    }

    mount(root, this.playerContainerEl)
  }

  renderPlaylist(root) {
    this.playlistEl = el('ol.playlist')
  }

  playSong() {
    this.spotifyManager.play(TRACK_URI)
  }

  pause() {
    this.spotifyManager.pause()
  }
}

export {
  PlayerUI
}