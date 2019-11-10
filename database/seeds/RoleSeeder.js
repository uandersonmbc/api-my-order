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

class RoleSeeder {
    async run() {
        const roleAdmin = new Role()
        roleAdmin.name = 'Administrador'
        roleAdmin.slug = 'administrator'
        roleAdmin.description = 'Administrador do estabelecimento'
        await roleAdmin.save()

        const roleManager = new Role()
        roleManager.name = 'Gerente'
        roleManager.slug = 'manager'
        roleManager.description = 'Gerencia os pedidos e o caixa'
        await roleManager.save()

        const roleWaiter = new Role()
        roleWaiter.name = 'Gerente'
        roleWaiter.slug = 'Waiter'
        roleWaiter.description = 'Gerencia os pedidos e o caixa'
        await roleWaiter.save()

        const roleCustomer = new Role()
        roleCustomer.name = 'Gerente'
        roleCustomer.slug = 'customer'
        roleCustomer.description = 'Gerencia os pedidos e o caixa'
        await roleCustomer.save()
    }
}

module.exports = RoleSeeder
