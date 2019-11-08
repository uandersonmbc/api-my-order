'use strict'

class DataProcessingService {

    /**
     * A função @assemblyData recebe dois parâmetros obrigarios e um opcional.
     * Obrigatorios @response => parâmetro de retorno do método do controler
     * Obrigatorios @code => codigo do erro
     * Opcional @data => dados que o controler retorno para o usuário 
     */

    static async assemblyData(response, code, data = []) {
        var res_msg = this.message(code);
        if (!res_msg) {
            res_msg = { message: 'Exceção não encontrada', http_code: 404 };
        }
        const res = {
            message: res_msg.message,
            status: res_msg.http_code,
            data: data
        }
        return await response.status(res_msg.http_code).json(res);
    }

    static message(code) {
        var teste = {
            LO01: { message: 'Logado com sucesso', http_code: 200 },
            LO02: { message: 'Invalid email/password', http_code: 401 },

            US01: { message: 'Cadastrado com sucesso', http_code: 201 },

            CA01: { message: 'Categoria cadastrada com sucesso :)', http_code: 201 },
            CA02: { message: 'Aconteceu um erro na hora de cadastrar a categoria :(', http_code: 201 },
            CA03: { message: 'Categoria atualizada com sucesso :)', http_code: 201 },
            CA04: { message: 'Aconteceu algum problema na hora de atualizar a categoria :(', http_code: 201 },
            CA05: { message: 'Categoria não existe :(', http_code: 404 },
            
            PR01: { message: 'Produto cadastrada com sucesso :)', http_code: 201 },
            PR02: { message: 'Aconteceu um erro na hora de cadastrar seu produto :(', http_code: 201 },
            PR03: { message: 'Produto atualizado com sucesso :)', http_code: 201 },
            PR04: { message: 'Aconteceu algum problema na hora de atualizar seu produto :(', http_code: 201 },
            PR05: { message: 'Este produto não existe :(', http_code: 404} ,
            PR06: { message: 'Produto deletado com sucesso :D', http_code: 201},
            
            IN01: { message: 'Ingrediente cadastrado com sucesso :)', http_code: 201 },
            IN02: { message: 'Aconteceu um erro na hora de cadastrar seu ingrediente :(', http_code: 201 },
            IN03: { message: 'Ingrediente atualizado com sucesso :)', http_code: 201 },
            IN04: { message: 'Aconteceu algum problema na hora de atualizar seu ingrediente :(', http_code: 201 },
            IN05: { message: 'Este ingrediente não existe :(', http_code: 404} ,
            IN06: { message: 'Ingrediente deletado com sucesso :D', http_code: 201},

            OR01: { message: 'Pedido cadastrado com sucesso :)', http_code: 201 },
            OR02: { message: 'Aconteceu um erro na hora de cadastrar seu pedido :(', http_code: 201 },
            OR03: { message: 'Pedido atualizado com sucesso :)', http_code: 201 },
            OR04: { message: 'Aconteceu algum problema na hora de atualizar seu pedido :(', http_code: 201 },
            OR05: { message: 'Este pedido não existe :(', http_code: 404} ,
            OR06: { message: 'Pedido deletado com sucesso :D', http_code: 201},
            
        }
        return teste[code];
    }

}

module.exports = DataProcessingService