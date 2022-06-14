import React, { useState, useEffect } from "react";
import * as services from '../../services/contatos-services';
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import $ from 'jquery';

export default function ConsultarContatosGrid() {

    //atributos
    const [contatos, setContatos] = useState([]);

    //função executada antes de abrir o componente
    useEffect(
        () => {
            consultarContatos();
        }, []
    );

    //função para executar a consulta de contatos
    const consultarContatos = () => {
        services.getAllContatos()
            .then(
                (result) => {

                    //criando o datatable
                    $(function () {
                        $("#tabela").DataTable({
                            language: {
                                url: 'https://cdn.datatables.net/plug-ins/1.12.1/i18n/pt-BR.json'
                            }
                        })
                    });

                    setContatos(result);
                }
            )
            .catch(
                (e) => {
                    console.log(e);
                }
            );
    }

    //função para realizar a exclusão do contato
    const excluirContato = (idContato) => {

        if(window.confirm('Deseja realmente excluir o contato selecionado?')) {

            services.deleteContato(idContato)
                .then(
                    (result) => {
                        alert(`O contato ${result.nome} foi excluído com sucesso.`);
                        window.location.reload();
                    }
                )
                .catch(
                    (e) => {
                        console.log(e);
                    }
                )
        }
    }

    return (
        <div className="table-responsive mb-5">
            <table id="tabela" className="table table-hover table-sm">
                <thead>
                    <tr>
                        <th>Nome do contato</th>
                        <th>Email</th>
                        <th>Telefone</th>
                        <th>Operações</th>
                    </tr>
                </thead>
                <tbody>

                    {/* imprimindo a listagem de contatos */}
                    {
                        contatos.map(
                            function (item, i) {
                                return (
                                    <tr key={i}>
                                        <td>{item.nome}</td>
                                        <td>{item.email}</td>
                                        <td>{item.telefone}</td>
                                        <td>
                                            <a href="#" className="btn btn-sm btn-primary"
                                                onClick={
                                                    () => window.location.href = `/editar-contatos?id=${item.idContato}`
                                                }>
                                                Editar
                                            </a>
                                            &nbsp;
                                            <a href="#" className="btn btn-sm btn-danger"
                                                onClick={
                                                    () => excluirContato(item.idContato)
                                                }>
                                                Excluir
                                            </a>
                                        </td>
                                    </tr>
                                )
                            }
                        )
                    }

                </tbody>
            </table>
        </div>
    )

}