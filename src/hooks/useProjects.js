import { useState, useEffect } from 'react';
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { projectService } from '../services/projectService';

export const useProjects = (userId) => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const data = await projectService.getAllProjects(userId);
      setProjects(data);
    } catch (error) {
      message.error('Error al cargar los proyectos');
      // eslint-disable-next-line no-console
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchProjects();
    }
  }, [userId]);

  const createProject = async (projectName) => {
    if (!projectName.trim()) {
      message.warning('Por favor ingresa un nombre para el proyecto');
      return false;
    }

    try {
      const projectData = await projectService.createProject(projectName.trim(), userId);
      projectService.saveProjectToLocalStorage(projectData);

      message.success(`Proyecto "${projectData.nombre}" creado exitosamente`);

      setTimeout(() => {
        navigate('/blackboard');
      }, 500);

      return true;
    } catch (error) {
      message.error('Error al crear el proyecto');
      // eslint-disable-next-line no-console
      console.error('Error:', error);
      return false;
    }
  };

  const openProject = async (projectId) => {
    try {
      message.loading('Cargando proyecto...', 0);

      const projectData = await projectService.getProjectById(projectId);

      const loaded = projectService.loadProjectToLocalStorage(projectData);

      message.destroy();

      if (loaded) {
        message.success(`Proyecto "${projectData.nombre}" cargado exitosamente`);

        setTimeout(() => {
          navigate('/blackboard');
        }, 500);
      } else {
        message.warning('El proyecto no tiene contenido para cargar');
      }
    } catch (error) {
      message.destroy();
      message.error('Error al cargar el proyecto');
      // eslint-disable-next-line no-console
      console.error('Error:', error);
    }
  };

  return {
    projects,
    loading,
    createProject,
    openProject,
    refreshProjects: fetchProjects,
  };
};