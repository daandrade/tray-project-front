import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ListGroup, Container } from 'react-bootstrap';

const SalesList = () => {
  const [vendas, setVendas] = useState([]);

  useEffect(() => {
    carregarVendas();
  }, []);

  const carregarVendas = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/vendas');
      setVendas(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container>
      <h5 className="mt-3 mb-4">Lista de Vendas</h5>

      <ListGroup>
        {vendas.map((venda) => (
          <ListGroup.Item key={venda.id}>
            <p>
              <strong>Nome do Vendedor:</strong> {venda.nome}
            </p>
            {venda.email && (
              <p>
                <strong>Email do Vendedor:</strong> {venda.email}
              </p>
            )}
            <p>
              <strong>Comissão:</strong> R${venda.comissao}
            </p>
            <p>
              <strong>Valor da Venda:</strong> R${venda.valor_da_venda}
            </p>
            <p>
              <strong>Data da Venda:</strong> {venda.data_da_venda}
            </p>
          </ListGroup.Item>
        ))}
      </ListGroup>
      
    </Container>
  );
};

export default SalesList;
