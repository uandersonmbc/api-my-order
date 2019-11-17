'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Product extends Model {
    ingredients() {
        return this.belongsToMany('App/Models/Ingredient').pivotTable('product_ingredients')
    }
}

module.exports = Product
