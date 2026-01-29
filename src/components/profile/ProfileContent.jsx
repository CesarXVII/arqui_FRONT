import React, { useState, useEffect, useCallback } from 'react';
import {
  Button, Card, message, Spin, Modal,
} from 'antd';
import {
  PlusOutlined, CreditCardOutlined, DeleteOutlined, ExclamationCircleOutlined,
} from '@ant-design/icons';
import styles from './ProfileContent.module.css';
import AddCardModal from '../modal/AddCardModal';
import { cardService } from '../../services/cardService';

const { confirm } = Modal;

const ProfileContent = ({ usuario }) => {
  const { id } = usuario || {};
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [deletingCardId, setDeletingCardId] = useState(null);

  const fetchCards = useCallback(async () => {
    if (!id) return;

    setLoading(true);
    try {
      const data = await cardService.fetchUserCards(id);
      setCards(data);
    } catch (error) {
      message.error('Error al cargar las tarjetas');
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchCards();
  }, [fetchCards]);

  const handleAddCard = () => {
    setIsModalVisible(true);
  };

  const handleCardAdded = () => {
    fetchCards();
    setIsModalVisible(false);
  };

  const handleDeleteCard = (cardId, cardLast4) => {
    confirm({
      title: '¿Estás seguro de eliminar esta tarjeta?',
      icon: <ExclamationCircleOutlined />,
      content: `Se eliminará la tarjeta terminada en ${cardLast4}`,
      okText: 'Sí, eliminar',
      okType: 'danger',
      cancelText: 'Cancelar',
      onOk: async () => {
        setDeletingCardId(cardId);
        try {
          await cardService.deleteCard(cardId);

          message.success('Tarjeta eliminada correctamente');
          fetchCards();
        } catch (error) {
          message.error('Error al eliminar la tarjeta');
          console.error(error);
        } finally {
          setDeletingCardId(null);
        }
      },
    });
  };

  const getCardIcon = (marca) => {
    const icons = {
      visa: '💳',
      mastercard: '💳',
      amex: '💳',
      discover: '💳',
      diners: '💳',
      jcb: '💳',
    };
    return icons[marca?.toLowerCase()] || '💳';
  };

  return (
    <div className={styles.profileWrapper}>
      <div className={styles.profileContent}>
        <div className={styles.userSection}>
          <div
            className={styles.largeAvatar}
            style={{ backgroundColor: usuario.color }}
          >
            {usuario.sigla}
          </div>
          <h2 className={styles.userName}>{usuario.correo}</h2>
          <div className={styles.userPlan}>{usuario.plan}</div>
        </div>

        <div className={styles.infoSection}>
          <h3 className={styles.sectionTitle}>Información Personal</h3>
          <div className={styles.infoGrid}>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Correo electrónico:</span>
              <span className={styles.infoValue}>{usuario.correo}</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Plan actual:</span>
              <span className={styles.infoValue}>{usuario.plan}</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Nombre completo:</span>
              <span className={styles.infoValue}>{usuario.nombre || 'No disponible'}</span>
            </div>
          </div>
        </div>

        <div className={styles.cardsSection}>
          <div className={styles.cardsSectionHeader}>
            <h3 className={styles.sectionTitle}>Métodos de Pago</h3>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={handleAddCard}
              className={styles.addCardButton}
            >
              Agregar Tarjeta
            </Button>
          </div>

          {loading ? (
            <div className={styles.loadingCards}>
              <Spin />
            </div>
          ) : cards.length === 0 ? (
            <div className={styles.emptyCards}>
              <CreditCardOutlined className={styles.emptyIcon} />
              <p>No tienes tarjetas registradas</p>
              <Button
                type="link"
                onClick={handleAddCard}
              >
                Agregar tu primera tarjeta
              </Button>
            </div>
          ) : (
            <div className={styles.cardsGrid}>
              {cards.map((card) => (
                <Card key={card.id} className={styles.cardItem}>
                  <Button
                    type="text"
                    danger
                    icon={<DeleteOutlined />}
                    className={styles.deleteButton}
                    onClick={() => handleDeleteCard(card.id, card.ultimos4)}
                    loading={deletingCardId === card.id}
                    disabled={deletingCardId !== null}
                  />
                  <div className={styles.cardHeader}>
                    <span className={styles.cardIcon}>
                      {getCardIcon(card.marca)}
                    </span>
                    <span className={styles.cardBrand}>
                      {card.marca?.toUpperCase()}
                    </span>
                  </div>
                  <div className={styles.cardNumber}>
                    •••• •••• ••••
                    {' '}
                    {card.ultimos4}
                  </div>
                  {card.nombrePropietario && (
                    <div className={styles.cardOwner}>
                      {card.nombrePropietario}
                    </div>
                  )}
                  <div className={styles.cardFooter}>
                    <span className={styles.cardExpiry}>
                      {String(card.expMes).padStart(2, '0')}
                      /
                      {card.expAno}
                    </span>
                    <span className={styles.cardType}>
                      {card.tipo}
                    </span>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>

      <AddCardModal
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onSuccess={handleCardAdded}
        usuarioId={id}
      />
    </div>
  );
};

export default ProfileContent;