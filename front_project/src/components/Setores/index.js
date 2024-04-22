import React from "react";
import "./styles.css";
import Modal from "../Modal";
import add from "../../assets/add_icon.svg";


function Setores() {
    const [isOpen, setIsOpen] = React.useState(false);
    const [setores, setSetores] = React.useState([]);
    const [selectedSetor, setSelectedSetor] = React.useState(null);
    const [isModalOpen, setModalOpen] = React.useState(false);
    const [descricao, setDescricao] = React.useState('');

    React.useEffect(() => {
        async function fetchData() {
            const response = await fetch('http://localhost:5000/setores');
            const data = await response.json();
            setSetores(data);
        }
        fetchData();
    }
    , []);

    return (
        <div className='setores'>
            <h1>Setores</h1>
            <div className='area'>
                {setores.map((setor) => (
                    <div className="card" key={setor.id} onClick={() => setSelectedSetor(setor)}>
                        <p>{setor.descricao}</p>
                        <p>Empresas relacionadas: {setor.empresas.length}</p>
                    </div>
                ))}

                <div className="card">
                    <p>Descrição Setor</p>
                    <p>Empresas relacionadas: 14</p>
                </div>
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
                    <button type="submit" style={{ cursor: 'pointer' }}>Adicionar</button>
                </form>
            </Modal>
        </div>
    );
}

export default Setores;