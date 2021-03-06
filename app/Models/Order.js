'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Order extends Model {
    // items() {
    //     return this.hasMany('App/Models/Item')
    // }

    items() {
        return this.belongsToMany('App/Models/Product').pivotTable('items')
    }
}

module.exports = Order
