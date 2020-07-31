import {
  el,
  mount,
} from 'redom'

// Carly Rae Jepsen - Run Away With Me
const TRACK_URI = 'spotify:track:7xGfFoTpQ2E7fRF5lN10tr'

class PlayerUI {
  constructor({
    playerManager,
  }) {
    this.playerManager = playerManager
    this.mounted = false

    this.playSong = this.playSong.bind(this)
    this.pause = this.pause.bind(this)
  }

  render(root) {
    if (!this.mounted) {
      this.playBtnEl = el('button.player-btn', 'Play')
      this.pauseBtnEl = el('button.player-btn', 'Pause')
      this.prevBtnEl = el('button.player-btn', 'Prev')
      this.nextBtnEl = el('button.player-btn', 'Next')

      this.playBtnEl.addEventListener('click', this.playSong)
      this.pauseBtnEl.addEventListener('click', this.pause)

      this.playerContainerEl = el('#player-container', [this.playBtnEl, this.pauseBtnEl, this.prevBtnEl, this.nextBtnEl])

      mount(root, this.playerContainerEl)
    } else {

    }
  }

  renderPlaylist(root) {
    this.playlistEl = el('ol.playlist')
  }

  playSong() {
    this.playerManager.play(TRACK_URI)
  }

  pause() {
    this.playerManager.pause()
  }
}

export {
  PlayerUI
}