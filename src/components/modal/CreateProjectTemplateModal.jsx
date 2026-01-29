import React, { useState, useEffect } from 'react';
import {
  Modal, Input, message, Spin, Card, Row, Col,
} from 'antd';
import PropTypes from 'prop-types';
import { projectService } from '../../services/projectService';

const CreateProjectTemplateModal = ({
  visible, onCancel, onCreate, loading,
}) => {
  const [projectName, setProjectName] = useState('');
  const [templates, setTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [loadingTemplates, setLoadingTemplates] = useState(false);

  useEffect(() => {
    if (visible) {
      loadTemplates();
    }
  }, [visible]);

  const loadTemplates = async () => {
    setLoadingTemplates(true);
    try {
      const templatesData = await projectService.getAllTemplates();
      setTemplates(templatesData);
    } catch (error) {
      message.error('Error al cargar las plantillas');
      // eslint-disable-next-line no-console
      console.error(error);
    } finally {
      setLoadingTemplates(false);
    }
  };

  const handleCancel = () => {
    setProjectName('');
    setSelectedTemplate(null);
    onCancel();
  };

  const handleOk = () => {
    if (!projectName.trim()) {
      message.warning('Por favor ingresa un nombre para el proyecto');
      return;
    }
    if (!selectedTemplate) {
      message.warning('Por favor selecciona una plantilla');
      return;
    }

    onCreate(projectName.trim(), selectedTemplate);
  };

  return (
    <Modal
      title="Crear Proyecto desde Plantilla"
      open={visible}
      onOk={handleOk}
      onCancel={handleCancel}
      confirmLoading={loading}
      okText="Crear Proyecto"
      cancelText="Cancelar"
      width={900}
      style={{ top: 20 }}
      bodyStyle={{
        maxHeight: 'calc(100vh - 200px)',
        overflowY: 'auto',
        paddingBottom: 24,
      }}
      okButtonProps={{
        style: {
          backgroundColor: '#1890ff',
          borderColor: '#1890ff',
        },
      }}
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
          Selecciona una Plantilla
        </label>
        {loadingTemplates ? (
          <div style={{ textAlign: 'center', padding: '40px 0' }}>
            <Spin tip="Cargando plantillas..." />
          </div>
        ) : (
          <Row gutter={[16, 16]}>
            {templates.map((template) => (
              <Col span={8} key={template.id}>
                <Card
                  hoverable
                  onClick={() => setSelectedTemplate(template)}
                  style={{
                    border: selectedTemplate?.id === template.id ? '2px solid #1890ff' : '1px solid #d9d9d9',
                    cursor: 'pointer',
                    backgroundColor: '#f5f5f5',
                  }}
                  bodyStyle={{ padding: 12 }}
                  cover={(
                    <div style={{ padding: '12px 12px 0 12px' }}>
                      {template.imagen_base64 ? (
                        <img
                          alt={template.nombre}
                          src={`data:image/png;base64,${template.imagen_base64}`}
                          style={{
                            height: 120,
                            width: '100%',
                            objectFit: 'cover',
                            borderRadius: '4px',
                          }}
                        />
                      ) : (
                        <div
                          style={{
                            height: 120,
                            background: '#e0e0e0',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: '4px',
                          }}
                        >
                          Sin imagen
                        </div>
                      )}
                    </div>
                  )}
                >
                  <Card.Meta
                    title={<div style={{ fontSize: 13, color: '#333' }}>{template.nombre}</div>}
                    description={<span style={{ color: '#000', fontWeight: 600 }}>Bs {template.precio}</span>}
                  />
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </div>

      {templates.length === 0 && !loadingTemplates && (
        <div style={{ textAlign: 'center', padding: '20px 0', color: '#999' }}>
          No hay plantillas disponibles
        </div>
      )}
    </Modal>
  );
};

CreateProjectTemplateModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  onCreate: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default CreateProjectTemplateModal;