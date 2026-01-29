import { BASE_URL } from '../utils/constants';

export const billingService = {
  async fetchUserCards(usuarioId) {
    const response = await fetch(`${BASE_URL}/tarjetas/obtener_tarjetas`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        usuarioId,
      }),
    });

    if (!response.ok) {
      throw new Error('Error al obtener tarjetas');
    }

    return response.json();
  },

  async registerCard(cardData) {
    const response = await fetch(`${BASE_URL}/tarjetas/registrar`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cardData),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({
        message: 'Error desconocido al registrar tarjeta',
      }));
      throw new Error(error.message || 'Error al registrar tarjeta');
    }

    return response.json();
  },

  async fetchUserPlan(userId) {
    const response = await fetch(`${BASE_URL}/usuario/plan`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: userId,
      }),
    });

    if (!response.ok) {
      throw new Error('Error al obtener el plan del usuario');
    }

    return response.json();
  },

  async updateUserPlan(userId, newPlan) {
    const response = await fetch(`${BASE_URL}/usuario/modificar_plan`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: userId,
        plan: newPlan,
      }),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({
        mensaje: 'Error al actualizar plan',
      }));
      throw new Error(error.mensaje || 'Error al actualizar plan');
    }

    return response.json();
  },

  async registerPayment({
    userId,
    tarjetaId,
    monto,
    moneda = 'BOB',
  }) {
    const response = await fetch(`${BASE_URL}/pago/registrar`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        usuarioId: userId,
        tarjetaId,
        monto,
        moneda,
      }),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({
        message: 'Error desconocido al registrar pago',
      }));
      throw new Error(error.message || 'Error al registrar el pago');
    }

    return response.json();
  },
};