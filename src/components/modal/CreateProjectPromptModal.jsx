import React, { useState } from 'react';
import { Modal, Input, message } from 'antd';
import PropTypes from 'prop-types';

const { TextArea } = Input;

const CreateProjectPromptModal = ({
  visible, onCancel, onCreate, loading,
}) => {
  const [projectName, setProjectName] = useState('');
  const [prompt, setPrompt] = useState('');

  const handleCancel = () => {
    setProjectName('');
    setPrompt('');
    onCancel();
  };

  const handleOk = () => {
    if (!projectName.trim()) {
      message.warning('Por favor ingresa un nombre para el proyecto');
      return;
    }
    if (!prompt.trim()) {
      message.warning('Por favor describe el plano que deseas generar');
      return;
    }

    onCreate(projectName.trim(), prompt.trim());
  };

  return (
    <Modal
      title="Crear Proyecto mediante Prompt"
      open={visible}
      onOk={handleOk}
      onCancel={handleCancel}
      confirmLoading={loading}
      okText="Generar con IA"
      cancelText="Cancelar"
      width={500}
    >
      <div style={{ marginBottom: 16 }}>
        <label style={{ display: 'block', marginBottom: 8, fontWeight: 500 }}>
          Nombre del Proyecto
        </label>
        <Input
          placeholder="Ingrese el nombre del proyecto"
          value={projectName}
          onChange={(event) => setProjectName(event.target.value)}
          disabled={loading}
        />
      </div>

      <div style={{ marginBottom: 16 }}>
        <label style={{ display: 'block', marginBottom: 8, fontWeight: 500 }}>
          Descripción del Plano
        </label>
        <TextArea
          placeholder="Ejemplo: Crea un plano simple con cocina, 2 habitaciones, sala de estar y baño"
          value={prompt}
          onChange={(event) => setPrompt(event.target.value)}
          disabled={loading}
          rows={4}
          maxLength={500}
          showCount
        />
      </div>

      <div style={{ fontSize: 12, color: '#666', marginTop: 8 }}>
        * Describe las habitaciones y espacios que deseas en tu plano. La IA lo generará automáticamente.
      </div>
    </Modal>
  );
};

CreateProjectPromptModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  onCreate: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default CreateProjectPromptModal;