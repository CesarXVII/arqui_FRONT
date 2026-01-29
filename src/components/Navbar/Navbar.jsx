import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  Row,
  Col,
  Typography,
  Space,
  Tooltip,
  Layout,
  Modal,
  Input,
  message,
} from 'antd';
import {
  LeftOutlined,
  UndoOutlined,
  RedoOutlined,
  SaveOutlined,
  DeleteOutlined,
  ExportOutlined,
  FileTextOutlined,
  CopyOutlined,
  EditOutlined,
  RobotOutlined,
} from '@ant-design/icons';
import jsPDF from 'jspdf';
import * as go from 'gojs';
import styles from './Navbar.module.css';
import { projectService } from '../../services/projectService';
import { usePresupuestoPdf } from '../../hooks/usePresupuestoPdf';

const { Header } = Layout;
const { Title } = Typography;
const { TextArea } = Input;

const Navbar = ({ onlineUsers = [] }) => {
  const navigate = useNavigate();
  const [isJsonModalOpen, setIsJsonModalOpen] = useState(false);
  const [jsonData, setJsonData] = useState('');
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);
  const [projectName, setProjectName] = useState('Proyecto sin nombre');
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [lastSavedJson, setLastSavedJson] = useState('');

  const handleGenerateIAPresupuesto = usePresupuestoPdf();

  useEffect(() => {
    const savedProjectName = localStorage.getItem('current_project_name');
    if (savedProjectName) setProjectName(savedProjectName);

    const savedJson = localStorage.getItem('floorplan_diagram_data');
    if (savedJson) setLastSavedJson(savedJson);
  }, []);

  const updateUndoRedo = () => {
    const diagram = window.floorplanDiagram;
    if (diagram) {
      setCanUndo(diagram.commandHandler.canUndo());
      setCanRedo(diagram.commandHandler.canRedo());
    } else {
      setCanUndo(false);
      setCanRedo(false);
    }
  };

  const checkForUnsavedChanges = () => {
    const diagram = window.floorplanDiagram;
    if (diagram) {
      try {
        const currentJson = diagram.model.toJson();
        setHasUnsavedChanges(currentJson !== lastSavedJson);
      } catch (error) {
        console.error('Error checking for changes:', error);
      }
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      updateUndoRedo();
      checkForUnsavedChanges();
    }, 200);

    return () => clearInterval(interval);
  }, [lastSavedJson]);

  const handleBackToDashboard = () => {
    const diagram = window.floorplanDiagram;
    if (diagram) {
      try {
        localStorage.setItem('floorplan_diagram_data', diagram.model.toJson());
      } catch (error) {
        console.error('Error al guardar antes de salir:', error);
      }
    }
    navigate('/dashboard');
  };

  const handleExport = async () => {
    const diagram = window.floorplanDiagram;
    if (!diagram) {
      message.error('No hay diagrama para exportar');
      return;
    }

    try {
      const fileHandle = await window.showSaveFilePicker({
        suggestedName: 'floorplan',
        types: [
          { description: 'PNG Image', accept: { 'image/png': ['.png'] } },
          { description: 'JPEG Image', accept: { 'image/jpeg': ['.jpg', '.jpeg'] } },
          { description: 'PDF Document', accept: { 'application/pdf': ['.pdf'] } },
        ],
      });

      const fileExt = fileHandle.name.split('.').pop().toLowerCase();
      const writable = await fileHandle.createWritable();

      if (['png', 'jpg', 'jpeg'].includes(fileExt)) {
        const imageData = diagram.makeImageData({
          background: 'white',
          scale: 2,
          type: fileExt === 'png' ? 'image/png' : 'image/jpeg',
        });
        const base64 = imageData.split(',')[1];
        const binary = Uint8Array.from(atob(base64), (c) => c.charCodeAt(0));
        await writable.write(binary);
        await writable.close();
      } else if (fileExt === 'pdf') {
        const imgData = diagram.makeImageData({ background: 'white', scale: 2, type: 'image/jpeg' });
        const bounds = diagram.documentBounds;
        const pdf = new jsPDF({
          orientation: bounds.width * 2 > bounds.height * 2 ? 'l' : 'p',
          unit: 'px',
          format: [bounds.width * 2, bounds.height * 2],
        });
        pdf.addImage(imgData, 'JPEG', 0, 0, bounds.width * 2, bounds.height * 2);
        const blob = pdf.output('blob');
        await writable.write(blob);
        await writable.close();
      }
      message.success(`Diagrama exportado como .${fileExt}`);
    } catch (error) {
      if (error.name !== 'AbortError') {
        console.error('Error de exportación:', error);
        message.error(`Error al exportar: ${error.message}`);
      }
    }
  };

  const handleExportJSON = () => {
    const diagram = window.floorplanDiagram;
    if (!diagram) {
      message.error('No hay diagrama cargado');
      return;
    }
    setJsonData(diagram.model.toJson());
    setIsJsonModalOpen(true);
  };

  const copyJSON = () => {
    navigator.clipboard.writeText(jsonData);
    message.success('JSON copiado al portapapeles');
  };

  const modifyJSON = () => {
    const diagram = window.floorplanDiagram;
    if (!diagram) return;
    try {
      const parsed = JSON.parse(jsonData);
      diagram.model = go.Model.fromJson(parsed);
      message.success('Diagrama actualizado desde JSON');
      setIsJsonModalOpen(false);
    } catch (error) {
      message.error('JSON inválido. Revisa la sintaxis.');
      console.error(error);
    }
  };

  const undo = () => {
    const diagram = window.floorplanDiagram;
    if (diagram && diagram.commandHandler.canUndo()) {
      diagram.commandHandler.undo();
      updateUndoRedo();
    }
  };

  const redo = () => {
    const diagram = window.floorplanDiagram;
    if (diagram && diagram.commandHandler.canRedo()) {
      diagram.commandHandler.redo();
      updateUndoRedo();
    }
  };

  const clearDiagram = () => {
    const diagram = window.floorplanDiagram;
    if (!diagram) return;
    diagram.startTransaction('clearDiagram');
    diagram.clear();
    diagram.model = new go.GraphLinksModel([], []);
    diagram.undoManager.clear();
    diagram.commitTransaction('clearDiagram');
    message.success('Diagrama restablecido');
    updateUndoRedo();
  };

  const handleSaveProject = async () => {
    const diagram = window.floorplanDiagram;
    const projectId = localStorage.getItem('current_project_id');

    if (!diagram) {
      message.error('No hay diagrama para guardar');
      return;
    }

    if (!projectId) {
      message.warning('No hay proyecto abierto. Guarda manualmente.');
      return;
    }

    try {
      const jsonDataLocal = diagram.model.toJson();
      message.loading('Guardando proyecto...', 0);

      const result = await projectService.saveProject(projectId, jsonDataLocal);

      message.destroy();
      message.success(`Proyecto "${localStorage.getItem('current_project_name')}" guardado exitosamente`);

      setLastSavedJson(jsonDataLocal);
      setHasUnsavedChanges(false);
      console.log('Respuesta del servidor:', result);
    } catch (error) {
      message.destroy();
      message.error('Error al guardar el proyecto');
      console.error(error);
    }
  };

  const renderOnlineUsers = () => {
    if (!onlineUsers || onlineUsers.length === 0) return <span className={styles.onlineUserItemEmpty}>Solo tú</span>;

    return onlineUsers.map((u) => (
      <Tooltip key={u.id} title={u.isMe ? 'Tú' : u.name} placement="top">
        <div
          className={styles.onlineUserAvatar}
          style={{ backgroundColor: u.color || '#52c41a' }}
        >
          {u.isMe ? 'Tú' : u.name.charAt(0).toUpperCase()}
        </div>
      </Tooltip>
    ));
  };

  return (
    <Header className={styles.topHeader}>
      <Row justify="space-between" align="middle" style={{ width: '100%' }}>
        <Col>
          <Space size="middle" align="center">
            <Button type="text" icon={<LeftOutlined />} className={styles.dashboardButton} onClick={handleBackToDashboard}>
              Dashboard
            </Button>

            <Tooltip title="Limpiar" classNames={{ root: styles.customTooltip }}>
              <Button type="text" icon={<DeleteOutlined />} onClick={clearDiagram} />
            </Tooltip>

            <Tooltip title="Deshacer" classNames={{ root: styles.customTooltip }}>
              <Button type="text" icon={<UndoOutlined />} onClick={undo} disabled={!canUndo} />
            </Tooltip>

            <Tooltip title="Rehacer" classNames={{ root: styles.customTooltip }}>
              <Button type="text" icon={<RedoOutlined />} onClick={redo} disabled={!canRedo} />
            </Tooltip>

            <Tooltip title="Guardar" classNames={{ root: styles.customTooltip }}>
              <Button
                type="text"
                icon={<SaveOutlined />}
                onClick={handleSaveProject}
                disabled={!hasUnsavedChanges}
                style={{
                  color: hasUnsavedChanges ? 'var(--navbar-icon-color)' : '#d9d9d9',
                  cursor: hasUnsavedChanges ? 'pointer' : 'not-allowed',
                }}
              />
            </Tooltip>

            <Title level={5} className={styles.projectTitle}>{projectName}</Title>
          </Space>
        </Col>

        <Col style={{ marginLeft: 'auto' }}>
          <Space size="small" align="center">
            <div className={styles.onlineUsersChip}>
              <span className={styles.onlineUsersLabel}>
                En línea{onlineUsers.length ? ` (${onlineUsers.length})` : ''}:
              </span>
              <div className={styles.onlineUsersList}>{renderOnlineUsers()}</div>
            </div>

            <Tooltip title="Generar presupuesto basado en el plano con IA">
              <Button
                type="primary"
                icon={<RobotOutlined />}
                className={styles.iaButton}
                onClick={handleGenerateIAPresupuesto}
              >
                Presupuesto IA
              </Button>
            </Tooltip>

            <Button type="primary" icon={<ExportOutlined />} className={styles.exportButton} onClick={handleExport}>
              Export Image
            </Button>

            <Button type="primary" icon={<FileTextOutlined />} className={styles.exportButton} onClick={handleExportJSON}>
              JSON
            </Button>
          </Space>
        </Col>
      </Row>

      <Modal
        title="Exportar / Modificar JSON del Diagrama"
        open={isJsonModalOpen}
        onCancel={() => setIsJsonModalOpen(false)}
        footer={[
          <Button key="copy" icon={<CopyOutlined />} onClick={copyJSON}>Copiar JSON</Button>,
          <Button key="modify" icon={<EditOutlined />} type="primary" onClick={modifyJSON}>Modificar JSON</Button>,
          <Button key="close" onClick={() => setIsJsonModalOpen(false)}>Cerrar</Button>,
        ]}
        width={700}
        className={styles.floatingJsonModal}
        mask={false}
      >
        <TextArea
          value={jsonData}
          onChange={(e) => setJsonData(e.target.value)}
          autoSize={{ minRows: 12, maxRows: 20 }}
          onPaste={(e) => e.stopPropagation()}
        />
      </Modal>
    </Header>
  );
};

export default Navbar;