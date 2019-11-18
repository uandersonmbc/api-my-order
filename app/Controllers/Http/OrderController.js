'use strict'

const Order = use('App/Models/Order')

const DataProcessingService = use('App/Services/DataProcessingService');

class OrderController {

    async index({ request }) {
        let page = request.input('page');
        if (!page) {
            page = 1;
        }

        return await Order.query().orderBy('id', 'desc').paginate(page);
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
            return DataProcessingService.assemblyData(response, 'OR05', order);
        }

        return order.items().fetch();
    }

    async item() {
        return;
    }
}

module.exports = OrderController
