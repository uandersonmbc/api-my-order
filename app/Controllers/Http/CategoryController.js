'use strict'

const { validate } = use('Validator')

const Category = use('App/Models/Category')

const DataProcessingService = use('App/Services/DataProcessingService');

class CategoryController {

    async index({ request }) {
        let page = request.input('page');
        if (!page) {
            page = 1;
        }

        return await Category.query().orderBy('id', 'desc').paginate(page);
    }

    async store({ request, response }) {
        const data = request.only(['name']);

        const rules = {
            name: 'required|unique:categories,name'
        }

        const validation = await validate(request.all(), rules);

        if (validation.fails()) {
            return DataProcessingService.assemblyData(response, 'CA02', validation.messages());
        }

        const category = await Category.create(data);

        return DataProcessingService.assemblyData(response, 'CA01', category);
    }


    async show({ params }) {
        const category = await Category.find(params.id)
        if (!category) {
            return { message: 'Essa categoria não existe :(' }
        }
        return category;
    }


    async update({ params, request }) {
        const data = request.only(['name', 'category_id']);
        const category = await Category.find(params.id)

        const rules = {
            name: 'required|unique:categories,name'
        }

        const validation = await validate(request.all(), rules);

        if (validation.fails()) {
            return { message: validation.messages() };
        }

        if (!category) {
            return { message: 'Essa categoria não existe :(' }
        }

        category.merge(data)

        await category.save()


        return category;
    }


    async addSubCategory({ request }) {
        const data = request.only(['name', 'category_id']);

        const rules = {
            name: 'required|unique:categories,name',
            category_id: 'required'
        }

        const validation = await validate(request.all(), rules);

        if (validation.fails()) {
            return { message: validation.messages() };
        }

        const categoryExists = await Category.find(data.category_id)

        if (!categoryExists) {
            return { message: 'A categoria que esta subcategoria procura não existe :(' }
        }

        const category = await Category.create(data);

        return category;

    }

    async destroy({ params }) {

        const category = await Category.find(params.id)

        if (!category) {
            return { message: 'Essa categoria não existe :(' }
        }

        category.delete()

        return { message: 'Deletado com sucesso' };
    }
}

module.exports = CategoryController
