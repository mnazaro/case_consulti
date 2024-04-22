import React, { useState, useEffect } from "react";
import "./styles.css";
import api from "../../services/api";

import add from "../../assets/add_icon.svg";
import search from "../../assets/search.svg";
import deleteIcon from "../../assets/delete_icon.svg";
import edit from "../../assets/edit.svg";
import Modal from "../Modal";


function Empresas() {
    const [data, setData] = useState([]);
    const [isModalOpen, setModalOpen] = useState(false);
    const [cnpj, setCnpj] = useState('');
    const [name, setName] = useState('');
    const [fantasy_name, setFantasyName] = useState('');

    useEffect(() => {
        api.get("/empresa").then((response) => {
            setData(response.data);
        }).catch((error) => {
            console.error("Error fetching data:", error);
        });
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const name = formData.get("name");
        const address = formData.get("address");
        const fantasy_name = formData.get("fantasy_name");

        api.post("/empresa", { name, address, fantasy_name }).then((response) => {
            setData([...data, response.data]);
            setModalOpen(false);
        }).catch((error) => {
            console.error("Error adding data:", error);
        });

        // Limpa os campos do formulário
        setCnpj('');
        setName('');
        setFantasyName('');
    };

    const handleCnpjChange = (event) => {
        let value = event.target.value;
        value = value.replace(/\D/g, ''); // Remove todos os caracteres não numéricos

        if (value.length > 14) {
            console.error('CNPJ incompleto');
            return;
        }

        value = value.replace(/^(\d{2})(\d)/, "$1.$2");
        value = value.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3");
        value = value.replace(/\.(\d{3})(\d)/, ".$1/$2");
        value = value.replace(/(\d{4})(\d)/, "$1-$2");
        setCnpj(value); // Atualiza o estado cnpj
    };

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleFantasyNameChange = (event) => {
        setFantasyName(event.target.value);
    };


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
                        <input type='text' placeholder='Pesquisar Empresa' />
                        <img src={search} alt="Pesquisar" style={{ cursor: 'pointer' }} />
                    </div>
                </div>
                <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
                    <h1>Adicionar Empresa</h1>

                    <form>
                        <label htmlFor="name">Razão Social</label>
                        <input type="text" id="name" name="name" />

                        <label htmlFor="cnpj">CNPJ</label>
                        <input type="text" id="cnpj" name="cnpj" value={cnpj} onChange={handleCnpjChange} maxLength="18" />

                        <label htmlFor="fantasy_name">Nome Fantasia</label>
                        <input type="text" id="fantasy_name" name="fantasy_name" />

                        <button type="submit" onClick={handleSubmit}>Adicionar</button>
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
                        {data.map((empresa) => (
                            <tr key={empresa.id}>
                                <td>{empresa.id}</td>
                                <td>{empresa.name}</td>
                                <td>{empresa.address}</td>
                                {/* Add more table cells as needed */}
                                <td>
                                    <button>
                                        <img src={deleteIcon} alt="Delete" />
                                    </button>
                                    <button>
                                        <img src={edit} alt="Edit" />
                                    </button>
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