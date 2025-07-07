import React, { useState, useEffect } from 'react';

const PetForm = ({ pets, addPet, updatePet, removePet, prevStep, handleSubmit }) => {
  const [petData, setPetData] = useState({
    nome: '',
    tipo: '',
    raca: '',
    aniversario: '',
    idade: '',
    cor: '',
    porte: '',
    observacoes: ''
  });

  const [editingIndex, setEditingIndex] = useState(null);

  useEffect(() => {
    // Sempre que pets mudar, se estiver editando, atualiza petData para refletir possíveis mudanças externas
    if (editingIndex !== null && pets[editingIndex]) {
      setPetData(pets[editingIndex]);
    }
  }, [editingIndex, pets]);

  const handlePetChange = (e) => {
    const { name, value } = e.target;
    setPetData({ ...petData, [name]: value });
  };

  const handleAddOrUpdatePet = () => {
    if (editingIndex !== null) {
      // Atualiza pet existente
      updatePet(editingIndex, petData);
      setEditingIndex(null);
    } else {
      // Adiciona pet novo
      addPet(petData);
    }
    // Limpa formulário
    setPetData({
      nome: '',
      tipo: '',
      raca: '',
      aniversario: '',
      idade: '',
      cor: '',
      porte: '',
      observacoes: ''
    });
  };

  const handleEditClick = (index) => {
    setEditingIndex(index);
    setPetData(pets[index]);
  };

  const handleCancelEdit = () => {
    setEditingIndex(null);
    setPetData({
      nome: '',
      tipo: '',
      raca: '',
      aniversario: '',
      idade: '',
      cor: '',
      porte: '',
      observacoes: ''
    });
  };

  return (
    <div>
      <h5 className='padding-bottom-20 color-dark-blue'>Informações do Pet</h5>
      {pets.map((pet, index) => (
        <div key={index} style={{ marginBottom: '10px' }}>
          <p>{pet.nome} ({pet.tipo})</p>
          <button type="button" onClick={() => handleEditClick(index)}>Editar</button>{' '}
          <button type="button" onClick={() => removePet(index)}>Remover</button>
        </div>
      ))}
      <div className='client-register-container'>
        <form className="form-client" onSubmit={e => e.preventDefault()}>
          <div className="form-group">
            <label>Nome do Pet:</label>
            <input className="input-register" type="text" name="nome" value={petData.nome} onChange={handlePetChange} />
          </div>
          <div className="form-group">
            <label>Tipo de Pet:</label>
            <input className="input-register" type="text" name="tipo" value={petData.tipo} onChange={handlePetChange} />
          </div>
          <div className="form-group">
            <label>Raça:</label>
            <input className="input-register" type="text" name="raca" value={petData.raca} onChange={handlePetChange} />
          </div>
          <div className="form-group">
            <label>Data de Nascimento:</label>
            <input className="input-register" type="date" name="aniversario" value={petData.aniversario} onChange={handlePetChange} />
          </div>
          <div className="form-group">
            <label>Idade:</label>
            <input className="input-register" type="text" name="idade" value={petData.idade} onChange={handlePetChange} />
          </div>
          <div className="form-group">
            <label>Cor:</label>
            <input className="input-register" type="text" name="cor" value={petData.cor} onChange={handlePetChange} />
          </div>
          <div className="form-group">
            <label>Porte:</label>
            <input className="input-register" type="text" name="porte" value={petData.porte} onChange={handlePetChange} />
          </div>
          <div className="form-group padding-bottom-40">
            <label>Observações:</label>
            <input className="input-register" type="text" name="observacoes" value={petData.observacoes} onChange={handlePetChange} />
          </div>
          <button className='button' type="button" onClick={handleAddOrUpdatePet}>
            {editingIndex !== null ? 'Salvar Alterações' : '+ Adicionar Pet'}
          </button>
          {editingIndex !== null && (
            <button className='button-back' type="button" onClick={handleCancelEdit} style={{ marginLeft: '10px' }}>
              Cancelar
            </button>
          )}
        </form>
      </div>
      <div className='padding-bottom-20'>
        <button className="button" type="button" onClick={handleSubmit}>
          {pets.length > 0 ? 'Atualizar Informações' : 'Concluir Cadastro'}
        </button>
      </div>
      <div>
        <button className="button-back" type="button" onClick={prevStep}>&laquo; Voltar</button>
      </div>
    </div>
  );
};

export default PetForm;
