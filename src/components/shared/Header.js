import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import * as helper from '../../helpers/auth-helper';

export default function Header() {

    //declarando variáveis no componente
    const [nomeUsuario, setNomeUsuario] = useState('');
    const [emailUsuario, setEmailUsuario] = useState('');
    const [autenticado, setAutenticado] = useState(false);

    //declarando a função useEffect
    //função executada antes do componente abrir
    useEffect(
        () => {
            //verificar se o usuário está autenticado
            if (helper.isAuthenticated()) {

                setAutenticado(true);
                setNomeUsuario(helper.getNomeUsuario());
                setEmailUsuario(helper.getEmailUsuario());
            }
        },
        []
    );

    //função para realizar o logout do usuário
    const logout = () => {
        if (window.confirm('Deseja realmente sair do sistema?')) {
            //apagando os dados da local storage
            helper.signOut();
            //redirecionar para a página inicial do sistema
            window.location.href = '/';
        }
    }

    return (
        <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">AgendaWeb</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">

                    {
                        !autenticado && <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/">
                                    Acessar Agenda
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/crie-sua-conta">
                                    Crie sua Conta
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/esqueci-minha-senha">
                                    Esqueci minha senha
                                </NavLink>
                            </li>
                        </ul>
                    }

                    {
                        autenticado && <ul className="navbar-nav me-auto mb-2 mb-lg-0">

                            <li class="nav-item dropdown">
                                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Gerenciar Contatos
                                </a>
                                <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <li>
                                        <NavLink className="dropdown-item" to="/cadastrar-contatos">
                                            Cadastrar Contatos
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink className="dropdown-item" to="/consultar-contatos">
                                            Consultar Contatos
                                        </NavLink>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    }

                    {
                        autenticado && <form className="d-flex">
                            <div className="text-white">
                                <small><strong>{nomeUsuario}</strong> {emailUsuario}</small>
                                &nbsp;&nbsp;
                                <a href="#" className="btn btn-outline-light btn-sm"
                                    onClick={
                                        () => logout()
                                    }>
                                    Logout
                                </a>
                            </div>
                        </form>
                    }

                </div>
            </div>
        </nav>
    )
}