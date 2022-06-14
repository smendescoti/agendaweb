import * as config from '../config/api-config';
import axios from 'axios';

/*
    Função para realizar a requisição POST
    para o serviço de login de usuário
*/
export const postLogin = (data) => {
    return axios.post(`${config.getApiContatos()}/login`, data)
        .then(
            response => {
                return response.data;
            }
        )
}