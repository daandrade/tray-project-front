import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button, Col } from 'react-bootstrap';

const NovaVendaForm = () => {
  const [vendedores, setVendedores] = useState([]);
  const [selectedVendedor, setSelectedVendedor] = useState('');
  const [valorDaVenda, setValorDaVenda] = useState('');
  const [loading, setLoading] = useState(false);
  const [vendedorError, setVendedorError] = useState('');
  const [valorVendaError, setValorVendaError] = useState('');

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

  const handleVendedorChange = (e) => {
    setSelectedVendedor(e.target.value);
  };

  const validarFormulario = () => {
    let formValido = true;

    if (!selectedVendedor) {
      setVendedorError('Selecione um vendedor');
      formValido = false;
    } else {
      setVendedorError('');
    }

    if (!valorDaVenda) {
      setValorVendaError('Informe o valor da venda');
      formValido = false;
    } else {
      setValorVendaError('');
    }

    return formValido;
  };

  const cadastrarNovaVenda = async () => {
    try {
      setLoading(true);

      const comissao = parseFloat(valorDaVenda) * 0.085;

      const vendedorSelecionado = vendedores.find((vendedor) => vendedor.id === parseInt(selectedVendedor, 10));
      const nomeVendedor = vendedorSelecionado ? vendedorSelecionado.nome : 'Vendedor Desconhecido';
      const emailVendedor = vendedorSelecionado ? vendedorSelecionado.email : 'vendedor@dominio.com';

      const response = await axios.post('http://localhost:8000/api/vendas', {
        vendedor_id: selectedVendedor,
        nome: nomeVendedor,
        email: emailVendedor,
        valor_da_venda: parseFloat(valorDaVenda),
        comissao: comissao,
        data_da_venda: new Date().toISOString().split('T')[0],
      });

      console.log('Resposta da requisição:', response.data);

      setSelectedVendedor('');
      setValorDaVenda('');

    } catch (error) {
      console.error('Erro ao cadastrar nova venda:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleClick = () => {
    if (validarFormulario()) {
      cadastrarNovaVenda();
    }
  };

  return (
    <div>
      <h5>Lançar Venda</h5>
      <Form>
        <Form.Group controlId="formVendedor" as={Col} md={2} className="mb-3">
          <Form.Label>Vendedor:</Form.Label>
          <Form.Control as="select" onChange={handleVendedorChange} value={selectedVendedor} className="form-control-sm" style={{ width: '100%' }}>
            <option value="" disabled>
              Selecione um vendedor
            </option>
            {vendedores.map((vendedor) => (
              <option key={vendedor.id} value={vendedor.id}>
                {vendedor.nome}
              </option>
            ))}
          </Form.Control>
          <div className="text-danger">{vendedorError}</div>
        </Form.Group>

        <Form.Group controlId="formValorVenda" as={Col} md={2} className="mb-3">
          <Form.Label>Valor da Venda:</Form.Label>
          <Form.Control placeholder="R$ 0,00" type="number" value={valorDaVenda} onChange={(e) => setValorDaVenda(e.target.value)} className="form-control-sm" style={{ width: '100%' }} />
          <div className="text-danger">{valorVendaError}</div>
        </Form.Group>

        <Button variant="primary" className="mb-3" size="sm" onClick={handleClick} disabled={loading}>
          {loading ? 'Lançando Venda...' : 'Lançar Venda'}
        </Button>
      </Form>
    </div>
  );
};

export default NovaVendaForm;
