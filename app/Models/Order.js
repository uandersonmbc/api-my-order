'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Order extends Model {
    items(){
        return this.hasMany('App/Models/Item')
    }
    product () {
        return this.belongsToMany('App/Models/Product').pivotTable('Items')
    }
}

module.exports = Order
