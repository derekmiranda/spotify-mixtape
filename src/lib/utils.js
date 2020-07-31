// data
function selectPlaylistData(playlistData) {
  const {
    name,
    tracks: {
      items: trackDataList
    }
  } = playlistData

  const tracks = selectTrackDataList(trackDataList)

  return {
    name,
    tracks
  }
}

function selectTrackDataList(trackDataList) {
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

// dom
function clearChildren(el) {
  Array.prototype.forEach.call(el.children, child => {
    child.remove()
  })
}

function appendChildren(parent, children) {
  if (window.DocumentFragment) {
    const frag = new DocumentFragment
    children.forEach(child => {
      frag.appendChild(child)
    })
    parent.appendChild(frag)
  } else {
    children.forEach(child => {
      parent.appendChild(child)
    })
  }
}

export {
  selectPlaylistData,
  clearChildren,
  appendChildren
}