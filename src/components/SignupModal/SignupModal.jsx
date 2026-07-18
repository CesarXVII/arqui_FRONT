import React, { useState } from 'react';
import { toast } from 'react-toastify';
import styles from './SignupModal.module.css';
import { registerUser } from '../../services/userService';
import TermsModal from '../TermsModal/TermsModal';

const SignupModal = ({ onClose, formFields, onSuccess }) => {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState('');
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);

  const handleChange = (e) => {
    setError('');
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setIsTermsModalOpen(true);
  };

  const handleAcceptTerms = async () => {
    setIsTermsModalOpen(false);

    const toastId = toast.info('Registrando usuario...', {
      position: 'top-right',
      autoClose: false,
      isLoading: true,
      theme: 'colored',
    });

    try {
      const dataToSubmit = { ...formData, acceptedTerms: true };
      const data = await registerUser(dataToSubmit);
      // eslint-disable-next-line no-console
      console.log('Registro exitoso:', data);
      toast.update(toastId, {
        render: '¡Usuario registrado!',
        type: 'success',
        isLoading: false,
        autoClose: 3000,
      });

      if (onSuccess) {
        onSuccess();
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('Error de registro:', err);
      let errorMessage = 'Ocurrió un error desconocido. Inténtalo de nuevo.';
      if (err.statusCode === 409) {
        errorMessage = 'El correo ya está registrado.';
      } else if (err.message) {
        errorMessage = err.message;
      }

      setError(errorMessage);

      toast.update(toastId, {
        render: `❌ Error: ${errorMessage}`,
        type: 'error',
        isLoading: false,
        autoClose: 3000,
      });
    }
  };

  let renderedApellidoGroup = false;

  const renderField = (field) => (
    <div key={field.name} className={styles.formGroup}>
      <label htmlFor={field.name} className={styles.formLabel}>
        {field.label}
      </label>
      <input
        type={field.type}
        id={field.name}
        name={field.name}
        className={styles.formInput}
        onChange={handleChange}
        required
      />
    </div>
  );

  const renderFormFields = () => (
    formFields.map((field, index) => {
      const isApellidoP = field.name === 'apellidoP';
      const isApellidoM = field.name === 'apellidoM';

      if (isApellidoP && !renderedApellidoGroup) {
        const nextField = formFields[index + 1];
        const apellidoMField = (nextField && nextField.name === 'apellidoM') ? nextField : null;

        if (apellidoMField) {
          renderedApellidoGroup = true;
          return (
            <div key="apellidos-group" className={styles.twoColumnGroup}>
              {renderField(field)}
              {renderField(apellidoMField)}
            </div>
          );
        }
      }

      if (isApellidoM && renderedApellidoGroup) {
        return null;
      }

      return renderField(field);
    })
  );

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button type="button" className={styles.closeButton} onClick={onClose}>
          &times;
        </button>
        <div className={styles.modalBody}>
          <div className={styles.contentLeft}>
            <h2 className={styles.modalHeading}>Funciones GRATUITAS de la cuenta</h2>
            <ul>
              <li>Exporta tus diseños en 2D (PNG, JPG o PDF).</li>
              <li>Crea hasta 5 proyectos activos de varios pisos sin costo.</li>
              <li>Acceso a herramientas básicas de dibujo 2D (paredes, puertas, ventanas, escaleras).</li>
              <li>Posibilidad de guardar y cargar proyectos.</li>
            </ul>
          </div>
          <div className={styles.contentRight}>
            <h2 className={styles.rightHeading}>Crea tu cuenta</h2>
            <form onSubmit={handleSubmit} className={styles.signupForm}>
              {error && <div className={styles.errorMessage}>{error}</div>}
              {renderFormFields()}
              <button type="submit" className={styles.submitButton}>
                Registrarse
              </button>
            </form>
          </div>
        </div>
      </div>
      {isTermsModalOpen && (
        <TermsModal
          onAccept={handleAcceptTerms}
          onClose={() => setIsTermsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default SignupModal;