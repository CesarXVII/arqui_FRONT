import React, { useState } from 'react';
import styles from './PricingTable.module.css';
import SignupModal from '../../components/SignupModal/SignupModal';
import LoginPago from '../../components/loginPago/loginPago';

const PricingTable = () => {
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [showLoginPagoModal, setShowLoginPagoModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);

  const features = [
    {
      name: 'Exportación de diseños 2D (PNG, JPG, PDF)',
      basic: true,
      twoWeeks: true,
      oneMonth: true,
    },
    {
      name: 'Creación de proyectos ilimitados',
      basic: 'Límite: 5',
      twoWeeks: true,
      oneMonth: true,
    },
    {
      name: 'Acceso a herramientas básicas de dibujo 2D',
      basic: true,
      twoWeeks: true,
      oneMonth: true,
    },
    {
      name: 'Posibilidad de guardar y cargar proyectos',
      basic: true,
      twoWeeks: true,
      oneMonth: true,
    },
    {
      name: 'Asistente Inteligente para generación de proyectos',
      basic: false,
      twoWeeks: true,
      oneMonth: true,
    },
    {
      name: 'Funcionalidad Colaborativa en tiempo real',
      basic: false,
      twoWeeks: true,
      oneMonth: true,
    },
    {
      name: 'Generación de diseño 2D a partir de garabatos',
      basic: false,
      twoWeeks: true,
      oneMonth: true,
    },
    {
      name: 'Soporte al cliente prioritario',
      basic: false,
      twoWeeks: true,
      oneMonth: true,
    },
  ];

  const plans = [
    {
      name: 'Básico',
      tag: 'Ideal para iniciar',
      price: '0 BOB',
      priceValue: 0,
      billing: 'Gratis',
      ctaText: 'Regístrate gratis',
      ctaStyle: styles.ctaBasic,
    },
    {
      name: 'Premium',
      tag: '2 SEMANAS',
      price: '14 BOB',
      priceValue: 14,
      billing: 'Por 2 Semanas',
      ctaText: 'Iniciar sesión para mejorar',
      ctaStyle: styles.ctaTwoWeeks,
    },
    {
      name: 'Premium',
      tag: 'POPULAR',
      price: '35 BOB',
      priceValue: 35,
      billing: 'Por Mes',
      ctaText: 'Iniciar sesión para mejorar',
      ctaStyle: styles.ctaPremium,
    },
  ];

  const FeatureCheck = ({ included }) => (
    <span className={included ? styles.checkIncluded : styles.checkExcluded}>
      {included ? '✅' : '❌'}
    </span>
  );

  const handleSignupClick = () => setShowSignupModal(true);

  const handleLoginPagoClick = (plan) => {
    setSelectedPlan(plan);
    setShowLoginPagoModal(true);
  };

  const handleSuccessfulSignup = () => {
    setShowSignupModal(false);
    setShowLoginPagoModal(true);
  };

  return (
    <div className={styles.pricingContainer}>
      <div className={styles.titleRow}>
        <h1 className={styles.pricingTitle}>
          Considera una de nuestras suscripciones
        </h1>
      </div>

      <div className={styles.pricingTable}>
        <div className={styles.rowHeader}>
          <div className={styles.cellHeader}>
            Características
          </div>
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`${styles.planCard} ${plan.isPopular ? styles.popular : ''}`}
            >
              {plan.tag && (
                <div className={styles.popularTag}>
                  {plan.tag}
                </div>
              )}
              <h2 className={styles.planName}>
                {plan.name}
              </h2>
              <p className={styles.priceContainer}>
                <span className={styles.price}>
                  {plan.price}
                </span>
                <span className={styles.billing}>
                  {plan.billing}
                </span>
              </p>
            </div>
          ))}
        </div>

        <div className={styles.featuresSection}>
          {features.map((feature, index) => (
            <div
              key={index}
              className={styles.featureRow}
            >
              <div className={styles.featureName}>
                {feature.name}
              </div>

              <div className={styles.featureCell}>
                {typeof feature.basic === 'boolean' ? (
                  <FeatureCheck
                    included={feature.basic}
                  />
                ) : (
                  <span className={styles.creditValue}>
                    {feature.basic}
                  </span>
                )}
              </div>

              <div className={styles.featureCell}>
                {typeof feature.twoWeeks === 'boolean' ? (
                  <FeatureCheck
                    included={feature.twoWeeks}
                  />
                ) : (
                  <span className={styles.creditValue}>
                    {feature.twoWeeks}
                  </span>
                )}
              </div>

              <div className={styles.featureCell}>
                {typeof feature.oneMonth === 'boolean' ? (
                  <FeatureCheck
                    included={feature.oneMonth}
                  />
                ) : (
                  <span className={styles.creditValue}>
                    {feature.oneMonth}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className={styles.ctaRow}>
          <div className={styles.ctaPlaceholder} />
          {plans.map((plan, index) => (
            <div
              key={`cta-${index}`}
              className={styles.ctaCell}
            >
              <button
                className={`${styles.ctaButton} ${plan.ctaStyle}`}
                onClick={() => {
                  if (plan.name === 'Básico') {
                    handleSignupClick();
                  } else {
                    handleLoginPagoClick(plan);
                  }
                }}
              >
                {plan.ctaText}
              </button>
            </div>
          ))}
        </div>
      </div>

      {showSignupModal && (
        <SignupModal
          onClose={() => setShowSignupModal(false)}
          formFields={[
            {
              name: 'nombre',
              label: 'Nombre',
              type: 'text',
            },
            {
              name: 'apellidoP',
              label: 'Apellido Paterno',
              type: 'text',
            },
            {
              name: 'apellidoM',
              label: 'Apellido Materno',
              type: 'text',
            },
            {
              name: 'correo',
              label: 'Correo',
              type: 'email',
            },
            {
              name: 'password',
              label: 'Contraseña',
              type: 'password',
            },
            {
              name: 'fechaNacimiento',
              label: 'Fecha de Nacimiento',
              type: 'date',
            },
          ]}
          onSuccess={handleSuccessfulSignup}
        />
      )}

      {showLoginPagoModal && (
        <LoginPago
          onClose={() => setShowLoginPagoModal(false)}
          selectedPlan={selectedPlan}
        />
      )}
    </div>
  );
};

export default PricingTable;