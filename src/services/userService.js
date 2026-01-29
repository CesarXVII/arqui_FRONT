import { apiClient } from './apiClient';

export const registerUser = async (userData) => apiClient('/usuario/register', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(userData),
});

export const loginUser = async ({ correo, password }) => apiClient('/usuario/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ correo, password }),
});

export const getUserPlan = async (userId) => apiClient('/usuario/plan', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    id: userId,
  }),
});

export const getUserCards = async (userId) => apiClient('/tarjetas/obtener_tarjetas', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    usuarioId: userId,
  }),
});

export const registerPayment = async ({
  usuarioId,
  tarjetaId,
  monto,
  moneda = 'BOB',
}) => apiClient('/pago/registrar', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    usuarioId,
    tarjetaId,
    monto,
    moneda,
  }),
});

export const updateUserPlan = async ({ usuarioId, plan }) => apiClient('/usuario/modificar_plan', {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    id: usuarioId,
    plan,
  }),
});

const userService = {
  registerUser,
  loginUser,
  getUserPlan,
  getUserCards,
  registerPayment,
  updateUserPlan,
};

export default userService;