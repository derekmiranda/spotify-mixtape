const playlist = require("../controllers/playlist")

module.exports = function methods(server) {
  server.method('playlist_getPlaylist', playlist.getPlaylist, {
    cache: {
      expiresIn: 3000,
      generateTimeout: 10000
    }
  })
}