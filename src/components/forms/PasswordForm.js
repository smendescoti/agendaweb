import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import * as services from '../../services/password-services';
import * as validation from './validations/password-validation';

export default function PasswordForm() {

    const [mensagemSucesso, setMensagemSucesso] = useState('');
    const [mensagemErro, setMensagemErro] = useState('');

    const {
        control,
        handleSubmit,
        formState: {
            errors
        },
        reset,
    } = useForm();

    const onSubmit = (data) => {

        services.postPassword(data)
            .then(
                (result) => {
                    console.log(result);
                }
            )
            .catch(
                (e) => {
                    if (e.response.status == 422) {
                        setMensagemErro(e.response.data.message);
                    }
                    else {
                        setMensagemErro('Ocorreu um erro, por favor tente mais tarde.');
                    }
                }
            )
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>

            {/* exibindo mensagem de sucesso */}
            {
                mensagemSucesso && <div className="alert alert-success">
                    <strong>{mensagemSucesso}</strong>
                </div>
            }

            {/* exibindo mensagem de erro */}
            {
                mensagemErro && <div className="alert alert-danger">
                    <strong>{mensagemErro}</strong>
                </div>
            }

            <div className="mb-3">
                <label>Email de acesso:</label>

                <Controller
                    control={control}
                    name='email'
                    defaultValue=''
                    rules={{ validate: validation.emailValidation }}
                    render={
                        ({ field: { onChange, onBlur, value } }) => (
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Digite aqui"
                                onChange={onChange}
                                onBlur={onBlur}
                                value={value}
                            />
                        )
                    }
                />

                {/* exibindo as mensagens de erro de validação */}
                {
                    errors.email && <div className="text-danger">
                        {errors.email.message}
                    </div>
                }

            </div>
            <div className="mb-3">
                <div className="d-grid">
                    <input type="submit" value="Recuperar minha senha" className="btn btn-success" />
                </div>
            </div>
        </form>
    )
}