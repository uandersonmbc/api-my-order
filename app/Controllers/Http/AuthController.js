'use strict'

const { validate } = use('Validator')

const User = use("App/Models/User");

class AuthController {

    async user({ auth, response }) {
        try {
            const user = await auth.getUser();
            const role = await user.getRoles();
            return response.json({ user, role });

        } catch (ex) {
            response.send("Usuário não autenticado :/" + ex);
        }
    }

    async login({ request, auth, response }) {
        try {
            // validate the user credentials and generate a JWT token
            const token = await auth.attempt(
                request.input('email'),
                request.input('password')
            );

            return response.json(token);
        } catch (error) {
            return response.status(401).json({ message: 'Email ou senha incorretos :/' });
        }
    }

    async register({ request, auth, response }) {
        const data = request.only(['username', 'email', 'password', 'name']);

        const rules = {
            name: 'required',
            email: 'required|unique:users,email',
            password: 'required|min:8',
            username: 'required|unique:users,username'
        }

        const validation = await validate(request.all(), rules);

        if (validation.fails()) {
            return response.status(400).json(validation.messages());
        }

        try {
            const user = await User.create(data);
            await user.roles().attach([4]);
            const token = await auth.generate(user);
            return response.json(token);

        } catch (error) {
            return response.status(400).json({ message: 'Nada', error });
        }

    }
}

module.exports = AuthController
