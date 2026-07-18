import React, { useState } from 'react';
import styles from './Home.module.css';
import logo from '../../assets/images/logo_proy.png';
import heroImage from '../../assets/images/imagen_home_1.jpg';
import SignupModal from '../../components/SignupModal/SignupModal';
import LoginModal from '../../components/LoginModal/LoginModal';
import PricingTable from '../precios/PricingTable';
import ForgotPasswordModal from '../../components/ForgotPasswordModal/ForgotPasswordModal';

const Home = () => {
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isForgotPasswordModalOpen, setIsForgotPasswordModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');

  const openSignupModal = () => setIsSignupModalOpen(true);
  const closeSignupModal = () => setIsSignupModalOpen(false);

  const openLoginModal = () => setIsLoginModalOpen(true);
  const closeLoginModal = () => setIsLoginModalOpen(false);

  const openForgotPasswordModal = () => setIsForgotPasswordModalOpen(true);
  const closeForgotPasswordModal = () => setIsForgotPasswordModalOpen(false);

  const handleSuccessfulSignupAndSwitchToLogin = () => {
    closeSignupModal();
    openLoginModal();
  };

  const handleLoginToForgotPassword = () => {
    closeLoginModal();
    openForgotPasswordModal();
  };

  const handleForgotToLogin = () => {
    closeForgotPasswordModal();
    openLoginModal();
  };

  const renderMainContent = () => {
    if (currentPage === 'pricing') {
      return (
        <main>
          <PricingTable />
        </main>
      );
    }

    return (
      <main className={styles.heroSection}>
        <div className={styles.contentColumn}>
          <p className={styles.tagline}>
            EL ESPACIO ES IMPORTANTE
          </p>
          <h1 className={styles.mainHeading}>
            ¡Aprovecha al máximo tu espacio!
          </h1>
          <p className={styles.mainText}>
            Tu espacio importa. Planificar y diseñar puede ser un desafío, por eso existe
            ARQIA. Creemos que planificar tu espacio no debería ser difícil, costoso ni
            exclusivo para profesionales. Debería ser fácil, accesible, divertido y gratuito
            para todos.
          </p>
          <p className={styles.secondaryText}>
            Únete a millones de usuarios en todo el mundo...
          </p>
          <div className={styles.ctaButtons}>
            <button
              className={styles.ctaButtonPrimaryOrange}
              onClick={openSignupModal}
            >
              ¡Crea una cuenta!
            </button>
          </div>
        </div>

        <div className={styles.imageColumn}>
          <img
            src={heroImage}
            alt="Visualización de plano de casa"
            className={styles.heroImage}
          />
        </div>
      </main>
    );
  };

  const formFields = [
    {
      label: 'Nombre',
      name: 'nombre',
      type: 'text',
    },
    {
      label: 'Apellido Paterno',
      name: 'apellidoP',
      type: 'text',
    },
    {
      label: 'Apellido Materno',
      name: 'apellidoM',
      type: 'text',
    },
    {
      label: 'Correo',
      name: 'correo',
      type: 'email',
    },
    {
      label: 'Contraseña',
      name: 'password',
      type: 'password',
    },
    {
      label: 'Fecha de Nacimiento',
      name: 'fechaNacimiento',
      type: 'date',
    },
  ];

  return (
    <div className={styles.homeContainer}>
      <header className={styles.navBar}>
        <div className={styles.logo}>
          <img
            src={logo}
            alt="CasaMind Logo"
            className={styles.logoImage}
          />
          <span className={styles.logoText}>
            ARQIA
          </span>
        </div>
        <nav className={styles.navLinks}>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setCurrentPage('home');
            }}
            className={currentPage === 'home' ? styles.activeLink : ''}
          >
            Inicio
          </a>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setCurrentPage('pricing');
            }}
            className={currentPage === 'pricing' ? styles.activeLink : ''}
          >
            Precios
          </a>
        </nav>
        <div className={styles.navActions}>
          <a
            href="#"
            className={styles.loginLink}
            onClick={(e) => {
              e.preventDefault();
              openLoginModal();
            }}
          >
            Iniciar sesión
          </a>
          <button
            className={styles.ctaButtonPrimary}
            onClick={openSignupModal}
          >
            Registrate
          </button>
        </div>
      </header>

      {renderMainContent()}

      <footer className={styles.footerSection}>
        <div className={styles.footerContainer}>
          
          {/* Columna 1: Contacto */}
          <div className={styles.footerColumn}>
            <h3 className={styles.footerHeading}>Contacto</h3>
            <ul className={styles.footerList}>
              <li>
                <span className={styles.icon}>📞</span>
                <strong>63456850</strong>
              </li>
              <li>
                <span className={styles.icon}>✉️</span>
                <a href="mailto:soporte@plan2d.com" className={styles.footerLink}>soporte@plan2d.com</a>
              </li>
            </ul>
          </div>

          {/* Columna 2: Ubicación */}
          <div className={styles.footerColumn}>
            <h3 className={styles.footerHeading}>Ubicación</h3>
            <ul className={styles.footerList}>
              <li>
                <span className={styles.icon}>📍</span>
                <span>Av. Principal Empresarial #150,<br/>Edificio Corporativo, Piso 4.</span>
              </li>
              <li>
                <span className={styles.icon}>🏙️</span>
                <span>Santa Cruz, Bolivia</span>
              </li>
            </ul>
          </div>

          {/* Columna 3: Horarios */}
          <div className={styles.footerColumn}>
            <h3 className={styles.footerHeading}>Horario de Atención</h3>
            <ul className={styles.footerList}>
              <li>
                <span className={styles.icon}>🕒</span>
                <span><strong>Lunes a Viernes:</strong><br/>8:30 AM - 18:30 PM</span>
              </li>
              <li>
                <span className={styles.icon}>🕒</span>
                <span><strong>Sábados:</strong><br/>9:00 AM - 13:00 PM</span>
              </li>
            </ul>
          </div>

          {/* Columna 4: Redes Sociales */}
          <div className={styles.footerColumn}>
            <h3 className={styles.footerHeading}>Conéctate</h3>
            <div className={styles.socialLinks}>
              <a href="#" className={styles.socialIcon}>Facebook</a>
              <a href="#" className={styles.socialIcon}>LinkedIn</a>
              <a href="#" className={styles.socialIcon}>Instagram</a>
            </div>
          </div>
          
        </div>
        
        <div className={styles.footerBottom}>
          <p>&copy; {new Date().getFullYear()} ARQIA. Todos los derechos reservados.</p>
        </div>
      </footer>

      {isSignupModalOpen && (
        <SignupModal
          onClose={closeSignupModal}
          formFields={formFields}
          onSuccess={handleSuccessfulSignupAndSwitchToLogin}
        />
      )}

      {isLoginModalOpen && (
        <LoginModal
          onClose={closeLoginModal}
          onForgotPasswordClick={handleLoginToForgotPassword}
        />
      )}

      {isForgotPasswordModalOpen && (
        <ForgotPasswordModal
          onClose={closeForgotPasswordModal}
          onBackToLoginClick={handleForgotToLogin}
        />
      )}
    </div>
  );
};

export default Home;