'use strict'

const { validate } = use('Validator')

const Ingredient = use('App/Models/Ingredient')

const DataProcessingService = use('App/Services/DataProcessingService');

class IngredientController {
    async index({request}){
        let page = request.input('page');
        if (!page) {
            page = 1;
        }

        return await Ingredient.query().orderBy('id', 'desc').paginate(page);
    }

    async store({request, response}){
        const data = request.only(['name']);

        const rules = {
            name: 'required'
        }

        const validation = await validate(request.all(), rules);

        if (validation.fails()) {
            return DataProcessingService.assemblyData(response, 'IN02', validation.messages());
        }

        const ingredient = await Ingredient.create(data);

        return DataProcessingService.assemblyData(response, 'IN01', ingredient);
    }

    async show({params, response}){
        const ingredient = await Ingredient.find(params.id)
        if (!ingredient) {
            return DataProcessingService.assemblyData(response, 'IN05', ingredient);
        }
        return ingredient;
    }

    async update({params, request}){
        const data = request.only(['name']);
        const ingredient = await Ingredient.find(params.id)

        const rules = {
            name: 'required|unique:categories,name'
        }

        const validation = await validate(request.all(), rules);

        if (validation.fails()) {
            return { message: validation.messages() };
        }

        if (!ingredient) {
            return DataProcessingService.assemblyData(response, 'IN04', ingredient);
        }

        ingredient.merge(data)

        await ingredient.save()

        return ingredient;
    }

    async destroy({ params, response }) {

        const ingredient = await Ingredient.find(params.id)

        if (!ingredient) {
            return DataProcessingService.assemblyData(response, 'IN05', ingredient);
        }

        ingredient.delete()

        return DataProcessingService.assemblyData(response, 'IN06', ingredient);
    }
}

module.exports = IngredientController
