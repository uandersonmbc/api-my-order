'use strict'

class OrderController {
  constructor({ socket, request }) {
    this.socket = socket
    this.request = request
    console.log('user joined with %s socket id', socket.id)
  }

  onMessage(message) {
    console.log('got message', message)
  }

  onClose() {
    console.log('Closing subscription for room topic', this.socket.topic)
  }

}

module.exports = OrderController
