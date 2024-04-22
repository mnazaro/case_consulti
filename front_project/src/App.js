import React from 'react';
import './App.css';

import Empresas from './components/Empresas';
import Setores from './components/Setores';

import logo from './assets/consulti_logo.svg';
import empresas from './assets/empresas.svg';
import setores from './assets/setores.svg';




function App() {
  const [showEmpresas, setShowEmpresas] = React.useState(true);

  const handleToggleContent = () => {
    setShowEmpresas(!showEmpresas);
  };

  return (
    <div className="container">
      <div className="sidebar">
        <img src={logo} alt="Logo Consulti" />
        <div className="sidebar-menu">
          <h1>Menu</h1>
          <div className="menu-item">
            <img src={empresas} alt="Empresas"/>
            <button onClick={handleToggleContent}>Empresas</button>
          </div>
          <div className="menu-item">
            <img src={setores} alt="Setores" />
            <button onClick={handleToggleContent}>Setores</button>
          </div>
        </div>
      </div>
      <div className='content'>
        {showEmpresas ? <Empresas /> : <Setores />}
      </div>
    </div>
  );
}

export default App;
