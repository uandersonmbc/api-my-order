'use strict'

/*
|--------------------------------------------------------------------------
| UserSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

const User = use('App/Models/User')

class UserSeeder {
    async run() {

        for (let i = 1; i <= 4; i++) {
            var data = {
                name: 'Uanderson Nunes',
                username: 'uandersonmbc' + i,
                email: 'uandersonmbc' + i + '@gmail.com',
                password: '123456'
            }
            var user = await User.create(data);
            await user.roles().attach([i]);

            var data = {
                name: 'Javel Queiroz',
                username: 'javel' + i,
                email: 'javel' + i + '@gmail.com',
                password: '123456'
            }
            var user = await User.create(data);
            await user.roles().attach([i]);
        }

    }
}

module.exports = UserSeeder
