import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import CadastroVendedor from './components/CadastroVendedor';
import SellersList from './components/SellersList';
import NovaVendaForm from './components/NovaVendaForm';
import SalesList from './components/SalesList';

const App = () => {
  const [currentPage, setCurrentPage] = useState('cadastro-vendedor');

  const renderPage = () => {
    switch (currentPage) {
      case 'cadastro-vendedor':
        return <CadastroVendedor />;
      case 'sellers-list':
        return <SellersList />;
      case 'nova-venda-form':
        return <NovaVendaForm />;
      case 'sales-list':
        return <SalesList />;
      default:
        return null;
    }
  };

  return (
    <div>
      <nav>
        <ul>
          <li onClick={() => setCurrentPage('cadastro-vendedor')}>Cadastro de Vendedor</li>
          <li onClick={() => setCurrentPage('sellers-list')}>Lista de Vendedores</li>
          <li onClick={() => setCurrentPage('nova-venda-form')}>Nova Venda</li>
          <li onClick={() => setCurrentPage('sales-list')}>Lista de Vendas</li>
        </ul>
      </nav>
      {renderPage()}
    </div>
  );
};

export default App;
