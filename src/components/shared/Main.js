import React from "react";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Password from "../pages/Password";
import CadastrarContatos from '../pages/contatos/CadastrarContatos';
import ConsultarContatos from '../pages/contatos/ConsultarContatos';
import EditarContatos from '../pages/contatos/EditarContatos';

import { Routes, Route } from "react-router-dom";

export default function Main() {
    return (
        <Routes>

            {/* Mapeamento da rota raiz do projeto */}
            <Route
                path="/"
                exact
                element={<Login />}
            />

            {/* Mapeamento da rota de cadastro de conta de usuário */}
            <Route
                path="/crie-sua-conta"
                element={<Register />}
            />

            {/* Mapeamento da rota de 'esqueci minha senha' */}
            <Route
                path="/esqueci-minha-senha"
                element={<Password />}
            />

            {/* Mapeamento da rota de 'cadastro de contatos' */}
            <Route
                path="/cadastrar-contatos"
                element={<CadastrarContatos />}
            />

            {/* Mapeamento da rota de 'consulta de contatos' */}
            <Route
                path="/consultar-contatos"
                element={<ConsultarContatos />}
            />

            {/* Mapeamento da rota de 'edição de contatos' */}
            <Route
                path="/editar-contatos"
                element={<EditarContatos />}
            />

        </Routes>
    )
}