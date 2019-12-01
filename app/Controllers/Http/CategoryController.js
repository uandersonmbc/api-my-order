'use strict'

const { validate } = use('Validator')

const Category = use('App/Models/Category')
const Product = use('App/Models/Product')

class CategoryController {

    async index({ request }) {
        let page = request.input('page');
        if (!page) {
            page = 1;
        }

        // return await Category.query().whereNull('category_id').orderBy('id', 'desc').paginate(page);
        return await Category.all();
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
            return response.status(404).json({ message: 'Essa categoria não existe :(' });
        }

        try {
            const teste = await Product.query().where('category_id', params.id).update({ category_id: null })
            const cat = await category.delete();
            return response.json({
                message: 'Deletado com sucesso',
                relationships: teste,
                deleted: cat
            });
        } catch (error) {
            return response.status(500).json({ message: 'Acontecue um erro na hora de deleta a categoria', error });
        }

    }
}

module.exports = CategoryController;
