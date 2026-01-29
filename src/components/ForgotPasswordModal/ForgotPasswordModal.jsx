import React, { useState } from 'react';
import { toast } from 'react-toastify';
import styles from './ForgotPasswordModal.module.css';

const ForgotPasswordModal = ({ onClose, onBackToLoginClick }) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error('Por favor, ingresa un correo válido.');
      return;
    }

    setLoading(true);
    const toastId = toast.info('Enviando instrucciones...', {
      position: 'top-right',
      autoClose: false,
      isLoading: true,
      theme: 'colored',
    });

    try {
      const response = await fetch('http://localhost:3000/usuario/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ correo: email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error al restablecer contraseña');
      }

      toast.update(toastId, {
        render: data.mensaje || '¡Instrucciones enviadas!',
        type: 'success',
        isLoading: false,
        autoClose: 3000,
      });
      setEmail('');
    } catch (err) {
      toast.update(toastId, {
        render: `❌ ${err.message}`,
        type: 'error',
        isLoading: false,
        autoClose: 3000,
      });
      // eslint-disable-next-line no-console
      console.error('Error al restablecer contraseña:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleBackToLogin = (e) => {
    e.preventDefault();
    onBackToLoginClick();
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.formColumn}>
          <button
            type="button"
            className={styles.closeButton}
            onClick={onClose}
          >
            &times;
          </button>

          <h2 className={styles.heading}>¿PROBLEMAS PARA INGRESAR?</h2>
          <h1 className={styles.mainTitle}>Restablecer Contraseña</h1>
          <p className={styles.description}>
            Ingresa el correo electrónico asociado a tu cuenta y te enviaremos un enlace para cambiar tu contraseña.
          </p>

          <form onSubmit={handleSubmit}>
            <div className={styles.inputGroup}>
              <label htmlFor="emailInput" className={styles.label}>Correo electrónico</label>
              <input
                id="emailInput"
                type="email"
                placeholder="tucorreo@email.com"
                className={styles.inputField}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
              />
            </div>

            <button
              type="submit"
              className={styles.resetButton}
              disabled={loading}
            >
              {loading ? 'Enviando...' : 'ENVIAR INSTRUCCIONES'}
            </button>
          </form>

          <a
            href="#"
            className={styles.backToLogin}
            onClick={handleBackToLogin}
          >
            ← Volver a Iniciar Sesión
          </a>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordModal;