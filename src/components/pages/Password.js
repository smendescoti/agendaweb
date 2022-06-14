import React, { useState, useEffect } from "react";
import PasswordForm from "../forms/PasswordForm";
import * as helper from '../../helpers/auth-helper';

export default function Password() {

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
                                <h5 className="card-title">Esqueci minha senha</h5>
                                <p className="card-text">Entre com seu email de acesso para recuperar a senha.</p>
                            </div>
                            <PasswordForm />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}