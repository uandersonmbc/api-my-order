'use strict'

const Category = use('App/Models/Category')

class CategoryController {

    async index({request}){
        return await Category.all()
    }

    async store({request}){
        const data = request.only(['name']);

        const category = await Category.create(data);

        return category;
    }

    
    async show({request}){
        return {};
    }


    async update({request}){
        return {};
    }


    
    async delete({request}){
        return {};
    }
}

module.exports = CategoryController
