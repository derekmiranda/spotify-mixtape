import * as playlistAPI from './playlist-api'
import * as tokenAPI from './token-api'
import {
  PubSub
} from '../lib/PubSub'

// TODO: refresh client token if needed
class PlaylistManager extends PubSub {
  constructor({
    playlistID
  }) {
    super(arguments)

    this.playlistID = playlistID
    this.promiseCache = {}
  }

  publishPlaylist() {
    if (!this.promiseCache.updatePlaylist) {
      this.publish('fetching-playlist')
      this.promiseCache.updatePlaylist = playlistAPI.get(this.playlistID)
        .catch(err => {
          console.error('Playlist Get Error: ', err)
          this.publish('error', err)
          return err
        })
    }

    return this.promiseCache.updatePlaylist.then(playlistData => {
      this.publish('fetched-playlist', playlistData)
      return playlistData
    })
  }
}

export {
  PlaylistManager
}