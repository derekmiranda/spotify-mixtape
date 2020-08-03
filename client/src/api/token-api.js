const AUTH_API_URL = process.env.AUTH_API_URL
const CLIENT_CREDS_URL = process.env.CLIENT_CREDS_URL

function getClientCredentials() {
  return fetch(CLIENT_CREDS_URL)
    .then(res => res.json())
    .then(({
      access_token
    }) => access_token)
    .catch(err => {
      console.error('Getting access token failed: ', err)
      return err
    })
}

export {
  getClientCredentials
}