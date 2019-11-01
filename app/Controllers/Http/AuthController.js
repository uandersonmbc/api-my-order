'use strict'

class AuthController {
    index({ request, response }) {
        response.json({ msg: 'Hello Uanderson' })
    }
}

module.exports = AuthController
