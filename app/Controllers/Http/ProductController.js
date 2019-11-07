'use strict'

const { validate } = use('Validator')

const Product = use('App/Models/Product')

const DataProcessingService = use('App/Services/DataProcessingService');

class ProductController {

    async index({request}){
        let page = request.input('page');
        if (!page) {
            page = 1;
        }

        return await Product.query().orderBy('id', 'desc').paginate(page, 2);
    }

    async store({request, response}){
        const data = request.only(['name', 'price', 'category_id']);

        const rules = {
            name: 'required',
            price: 'required',
            category_id: 'required'
        }

        const validation = await validate(request.all(), rules);

        if (validation.fails()) {
            return DataProcessingService.assemblyData(response, 'PR02', validation.messages());
        }

        const product = await Product.create(data);

        return DataProcessingService.assemblyData(response, 'PR01', product);
    }

    async show({params}){
        const product = await Product.find(params.id)
        if (!product) {
            return { message: 'Este produto não existe :(' }
        }
        return product;
    }

    async update({params, request}){
        const data = request.only(['name', 'price', 'category_id']);
        const product = await Product.find(params.id)

        const rules = {
            name: 'required|unique:categories,name'
        }

        const validation = await validate(request.all(), rules);

        if (validation.fails()) {
            return { message: validation.messages() };
        }

        if (!product) {
            return DataProcessingService.assemblyData(response, 'PR04', product);
        }

        product.merge(data)

        await product.save()


        return product;
    }

    async destroy({}){

    }
}

module.exports = ProductController
