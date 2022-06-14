import React, { useState, useEffect } from "react";
import RegisterForm from "../forms/RegisterForm";
import * as helper from '../../helpers/auth-helper';

export default function Register() {

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
        notAuthenticated && <div className="container mt-3">
            <div className="row">
                <div className="col-md-10 offset-md-1">
                    <div className="card">
                        <div className="card-body">
                            <div className="mb-3">
                                <h5 className="card-title">Crie sua Conta</h5>
                                <p className="card-text">Informe seus dados para cadastrar uma conta na agenda de contatos.</p>
                            </div>
                            <RegisterForm />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}