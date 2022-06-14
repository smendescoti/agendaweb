import React, { useState, useEffect } from "react";
import EditarContatoForm from "../../forms/EditarContatoForm";
import * as helper from '../../../helpers/auth-helper';

export default function EditarContatos() {

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
                            <h5 className="card-title">Edição de Contatos</h5>
                            <p className="card-text">Utilize os campos para atualizar os dados do contato.</p>
                            <EditarContatoForm />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}