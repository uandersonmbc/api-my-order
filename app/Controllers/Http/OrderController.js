'use strict'

const { validate } = use('Validator')

const Order = use('App/Models/Order')

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
        const data = {
            orders: 0,
            product: 0,
            categories: 0,
            ingredients: 0
        }
        try {
            // const users = await User.all();
            return response.json(data);
        } catch (error) {
            return response.status(500).json({ message: 'Não foi possível calcular valores' })
        }
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
        const userOrder = await user.order().where('status', '<', 1).count('id');

        if (userOrder[0].count == 0) {
            const data = { user_id: user.id };
            const order = await Order.create(data);
            await order.load('items')
            return order
        }
        const order = await user.order().where('status', 0).first()
        await order.load('items')
        return response.json(order);
    }

    async changeStatus({ params, request }) {
        const order = await Order.find(params.id);
        const data = request.only(['status'])
        order.merge(data);
        await order.save();
        return order;
    }

    async show({ params }) {
        const order = await Order.find(params.id)
        if (!order) {
            return response.status(404).json({ message: 'Pedido não encontrado' });
        }

        return order.items().fetch();
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

        const data = request.only(['item']);

        const rules = {
            item: 'required'
        }

        const validation = await validate(request.all(), rules);

        if (validation.fails()) {
            return response.status(400).json(validation.messages());
        }

        const order = await user.order().where('status', 0).first()

        if (!order) {
            return response.status(404).json({ message: 'Pedido não encontrado' });
        }

        await order.items().detach([data.item])

        await order.load('items')
        return order;
    }
}

module.exports = OrderController
