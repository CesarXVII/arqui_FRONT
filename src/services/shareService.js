import { BASE_URL } from '../utils/constants';

export const shareService = {
  async generateShareLink(proyectoId, permission, expiresInDays) {
    const res = await fetch(`${BASE_URL}/proyecto/${proyectoId}/share-link`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        permission,
        expiresInDays,
      }),
    });

    if (!res.ok) {
      const errorJson = await res.json().catch(() => null);
      throw new Error(errorJson?.message || `Error HTTP ${res.status}`);
    }

    const data = await res.json();
    return data.shareUrl;
  },

  async disableShareLinks(proyectoId) {
    const res = await fetch(`${BASE_URL}/proyecto/${proyectoId}/share-link/disable`, {
      method: 'PATCH',
    });

    if (!res.ok) {
      const errorJson = await res.json().catch(() => null);
      throw new Error(errorJson?.message || `Error HTTP ${res.status}`);
    }
  },
};