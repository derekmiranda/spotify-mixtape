import {
  el,
  text,
  mount,
  setStyle
} from 'redom'

const TOKEN = 'BQAoeUF-L9Eyao0iIRWkM8bs8Jo5E62kTEtVav2OAeGA5o4WGRiVPP89b0UufAV0kQ-t48JkUH_6QJlFjAprGKpIipgSWe7J46QlQNp4VpAuRE7I0FxmhiIYWHZetZ-r5wIMtuMkwVzRYPwoNCwVVwFas2SDDtefCA'
const TRACK_URI = 'spotify:track:7xGfFoTpQ2E7fRF5lN10tr'

let player, playerContainerEl

function initSpotifyListeners() {
  return new Promise((resolve, reject) => {
    player = new Spotify.Player({
      name: 'Web Playback SDK Quick Start Player',
      getOAuthToken: cb => {
        cb(TOKEN);
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
  })
}

function playSong() {}

function createPlaybackHandler(player, playbackFn) {
  return function (event) {}
}

function playSong() {
  const play = ({
    spotify_uri,
    playerInstance: {
      _options: {
        getOAuthToken,
        id
      }
    }
  }) => {
    getOAuthToken(access_token => {
      fetch(`https://api.spotify.com/v1/me/player/play?device_id=${id}`, {
        method: 'PUT',
        body: JSON.stringify({
          uris: [spotify_uri]
        }),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${access_token}`
        },
      });
    });
  };

  play({
    playerInstance: player,
    spotify_uri: TRACK_URI,
  });
}

function renderSpotifyPlayer(root) {
  const playBtnEl = el('button', 'Play')
  const pauseBtnEl = el('button', 'Pause')
  const prevBtnEl = el('button', 'Prev')
  const nextBtnEl = el('button', 'Next')

  playBtnEl.addEventListener('click', playSong)

  playerContainerEl = el('#player-container', [playBtnEl, pauseBtnEl, prevBtnEl, nextBtnEl])
  mount(root, playerContainerEl)
}

export {
  initSpotifyListeners,
  renderSpotifyPlayer
}