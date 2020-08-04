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
    this.playing = false
    this.root = root
    this.mounted = false

    this.playNewSong = this.playNewSong.bind(this)
    this.togglePlayback = this.togglePlayback.bind(this)
  }

  render() {
    if (!this.mounted) {
      this.mounted = true

      this.playBtnEl = el('button.player-ui__btn', 'Play')
      this.prevBtnEl = el('button.player-ui__btn', 'Prev')
      this.nextBtnEl = el('button.player-ui__btn', 'Next')

      this.playBtnEl.addEventListener('click', this.togglePlayback)

      this.playerContainerEl = el('.player-ui', [this.prevBtnEl, this.playBtnEl, this.nextBtnEl])

      mount(this.root, this.playerContainerEl)
    } else {
      // update play btn
      this.playBtnEl.innerText = this.playing ? 'Pause' : 'Play'
    }
    return this.playerContainerEl
  }

  playNewSong(trackURI) {
    this.playerManager.play(trackURI)
  }

  togglePlayback() {
    this.playing = !this.playing
    this.render()

    /*     if (this.playing) {
          this.playerManager.play()
        } else {
          this.playerManager.pause()
        }*/
  }
}

export {
  PlayerUI
}