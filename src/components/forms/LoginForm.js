import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import * as services from '../../services/login-services';
import * as validations from './validations/login-validation';
import * as helper from '../../helpers/auth-helper';

export default function LoginForm() {

    const [mensagemErro, setMensagemErro] = useState('');

    //criando a estrutura para o formulário REACT HOOK FORM
    const {
        control,
        handleSubmit,
        formState: {
            errors
        },
        reset
    } = useForm();

    //função para receber o SUBMIT do formulário
    const onSubmit = (data) => {
        services.postLogin(data)
            .then(
                (result) => {
                    helper.signIn(result);
                    window.location.href = "/consultar-contatos";
                }
            )
            .catch(
                (e) => {
                    if (e.response.status == 401) {
                        setMensagemErro(e.response.data.message);
                    }
                    else {
                        setMensagemErro('Ocorreu um erro, por favor tente novamente.');
                    }
                }
            );
    }

    return (

        <form onSubmit={handleSubmit(onSubmit)}>

            { /* Exibindo o conteudo da variavel de mensagem de erro */ }
            {
                mensagemErro && <div className="alert alert-danger mb-2 mt-2 text-center">
                    {mensagemErro}
                </div>
            }

            <div className="mb-3">
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
            <div className="mb-3">
                <label>Senha de acesso:</label>

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
            <div className="mb-3">
                <div className="d-grid">
                    <input type="submit" value="Acessar Agenda" className="btn btn-primary" />
                </div>
            </div>
        </form>
    )
}