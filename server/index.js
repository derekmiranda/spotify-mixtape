'use strict';

require('dotenv').config()

const Hapi = require('@hapi/hapi');

const spotify = require('./lib/spotify-api')
const methods = require('./methods');
const routes = require('./routes');

const init = async () => {
  const server = Hapi.server({
    port: process.env.PORT || 3000,
    host: '0.0.0.0',
    routes: {
      cors: true,
      cache: {
        expiresIn: 30 * 1000,
        privacy: 'private'
      }
    }
  });

  methods(server)
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