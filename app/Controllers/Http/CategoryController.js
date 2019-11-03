'use strict'

const { validate } = use('Validator')

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

    
    async show({params, request}){
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
        
        const rules = {
            name: 'required|unique:categories,name',
            category_id: 'required'
        }
        
        const validation = await validate(request.all(), rules);
        
        if(validation.fails()){
            return {message: validation.messages()};
        }
        
        const categoryExists  = await Category.find(data.category_id)

        if(!categoryExists){
            return {message: 'A categoria que esta subcategoria procura não existe :('}
        }

        const category = await Category.create(data);
        
        return category;
        
    }

    async destroy({params}){
        
        const category  = await Category.find(params.id)

        category.delete()

        return  {message: 'Deletado com sucesso'};
    }
}

module.exports = CategoryController
