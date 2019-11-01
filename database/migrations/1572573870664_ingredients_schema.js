'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class IngredientsSchema extends Schema {
  up() {
    this.create('ingredients', (table) => {
      table.increments()
      table.string('name', 100).notNullable()
      table.timestamps()
    })
  }

  down() {
    this.drop('ingredients')
  }
}

module.exports = IngredientsSchema
