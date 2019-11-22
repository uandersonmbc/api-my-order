'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CashierSchema extends Schema {
  up () {
    this.create('cashiers', (table) => {
      table.increments()
      table.decimal('value', 10, 2).notNullable()
      table.timestamp('open')
      table.timestamp('close')
    })
  }

  down () {
    this.drop('cashiers')
  }
}

module.exports = CashierSchema
