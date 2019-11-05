'use strict'

const User = use("App/Models/User");
const DataProcessingService = use('App/Services/DataProcessingService');

class AuthController {

    async login({ request, auth, response }) {
        try {
            // validate the user credentials and generate a JWT token
            const token = await auth.attempt(
                request.input('email'),
                request.input('password')
            )

            return DataProcessingService.assemblyData(response, 'LO01', token);
        } catch (error) {
            return DataProcessingService.assemblyData(response, 'LO02');
        }
    }

    async register({ request, response }) {
        const data = request.only(['username', 'email', 'password', 'name']);

        const user = await User.create(data);

        return DataProcessingService.assemblyData(response, 'US01', user);

    }
}

module.exports = AuthController
