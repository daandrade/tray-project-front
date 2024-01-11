import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ListGroup, Container } from 'react-bootstrap';

const SellersList = () => {
  const [vendedores, setVendedores] = useState([]);
  const [selectedSeller, setSelectedSeller] = useState(null);

  useEffect(() => {
    carregarVendedores();
  }, []);

  const carregarVendedores = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/vendedores');
      setVendedores(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSellerClick = (seller) => {
    setSelectedSeller(seller);
  };

  return (
    <Container>
      <h5 className="mt-3 mb-4">Lista de Vendedores</h5>

      <ListGroup>
        {vendedores.map((vendedor) => (
          <ListGroup.Item
            key={vendedor.id}
            onClick={() => handleSellerClick(vendedor)}
            active={selectedSeller && selectedSeller.id === vendedor.id}
            action
          >
            <p>
              <strong>Nome:</strong> {vendedor.nome}, <strong>Email:</strong>{' '}
              {vendedor.email} 
            </p>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
};

export default SellersList;
