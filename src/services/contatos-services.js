import * as config from '../config/api-config';
import * as helper from '../helpers/auth-helper';
import axios from 'axios';

/*
    Função para realizar a requisição POST
    para o serviço de cadastro de contato
*/
export const postContato = (data) => {
    return axios.post(`${config.getApiContatos()}/contatos`, data)
        .then(
            response => {
                return response.data;
            }
        )
}

/*
    Função para realizar a requisição PUT
    para o serviço de edição de contato
*/
export const putContato = (data) => {
    return axios.put(`${config.getApiContatos()}/contatos`, data)
        .then(
            response => {
                return response.data;
            }
        )
}

/*
    Função para realizar a requisição DELETE
    para o serviço de exclusão de contato
*/
export const deleteContato = (id) => {
    return axios.delete(`${config.getApiContatos()}/contatos/${id}`)
        .then(
            response => {
                return response.data;
            }
        )
}

/*
    Função para realizar a requisição GET
    para o serviço de consulta de contatos
*/
export const getAllContatos = () => {
    return axios.get(`${config.getApiContatos()}/contatos`)
        .then(
            response => {
                return response.data;
            }
        )
}

/*
    Função para realizar a requisição GET
    para o serviço de consulta de contato por id
*/
export const getContatoById = (id) => {
    return axios.get(`${config.getApiContatos()}/contatos/${id}`)
        .then(
            response => {
                return response.data;
            }
        )
}

/*
    Criando o interceptador para adicionar o TOKEN
    nas requisições do ENDPOINT /api/contatos
*/
axios.interceptors.request.use(
    config => {

        //verificar se a requisição é para o ENDPOINT /api/contatos
        if(config.url.includes('api/contatos')) {

            var accessToken = helper.getAccessToken();
            config.headers['Authorization'] = 'Bearer ' + accessToken;
        }

        return config;
    },
    error => {
        Promise.reject(error);
    }
)