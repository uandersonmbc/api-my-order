'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ItemSchema extends Schema {
  up() {
    this.create('items', (table) => {
      table.increments()
      table.integer('order_id').notNullable()
      table.foreign('order_id').references('id').on('orders').onDelete('cascade')
      table.integer('product_id').notNullable()
      table.foreign('product_id').references('id').on('products').onDelete('cascade')
    })
  }

  down() {
    this.drop('items')
  }
}

module.exports = ItemSchema
