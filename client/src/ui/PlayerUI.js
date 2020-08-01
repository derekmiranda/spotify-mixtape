import {
  el,
  mount,
} from 'redom'

// Carly Rae Jepsen - Run Away With Me
const TRACK_URI = 'spotify:track:7xGfFoTpQ2E7fRF5lN10tr'

class PlayerUI {
  constructor({
    playerManager,
    root
  }) {
    this.playerManager = playerManager
    this.root = root
    this.mounted = false

    this.playSong = this.playSong.bind(this)
    this.pause = this.pause.bind(this)
  }

  render() {
    if (!this.mounted) {
      this.playBtnEl = el('button.player-btn', 'Play')
      this.pauseBtnEl = el('button.player-btn', 'Pause')
      this.prevBtnEl = el('button.player-btn', 'Prev')
      this.nextBtnEl = el('button.player-btn', 'Next')

      this.playBtnEl.addEventListener('click', this.playSong)
      this.pauseBtnEl.addEventListener('click', this.pause)

      this.playerContainerEl = el('#player-container', [this.playBtnEl, this.pauseBtnEl, this.prevBtnEl, this.nextBtnEl])

      mount(this.root, this.playerContainerEl)
    } else {

    }
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