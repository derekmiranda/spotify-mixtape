const {
  spotifyAPI
} = require('../lib/spotify-api')

async function getPlaylist(playlistID) {
  const response = await spotifyAPI.getPlaylist(playlistID)
    .catch(err => {
      console.log('Error getting playlist:', err)
      throw err
    })
  return response.body
}

module.exports = {
  getPlaylist
}