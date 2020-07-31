class PubSub {
  constructor() {
    this.events = {}
  }

  publish(eventName, ...args) {
    if (this.events[eventName]) {
      this.events[eventName].forEach(subscriber => {
        subscriber(...args)
      })
    }
  }

  subscribe(eventName, subscriber) {
    if (!this.events[eventName]) {
      this.events[eventName] = [subscriber]
      return
    }
    this.events[eventName].push(subscriber)
  }
}

export {
  PubSub
}