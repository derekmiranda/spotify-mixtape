const {
  spotifyAPI
} = require('../lib/spotify-api')

// TODO: move to controllers directory
async function getPlaylist(playlistID) {
  const response = await spotifyAPI.getPlaylist(playlistID)
    .catch(err => {
      console.log('Error getting playlist:', err)
    })
  return response.body
}

module.exports = function (server) {
  server.route({
    method: 'GET',
    path: '/playlist/{id}',
    // TODO: async funcs?
    handler: function (req, h) {
      return getPlaylist(req.params.id)
    }
  })
}