'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CashierSchema extends Schema {
  up() {
    this.create('cashiers', (table) => {
      table.increments()
      table.decimal('value', 10, 2).defaultTo(0)
      table.boolean('status').defaultTo(0)
      table.timestamp('close')
      table.timestamps()
    })
  }

  down() {
    this.drop('cashiers')
  }
}

module.exports = CashierSchema
