const PLAYLIST_API_URL = process.env.API_URL + '/playlist'

function get(playlistID) {
  return fetch(`${PLAYLIST_API_URL}/${playlistID}`)
    .then(res => res.json())
}

export {
  get
}