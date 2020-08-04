import {
  el
} from "redom"

import {
  Component
} from "./Component"

function renderWidgetIframe({
  type,
  id,
  width,
  height
}) {
  const iframeEl = el('iframe', {
    src: `https://open.spotify.com/embed/${type}/${id}`,
    width,
    height,
    frameborder: 0,
    allowtransparency: true,
    allow: 'encrypted-media'
  })
  return iframeEl
}

class PlayWidget extends Component {
  constructor({
    contextId,
    contextType,
  }) {
    super(...arguments)

    this.contextId = contextId
    this.contextType = contextType || 'playlist'
  }

  render() {
    if (!this.mounted) {
      const iframeEl = this.iframeEl = renderWidgetIframe({
        type: 'playlist',
        id: this.contextId,
      })
      this.topEl = el('div.widget', [iframeEl])

      this.mount()
    }
  }
}

export {
  PlayWidget
}