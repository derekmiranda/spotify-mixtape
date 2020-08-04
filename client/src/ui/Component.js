import {
  mount,
  el,
  unmount
} from 'redom'

class Component {
  constructor({
    root
  }) {
    // elem to mount component to
    this.root = root
    // top elem of component
    this.topEl = null
    this.rendered = false
    this.mounted = false
  }

  mount() {
    this.rendered = true
    if (this.root) {
      mount(this.root, this.topEl)
      this.mounted = true
    }
  }

  unmount() {
    unmount(this.root, this.topEl)
    this.mounted = false
  }
}

export {
  Component
}