import { BASE_URL } from '../utils/constants';

export const paymentService = {
  async fetchUserPayments(usuarioId) {
    const response = await fetch(`${BASE_URL}/pago/obtener_pagos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        usuarioId,
      }),
    });

    if (!response.ok) {
      throw new Error('Error al obtener pagos');
    }

    return response.json();
  },
};