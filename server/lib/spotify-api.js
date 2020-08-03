const SpotifyWebAPI = require('spotify-web-api-node')

const {
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
} = require('./CONSTS')

const spotifyAPI = new SpotifyWebAPI({
  clientId: CLIENT_ID,
  clientSecret: CLIENT_SECRET,
  redirectUri: REDIRECT_URI
})

async function init() {
  const data = await getClientCredentials()
    .catch(err => {
      console.log('Error getting client credentials', err)
    })
  // set client credentials token for server runtime
  spotifyAPI.setAccessToken(data.body.access_token)
}

async function getClientCredentials() {
  return await spotifyAPI.clientCredentialsGrant()
}

module.exports = {
  spotifyAPI,
  init,
  getClientCredentials
}