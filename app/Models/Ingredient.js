'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Ingredient extends Model {
    products() {
        return this.belongsToMany('App/Models/Product').pivotTable('product_ingredients')
    }

    tablePivot() {
        return this.hasMany('App/Models/ProductIngredient');
    }
}

module.exports = Ingredient
