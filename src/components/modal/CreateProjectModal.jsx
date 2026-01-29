import React, { useState } from 'react';
import { Modal, Input } from 'antd';
import PropTypes from 'prop-types';

const CreateProjectModal = ({
  visible, onCancel, onCreate, loading,
}) => {
  const [projectName, setProjectName] = useState('');

  const handleOk = async () => {
    const success = await onCreate(projectName);
    if (success) {
      setProjectName('');
    }
  };

  const handleCancel = () => {
    setProjectName('');
    onCancel();
  };

  return (
    <Modal
      title="Crear Nuevo Proyecto"
      open={visible}
      onOk={handleOk}
      onCancel={handleCancel}
      confirmLoading={loading}
      okText="Crear"
      cancelText="Cancelar"
    >
      <div style={{ marginBottom: '16px' }}>
        <label
          style={{
            display: 'block', marginBottom: '8px', fontWeight: '500',
          }}
        >
          Nombre del Proyecto:
        </label>
        <Input
          placeholder="Ej: Mi Casa Moderna"
          value={projectName}
          onChange={(event) => setProjectName(event.target.value)}
          onPressEnter={handleOk}
          maxLength={100}
          autoFocus
        />
      </div>
    </Modal>
  );
};

CreateProjectModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  onCreate: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default CreateProjectModal;