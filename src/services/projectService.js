import { BASE_URL } from '../utils/constants';

export const projectService = {
  async getAllProjects(userId) {
    const response = await fetch(`${BASE_URL}/proyecto/obtener-todos-proyectos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        idUsuario: userId,
      }),
    });

    if (!response.ok) {
      throw new Error('Error al obtener proyectos');
    }
    return response.json();
  },

  async getProjectById(projectId) {
    const response = await fetch(`${BASE_URL}/proyecto/obtener-proyecto`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        idProyecto: projectId,
      }),
    });

    if (!response.ok) {
      throw new Error('Error al obtener el proyecto');
    }
    return response.json();
  },

  async createProject(projectName, userId) {
    const response = await fetch(`${BASE_URL}/proyecto/crear`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nombre: projectName,
        idUsuario: userId,
      }),
    });

    if (!response.ok) {
      throw new Error('Error al crear el proyecto');
    }
    return response.json();
  },

  saveProjectToLocalStorage(projectData) {
    const emptyDiagram = {
      class: 'GraphLinksModel',
      nodeDataArray: [],
      linkDataArray: [],
    };
    localStorage.setItem('floorplan_diagram_data', JSON.stringify(emptyDiagram));
    localStorage.setItem('current_project_id', projectData.id.toString());
    localStorage.setItem('current_project_name', projectData.nombre);
  },

  loadProjectToLocalStorage(projectData) {
    if (projectData.contenidoJson) {
      localStorage.setItem('floorplan_diagram_data', JSON.stringify(projectData.contenidoJson));
      localStorage.setItem('current_project_id', projectData.id?.toString() || '');
      localStorage.setItem('current_project_name', projectData.nombre);
      return true;
    }
    return false;
  },

  async saveProject(projectId, diagramModelJson) {
    try {
      const contenidoJson = JSON.parse(diagramModelJson);
      const response = await fetch(`${BASE_URL}/proyecto/guardar`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          idProyecto: parseInt(projectId, 10),
          contenidoJson,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al guardar el proyecto en el servidor');
      }

      const result = await response.json();
      localStorage.setItem('floorplan_diagram_data', diagramModelJson);
      return result;
    } catch (error) {
      console.error('Error al guardar el proyecto:', error);
      throw error;
    }
  },

  async generateFromImage(base64Image) {
    try {
      const response = await fetch(`${BASE_URL}/ia/imagen`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          base64Image,
        }),
      });

      if (!response.ok) {
        let errorMsg = 'Error al generar plano desde imagen';
        try {
          const errorData = await response.json();
          errorMsg = errorData.message || errorMsg;
        } catch (e) {
          errorMsg = `Error HTTP ${response.status}`;
        }
        throw new Error(errorMsg);
      }

      return response.json();
    } catch (error) {
      console.error('Error al generar desde imagen:', error);
      throw error;
    }
  },

  async generateFromPrompt(prompt) {
    try {
      const response = await fetch(`${BASE_URL}/ia/generar`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt,
        }),
      });

      if (!response.ok) {
        let errorMsg = 'Error al generar plano desde prompt';
        try {
          const errorData = await response.json();
          errorMsg = errorData.message || errorMsg;
        } catch (e) {
          errorMsg = `Error HTTP ${response.status}`;
        }
        throw new Error(errorMsg);
      }

      return response.json();
    } catch (error) {
      console.error('Error al generar desde prompt:', error);
      throw error;
    }
  },

  async getAllTemplates() {
    try {
      const response = await fetch(`${BASE_URL}/plantilla/todas`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        let errorMsg = 'Error al obtener las plantillas';
        try {
          const errorData = await response.json();
          errorMsg = errorData.message || errorMsg;
        } catch (e) {
          errorMsg = `Error HTTP ${response.status}`;
        }
        throw new Error(errorMsg);
      }

      return response.json();
    } catch (error) {
      console.error('Error al obtener plantillas:', error);
      throw error;
    }
  },

  async generateIAPresupuesto(plano2dJson, base64Image) {
    const body = {
      plano2dJson: plano2dJson,
      base64Image: base64Image,
    };

    try {
      const response = await fetch(`${BASE_URL}/ia/presupuesto`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        let errorMsg = 'Fallo en la comunicación con el servicio de IA.';
        try {
          const errorData = await response.json();
          errorMsg = errorData.message || errorMsg;
        } catch (e) {
          errorMsg = `Error HTTP ${response.status} al contactar al servicio de IA.`;
        }
        throw new Error(errorMsg);
      }

      return response.json();
    } catch (error) {
      console.error('Error al generar presupuesto con IA:', error);
      throw error;
    }
  },
};