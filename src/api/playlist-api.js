const PLAYLIST_API_URL = 'https://api.spotify.com/v1/playlists'

function get(playlistURI, token) {
  return fetch(`${PLAYLIST_API_URL}/${playlistURI}`, {
      headers: {
        'Authorization': token
      }
    })
    .then(processPlaylist)
}

function processPlaylist(playlistData) {
  return playlistData
}

export {
  get
}