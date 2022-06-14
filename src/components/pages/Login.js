import React, { useState, useEffect } from "react";
import LoginForm from "../forms/LoginForm";
import * as helper from '../../helpers/auth-helper';

export default function Login() {

    const [notAuthenticated, setNotAuthenticated] = useState(false);

    useEffect(
        () => {
            //verificar se o usuário está autenticado
            if (helper.isAuthenticated())
                window.location.href = "/consultar-contatos";
            else
                setNotAuthenticated(true);
        },
        []
    );

    return (
        notAuthenticated && <div className="container mt-5">
            <div className="row">
                <div className="col-md-4 offset-md-4">
                    <div className="card">
                        <div className="card-body">
                            <div className="text-center mb-3">
                                <img className="img-fluid"
                                    src="https://www.cotiinformatica.com.br/imagens/logo-coti-informatica.png" />
                                <h5 className="card-title">Acessar Conta</h5>
                                <p className="card-text">Informe suas credenciais para acessar a agenda de contatos.</p>
                            </div>
                            <LoginForm />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}