const API_URL = 'https://api.spotify.com/v1/me/player'

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

  playSong(songURI) {
    if (!this.player) {
      console.error('Player not ready!')
    }

    const {
      _options: {
        getOAuthToken,
        id
      }
    } = this.player

    return new Promise((resolve, reject) => {
      getOAuthToken(accessToken => {
        const playPutReq = fetch(`${API_URL}/play?device_id=${id}`, {
          method: 'PUT',
          body: JSON.stringify({
            uris: [songURI]
          }),
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
          },
        });
        resolve(playPutReq)
      })
    })
  }

  resume() {}
  pause() {
    if (!this.player) {
      console.error('Player not ready!')
    }

    const {
      _options: {
        getOAuthToken,
        id
      }
    } = this.player

    return new Promise((resolve, reject) => {
      getOAuthToken(accessToken => {
        const pausePutReq = fetch(`${API_URL}/pause?device_id=${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
          },
        });
        resolve(pausePutReq)
      })
    })
  }
  seek() {}
  prevTrack() {}
  nextTrack() {}
}

export {
  SpotifyManager
}