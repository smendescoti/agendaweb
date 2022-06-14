import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import * as validations from './validations/register-validation';
import * as services from '../../services/register-services';

export default function RegisterForm() {

    //Declarando variáveis no componente
    const [erroSenhaConfirmacao, setErroSenhaConfirmacao] = useState('');
    const [mensagemSucesso, setMensagemSucesso] = useState('');
    const [mensagemErro, setMensagemErro] = useState('');

    //Declarando uma estrutura do REACT HOOK FORM para criar um formulário
    const {
        control, //ojeto para capturar os campos do formulário
        handleSubmit, //objeto para capturar o evento SUBMIT do formulário
        formState: {
            errors //capturar as mensagens de erro de validação
        },
        reset, //objeto utilizado para limpar os campos do formulário
    } = useForm(); //Criar um formulario

    //função para capturar o evento SUBMIT do formulário
    const onSubmit = (data) => {

        //limpar as mensagens
        setMensagemSucesso('');
        setMensagemErro('');

        //verificando se as senhas estão iguais!
        if (data.senha == data.senhaConfirmacao) {
            setErroSenhaConfirmacao('');

            //realizando a chamada para a API
            services.postRegister(data)
                .then( //capturando o retorno de sucesso
                    (result) => {

                        //exibir mensagem de sucesso
                        setMensagemSucesso(`Parabéns ${data.nome}, sua conta foi criada com sucesso!`);

                        //limpar os campos do formulário
                        reset({
                            nome: '',
                            email: '',
                            senha: '',
                            senhaConfirmacao: ''
                        })
                    }
                )
                .catch( //capturando o retorno de erro
                    (e) => {

                        if (e.response.status == 422) {
                            setMensagemErro(e.response.data.message);
                        }
                        else {
                            setMensagemErro('Ocorreu um erro, por favor tente novamente.');
                        }
                    }
                )
        }
        else {
            setErroSenhaConfirmacao('Senhas não conferem, por favor verifique.');
        }
    }

    /*
        Conteúdo HTML que será retornato pelo componente
        para renderização na página do navegador
    */
    return (

        <form onSubmit={handleSubmit(onSubmit)}>

            { /* mensagem de sucesso */}
            {
                mensagemSucesso && <div className="alert alert-success mb-3">
                    <strong>Sucesso!</strong> {mensagemSucesso}
                </div>
            }

            { /* mensagem de erro */}
            {
                mensagemErro && <div className="alert alert-danger mb-3">
                    <strong>Erro!</strong> {mensagemErro}
                </div>
            }

            <div className="row mb-3">
                <div className="col-md-6">
                    <label>Nome do Usuário:</label>

                    <Controller
                        control={control}
                        name="nome"
                        defaultValue=''
                        rules={{
                            validate: validations.nomeValidation
                        }}
                        render={
                            ({ field: { onChange, onBlur, value } }) => (
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Digite seu nome completo"
                                    onChange={onChange}
                                    onBlur={onBlur}
                                    value={value}
                                />
                            )
                        }
                    />

                    { /* mensagem de erro de validação do campo 'nome' */}
                    {
                        errors.nome && <span className="text-danger">
                            {errors.nome.message}
                        </span>
                    }

                </div>
                <div className="col-md-6">
                    <label>Email de acesso:</label>

                    <Controller
                        control={control}
                        name="email"
                        defaultValue=''
                        rules={{
                            validate: validations.emailValidation
                        }}
                        render={
                            ({ field: { onChange, onBlur, value } }) => (
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Digite seu email de acesso"
                                    onChange={onChange}
                                    onBlur={onBlur}
                                    value={value}
                                />
                            )
                        }
                    />

                    { /* mensagem de erro de validação do campo 'email' */}
                    {
                        errors.email && <span className="text-danger">
                            {errors.email.message}
                        </span>
                    }

                </div>
            </div>
            <div className="row mb-3">
                <div className="col-md-3">
                    <label>Senha de Acesso:</label>

                    <Controller
                        control={control}
                        name="senha"
                        defaultValue=''
                        rules={{
                            validate: validations.senhaValidation
                        }}
                        render={
                            ({ field: { onChange, onBlur, value } }) => (
                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder="Digite sua senha de acesso"
                                    onChange={onChange}
                                    onBlur={onBlur}
                                    value={value}
                                />
                            )
                        }
                    />

                    { /* mensagem de erro de validação do campo 'senha' */}
                    {
                        errors.senha && <span className="text-danger">
                            {errors.senha.message}
                        </span>
                    }

                </div>
                <div className="col-md-3">
                    <label>Confirme sua Senha:</label>

                    <Controller
                        control={control}
                        name="senhaConfirmacao"
                        defaultValue=''
                        rules={{
                            validate: validations.senhaConfirmacaoValidation
                        }}
                        render={
                            ({ field: { onChange, onBlur, value } }) => (
                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder="Confirme sua senha de acesso"
                                    onChange={onChange}
                                    onBlur={onBlur}
                                    value={value}
                                />
                            )
                        }
                    />

                    { /* mensagem de erro de validação do campo 'senhaConfirmacao' */}
                    {
                        errors.senhaConfirmacao && <span className="text-danger">
                            {errors.senhaConfirmacao.message}
                        </span>
                    }

                    { /* mensagem de senhas não conferem */}
                    {
                        <span className="text-danger">
                            {erroSenhaConfirmacao}
                        </span>
                    }

                </div>
            </div>
            <div className="mb-3">
                <input type="submit" value="Realizar Cadastro" className="btn btn-success" />
                <input type="reset" value="Limpar" className="btn btn-light" />
            </div>

        </form>
    )
}