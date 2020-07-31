import * as playerAPI from './player-api'

class SpotifyManager {
  constructor({
    token
  }) {
    this.token = token
    this.player
    this.playlist
  }

  // TODO: timeout error
  init() {
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
          resolve()
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

    return playerAPI.play(this.player, songURI)
  }

  pause() {
    if (!this.player) {
      console.error('Player not ready!')
    }

    return playerAPI.pause(this.player)
  }

  seek() {}
  prevTrack() {}
  nextTrack() {}
}

export {
  SpotifyManager
}