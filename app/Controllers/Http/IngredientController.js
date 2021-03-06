'use strict'

const { validate } = use('Validator')

const Ingredient = use('App/Models/Ingredient')
const ProductIngredient = use('App/Models/ProductIngredient')

class IngredientController {
    async index({ request }) {
        let page = request.input('page');
        if (!page) {
            page = 1;
        }

        // return await Ingredient.query().orderBy('id', 'desc').paginate(page);
        return await Ingredient.all();
    }

    async store({ request, response }) {
        const data = request.only(['name']);

        const rules = {
            name: 'required'
        }

        const validation = await validate(request.all(), rules);

        if (validation.fails()) {
            return response.status(400).json(validation.messages());
        }

        try {

            const ingredient = await Ingredient.create(data);

            return ingredient;

        } catch (error) {
            return response.status(404).json({ message: 'Erro ao cadastrar ingrediente' });
        }
    }

    async show({ params, response }) {
        const ingredient = await Ingredient.find(params.id)
        if (!ingredient) {
            return response.status(404).json({ message: 'Ingrediente não encontrado' });
        }
        return ingredient;
    }

    async update({ params, request, response }) {
        const data = request.only(['name']);
        const ingredient = await Ingredient.find(params.id)

        const rules = {
            name: 'required|unique:categories,name'
        }

        const validation = await validate(request.all(), rules);

        if (validation.fails()) {
            return response.status(404).json(validation.messages());
        }

        if (!ingredient) {
            return response.status(404).json({ message: 'Ingrediente não encontrado' });
        }

        try {
            ingredient.merge(data)

            await ingredient.save()

            return ingredient;
        } catch (error) {
            return response.status(404).json({ message: 'Erro ao atulalizar ingrediente' });
        }

    }

    async destroy({ params, response }) {

        const ingredient = await Ingredient.find(params.id)

        if (!ingredient) {
            return response.status(404).json({ message: 'Ingrediente não encontrado' });
        }

        try {
            const teste = await ingredient.tablePivot().delete()
            const ing = await ingredient.delete()
            return response.json({
                message: 'Deletado',
                relationships: teste,
                deleted: ing
            });
        } catch (error) {
            return response.status(500).json({
                message: 'Error',
                error
            });
        }


    }
}

module.exports = IngredientController
