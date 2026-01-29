import { BASE_URL } from '../utils/constants';

export const cardService = {
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

  async deleteCard(cardId) {
    const response = await fetch(`${BASE_URL}/tarjetas/eliminar`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: cardId,
      }),
    });

    if (!response.ok) {
      throw new Error('Error al eliminar tarjeta');
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
};