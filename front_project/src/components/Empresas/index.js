import React from "react";
import "./styles.css";
import axios from "axios";

import add from "../../assets/add_icon.svg";
import search from "../../assets/search.svg";
import deleteIcon from "../../assets/delete_icon.svg";
import edit from "../../assets/edit.svg";
import Modal from "../Modal";


function Empresas() {
    const [data, setData] = React.useState([]);
    const [selectedEmpresa, setSelectedEmpresa] = React.useState([]);
    const [isModalOpen, setModalOpen] = React.useState(false);
    const [isEditModalOpen, setEditModalOpen] = React.useState(false);
    const [isEditing, setIsEditing] = React.useState(false);
    const [cnpj, setCnpj] = React.useState('');
    const [razao_social, setRazaoSocial] = React.useState('');
    const [nome_fantasia, setNomefantasia] = React.useState('');
    const [searchValue, setSearchValue] = React.useState('');
    const [setores, setSetores] = React.useState([]);
    const [selectedSetores, setSelectedSetores] = React.useState([]);

    async function fetchData() {
        await axios.get('http://localhost:5000/empresa').then((response) => {
            setData(response.data);
            console.log(response.data);
        }).catch((error) => {
            console.log(error);
        });

        await axios.get('http://localhost:5000/setor').then((response) => {
            setSetores(response.data);
        }).catch((error) => {
            console.log(error);
        });
    }

    React.useEffect(() => {
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

    const handleSubmit = (event) => {
        event.preventDefault();
        if (razao_social === '' || cnpj === '') {
            alert('Preencha todos os campos!');
            return;
        }
        if (isEditing) {
            axios.put(`http://localhost:5000/empresa/${selectedEmpresa.id}`, {
                razao_social: razao_social,
                cnpj: cnpj.replace(/\D/g, ''),
                nome_fantasia: nome_fantasia
            }).then((response) => {
                setModalOpen(false);
                setRazaoSocial('');
                setCnpj('');
                setNomefantasia('');
                setSetores([]);
                setIsEditing(false);
                setData(data.map(empresa => empresa.id === selectedEmpresa.id ? response.data : empresa));
            }).catch((error) => {
                console.log(error);
            });
        } else {
            axios.post('http://localhost:5000/empresa', {
                razao_social: razao_social,
                cnpj: cnpj.replace(/\D/g, ''),
                nome_fantasia: nome_fantasia,
                setores: selectedSetores
            }).then((response) => {
                console.log(response.data);
                setModalOpen(false);
                setRazaoSocial('');
                setCnpj('');
                setNomefantasia('');
                setSelectedSetores([]);
                setData([...data, response.data]);
            }).catch((error) => {
                console.log(error);
            });
        }
    }

    const handleEdit = (empresa) => {
        setRazaoSocial(empresa.razao_social);
        setCnpj(empresa.cnpj);
        setNomefantasia(empresa.nome_fantasia);
        setIsEditing(true);
        setEditModalOpen(true);
    }

    const handleDelete = (empresa) => {
        if (window.confirm(`Deseja realmente excluir a empresa ${empresa.razao_social}?`)) {
            axios.delete(`http://localhost:5000/empresa/${empresa.id}`).then((response) => {
                const newEmpresas = data.filter((e) => e.id !== empresa.id);
                setData(newEmpresas);
            }).catch((error) => {
                console.log(error);
            });
        }
    }

    const filteredEmpresas = data.filter(data => data.razao_social.toLowerCase().includes(searchValue.toLowerCase()));

    return (
        <div className="empresas">
            <h1>Empresas</h1>
            <div className="table-area">
                <div className='header'>
                    <div className='add-button' onClick={() => setModalOpen(true)} style={{ cursor: 'pointer' }}>
                        <img src={add} alt="Adicionar" />
                        <p>Adicionar Empresa</p>
                    </div>
                    <div className='search-bar'>
                        <input type='text' placeholder='Pesquisar Empresa' value={searchValue} onChange={(e) => [setSearchValue(e.target.value)]} />
                        <img src={search} alt="Pesquisar" style={{ cursor: 'pointer' }} onClick={() => { if (searchValue === '') fetchData(); else setData(filteredEmpresas); }} />
                    </div>
                </div>
                <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
                    <h1>Adicionar Empresa</h1>

                    <form>
                        <label htmlFor="razao_social">Razão Social</label>
                        <input type="text" id="razao_social" name="razao_social" value={razao_social} onChange={(e) => setRazaoSocial(e.target.value)} />

                        <label htmlFor="cnpj">CNPJ</label>
                        <input type="text" id="cnpj" name="cnpj" value={cnpj} maxLength="18" onChange={(e) => handleCnpjChange(e)} />

                        <label htmlFor="nome_fantasia">Nome Fantasia</label>
                        <input type="text" id="nome_fantasia" name="nome_fantasia" value={nome_fantasia} onChange={(e) => setNomefantasia(e.target.value)} />

                        <label htmlFor="setores">Setores</label>
                        {/* <select multiple={true} value={setores} onChange={(e) => {
                            const selectedSetorIds = Array.from(e.target.selectedOptions, option => Number(option.value));
                            setSetores(selectedSetorIds);
                            console.log(setores);
                        }}>
                            {setores.map((setor) => (
                                <option key={setor.id} value={setor.id}>{setor.descricao}</option>
                            ))}
                        </select> */}
                        <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', width: '30vw' }} >
                            {setores.map((setor) => (
                                <div key={setor.id} style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', width: '15vw' }} >
                                    <input type="checkbox" style={{ width: '2vh', flexWrap: 'wrap' }} id={setor.id} value={setor.id} onChange={(e) => {
                                        if (e.target.checked) {
                                            setSelectedSetores([...selectedSetores, setor]);
                                        } else {
                                            setSelectedSetores(selectedSetores.filter((s) => s.id !== setor.id));
                                        }
                                    }} />
                                    <label htmlFor={setor.id}>{setor.descricao}</label>
                                </div>
                            ))}
                        </div>



                        <button type="submit" style={{ cursor: 'pointer' }} onClick={(e) => {
                            e.preventDefault();
                            handleSubmit(e);
                            setModalOpen(false);
                        }} >Adicionar</button>
                        <button type="submit" className="cancelButton" style={{ cursor: 'pointer' }} onClick={(e) => {
                            e.preventDefault();
                            setModalOpen(false);
                            setRazaoSocial('');
                            setCnpj('');
                            setNomefantasia('');
                            setSetores([]);
                        }}>Cancelar</button>
                    </form>
                </Modal>
                <Modal isOpen={isEditModalOpen} onClose={() => setEditModalOpen(false)}>
                    <h1>Editar Empresa</h1>

                    <form>
                        <label htmlFor="razao_social">Razão Social</label>
                        <input type="text" id="razao_social" name="razao_social" value={razao_social} onChange={(e) => setRazaoSocial(e.target.value)} />

                        <label htmlFor="cnpj">CNPJ</label>
                        <input type="text" id="cnpj" name="cnpj" value={cnpj} maxLength="18" onChange={(e) => handleCnpjChange(e)} />

                        <label htmlFor="nome_fantasia">Nome Fantasia</label>
                        <input type="text" id="nome_fantasia" name="nome_fantasia" value={nome_fantasia} onChange={(e) => setNomefantasia(e.target.value)} />

                        <label htmlFor="setores">Setores</label>
                        <select multiple={true} value={setores} onChange={(e) => {
                            const selectedSetorIds = Array.from(e.target.selectedOptions, option => Number(option.value));
                            setSetores(selectedSetorIds);
                        }}>
                            {setores.map((setor) => (
                                <option key={setor.id} value={setor.id}>{setor.descricao}</option>
                            ))}
                        </select>

                        <button type="submit" style={{ cursor: 'pointer' }} onClick={(e) => {
                            e.preventDefault();
                            handleSubmit(e);
                            setEditModalOpen(false);
                        }}>Salvar</button>
                        <button type="submit" className="cancelButton" style={{ cursor: 'pointer' }} onClick={(e) => {
                            e.preventDefault();
                            setEditModalOpen(false);
                            setRazaoSocial('');
                            setCnpj('');
                            setNomefantasia('');
                            setSetores([]);
                            setIsEditing(false);
                        }}>Cancelar</button>
                    </form>
                </Modal>
                <table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Razão Social</th>
                            <th>CNPJ</th>
                            <th>Nome Fantasia</th>
                            <th>Setor(es)</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.sort((a, b) => a.id - b.id).map((empresa) => (
                            <tr key={empresa.id} onClick={() => setSelectedEmpresa(empresa)}>
                                <td>{empresa.id}</td>
                                <td>{empresa.razao_social}</td>
                                <td>{empresa.cnpj.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, '$1.$2.$3/$4-$5')}</td>
                                <td>{empresa.nome_fantasia}</td>
                                <td>{empresa.setores ? empresa.setores.map((setor) => setor.descricao).join(', ') : ''}</td>
                                <td>
                                    <img src={edit} alt="Editar" style={{ cursor: 'pointer' }} onClick={() => handleEdit(empresa)} />
                                    <img src={deleteIcon} alt="Deletar" style={{ cursor: 'pointer' }} onClick={() => handleDelete(empresa)} />
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