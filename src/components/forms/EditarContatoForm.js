import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import InputMask from 'react-input-mask';
import * as services from '../../services/contatos-services';
import * as validations from './validations/contato-validation';

export default function EditarContatoForm() {

    //declarando variáveis do componente
    const [mensagemSucesso, setMensagemSucesso] = useState('');
    const [mensagemErro, setMensagemErro] = useState('');

    useEffect(
        () => {
            obterContato();
        }, []
    );

    const obterContato = () => {

        const url = window.location.href;
        const idContato = url.substring(url.lastIndexOf('?id=') + 4);

        services.getContatoById(idContato)
            .then(
                (result) => {
                    reset({
                        idContato: result.idContato,
                        nome: result.nome,
                        email: result.email,
                        telefone: result.telefone
                    });
                }
            )
            .catch(
                (e) => {
                    console.log(e);
                }
            )
    }

    const {
        control,
        handleSubmit,
        formState: {
            errors
        },
        reset
    } = useForm();

    const onSubmit = (data) => {

        setMensagemSucesso('');
        setMensagemErro('');

        services.putContato(data)
            .then(
                (result) => {
                    setMensagemSucesso(`Contato ${result.nome}, atualizado com sucesso.`);
                }
            )
            .catch(
                (e) => {
                    console.log(e);
                    setMensagemErro('Ocorreu um erro ao atualizar o contato, tente novamente.');
                }
            )
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>

            {/* exibindo mensagem de sucesso */}
            {
                mensagemSucesso && <div className='alert alert-success mb-3'>
                    <strong>Sucesso!</strong> {mensagemSucesso}
                </div>
            }

            {/* exibindo mensagem de erro */}
            {
                mensagemErro && <div className='alert alert-danger mb-3'>
                    <strong>Erro!</strong> {mensagemErro}
                </div>
            }

            {/* campo oculto */}
            <Controller
                control={control}
                name="idContato"
                defaultValue=''
                render={
                    ({ field: { onChange, onBlur, value } }) => (
                        <input
                            type='hidden'
                            onChange={onChange}
                            onBlur={onBlur}
                            value={value}
                        />
                    )
                }
            />

            <div className='row mb-3'>
                <div className='col-md-6'>
                    <label>Nome do contato:</label>
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
                                    type='text'
                                    className='form-control'
                                    placeholder='Digite aqui o nome do contato'
                                    onChange={onChange}
                                    onBlur={onBlur}
                                    value={value}
                                />
                            )
                        }
                    />

                    {
                        errors.nome && <div className='text-danger'>
                            {errors.nome.message}
                        </div>
                    }

                </div>
                <div className='col-md-3'>
                    <label>Email do contato:</label>
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
                                    type='text'
                                    className='form-control'
                                    placeholder='Digite o email'
                                    onChange={onChange}
                                    onBlur={onBlur}
                                    value={value}
                                />
                            )
                        }
                    />

                    {
                        errors.email && <div className='text-danger'>
                            {errors.email.message}
                        </div>
                    }

                </div>
                <div className='col-md-3'>
                    <label>Telefone:</label>
                    <Controller
                        control={control}
                        name="telefone"
                        defaultValue=''
                        rules={{
                            validate: validations.telefoneValidation
                        }}
                        render={
                            ({ field: { onChange, onBlur, value } }) => (
                                <InputMask
                                    mask="(99)99999-9999"
                                    className='form-control'
                                    placeholder='Digite aqui'
                                    onChange={onChange}
                                    onBlur={onBlur}
                                    value={value}
                                />
                            )
                        }
                    />

                    {
                        errors.telefone && <div className='text-danger'>
                            {errors.telefone.message}
                        </div>
                    }

                </div>
            </div>

            <div className='row mb-3'>
                <div className='col-md-12'>
                    <input type='submit' value='Salvar Alterações' className='btn btn-primary' />
                </div>
            </div>

        </form>
    )

}