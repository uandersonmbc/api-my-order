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
            res_msg = { message: 'Exeção não encontrada', http_code: 404 };
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

            US01: { message: ' cadastrado com sucesso', http_code: 201 },

            CA01: { message: 'Categoria cadastrada com sucesso :)', http_code: 201 },
            CA02: { message: 'Aconteceu um erro na hora de cadastrar a categoria :(', http_code: 201 },
            CA03: { message: 'Categoria atualizada com sucesso :)', http_code: 201 },
            CA04: { message: 'Acontecu algum problema na hora de atualizar a categoria :(', http_code: 201 },
            CA05: { message: 'Categoria não existe :(', http_code: 404 },
        }
        return teste[code];
    }

}

module.exports = DataProcessingService