'use strict'

const User = use("App/Models/User");

class AuthController {
    
    async login ({ request, auth, response }) {
        try {
            // validate the user credentials and generate a JWT token
            const token = await auth.attempt(
                request.input('email'),
                request.input('password')
            )
    
            return response.json({
                status: 'success',
                data: token
            })
        } catch (error) {
            response.status(400).json({
                status: 'error',
                message: 'Invalid email/password'
            })
        }
    }

    async create({request}){
        const data = request.only(['username', 'email', 'password', 'name']);

        const user = await User.create(data);

        return user;

    }
}

module.exports = AuthController
