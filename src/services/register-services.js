import * as config from '../config/api-config';
import axios from 'axios';

/*
    Função para realizar a requisão POST
    para cadastro de conta de usuário

    data = { nome : '', email : '', senha : '' }
*/
export const postRegister = (data) => {
    return axios.post(`${config.getApiContatos()}/account`, data)
        //retornando o PROMISSE da API (resposta (sucesso ou erro))
        .then(response => {
            return response.data;
        })
}