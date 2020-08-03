const playlist = require("./playlist")

module.exports = function routes(server) {
  playlist(server)
}