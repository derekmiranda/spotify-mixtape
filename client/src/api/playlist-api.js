const PLAYLIST_API_URL = 'https://api.spotify.com/v1/playlists'

function get(playlistID, token) {
  return fetch(`${PLAYLIST_API_URL}/${playlistID}`, {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    })
    .then(res => res.json())
}

export {
  get
}