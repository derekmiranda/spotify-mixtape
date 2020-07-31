const TOKEN_API_URL = 'https://accounts.spotify.com/api/token'

function getClientCredentials(clientId, clientSecret) {
  return fetch(TOKEN_API_URL, {
      method: 'POST',
      body: 'grant_type=client_credentials',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + btoa(`${clientId}:${clientSecret}`)
      }
    })
    .then(res => res.json())
    .then(data => {
      return data.access_token
    })
    .catch(err => {
      console.error('Getting client credentials failed: ', err)
      return err
    })
}

export {
  getClientCredentials
}