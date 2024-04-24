import React from "react";
import "./styles.css";
import Modal from "../Modal";
import add from "../../assets/add_icon.svg";
import axios from "axios";
import edit from "../../assets/edit.svg";
import deleteIcon from "../../assets/delete_icon.svg";


function Setores() {
    const [setores, setSetores] = React.useState([]);
    const [selectedSetor, setSelectedSetor] = React.useState(null);
    const [isModalOpen, setModalOpen] = React.useState(false);
    const [isEditModalOpen, setEditModalOpen] = React.useState(false);
    const [isEditing, setIsEditing] = React.useState(false);
    const [descricao, setDescricao] = React.useState('');

    async function fetchData() {
        await axios.get('http://localhost:5000/setor').then((response) => {
            setSetores(response.data);
        }).catch((error) => {
            console.log(error);
        });
    }

    React.useEffect(() => {
        fetchData();
    }, []);

    //Criar Setor
    const handleSubmit = (event) => {
        event.preventDefault();
        if (isEditing) {
            axios.put(`http://localhost:5000/setor/${selectedSetor.id}`, {
                descricao: descricao
            }).then((response) => {
                setModalOpen(false);
                setDescricao('');
                setIsEditing(false);
                fetchData();
            }).catch((error) => {
                console.log(error);
            });
        } else {
            axios.post('http://localhost:5000/setor', {
                descricao: descricao
            }).then((response) => {
                setModalOpen(false);
                setDescricao('');
                fetchData();
            }).catch((error) => {
                console.log(error);
            });
        }
    }


    //Editar Setor
    const handleEdit = (setor) => {
        setDescricao(setor.descricao);
        setIsEditing(true);
        setEditModalOpen(true);
    }

    //Deletar Setor
    const handleDelete = (setor) => {
        if (window.confirm(`Deseja realmente excluir o setor ${setor.descricao}?`)) {
            axios.delete(`http://localhost:5000/setor/${setor.id}`).then((response) => {
            fetchData();
        }).catch((error) => {
            console.log(error);
        });}
    }


    return (
        <div className='setores'>
            <h1>Setores</h1>
            <div className='area'>
                {setores.sort((a, b) => a.descricao.localeCompare(b.descricao)).map((setor) => (
                    <div className="card" key={setor.id} onClick={() => setSelectedSetor(setor)}>
                        <p>{setor.descricao}</p>
                        {/* <p>Empresas relacionadas: {setor.empresas.length}</p> */}
                        <div className="options">
                            <img src={edit} alt="Editar" style={{ cursor: 'pointer' }} onClick={() => handleEdit(setor)} />
                            <img src={deleteIcon} alt="Deletar" style={{ cursor: 'pointer' }} onClick={() => handleDelete(setor)} />
                        </div>
                    </div>
                ))}
                <div className="card" id="add" onClick={() => setModalOpen(true)}>
                    <img src={add} alt="Adicionar Setor" width={50} height={50} />
                    <p>Adicionar Setor</p>
                </div>
            </div>
            <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
                <h1>Adicionar Setor</h1>
                <form>
                    <label htmlFor="descricao">Descrição</label>
                    <input type="text" id="descricao" name="descricao" value={descricao} onChange={(e) => setDescricao(e.target.value)} />
                    <button type="submit" style={{ cursor: 'pointer' }} onClick={handleSubmit}>Adicionar</button>
                    <button type="submit" className="cancelButton" style={{ cursor: 'pointer' }} onClick={(e) => {
                        e.preventDefault();
                        setModalOpen(false);
                        setDescricao('');
                    }}>Cancelar</button>
                </form>
            </Modal>
            <Modal isOpen={isEditModalOpen} onClose={() => setEditModalOpen(false)}>
                <h1>Editar Setor</h1>
                <form>
                    <label htmlFor="descricao">Descrição</label>
                    <input type="text" id="descricao" name="descricao" value={descricao} onChange={(e) => setDescricao(e.target.value)} />
                    <button type="submit" style={{ cursor: 'pointer' }} onClick={(e) => {
                        e.preventDefault();
                        handleSubmit(e);
                        setEditModalOpen(false);
                    }}>Salvar</button>
                    <button type="submit" className="cancelButton" style={{ cursor: 'pointer' }} onClick={(e) => {
                        e.preventDefault();
                        setEditModalOpen(false);
                        setDescricao('');
                        setIsEditing(false);
                    }}>Cancelar</button>
                </form>
            </Modal>
        </div>
    );
}

export default Setores;