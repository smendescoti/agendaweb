import React, { useState, useEffect } from "react";
import CadastrarContatoForm from "../../forms/CadastrarContatoForm";
import * as helper from '../../../helpers/auth-helper';

export default function CadastrarContatos() {

    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(
        () => {
            //verificar se o usuário não está autenticado
            if (!helper.isAuthenticated())
                window.location.href = "/";
            else
                setIsAuthenticated(true);
        },
        []
    );

    return (
        isAuthenticated && <div className="container mt-3">
            <div className="row">
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Cadastro de Contatos</h5>
                            <p className="card-text">Preencha os campos para incluir um contato.</p>
                            <CadastrarContatoForm />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}