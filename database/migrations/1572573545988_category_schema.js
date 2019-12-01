'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CategorySchema extends Schema {
  up() {
    this.create('categories', (table) => {
      table.increments()
      table.integer('category_id')
      table.foreign('category_id').references('id').on('categories')
      table.string('name', 100).notNullable()
      table.timestamps()
    })
  }

  down() {
    this.drop('categories')
  }
}

module.exports = CategorySchema
