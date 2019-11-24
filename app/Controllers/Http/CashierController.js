'use strict'

const Cashier = use('App/Models/Cashier')

class CashierController {

    async getCashier({ response }) {
        try {
            const cashier = await Cashier.query().where('status', '=', 0).first();
            return cashier;
        } catch (error) {
            return response.status(500).json({ message: 'Erro ao pegar informações do caixa.' })
        }
    }

    async openCashier({ response }) {
        try {
            const cashier = await Cashier.query().where('status', '=', 0).first();

            if (!cashier) {
                const cashierC = Cashier.create();
                return cashierC;
            }

            return cashier;
        } catch (error) {
            return response.status(500).json({ message: 'Erro ao abrir o caixa.', error })
        }
    }

    async closedCashier({ response }) {
        try {
            const data = [1, 2, 3, 4];
            var soma = 0;
            data.forEach(element => {
                console.log(element)
                soma += element;
            });
            return response.json({ teste: soma });
        } catch (error) {

        }
    }

}

module.exports = CashierController
