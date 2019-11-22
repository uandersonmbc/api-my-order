'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProductSchema extends Schema {
  up() {
    this.create('products', (table) => {
      table.increments()
      table.integer('category_id').notNullable()
      table.foreign('category_id').references('id').on('categories').onDelete('cascade')
      table.string('name', 100).notNullable()
      table.decimal('price', 10, 2).notNullable()
      table.timestamps()
    })
  }

  down() {
    this.drop('products')
  }
}

module.exports = ProductSchema
