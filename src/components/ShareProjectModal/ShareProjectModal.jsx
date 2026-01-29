import React, { useState } from 'react';
import {
  Modal, Button, Input, Radio, Select, Space, message, Typography,
} from 'antd';
import PropTypes from 'prop-types';
import styles from './ShareProjectModal.module.css';
import { shareService } from '../../services/shareService';

const { Text } = Typography;

const opcionesExpiracion = [
  { label: '1 día', value: 1 },
  { label: '7 días', value: 7 },
  { label: '30 días', value: 30 },
  { label: 'Sin expiración', value: null },
];

const ShareProjectModal = ({ open, onClose, proyectoId }) => {
  const [permission, setPermission] = useState('write');
  const [expiresInDays, setExpiresInDays] = useState(7);
  const [shareUrl, setShareUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [disabling, setDisabling] = useState(false);

  const handleGenerate = async () => {
    if (!proyectoId) {
      return message.error('No se obtuvo el ID del proyecto');
    }
    try {
      setLoading(true);
      const url = await shareService.generateShareLink(proyectoId, permission, expiresInDays);

      setShareUrl(url);
      message.success('Link de proyecto generado');
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
      message.error(err.message || 'No se pudo generar el link');
    } finally {
      setLoading(false);
    }
    return null;
  };

  const handleDisable = async () => {
    if (!proyectoId) {
      return message.error('No se obtuvo el ID del proyecto');
    }
    try {
      setDisabling(true);
      await shareService.disableShareLinks(proyectoId);

      setShareUrl('');
      message.success('Links desactivados');
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
      message.error(err.message || 'No se pudieron desactivar los links');
    } finally {
      setDisabling(false);
    }
    return null;
  };

  const handleCopy = async () => {
    if (!shareUrl) return;
    try {
      await navigator.clipboard.writeText(shareUrl);
      message.success('Link copiado al portapapeles');
    } catch {
      message.warning('No se pudo copiar automáticamente, copia el texto manualmente.');
    }
  };

  const handleClose = () => onClose?.();

  return (
    <Modal
      open={open}
      onCancel={handleClose}
      title={<div className={styles.modalTitle}>Compartir Proyecto</div>}
      footer={null}
      destroyOnClose
      className={styles.modal}
      width={450}
      height={300}
    >
      <div className={styles.modalContent}>
        <div className={styles.columns}>
          <div className={styles.column}>
            <Text strong className={styles.label}>Permisos del enlace</Text>
            <Radio.Group
              value={permission}
              onChange={(event) => setPermission(event.target.value)}
            >
              <Radio value="read">Solo lectura</Radio>
              <Radio value="write">Puede editar</Radio>
            </Radio.Group>
          </div>
          <div className={styles.column}>
            <Text strong className={styles.label}>Expiración</Text>
            <Select
              value={expiresInDays}
              onChange={setExpiresInDays}
              options={opcionesExpiracion}
              className={styles.select}
            />
          </div>
        </div>

        <div className={styles.buttonGroup}>
          <Button
            loading={loading}
            onClick={handleGenerate}
            className={`${styles.exportButton}`}
          >
            Generar link
          </Button>
          <Button
            loading={disabling}
            onClick={handleDisable}
            className={`${styles.exportButton}`}
          >
            Desactivar links
          </Button>
        </div>

        {shareUrl && (
          <div className={styles.generatedLink}>
            <Text strong className={styles.label}>Link generado</Text>
            <Space.Compact block className={styles.linkContainer}>
              <Input value={shareUrl} readOnly className={styles.linkInput} />
              <Button type="button" onClick={handleCopy} className={styles.copyButton}>Copiar</Button>
            </Space.Compact>
          </div>
        )}
      </div>
    </Modal>
  );
};

ShareProjectModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  proyectoId: PropTypes.string.isRequired,
};

export default ShareProjectModal;