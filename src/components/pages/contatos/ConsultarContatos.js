import React, { useState, useEffect } from "react";
import ConsultarContatosGrid from "../../grids/ConsultarContatosGrid";
import * as helper from '../../../helpers/auth-helper';

export default function ConsultarContatos() {

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
                            <h5 className="card-title">Consulta de Contatos</h5>
                            <p className="card-text">Listagem de contatos cadastrados.</p>
                            <ConsultarContatosGrid />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}