function selectTrackDataList(playlistData) {
  const {
    tracks: {
      items: trackDataList
    }
  } = playlistData

  return trackDataList.map(selectTrackData)
}

function selectTrackData(trackData) {
  const {
    track: {
      artists,
      name,
      duration_ms
    }
  } = trackData

  const artistNames = artists.map(artist => artist.name)
  const runtime = convertMSToRuntimeStr(duration_ms)

  return {
    artistNames,
    name,
    runtime
  }
}

const MINS_TO_MS = 60000
const SECS_TO_MS = 1000

function convertMSToRuntimeStr(timeMS) {
  const mins = Math.floor(timeMS / MINS_TO_MS)
  const secondsRemainder = timeMS % MINS_TO_MS
  let secs = Math.floor(secondsRemainder / SECS_TO_MS)
  if (secs < 10) secs = '0' + secs

  return `${mins}:${secs}`
}

export {
  selectTrackDataList
}