'use strict';

require('dotenv').config()

const Hapi = require('@hapi/hapi');

const spotify = require('./lib/spotify-api')
const routes = require('./routes');

const init = async () => {
  const server = Hapi.server({
    port: process.env.PORT || 3000,
    host: '0.0.0.0',
    routes: {
      cors: true
    }
  });

  server.route({
    method: 'GET',
    path: '/',
    handler: (req, h) => {
      return 'Hello'
    }
  })

  routes(server)

  // initialize Spotify API
  await spotify.init()
  console.log('Spotify client credentials ready')

  await server.start();
  console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

init();