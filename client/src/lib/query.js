import qs from 'qs'

const _query = qs.parse(window.location.search, {
  ignoreQueryPrefix: true
})

export function getPlaylistId() {
  return _query.playlist
}