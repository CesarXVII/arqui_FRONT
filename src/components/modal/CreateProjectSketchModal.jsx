import React, { useState } from 'react';
import {
  Modal, Input, Upload, Button, message,
} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';

const CreateProjectSketchModal = ({
  visible, onCancel, onCreate, loading,
}) => {
  const [projectName, setProjectName] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const handleCancel = () => {
    setProjectName('');
    setImageFile(null);
    setImagePreview(null);
    onCancel();
  };

  const handleOk = () => {
    if (!projectName.trim()) {
      message.warning('Por favor ingresa un nombre para el proyecto');
      return;
    }
    if (!imageFile) {
      message.warning('Por favor selecciona una imagen del boceto');
      return;
    }

    onCreate(projectName.trim(), imageFile);
  };

  const handleFileChange = (info) => {
    // eslint-disable-next-line prefer-destructuring
    const file = info.file.originFileObj || info.file;

    const maxFileSize = 5 * 1024 * 1024; // 5MB

    if (file.size > maxFileSize) {
      message.error('La imagen debe ser menor a 5MB');
      return;
    }

    setImageFile(file);

    // Crear preview
    const reader = new FileReader();
    reader.onload = (event) => {
      setImagePreview(event.target.result);
    };
    reader.readAsDataURL(file);
  };

  const uploadProps = {
    accept: 'image/*',
    beforeUpload: () => false,
    onChange: handleFileChange,
    maxCount: 1,
    showUploadList: false,
  };

  return (
    <Modal
      title="Crear Proyecto mediante Boceto"
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
          onPressEnter={handleOk}
          disabled={loading}
        />
      </div>

      <div style={{ marginBottom: 16 }}>
        <label style={{ display: 'block', marginBottom: 8, fontWeight: 500 }}>
          Imagen del Boceto
        </label>
        <Upload {...uploadProps}>
          <Button icon={<UploadOutlined />} disabled={loading}>
            Seleccionar Imagen
          </Button>
        </Upload>
        {imagePreview && (
          <div style={{
            marginTop: 12,
            border: '1px solid #d9d9d9',
            borderRadius: 8,
            padding: 8,
            textAlign: 'center',
          }}
          >
            <img
              src={imagePreview}
              alt="Preview"
              style={{
                maxWidth: '100%',
                maxHeight: 300,
                objectFit: 'contain',
              }}
            />
          </div>
        )}
      </div>

      <div style={{ fontSize: 12, color: '#666', marginTop: 8 }}>
        * Sube una imagen de tu boceto arquitectónico. La IA generará un plano 2D basado en él.
      </div>
    </Modal>
  );
};

CreateProjectSketchModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  onCreate: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default CreateProjectSketchModal;