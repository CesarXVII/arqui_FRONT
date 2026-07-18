import React from 'react';
import styles from './TermsModal.module.css';

const TermsModal = ({ onAccept, onClose }) => {
  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h2>Términos y Condiciones</h2>
          <button className={styles.closeButton} onClick={onClose}>&times;</button>
        </div>
        <div className={styles.modalBody}>
          <p>
            Bienvenido a ARQIA. Al registrarse en nuestra plataforma, usted acepta los siguientes términos y condiciones para el uso de nuestro software empresarial.
          </p>
          
          <h3>1. Uso del Servicio</h3>
          <p>
            ARQIA provee herramientas de diseño y planificación de espacios. El usuario se compromete a utilizar la plataforma con fines lícitos y respetando la propiedad intelectual.
          </p>
          
          <h3>2. Privacidad y Datos</h3>
          <p>
            Su privacidad es importante para nosotros. Los datos personales proporcionados durante el registro serán utilizados exclusivamente para mejorar su experiencia y gestionar su cuenta.
          </p>

          <h3>3. Cuentas y Seguridad</h3>
          <p>
            Usted es responsable de mantener la confidencialidad de su contraseña y de cualquier actividad que ocurra bajo su cuenta.
          </p>
          
          <h3>4. Modificaciones</h3>
          <p>
            Nos reservamos el derecho de modificar estos términos en cualquier momento. Se le notificará de cambios significativos a través de su correo registrado.
          </p>
        </div>
        <div className={styles.modalFooter}>
          <button className={styles.cancelButton} onClick={onClose}>Cancelar</button>
          <button className={styles.acceptButton} onClick={onAccept}>Acepto</button>
        </div>
      </div>
    </div>
  );
};

export default TermsModal;
