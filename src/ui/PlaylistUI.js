import {
  el,
  mount,
} from 'redom'

class PlaylistUI {
  constructor({
    playlistManager,
  }) {
    this.playlistManager = playlistManager
    this.mounted = false
  }

  render(root) {
    if (!this.mounted) {
      this.mounted = true

      this.title = el('h1.playlist-container__title', 'Playlist Loading...')
      this.tableEl = el('div.playlist-container', [this.title])

      mount(root, this.tableEl)
    } else {

    }
  }
}

export {
  PlaylistUI
}