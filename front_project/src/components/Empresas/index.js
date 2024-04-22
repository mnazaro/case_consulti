import React, { useState, useEffect } from "react";
import "./styles.css";
import axios from "axios";

import add from "../../assets/add_icon.svg";
import search from "../../assets/search.svg";
import deleteIcon from "../../assets/delete_icon.svg";
import edit from "../../assets/edit.svg";
import Modal from "../Modal";


function Empresas() {
    const [data, setData] = useState([]);
    const [isAddModalOpen, setAddModalOpen] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [editValues, setEditValues] = useState([]);
    const [cnpj, setCnpj] = useState('');
    const [razao_social, setRazaoSocial] = useState('');
    const [fantasy_name, setFantasyName] = useState('');

    useEffect(() => {
        async function fetchData() {
            await axios.get('http://localhost:5000/empresa').then((response) => {
                setData(response.data);
                console.log(response.data);
            }).catch((error) => {
                console.log(error);
            });
        }
        fetchData();
    }, []);


    const handleCnpjChange = (event) => {
        let cnpj = event.target.value;
        cnpj = cnpj.replace(/\D/g, '');
        cnpj = cnpj.replace(/^(\d{2})(\d)/, '$1.$2');
        cnpj = cnpj.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3');
        cnpj = cnpj.replace(/\.(\d{3})(\d)/, '.$1/$2');
        cnpj = cnpj.replace(/(\d{4})(\d)/, '$1-$2');
        setCnpj(cnpj);
    }

    const handleNameChange = (event) => {
        setRazaoSocial(event.target.value);
    }

    const handleFantasyNameChange = (event) => {
        setFantasyName(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('http://localhost:5000/empresa', {
            razao_social: razao_social,
            cnpj: cnpj.replace(/\D/g, ''),
            nome_fantasia: fantasy_name
        }).then((response) => {
            setAddModalOpen(false);
            setCnpj('');
            setRazaoSocial('');
            setFantasyName('');
            window.location.reload();
        }).catch((error) => {
            console.log(error);
        });
    }

    const handleAlter = (event, id) => {
        event.preventDefault();
        axios.put(`http://localhost:5000/empresa/${id}`, {
            razao_social: razao_social,
            cnpj: cnpj.replace(/\D/g, ''),
            nome_fantasia: fantasy_name
        }).then((response) => {
            window.location.reload();
        }).catch((error) => {
            console.log(error);
        });
    }



return (
    <div className="empresas">
        <h1>Empresas</h1>
        <div className="table-area">
            <div className='header'>
                <div className='add-button' onClick={() => setAddModalOpen(true)} style={{ cursor: 'pointer' }}>
                    <img src={add} alt="Adicionar" />
                    <p>Adicionar Empresa</p>
                </div>
                <div className='search-bar'>
                    <input type='text' placeholder='Pesquisar Empresa' />
                    <img src={search} alt="Pesquisar" style={{ cursor: 'pointer' }} />
                </div>
            </div>
            <Modal isOpen={isAddModalOpen} onClose={() => setAddModalOpen(false)}>
                <h1>Adicionar Empresa</h1>

                <form>
                    <label htmlFor="name">Razão Social</label>
                    <input type="text" id="name" name="name" value={razao_social} onChange={handleNameChange} />

                    <label htmlFor="cnpj">CNPJ</label>
                    <input type="text" id="cnpj" name="cnpj" value={cnpj} onChange={handleCnpjChange} maxLength="18" />

                    <label htmlFor="fantasy_name">Nome Fantasia</label>
                    <input type="text" id="fantasy_name" name="fantasy_name" value={fantasy_name} onChange={handleFantasyNameChange} />

                    <button type="submit" onClick={handleSubmit} style={{ cursor: 'pointer' }}>Adicionar</button>
                </form>
            </Modal>
        
            <table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Razão Social</th>
                        <th>CNPJ</th>
                        <th>Nome Fantasia</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {data.sort((a, b) => a.id - b.id).map((empresa) => (
                        <tr key={empresa.id} style={{backgroundColor: editingId === empresa.id ? 'lightgrey' : 'white'}}>
                            <td>{empresa.id}</td>
                            <td>{editingId === empresa.id ? (
                                <input value={editValues.razao_social} onChange={(e) => setEditValues({ ...editValues, razao_social: e.target.value })} />
                            ) : (
                                empresa.razao_social
                            )}
                            </td>
                            <td>{editingId === empresa.id ? (
                                <input value={editValues.cnpj} onChange={(e) => setEditValues({ ...editValues, cnpj: e.target.value })} />
                            ) : (
                                empresa.cnpj
                            )}
                            </td>
                            <td>{editingId === empresa.id ? (
                                <input value={editValues.nome_fantasia} onChange={(e) => setEditValues({ ...editValues, nome_fantasia: e.target.value })} />
                            ) : (
                                empresa.nome_fantasia
                            )}
                            </td>
                            <td>
                            {editingId === empresa.id ? (
                                    <img src={edit} alt="Editar" style={{ cursor: 'pointer' }} onClick={(e) => handleAlter(e, empresa.id)} />
                                ) : (
                                    <img src={edit} alt="Editar" style={{ cursor: 'pointer'}} onClick={() => {
                                        setEditingId(empresa.id);
                                        setEditValues(empresa);
                                    }}/>
                                )}
                                <img src={deleteIcon} alt="Deletar" style={{ cursor: 'pointer' }} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div >
    </div >
);
}

export default Empresas;