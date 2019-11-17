'use strict'

const Order = use('App/Models/Order')

const DataProcessingService = use('App/Services/DataProcessingService');

class OrderController {
    async user({auth, response}){
        try {
            return await auth.getUser();
            
        } catch (ex) {
            response.send("Usuário não autenticado :/" + ex);
        }
    }

    async index({request}){
        let page = request.input('page');
        if (!page) {
            page = 1;
        }

        return await Order.query().orderBy('id', 'desc').paginate(page);
    }

    async store({auth, response}){
        const user = await auth.getUser();
        const userOrder = user.order().fetch();
        if(userOrder){
            return response.status(401).json({message: 'Você já tem um pedido.'});
        }
        const data = {user_id: user.id};
        const order = await Order.create(data);

        return DataProcessingService.assemblyData(response, 'OR01', order);
    }

    async changeStatus({params, request}){
        const order = await Order.find(params.id);
        const data = request.only(['status'])
        order.merge(data);
        await order.save();
        return order;
    }

    async show({params}){
        const order = await Order.find(params.id)
        if (!order) {
            return DataProcessingService.assemblyData(response, 'OR05', order);
        }
        
        return order.items().fetch();
    }
}

module.exports = OrderController
