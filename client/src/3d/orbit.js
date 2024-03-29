import {
  Vector2,
  Vector3,
  Euler
} from 'three'

const STATE = {
  NONE: -1,
  ROTATE: 0,
  DOLLY: 1,
  PAN: 2,
  TOUCH_ROTATE: 3,
  TOUCH_PAN: 4,
  TOUCH_DOLLY_PAN: 5,
  TOUCH_DOLLY_ROTATE: 6
};

export class ObjOrbitControls {
  constructor(obj, domEl) {
    this.obj = obj
    this.domEl = domEl
    this.state = STATE.NONE
    this.target = new Vector3

    // default settings
    this.rotateSpeed = 1.0
    this.maxAzimuthAngle = Infinity
    this.minAzimuthAngle = -Infinity
    this.maxPolarAngle = Math.PI
    this.minPolarAngle = -Math.PI

    // bound event listeners
    this.mousemoveBind = this.mousemove.bind(this)
    this.mousedownBind = this.mousedown.bind(this)
    this.mouseupBind = this.mouseup.bind(this)

    // internal vars
    this._euler = new Euler()
    this._rotateStart = new Vector2()
    this._rotateEnd = new Vector2()
    this._rotateDelta = new Vector2()

    this.addEventListeners()
  }

  mousedown(event) {
    event.preventDefault()

    this.domEl.focus ? this.domEl.focus() : window.focus()

    this.state = STATE.ROTATE
    this._rotateStart.set(event.clientX, event.clientY).multiplyScalar(this.rotateSpeed)
  }

  mouseup(event) {
    event.preventDefault()

    this.state = STATE.NONE
  }

  mousemove(event) {
    event.preventDefault()

    switch (this.state) {
      case STATE.ROTATE:
        this.handleMouseMoveRotate(event)
        return
      case STATE.NONE:
      default:
        return
    }
  }

  handleMouseMoveRotate(event) {
    this._rotateEnd.set(event.clientX, event.clientY)
    this._rotateDelta.subVectors(this._rotateEnd, this._rotateStart).multiplyScalar(this.rotateSpeed)

    const xAngle = 2 * Math.PI * this._rotateDelta.y / this.domEl.clientHeight
    const yAngle = 2 * Math.PI * this._rotateDelta.x / this.domEl.clientHeight

    // update Euler angle
    this._euler.x += xAngle
    this._euler.y += yAngle
    this.obj.setRotationFromEuler(this._euler)

    // update vars for next update
    this._rotateStart.copy(this._rotateEnd)
  }

  // TODO: touch listeners
  addEventListeners() {
    this.domEl.addEventListener('mousemove', this.mousemoveBind, false)
    this.domEl.addEventListener('mousedown', this.mousedownBind, false)
    this.domEl.addEventListener('mouseup', this.mouseupBind, false)
  }

  // TODO:
  removeEventListeners() {

  }
}