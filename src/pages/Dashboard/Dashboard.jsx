import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, Button, message, Dropdown } from 'antd';
import {
  ProjectOutlined,
  UserOutlined,
  FileTextOutlined,
  PlusOutlined,
  FileAddOutlined,
  AppstoreOutlined,
  FileImageOutlined,
  DownOutlined,
  EditOutlined,
} from '@ant-design/icons';
import styles from './Dashboard.module.css';
import logo from '../../assets/images/logo_proy.png';
import { useProjects } from '../../hooks/useProjects';
import CreateProjectModal from '../../components/modal/CreateProjectModal';
import CreateProjectSketchModal from '../../components/modal/CreateProjectSketchModal';
import CreateProjectPromptModal from '../../components/modal/CreateProjectPromptModal';
import CreateProjectTemplateModal from '../../components/modal/CreateProjectTemplateModal';
import ProfileContent from '../../components/profile/ProfileContent';
import ReportsContent from '../../components/reports/ReportsContent';
import { projectService } from '../../services/projectService';

const FloatingVerticalSider = ({ onMenuClick, selectedKey }) => {
  const siderItems = [
    { key: 'projects', icon: <ProjectOutlined />, label: 'Proyectos' },
    { key: 'profile', icon: <UserOutlined />, label: 'Perfil' },
    { key: 'reports', icon: <FileTextOutlined />, label: 'Reporte' },
  ];

  const items = siderItems.map((item) => ({
    key: item.key,
    icon: null,
    label: (
      <div className={styles.siderItemContent}>
        <div className={styles.siderItemIcon}>{item.icon}</div>
        <div className={styles.siderItemLabel}>{item.label}</div>
      </div>
    ),
    className: styles.siderMenuItem,
  }));

  return (
    <div className={styles.floatingSider}>
      <Menu
        mode="vertical"
        selectedKeys={selectedKey ? [selectedKey] : []}
        items={items}
        className={styles.siderMenu}
        onClick={onMenuClick}
      />
    </div>
  );
};

const ProjectsContent = ({ usuario }) => {
  const {
    projects,
    loading,
    createProject,
    openProject,
  } = useProjects(usuario.id);
  const navigate = useNavigate();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isSketchModalVisible, setIsSketchModalVisible] = useState(false);
  const [isPromptModalVisible, setIsPromptModalVisible] = useState(false);
  const [isTemplateModalVisible, setIsTemplateModalVisible] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  const showNewProjectModal = () => {
    setIsModalVisible(true);
  };

  const handleTemplateProject = () => {
    setIsTemplateModalVisible(true);
  };

  const handleSketchProject = () => {
    setIsSketchModalVisible(true);
  };

  const handlePromptProject = () => {
    setIsPromptModalVisible(true);
  };

  const handleCreateNewProject = async (projectName) => {
    setIsCreating(true);
    try {
      const success = await createProject(projectName);

      if (success) {
        setIsModalVisible(false);
      }

      return success;
    } catch (error) {
      console.error('Error al crear el proyecto:', error);
      message.error('Error al crear el proyecto');
      return false;
    } finally {
      setIsCreating(false);
    }
  };

  const convertImageToBase64 = (imageFile) => (
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result.split(',')[1];
        resolve(result);
      };
      reader.onerror = reject;
      reader.readAsDataURL(imageFile);
    })
  );

  const handleCreateSketchProject = async (projectName, imageFile) => {
    setIsCreating(true);
    try {
      const base64Image = await convertImageToBase64(imageFile);

      message.loading('Generando plano con IA desde boceto...', 0);

      const generatedData = await projectService.generateFromImage(base64Image);

      const projectData = await projectService.createProject(projectName, usuario.id);

      const jsonString = JSON.stringify(generatedData);
      await projectService.saveProject(projectData.id, jsonString);

      message.destroy();

      localStorage.setItem('floorplan_diagram_data', jsonString);
      localStorage.setItem('current_project_id', projectData.id.toString());
      localStorage.setItem('current_project_name', projectData.nombre);

      message.success(`Proyecto "${projectName}" generado exitosamente con IA`);

      setIsSketchModalVisible(false);

      setTimeout(() => {
        navigate('/blackboard');
      }, 500);

      return true;
    } catch (error) {
      message.destroy();
      console.error('Error al crear proyecto con boceto:', error);
      message.error(error.message || 'Error al generar el proyecto con IA');
      return false;
    } finally {
      setIsCreating(false);
    }
  };

  const handleCreatePromptProject = async (projectName, prompt) => {
    setIsCreating(true);
    try {
      message.loading('Generando plano con IA desde descripción...', 0);

      const generatedData = await projectService.generateFromPrompt(prompt);

      const projectData = await projectService.createProject(projectName, usuario.id);

      const jsonString = JSON.stringify(generatedData);
      await projectService.saveProject(projectData.id, jsonString);

      message.destroy();

      localStorage.setItem('floorplan_diagram_data', jsonString);
      localStorage.setItem('current_project_id', projectData.id.toString());
      localStorage.setItem('current_project_name', projectData.nombre);

      message.success(`Proyecto "${projectName}" generado exitosamente con IA`);

      setIsPromptModalVisible(false);

      setTimeout(() => {
        navigate('/blackboard');
      }, 500);

      return true;
    } catch (error) {
      message.destroy();
      console.error('Error al crear proyecto con prompt:', error);
      message.error(error.message || 'Error al generar el proyecto con IA');
      return false;
    } finally {
      setIsCreating(false);
    }
  };

  const handleCreateTemplateProject = async (projectName, template) => {
    setIsCreating(true);
    try {
      message.loading('Creando proyecto desde plantilla...', 0);

      const projectData = await projectService.createProject(projectName, usuario.id);

      const jsonString = JSON.stringify(template.contenido_json);
      await projectService.saveProject(projectData.id, jsonString);

      message.destroy();

      localStorage.setItem('floorplan_diagram_data', jsonString);
      localStorage.setItem('current_project_id', projectData.id.toString());
      localStorage.setItem('current_project_name', projectData.nombre);

      message.success(`Proyecto "${projectName}" creado exitosamente desde plantilla`);

      setIsTemplateModalVisible(false);

      setTimeout(() => {
        navigate('/blackboard');
      }, 500);

      return true;
    } catch (error) {
      message.destroy();
      console.error('Error al crear proyecto desde plantilla:', error);
      message.error(error.message || 'Error al crear el proyecto');
      return false;
    } finally {
      setIsCreating(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  };

  const createProjectMenu = {
    items: [
      {
        key: 'new',
        icon: <FileAddOutlined />,
        label: 'Proyecto Nuevo',
        onClick: showNewProjectModal,
      },
      {
        key: 'sketch',
        icon: <FileImageOutlined />,
        label: 'Mediante Boceto',
        onClick: handleSketchProject,
      },
      {
        key: 'prompt',
        icon: <EditOutlined />,
        label: 'Mediante Prompt',
        onClick: handlePromptProject,
      },
      {
        key: 'template',
        icon: <AppstoreOutlined />,
        label: 'Usar Plantilla',
        onClick: handleTemplateProject,
      },
    ],
  };

  return (
    <div className={styles.projectsContentWrapper}>
      <div className={styles.projectsContent}>
        <div className={styles.projectsHeader}>
          <div className={styles.breadcrumb}>
            <span className={styles.breadcrumbItem}>Dashboard</span>
            <span className={styles.breadcrumbSeparator}>›</span>
            <span className={styles.breadcrumbItemActive}>Projects</span>
          </div>
        </div>

        <div className={styles.projectsToolbar}>
          <Dropdown menu={createProjectMenu} trigger={['click']}>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              className={styles.createButton}
            >
              Create project <DownOutlined />
            </Button>
          </Dropdown>
          <span className={styles.projectCount}>
            {projects.length}
            {' '}
            Project
            {projects.length !== 1 ? 's' : ''}
          </span>
        </div>

        <div className={styles.projectsGrid}>
          {loading ? (
            <div className={styles.loadingState}>Cargando proyectos...</div>
          ) : projects.length === 0 ? (
            <div className={styles.emptyState}>No hay proyectos disponibles</div>
          ) : (
            projects.map((project) => {
              const initials = project.nombre
                .split(' ')
                .map((word) => word[0])
                .join('')
                .toUpperCase()
                .substring(0, 2);

              return (
                <div
                  key={project.id}
                  className={styles.projectCard}
                  onDoubleClick={() => openProject(project.id)}
                  role="button"
                  tabIndex={0}
                  style={{ cursor: 'pointer' }}
                >
                  <div className={styles.projectThumbnail}>
                    <div className={styles.projectIcon}>
                      {initials}
                    </div>
                  </div>
                  <div className={styles.projectInfo}>
                    <div className={styles.projectName}>{project.nombre}</div>
                    <div className={styles.projectDate}>
                      {formatDate(project.createdAt)}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        <CreateProjectModal
          visible={isModalVisible}
          onCancel={() => setIsModalVisible(false)}
          onCreate={handleCreateNewProject}
          loading={isCreating}
        />

        <CreateProjectSketchModal
          visible={isSketchModalVisible}
          onCancel={() => setIsSketchModalVisible(false)}
          onCreate={handleCreateSketchProject}
          loading={isCreating}
        />

        <CreateProjectPromptModal
          visible={isPromptModalVisible}
          onCancel={() => setIsPromptModalVisible(false)}
          onCreate={handleCreatePromptProject}
          loading={isCreating}
        />

        <CreateProjectTemplateModal
          visible={isTemplateModalVisible}
          onCancel={() => setIsTemplateModalVisible(false)}
          onCreate={handleCreateTemplateProject}
          loading={isCreating}
        />
      </div>
    </div>
  );
};

const Dashboard = () => {
  const navigate = useNavigate();
  const [selectedKey, setSelectedKey] = useState('projects');
  const [usuario, setUsuario] = useState({
    id: null,
    correo: '',
    plan: '',
    sigla: '',
    color: '#999',
  });

  useEffect(() => {
    const data = localStorage.getItem('usuario');
    if (!data) {
      navigate('/');
      return;
    }

    const parsed = JSON.parse(data);

    setUsuario({
      id: parsed.id || parsed.idUsuario || 24,
      nombre: parsed.nombre || 'Usuario',
      correo: parsed.correo,
      plan: parsed.plan,
      sigla: parsed.sigla || parsed.nombre?.[0] || '?',
      color: parsed.color || '#999',
    });
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('usuario');
    navigate('/');
  };

  const handleMenuClick = (e) => {
    if (selectedKey === e.key) {
      setSelectedKey(null);
    } else {
      setSelectedKey(e.key);
    }
  };

  return (
    <div className={styles.dashboardLayout}>
      <header className={styles.header}>
        <div className={styles.logo}>
          <img src={logo} alt="ARQIA Logo" className={styles.logoImage} />
          <span className={styles.logoText}>ARQIA</span>
        </div>

        <div className={styles.userInfo}>
          <div className={styles.userCredits}>
            <span
              className={styles.logOut}
              role="button"
              tabIndex={0}
              onClick={handleLogout}
            >
              log out
            </span>
          </div>

          <div className={styles.userData}>
            <div className={styles.userName}>{usuario.correo}</div>
            <div className={styles.userPlan}>{usuario.plan}</div>
          </div>

          <div
            className={styles.avatar}
            style={{ backgroundColor: usuario.color }}
          >
            {usuario.sigla}
          </div>
        </div>
      </header>

      <div className={styles.contentArea}>
        <FloatingVerticalSider
          onMenuClick={handleMenuClick}
          selectedKey={selectedKey}
        />

        {selectedKey === 'projects' && (
          <ProjectsContent usuario={usuario} />
        )}

        {selectedKey === 'profile' && (
          <ProfileContent usuario={usuario} />
        )}

        {selectedKey === 'reports' && (
          <ReportsContent usuario={usuario} />
        )}
      </div>
    </div>
  );
};

export default Dashboard;