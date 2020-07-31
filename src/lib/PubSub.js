class PubSub {
  constructor() {
    this.events = {}
    this.eventNextIds = {}
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
    } else {
      const subscriberId = eventNextIds[eventName]
      this.events[eventName][subscriberId] = subscriber
    }

    // update next subscriber id
    if (!this.eventNextIds[eventName]) {
      this.eventNextIds[eventName] = 1
    } else {
      this.eventNextIds[eventName] += 1
    }

    return
  }

  unsubscribe(eventName, subscriberID) {
    if (subscriberID === null || subscriberID === undefined) {
      throw new Error('Subscriber ID required to unsubscribe')
    }

    delete this.events[eventName][subscriberID]
  }
}

export {
  PubSub
}