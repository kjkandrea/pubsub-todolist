export const pubsub = {
  events : {},
  subscribe: function(eventName, fn) {
    this.events[eventName] = this.events[eventName] || []
    this.events[eventName].push(fn)
  },
  publish: function(eventName, data) {
    if (this.events[eventName]) this.events[eventName].forEach(f => {
      f(data)
    })
  }
}

