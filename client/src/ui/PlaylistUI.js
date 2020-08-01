import {
  el,
  mount,
} from 'redom'
import {
  selectPlaylistData,
  clearChildren,
  appendChildren
} from '../lib/utils'

class PlaylistUI {
  constructor({
    playlistManager,
    root
  }) {
    this.playlistManager = playlistManager
    this.root = root
    this.mounted = false

    // subscribers
    this.playlistManager.subscribe('fetched-playlist', playlistData => {
      this.playlistData = selectPlaylistData(playlistData)
      this.render()
    })
  }

  render() {
    if (!this.mounted) {
      this.mounted = true

      this.titleEl = el('h1.playlist-ui__title', 'Playlist Loading...')
      const {
        tracklistEl,
        tbodyEl,
        trackEls
      } = this.createTracklistEls()
      this.tracklistEl = tracklistEl
      this.tbodyEl = tbodyEl
      this.trackEls = trackEls
      this.containerEl = el('div.playlist-ui', [this.titleEl, this.tracklistEl])

      mount(this.root, this.containerEl)
    } else if (this.playlistData) {
      // update title
      this.titleEl.innerText = this.playlistData.name
      // update track rows
      clearChildren(this.tbodyEl)
      this.trackEls = this.createTrackEls(this.playlistData.tracks)
      appendChildren(this.tbodyEl, this.trackEls)
    }
  }

  createTracklistEls(trackDataList) {
    const headerEls = [
      el('th', 'Title'),
      el('th', 'Artist'),
      el('th', 'Runtime'),
    ]
    const theadEl = el('thead', [
      el('tr', headerEls)
    ])

    let trackEls
    if (!trackDataList || !trackDataList.length) {
      // TODO: render loading spinner?
      trackEls = [
        el('tr.tracklist__placeholder', [
          el('td', '...', {
            colSpan: headerEls.length
          })
        ])
      ]
    } else {
      // TODO: render playlist
    }

    const tbodyEl = el('tbody', trackEls)
    const tracklistEl = el('table.tracklist', [
      theadEl,
      tbodyEl
    ])

    return {
      tracklistEl,
      tbodyEl,
      trackEls
    }
  }

  createTrackEls(tracks) {
    return tracks.map(track => {
      return el('tr', [
        el('td', track.name),
        el('td', track.artistNames[0]),
        el('td', track.runtime),
      ])
    })
  }
}

export {
  PlaylistUI
}