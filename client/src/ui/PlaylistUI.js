import {
  el,
  mount,
} from 'redom'

import {
  PlayerUI
} from './PlayerUI'
import {
  selectPlaylistData,
  clearChildren,
  appendChildren
} from '../lib/utils'

class PlaylistUI {
  constructor({
    playlistManager,
    playerManager,
    root
  }) {
    this.playlistManager = playlistManager
    this.playerManager = playerManager
    this.root = root
    this.mounted = false

    if (this.playerManager) {
      this.playerUI = new PlayerUI({
        playerManager
      })
      this.playerManager.subscribe('ready', () => {
        this._enablePlayer()
      })
    }

    this.playlistManager.subscribe('fetched-playlist', playlistData => {
      this.playlistData = selectPlaylistData(playlistData)
      this.render()
    })
  }

  render() {
    if (!this.mounted) {
      this.mounted = true

      this.containerEl = el('div.playlist-ui')

      // title
      this.titleEl = el('h1.playlist-ui__title', 'Playlist Loading...')
      this.containerEl.appendChild(this.titleEl)

      // player
      if (this.playerUI) {
        this.playerUI.root = this.containerEl
        this.playerUI.render()
      }

      // tracklist
      const {
        tracklistEl,
        tbodyEl,
        trackEls
      } = this.createTracklistEls()
      this.tracklistEl = tracklistEl
      this.tbodyEl = tbodyEl
      this.trackEls = trackEls
      this.containerEl.appendChild(this.tracklistEl)

      mount(this.root, this.containerEl)
    } else if (this.playlistData) {
      // update title
      this.titleEl.innerText = this.playlistData.name
      // update track rows
      clearChildren(this.tbodyEl)
      this.trackEls = this.createTrackEls(this.playlistData.tracks)
      appendChildren(this.tbodyEl, this.trackEls)
    }
    return this.containerEl
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