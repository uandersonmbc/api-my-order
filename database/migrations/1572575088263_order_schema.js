'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class OrderSchema extends Schema {
  up() {
    this.create('orders', (table) => {
      table.increments()
      table.integer('user_id').notNullable()
      table.foreign('user_id').references('id').on('users').onDelete('cascade')
      table.integer('status').defaultTo(0)
      table.timestamps()
    })
  }

  down() {
    this.drop('orders')
  }
}

module.exports = OrderSchema
