'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProductIngredientSchema extends Schema {
  up() {
    this.create('product_ingredients', (table) => {
      table.increments()
      table.integer('ingredient_id').notNullable()
      table.foreign('ingredient_id').references('id').on('ingredients').onDelete('cascade')
      table.integer('product_id').notNullable()
      table.foreign('product_id').references('id').on('products').onDelete('cascade')
    })
  }

  down() {
    this.drop('product_ingredients')
  }
}

module.exports = ProductIngredientSchema
