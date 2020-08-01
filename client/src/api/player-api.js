const PLAYER_API_URL = 'https://api.spotify.com/v1/me/player'

function play(player, songURI) {
  const {
    _options: {
      getOAuthToken,
      id
    }
  } = player

  return new Promise((resolve, reject) => {
    getOAuthToken(accessToken => {
      const playPutReq = fetch(`${PLAYER_API_URL}/play?device_id=${id}`, {
        method: 'PUT',
        body: songURI && JSON.stringify({
          uris: [songURI]
        }),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
      });
      resolve(playPutReq)
    })
  })
}

function pause(player) {
  const {
    _options: {
      getOAuthToken,
      id
    }
  } = player

  return new Promise((resolve, reject) => {
    getOAuthToken(accessToken => {
      const pausePutReq = fetch(`${PLAYER_API_URL}/pause?device_id=${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
      });
      resolve(pausePutReq)
    })
  })
}

export {
  play,
  pause
}