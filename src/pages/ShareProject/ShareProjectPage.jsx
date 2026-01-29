import {
  useEffect,
  useState,
} from 'react';
import { useParams } from 'react-router-dom';
import {
  Spin,
  Alert,
} from 'antd';
import BlackboardLayout from '../BlackboardLayout/BlackboardLayout';
import { BASE_URL } from '../../utils/constants';

const ShareProjectPage = () => {
  const { token } = useParams();
  const [state, setState] = useState({
    loading: true,
    error: null,
    proyecto: null,
    permission: 'read',
  });

  useEffect(() => {
    let intervalId;

    const fetchProject = async (isPoll = false) => {
      try {
        const res = await fetch(
          `${BASE_URL}/proyecto/share/${token}`, {
            method: 'GET',
          },
        );

        if (!res.ok) {
          const errJson = await res.json().catch(() => null);
          throw new Error(
            errJson?.message || `Error HTTP ${res.status}`,
          );
        }

        const data = await res.json();

        setState((prev) => ({
          ...prev,
          loading: false,
          error: null,
          proyecto: data.proyecto,
          permission: data.permission || 'read',
        }));
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error('Error en fetchProject', err);

        if (isPoll) {
          setState({
            loading: false,
            error:
              err.message ||
              'El enlace ha sido revocado o ha expirado',
            proyecto: null,
            permission: 'read',
          });
          if (intervalId) {
            clearInterval(intervalId);
          }
        } else {
          setState({
            loading: false,
            error:
              err.message ||
              'El enlace es inválido o ha expirado',
            proyecto: null,
            permission: 'read',
          });
        }
      }
    };

    fetchProject(false);

    intervalId = setInterval(() => {
      setState((prev) => {
        if (prev.error || !prev.proyecto) {
          return prev;
        }
        fetchProject(true);
        return prev;
      });
    }, 5000);

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [token]);

  if (state.loading) {
    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Spin
          spinning
          fullscreen
          tip="Cargando proyecto compartido..."
          size="large"
        />

      </div>
    );
  }

  if (state.error) {
    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 16,
        }}
      >
        <Alert
          type="error"
          message="Acceso al proyecto compartido"
          description={state.error}
          showIcon
        />
      </div>
    );
  }

  return (
    <BlackboardLayout
      proyectoId={state.proyecto.id}
      initialData={state.proyecto.contenidoJson}
      permission={state.permission}
      fromSharedLink
    />
  );
};

export default ShareProjectPage;