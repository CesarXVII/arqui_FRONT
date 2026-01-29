import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import styles from './LoginPago.module.css';
import userService from '../../services/userService';

const LoginPago = ({ onClose, selectedPlan }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showCardModal, setShowCardModal] = useState(false);
  const [cards, setCards] = useState([]);
  const [currentUserId, setCurrentUserId] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const data = await userService.loginUser({ correo: email, password });

      if (!data) {
        toast.error('Usuario o contraseña incorrectos', { autoClose: 2000 });
        return;
      }

      localStorage.setItem('usuario', JSON.stringify(data));
      localStorage.setItem('user_name', data.nombre || data.correo.split('@')[0]);
      localStorage.setItem('user_email', data.correo);
      localStorage.setItem('user_id', String(data.id));
      const userId = data.id;

      const planData = await userService.getUserPlan(userId);

      if (planData.plan === 'Premium') {
        toast.info('Ya estás suscrito al plan Premium', { autoClose: 3000 });
        onClose();
      } else if (selectedPlan) {
        await handleShowCards(userId);
      } else {
        onClose();
      }
    } catch (err) {
      console.error('Error en login:', err);
      toast.error(err.message || 'Error al iniciar sesión', { autoClose: 2000 });
    }
  };

  const handleShowCards = async (userId) => {
    try {
      const cardsData = await userService.getUserCards(userId);
      setCards(cardsData);
      setCurrentUserId(userId);
      setShowCardModal(true);
    } catch (error) {
      console.error('Error al obtener tarjetas:', error);
      toast.error('Error al cargar tarjetas', { autoClose: 2000 });
    }
  };

  const handlePayment = async (tarjetaId) => {
    try {
      const monto = selectedPlan?.priceValue ?? 0;
      if (monto <= 0) {
        toast.error('Monto inválido para el pago', { autoClose: 2000 });
        return;
      }

      const paymentData = await userService.registerPayment({
        usuarioId: currentUserId,
        tarjetaId,
        monto,
      });

      if (paymentData.message === 'Pago realizado con éxito') {
        const updatePlanData = await userService.updateUserPlan({
          usuarioId: currentUserId,
          plan: 'Premium',
        });

        if (updatePlanData.mensaje === 'Plan actualizado correctamente') {
          toast.success('Suscripción realizada con éxito', { autoClose: 3000 });
          setShowCardModal(false);
          onClose();
        }
      }
    } catch (error) {
      console.error('Error al procesar pago:', error);
      toast.error('Error al procesar el pago', { autoClose: 2000 });
    }
  };

  const handleForgotPasswordClick = (e) => {
    e.preventDefault();
    onClose();
  };

  return (
    <>
      <div className={styles.modalOverlay} onClick={onClose} role="presentation">
        <div
          className={styles.modalContent}
          onClick={(e) => e.stopPropagation()}
          role="presentation"
        >
          <div className={styles.formColumn}>
            <button className={styles.closeButton} onClick={onClose} type="button">
              &times;
            </button>
            <h2 className={styles.heading}>BIENVENIDO, ¿Estás suscrito?</h2>
            <h1 className={styles.mainTitle}>Inicia sesión para verificar</h1>
            <form onSubmit={handleLogin}>
              <div className={styles.inputGroup}>
                <label className={styles.label} htmlFor="email">
                  Correo electrónico
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="tucorreo@email.com"
                  className={styles.inputField}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className={styles.inputGroup}>
                <label className={styles.label} htmlFor="password">
                  Contraseña
                </label>
                <input
                  id="password"
                  type="password"
                  placeholder="Ingresa la contraseña"
                  className={styles.inputField}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className={styles.loginButton}>
                INICIAR SUSCRIPCION
              </button>
            </form>
          </div>
        </div>
      </div>

      {showCardModal && (
        <div
          className={styles.modalOverlay}
          onClick={() => setShowCardModal(false)}
          role="presentation"
        >
          <div
            className={styles.cardModalContent}
            onClick={(e) => e.stopPropagation()}
            role="presentation"
          >
            <button
              className={styles.closeButton}
              onClick={() => setShowCardModal(false)}
              type="button"
            >
              &times;
            </button>
            <h2 className={styles.cardModalTitle}>
              Selecciona una tarjeta para completar tu suscripción
              {selectedPlan && ` - ${selectedPlan.name} ${selectedPlan.billing}`}
            </h2>
            <p className={styles.cardModalSubtitle}>
              Monto:
              {' '}
              {selectedPlan ? selectedPlan.price : '0 BOB'}
            </p>
            <div className={styles.cardsContainer}>
              {cards.length === 0 ? (
                <p className={styles.noCards}>No tienes tarjetas registradas</p>
              ) : (
                cards.map((card) => (
                  <div key={card.id} className={styles.cardItem}>
                    <div className={styles.cardInfo}>
                      <div className={styles.cardBrand}>
                        {card.marca.toUpperCase()}
                      </div>
                      <div className={styles.cardNumber}>
                        •••• 
                        {card.ultimos4}
                      </div>
                      <div className={styles.cardExpiry}>
                        Exp:
                        {' '}
                        {String(card.expMes).padStart(2, '0')}
                        /
                        {card.expAno}
                      </div>
                      <div className={styles.cardType}>
                        {card.tipo}
                      </div>
                      <div className={styles.cardHolder}>
                        {card.nombrePropietario}
                      </div>
                    </div>
                    <button
                      className={styles.payButton}
                      onClick={() => handlePayment(card.id)}
                      type="button"
                    >
                      Registrar Pago
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LoginPago;