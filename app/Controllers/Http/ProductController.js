'use strict'

const { validate } = use('Validator')

const Product = use('App/Models/Product')
const Category = use('App/Models/Category')

class ProductController {

    async index({ request }) {
        let page = request.input('page');
        if (!page) {
            page = 1;
        }

        return await Product.query().orderBy('id', 'desc').paginate(page);
    }

    async store({ request, response }) {
        const data = request.only(['name', 'price', 'category_id']);

        const rules = {
            name: 'required',
            price: 'required',
            category_id: 'required'
        }

        const validation = await validate(request.all(), rules);

        if (validation.fails()) {
            return response.status(400).json(validation.messages());
        }

        const category = await Category.find(data.category_id);

        if (!category) {
            return response.status(404).json({ message: 'Categoria não encontrada' })
        }

        try {
            const req = request.all();

            const product = await Product.create(data);

            product.ingredients().sync((req.ingredients) ? req.ingredients : [])
            return response.json(product);
        } catch (error) {
            return response.json(error)
        }
    }

    async show({ params, response }) {
        const product = await Product.find(params.id)
        if (!product) {
            return response.status(404).json({ message: 'Este produto não existe :(' })
        }
        await product.load('ingredients')
        return response.json(product);
    }

    async update({ params, request, response }) {
        const data = request.only(['name', 'price', 'category_id']);
        const product = await Product.find(params.id)

        const rules = {
            name: 'required|unique:categories,name'
        }

        const validation = await validate(request.all(), rules);

        if (validation.fails()) {
            return response.status(400).json({ message: validation.messages() });
        }

        if (!product) {
            return response.status(404).json({ message: 'Produto não encontrado' });
        }

        try {
            const req = request.all();
            product.merge(data)
            await product.save()
            await product.ingredients().sync((req.ingredients) ? req.ingredients : []);
            await product.load('ingredients');
            return response.json(product);
        } catch (error) {
            return response.status(400).json({ message: 'Aconteceu um erro ao atualizar: ', error });
        }

    }

    async destroy({ params, response }) {

        const product = await Product.find(params.id)

        if (!product) {
            return response.status(404).json({ message: 'Produto não encontrado' });
        }

        product.delete()

        return response.json(product)
    }
}

module.exports = ProductController
