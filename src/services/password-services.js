import * as config from '../config/api-config';
import axios from 'axios';

/*
    Função para realizar a requisão POST
    para recuperação de senha de usuário

    data = { email : '' }
*/
export const postPassword = (data) => {
    return axios.post(`${config.getApiContatos()}/password`, data)
        //retornando o PROMISSE da API (resposta (sucesso ou erro))
        .then(response => {
            return response.data;
        })
}