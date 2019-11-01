'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class IndividualOrderSchema extends Schema {
  up() {
    this.create('individual_orders', (table) => {
      table.increments()
      table.string('name', 100).notNullable()
      table.integer('order_id').notNullable()
      table.foreign('order_id').references('id').on('orders').onDelete('cascade')
      table.timestamps()
    })
  }

  down() {
    this.drop('individual_orders')
  }
}

module.exports = IndividualOrderSchema
