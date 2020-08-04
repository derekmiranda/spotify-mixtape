import * as playerAPI from './player-api'
import {
  PubSub
} from '../lib/PubSub'

const PLAYBACK_SDK_URL = 'https://sdk.scdn.co/spotify-player.js'

class PlayerManager extends PubSub {
  constructor() {
    super(arguments)
  }

  // TODO: timeout error
  init() {
    return Promise.all([
        this._awaitSDKReady(),
        this._loadPlaybackSDK()
      ])
      .then(([player]) => {
        this.ready = true
        return player
      })
  }

  _loadPlaybackSDK() {
    return new Promise((resolve, reject) => {
      const scriptEl = document.createElement('script')
      scriptEl.src = PLAYBACK_SDK_URL
      scriptEl.type = 'text/javascript'
      scriptEl.onload = resolve
      scriptEl.onerror = reject
      document.body.appendChild(scriptEl)
    })
  }

  _awaitSDKReady() {
    return new Promise((resolve, reject) => {
      window.onSpotifyWebPlaybackSDKReady = () => {
        const player = this.player = new Spotify.Player({
          name: 'Web Playback SDK Quick Start Player',
          getOAuthToken: cb => {
            cb(this.token);
          }
        });

        // Error handling
        player.addListener('initialization_error', (error) => {
          console.error(error.message);
          reject(error)
        });
        player.addListener('authentication_error', (error) => {
          console.error(error.message);
          reject(error)
        });
        player.addListener('account_error', (error) => {
          console.error(error.message);
          reject(error)
        });
        player.addListener('player_error', (error) => {
          console.error(error.message);
          reject(error)
        });

        // Playback status updates
        player.addListener('player_state_changed', state => {
          console.log(state);
        });

        // Ready
        player.addListener('ready', ({
          device_id
        }) => {
          console.log('Ready with Device ID', device_id);
          resolve(player)
        });

        // Not Ready
        player.addListener('not_ready', ({
          device_id
        }) => {
          console.log('Device ID has gone offline', device_id);
        });

        // Connect to the player!
        player.connect();
      }
    })
  }

  play(songURI) {
    if (!this.player) {
      console.error('Player not ready!')
    }

    if (this._currSongURI !== songURI) {
      this._currSongURI = songURI
      return playerAPI.play(this.player, songURI)
    }

    return playerAPI.play(this.player)
  }

  pause() {
    if (!this.player) {
      console.error('Player not ready!')
    }

    return playerAPI.pause(this.player)
  }

  set currSongURI(songURI) {
    this._currSongURI = songURI
  }

  seek() {}
  prevTrack() {}
  nextTrack() {}
}

export {
  PlayerManager
}