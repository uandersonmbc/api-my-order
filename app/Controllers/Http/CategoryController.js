'use strict'

const { validate } = use('Validator')

const Category = use('App/Models/Category')

class CategoryController {

    async index({ request }) {
        let page = request.input('page');
        if (!page) {
            page = 1;
        }

        return await Category.query().whereNull('category_id').orderBy('id', 'desc').paginate(page);
    }

    async store({ request, response }) {
        const data = request.only(['name']);

        const rules = {
            name: 'required|unique:categories,name'
        }

        const validation = await validate(request.all(), rules);

        if (validation.fails()) {
            return response.status(400).json(validation.messages());
        }

        try {
            const category = await Category.create(data);
            return response.status(201).json(category);
        } catch (error) {
            return response.status(400).json({ message: 'Erro ao cadastrar uma nova categoria' });
        }
    }


    async show({ params, response }) {
        const category = await Category.find(params.id)
        if (!category) {
            return response.status(400).json({ message: 'Essa categoria não existe :(' });
        }
        return category;
    }


    async update({ params, request, response }) {
        const data = request.only(['name', 'category_id']);
        const category = await Category.find(params.id)

        const rules = {
            name: 'required|unique:categories,name'
        }

        const validation = await validate(request.all(), rules);

        if (validation.fails()) {
            return response.status(400).json({ message: validation.messages() });
        }

        if (!category) {
            return response.status(404).json({ message: 'Essa categoria não existe :(' });
        }

        try {
            category.merge(data)
            await category.save()
            return category;
        } catch (error) {
            return response.status(400).json({ message: 'Não foi possível atualizar os dados' });
        }

    }


    async addSubCategory({ request, response }) {
        const data = request.only(['name', 'category_id']);

        const rules = {
            name: 'required|unique:categories,name',
            category_id: 'required'
        }

        const validation = await validate(request.all(), rules);

        if (validation.fails()) {
            return response.status(400).json({ message: validation.messages() });
        }

        const categoryExists = await Category.find(data.category_id)

        if (!categoryExists) {
            return response.status(400).json({ message: 'A categoria que esta subcategoria procura não existe :(' })
        }

        try {
            const category = await Category.create(data);
            return category;
        } catch (error) {
            return response.status(400).json({ message: 'Não foi possível adicionar uma subcategoria.' });
        }


    }

    async destroy({ params, response }) {

        const category = await Category.find(params.id)

        if (!category) {
            return response.status(400).json({ message: 'Essa categoria não existe :(' });
        }

        try {
            await category.delete();
            return response.json({ message: 'Deletado com sucesso' });
        } catch (error) {
            return response.status().json({ message: 'Acontecue um erro na hora de deleta a categoria' });
        }

    }
}

module.exports = CategoryController;
