import {
  el,
} from 'redom'

import {
  Component
} from './Component'

// TODO: use more stylish color picker
class ColorPickerUI extends Component {
  constructor({
    changeColor,
    defaultColor
  }) {
    super(...arguments)
    this.changeColor = changeColor
    this.defaultColor = defaultColor || '#ffffff'
  }

  render() {
    if (!this.mounted) {
      this.topEl = el('input.color-picker', {
        type: 'color',
        value: this.defaultColor
      })

      this.topEl.addEventListener('input', event => {
        const val = event.target.value
        if (this.changeColor) {
          this.changeColor.call(null, val)
        }
      })

      this.mount()
    }
  }
}

export {
  ColorPickerUI
}