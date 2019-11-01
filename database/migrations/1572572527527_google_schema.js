'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class GoogleSchema extends Schema {
  up() {
    this.create('googles', (table) => {
      table.increments()
      table.integer('user_id').notNullable()
      table.foreign('user_id').references('id').on('users').onDelete('cascade')
      table.string('google_id', 254).notNullable()
      table.string('avata', 254).notNullable()
      table.string('avata_original', 254).notNullable()
      table.timestamps()
    })
  }

  down() {
    this.drop('googles')
  }
}

module.exports = GoogleSchema
