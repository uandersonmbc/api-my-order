'use strict'

const { validate } = use('Validator')

const { broadcast } = require('../../utils/socket.utils');

const Order = use('App/Models/Order')
const Product = use('App/Models/Product')
const Category = use('App/Models/Category')
const Ingredient = use('App/Models/Ingredient')

const User = use('App/Models/User')

class OrderController {

    async index({ request }) {
        let page = request.input('page');
        if (!page) {
            page = 1;
        }

        return await Order.query().orderBy('id', 'desc').paginate(page);
    }

    async info({ response }) {
        try {
            const total_ord = await Order.query().where('status', 0).count();
            const total_pro = await Product.query().count();
            const total_cat = await Category.query().count();
            const total_ing = await Ingredient.query().count();

            const data = {
                orders: parseInt(total_ord[0]['count']),
                product: parseInt(total_pro[0]['count']),
                categories: parseInt(total_cat[0]['count']),
                ingredients: parseInt(total_ing[0]['count'])
            }

            return response.json(data);
        } catch (error) {
            return response.status(500).json({ message: 'Não foi possível calcular valores' })
        }
    }

    async myorder({ auth, response }) {
        const user = await auth.getUser();
        const userOrder = await user.order().where('status', 0).count('id');

        if (userOrder[0].count == 0) {
            return response.json({})
        }
        const order = await user.order().where('status', 0).first()
        await order.load('items')
        return response.json(order);
    }

    async users({ response }) {
        try {
            const users = await User.all();
            return response.json(users);
        } catch (error) {
            return response.status(404).json({ message: 'nada' })
        }
    }

    async store({ auth, response }) {
        const user = await auth.getUser();
        const userOrder = await user.order().where('status', 0).count('id');

        if (userOrder[0].count == 0) {
            const data = { user_id: user.id };
            const order = await Order.create(data);
            await order.load('items')
            broadcast(0, 'orde:newOrde', order);
            return order
        }
        const order = await user.order().where('status', 0).first()
        await order.load('items')
        broadcast(0, 'orde:newOrde', order);

        return response.json(order);
    }

    async changeStatus({ auth, response }) {

        const user = await auth.getUser();
        const userOrder = await user.order().where('status', 0).count('id');

        if (userOrder[0].count == 0) {
            broadcast(0, 'orde:newOrde', {});
            return response.json({})
        }
        const order = await user.order().where('status', 0).first()

        order.merge({ status: 1 });
        await order.save();
        broadcast(0, 'orde:newOrde', order);
        return response.json(order);
    }

    async show({ params, response }) {
        const order = await Order.find(params.id)
        if (!order) {
            return response.status(404).json({ message: 'Pedido não encontrado' });
        }

        const items = await order.items().fetch();
        return response.json(items);
    }

    async addItem({ auth, request, response }) {
        const user = await auth.getUser();

        const data = request.only(['items']);

        const rules = {
            items: 'required',
        }

        const validation = await validate(request.all(), rules);

        if (validation.fails()) {
            return response.status(400).json(validation.messages());
        }

        const order = await user.order().where('status', 0).first()

        if (!order) {
            return response.status(404).json({ message: 'Pedido não encontrado' });
        }

        // return data

        order.items().attach(data.items);

        await order.load('items')
        return order;
    }

    async deleteItem({ auth, request, response }) {
        const user = await auth.getUser();

        const data = request.only(['items']);

        const rules = {
            items: 'required'
        }

        const validation = await validate(request.all(), rules);

        if (validation.fails()) {
            return response.status(400).json(validation.messages());
        }

        const order = await user.order().where('status', 0).first()

        if (!order) {
            return response.status(404).json({ message: 'Pedido não encontrado' });
        }

        await order.items().detach(data.items)

        await order.load('items')
        return order;
    }
}

module.exports = OrderController
