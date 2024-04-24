import React, { useState, useEffect } from "react";
import axios from "axios";

function Relatorios() {
    const [empresas, setEmpresas] = useState([]);
    const [setores, setSetores] = useState([]);
    const [filtroEmpresa, setFiltroEmpresa] = useState('');
    const [filtroSetor, setFiltroSetor] = useState('');
    const [filtro, setFiltro] = useState('empresa');
    const [selectedEmpresaId, setSelectedEmpresaId] = useState('');
    const [selectedSetorId, setSelectedSetorId] = useState('');


    const URL = 'http://localhost:5000';

    async function fetchData() {
        await axios.get(URL + '/empresa').then((response) => {
            setEmpresas(response.data);
        }).catch((error) => {
            console.log(error);
        });

        await axios.get(URL + '/setor').then((response) => {
            setSetores(response.data);
        }).catch((error) => {
            console.log(error);
        });
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="relatorios">
            <h1>Relatórios</h1>
            <div className="filtros">
                <label>
                    <input
                        type="radio"
                        value="empresa"
                        checked={filtro === 'empresa'}
                        onChange={(event) => setFiltro(event.target.value)}
                    />
                    Filtrar por Empresa
                </label>
                {filtro === 'empresa' && (
                    <select value={filtroEmpresa} onChange={(e) => setFiltroEmpresa(e.target.value)}>
                        <option value="">Selecione uma empresa</option>
                        {empresas.map((empresa) => (
                            <option key={empresa.id} value={empresa.id}>{empresa.razao_social}</option>
                        ))}
                    </select>
                )}
                <label>
                    <input
                        type="radio"
                        value="setor"
                        checked={filtro === 'setor'}
                        onChange={(event) => setFiltro(event.target.value)}
                    />
                    Filtrar por Setor
                </label>
                {filtro === 'setor' && (
                    <select value={filtroSetor} onChange={(e) => setFiltroSetor(e.target.value)}>
                        <option value="">Selecione um setor</option>
                        {setores.map((setor) => (
                            <option key={setor.id} value={setor.id}>{setor.descricao}</option>
                        ))}
                    </select>
                )}
            </div>
            <div className="resultados">
                <h2>Resultados</h2>
                <table>
                    <thead>
                        {filtro === 'empresa' ? (
                            <tr>
                                <th>Razão Social</th>
                                <th>CNPJ</th>
                                <th>Quantidade de Setores</th>
                            </tr>
                        ) : filtro === 'setor' ? (
                            <tr>
                                <th>Descrição</th>
                                <th>Empresas</th>
                            </tr>
                        ) : null}
                    </thead>
                    <tbody>
                        {filtro === 'empresa' && (
                            empresas.find((empresa) => empresa.id === filtroEmpresa)?.map((empresa) => (
                                <tr key={empresa.id}>
                                    <td>{empresa.razao_social}</td>
                                    <td>{empresa.cnpj}</td>
                                    <td>{empresa.setores.length}</td>
                                </tr>
                            ))
                        )}
                        {filtro === 'setor' && (
                            setores.find((setor) => setor.id === filtroSetor)?.map((setor) => (
                                <tr key={setor.id}>
                                    <td>{setor.descricao}</td>
                                    <td>{setor.empresas.length}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Relatorios;
