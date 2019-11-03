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


    async update({params, request}){
        const data = request.only(['name', 'category_id']);
        const category  = await Category.find(params.id)

        category.merge(data)
         
        await category.save()

        return category;
    }


    async addSubCategory({request}){
        const data = request.only(['name', 'category_id']);

        const category = await Category.create(data);

        return category;
        
    }

    async delete({params}){
        
        const category  = await Category.find(params.id)

        category.delete()

        return  {message: 'Successfully deleted'};
    }
}

module.exports = CategoryController
