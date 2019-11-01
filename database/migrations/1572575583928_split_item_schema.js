'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SplitItemSchema extends Schema {
  up() {
    this.create('split_items', (table) => {
      table.increments()
      table.integer('individual_order_id').notNullable()
      table.foreign('individual_order_id').references('id').on('individual_orders').onDelete('cascade')
      table.integer('item_id').notNullable()
      table.foreign('item_id').references('id').on('items').onDelete('cascade')
      table.timestamps()
    })
  }

  down() {
    this.drop('split_items')
  }
}

module.exports = SplitItemSchema
