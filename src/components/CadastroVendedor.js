import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Col, Alert } from 'react-bootstrap';

const CadastroVendedor = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [cadastrado, setCadastrado] = useState(false);
  const [error, setError] = useState('');

  const cadastrarVendedor = async () => {
    try {
      setLoading(true);

      if (!nome || !email) {
        setError('Por favor, preencha todos os campos.');
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        setError('Por favor, insira um endereço de e-mail válido.');
        return;
      }

      const response = await axios.post('http://localhost:8000/api/vendedores', {
        nome,
        email,
      });

      console.log(response.data);

      setNome('');
      setEmail('');
      setCadastrado(true);
      setError('');
    } catch (error) {
      console.error(error);
      setError('Erro ao cadastrar vendedor. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setNome('');
    setEmail('');
    setCadastrado(false);
    setError('');
  };

  return (
    <div>
      <h5>Cadastro de Vendedor</h5>

      {!cadastrado && (
        <Form>
          <Form.Group controlId="formNome" as={Col} md={4} className="mb-3">
            <Form.Label>Nome Vendedor:</Form.Label>
            <Form.Control type="text" value={nome} onChange={(e) => setNome(e.target.value)} className="form-control-sm" />
          </Form.Group>

          <Form.Group controlId="formEmail" as={Col} md={4} className="mb-3">
            <Form.Label>Email:</Form.Label>
            <Form.Control
              placeholder='miguelandrade@gmail.com'
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control-sm"
            />
          </Form.Group>

          {error && <Alert variant="danger">{error}</Alert>}

          <Button variant="primary" type="button" onClick={cadastrarVendedor} disabled={loading} className="mb-3">
            {loading ? 'Cadastrando...' : 'Cadastrar'}
          </Button>
        </Form>
      )}

      {cadastrado && (
        <div>
          <p>Cadastro realizado com sucesso!</p>
          <Button variant="primary" type="button" onClick={resetForm} className="mb-3">
            Cadastrar Novo
          </Button>
        </div>
      )}
    </div>
  );
};

export default CadastroVendedor;
