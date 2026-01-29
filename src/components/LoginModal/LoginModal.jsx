import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import styles from './LoginModal.module.css';
import { loginUser } from '../../services/userService';

const LoginModal = ({ onClose, onForgotPasswordClick }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const data = await loginUser({ correo: email, password });

      localStorage.setItem('usuario', JSON.stringify(data));

      const userName = data.nombre
        || data.name
        || data.username
        || data.usuario
        || data.fullName
        || data.full_name
        || data.nick
        || (data.correo ? data.correo.split('@')[0] : null)
        || (data.email ? data.email.split('@')[0] : null);

      const userEmail = data.correo || data.email || email;
      const userId = data.id || data.idUsuario || data.id_usuario;

      if (userName) {
        localStorage.setItem('user_name', userName);
      }
      if (userEmail) {
        localStorage.setItem('user_email', userEmail);
      }
      if (userId) {
        localStorage.setItem('user_id', String(userId));
      }

      onClose();
      navigate('/dashboard');
    } catch (err) {
      /* eslint-disable-next-line no-console */
      console.error('Error en login:', err);

      const serverMessage = err?.response?.data?.message
        || err?.message
        || 'Correo o contraseña incorrectos';

      toast.error(serverMessage, { autoClose: 2000 });
    }
  };

  const handleForgotPasswordClickInternal = (e) => {
    e.preventDefault();
    onClose();
    onForgotPasswordClick();
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div
        className={styles.modalContent}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.formColumn}>
          <button type="button" className={styles.closeButton} onClick={onClose}>
            &times;
          </button>
          <h2 className={styles.heading}>BIENVENIDO DE NUEVO</h2>
          <h1 className={styles.mainTitle}>Inicia sesión en ARQIA</h1>

          <form onSubmit={handleLogin}>
            <div className={styles.inputGroup}>
              <label htmlFor="emailInput" className={styles.label}>
                Dirección de correo electrónico
              </label>
              <input
                id="emailInput"
                type="email"
                placeholder="tucorreo@email.com"
                className={styles.inputField}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="passwordInput" className={styles.label}>Contraseña</label>
              <input
                id="passwordInput"
                type="password"
                placeholder="Ingresa la contraseña"
                className={styles.inputField}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <a
                href="#"
                className={styles.forgotPassword}
                onClick={handleForgotPasswordClickInternal}
              >
                ¿Olvidaste tu contraseña?
              </a>
            </div>

            <button type="submit" className={styles.loginButton}>
              INICIAR SESIÓN
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;