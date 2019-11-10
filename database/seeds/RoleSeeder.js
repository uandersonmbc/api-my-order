'use strict'

/*
|--------------------------------------------------------------------------
| RoleSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const Role = use("App/Models/Role");

class RoleSeeder {
    async run() {

        var obj = {
            name: 'Administrador',
            slug: 'administrator',
            description: 'Administrador do estabelecimento'
        }
        await Role.create(obj);

        obj = {
            name: 'Gerente',
            slug: 'manager',
            description: 'Gerencia os pedidos e o caixa'
        }

        await Role.create(obj);

        obj = {
            name: 'Garçom',
            slug: 'waiter',
            description: 'Faz a entrega dos pedidos'
        }

        await Role.create(obj);

        obj = {
            name: 'Cliente',
            slug: 'customer',
            description: 'Pode usar a aplicação'
        }

        await Role.create(obj);

    }
}

module.exports = RoleSeeder
