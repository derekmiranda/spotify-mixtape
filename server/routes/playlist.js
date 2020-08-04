module.exports = function (server) {
  server.route({
    method: 'GET',
    path: '/playlist/{id}',
    // TODO: async funcs?
    handler: async function (req, h) {
      return await server.methods.playlist_getPlaylist(req.params.id)
        .catch(err => {
          console.log(err)
        })
    }
  })
}