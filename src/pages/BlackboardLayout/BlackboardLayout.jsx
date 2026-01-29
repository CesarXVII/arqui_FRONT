// src/pages/BlackboardLayout/BlackboardLayout.jsx
import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import * as go from 'gojs';
import styles from './BlackboardLayout.module.css';
import TopNavbar from '../../components/Navbar/Navbar';
import { BASE_URL } from '../../utils/constants';
import { Layout, Menu, Button, Tooltip, message } from 'antd';
import {
  ToolOutlined,
  InfoCircleOutlined,
  ApartmentOutlined,
  PlusOutlined,
  MinusOutlined,
  ReloadOutlined,
  HomeOutlined,
  FontSizeOutlined,
  SignatureOutlined,
  EditOutlined,
  UploadOutlined,
  BorderOutlined,
  AppstoreOutlined,
  DatabaseOutlined,
  BlockOutlined,
  BuildOutlined,
  RightOutlined,
  LeftOutlined,
  SaveOutlined,
  ColumnWidthOutlined,  // ← ASEGÚRATE DE QUE ESTA LÍNEA ESTÉ AQUÍ
  ScissorOutlined, 
  ShareAltOutlined
} from '@ant-design/icons';

// Importar todos los templates
import { registerDoorTemplates } from '../../components/templates/DoorTemplate';
import { registerWindowTemplates } from '../../components/templates/WindowTemplate';
import { createWallTemplate } from '../../components/templates/WallTemplate';
import { registerRoomTemplates } from '../../components/templates/RoomTemplate';
import { createTextLabelTemplate, createLabelTemplate } from '../../components/templates/LabelTemplate';
import { createSymbolTemplate } from '../../components/templates/SymbolTemplate';
import { registerBanoTemplates } from '../../components/templates/object/BanoFurniture';
import { registerComedorTemplates } from '../../components/templates/object/ComedorFurniture';
import { registerOficinaTemplates } from '../../components/templates/object/OficinaFurniture';
import { registerDecoracionTemplates } from '../../components/templates/object/DecoracionFurniture';
import { registerSalonTemplates } from '../../components/templates/object/SalonFurniture';
import { registerDormitorioTemplates } from '../../components/templates/object/DormitorioFurniture';
import { registerCocinaTemplates } from '../../components/templates/object/CocinaFurniture';
import { registerDimensionTemplates } from '../../components/templates/DimensionTemplate';
import { createFurnitureTemplate } from '../../components/templates/FurnitureTemplate';
import { initSocket, getSocket } from '../../services/socket';

// Importar objetos y títulos
import { objectsData, panelTitles } from '../../components/templates/objectsDataIndex';

// Modal para compartir
import ShareProjectModal from '../../components/ShareProjectModal/ShareProjectModal';

const { Content } = Layout;

// ----------------------------------------------------
// Constantes / Helpers
// ----------------------------------------------------
const SNAP_DISTANCE = 20;
const LOCALSTORAGE_KEY = 'floorplan_diagram_data';

const CURSOR_COLORS = [
  '#FF4B4B',
  '#FF9800',
  '#FFC107',
  '#4CAF50',
  '#2196F3',
  '#3F51B5',
  '#9C27B0',
  '#E91E63',
];

function hashString(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i += 1) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return hash;
}

function colorForClient(clientId) {
  if (!clientId) return CURSOR_COLORS[0];
  const h = Math.abs(hashString(clientId));
  return CURSOR_COLORS[h % CURSOR_COLORS.length];
}

// Resuelve el nombre corto del usuario desde localStorage
function resolveLocalUserLabel() {
  let storedName =
    localStorage.getItem('user_name') ||
    localStorage.getItem('userName') ||
    localStorage.getItem('username') ||
    localStorage.getItem('name');

  if (!storedName) {
    const userJson =
      localStorage.getItem('usuario') ||
      localStorage.getItem('user') ||
      localStorage.getItem('current_user') ||
      localStorage.getItem('auth_user');

    if (userJson) {
      try {
        const u = JSON.parse(userJson);
        storedName =
          u.nombre ||
          u.name ||
          u.fullName ||
          u.full_name ||
          u.username ||
          u.usuario ||
          u.email ||
          u.correo;
      } catch (e) {
        // ignorar parse error
      }
    }
  }

  if (!storedName) {
    const email =
      localStorage.getItem('user_email') || localStorage.getItem('email');
    if (email) {
      storedName = email.split('@')[0];
    }
  }

  if (!storedName) return null;

  return storedName.toString().trim().split(' ')[0].slice(0, 12);
}

// -----------------------------
// Helpers de almacenamiento
// -----------------------------
const saveDiagramToLocalStorage = (diagram) => {
  try {
    const jsonData = diagram.model.toJson();
    localStorage.setItem(LOCALSTORAGE_KEY, jsonData);
    console.log('Diagrama guardado en localStorage');
    return true;
  } catch (error) {
    console.error('Error guardando en localStorage:', error);
    return false;
  }
};

const loadDiagramFromLocalStorage = (diagram) => {
  try {
    if (!diagram) return false;

    if (diagram.isInTransaction) {
      console.warn(
        '⏭️ Saltando carga desde localStorage porque hay una transacción en curso'
      );
      return false;
    }

    const jsonData = localStorage.getItem(LOCALSTORAGE_KEY);
    if (jsonData) {
      const parsedData = JSON.parse(jsonData);

      if (parsedData.class && parsedData.nodeDataArray) {
        diagram.model = go.Model.fromJson(jsonData);
        console.log('Diagrama GoJS cargado desde localStorage');
      } else {
        console.log(
          'Cargando contenido desde backend (formato diferente):',
          parsedData
        );
      }
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error cargando desde localStorage:', error);
    return false;
  }
};

const clearLocalStorage = () => {
  try {
    localStorage.removeItem(LOCALSTORAGE_KEY);
    console.log('localStorage limpiado');
    return true;
  } catch (error) {
    console.error('Error limpiando localStorage:', error);
    return false;
  }
};

// Guardar diagrama en el backend (NestJS)
const saveDiagramToBackend = async (diagram) => {
  try {
    const projectId = localStorage.getItem('current_project_id');
    if (!projectId) return;

    const jsonData = diagram.model.toJson();

     await fetch(`${BASE_URL}/proyecto/guardar`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        idProyecto: Number(projectId),
        contenidoJson: JSON.parse(jsonData),
      }),
    });

    console.log('Diagrama guardado en backend');
  } catch (err) {
    console.error('Error guardando en backend:', err);
  }
};

// Cargar diagrama desde backend (NestJS)
const loadFromBackend = async (diagram) => {
  try {
    const projectId = localStorage.getItem('current_project_id');
    if (!projectId) return false;

    const res = await fetch(
      `${BASE_URL}/proyecto/obtener-proyecto`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ idProyecto: Number(projectId) }),
      }
    );

    if (!res.ok) {
      console.error('❌ Error HTTP al cargar proyecto:', res.status);
      return false;
    }

    const json = await res.json();

    if (json?.contenidoJson) {
      if (diagram.isInTransaction) {
        console.warn(
          '⏭️ Saltando carga desde backend porque hay una transacción en curso'
        );
        return false;
      }

      diagram.model = go.Model.fromJson(JSON.stringify(json.contenidoJson));
      console.log('📌 Modelo cargado desde backend');
      return true;
    }

    console.log(
      '⚠ Proyecto sin contenido en backend, usando modelo vacío/localStorage'
    );
    return false;
  } catch (err) {
    console.error('❌ Error cargando proyecto desde backend:', err);
    return false;
  }
};

// ----------------------------------------------------
// Componente del Canvas GoJS
// ----------------------------------------------------
const FloorplanCanvas = ({
  zoom,
  onZoomChange,
  onLocalCursorMove,
  onLocalCursorLeave,
  canEdit,
  initialData,
}) => {
  const diagramRef = useRef(null);
  const diagramInstanceRef = useRef(null);

  // refs para callbacks (para no re-crear el diagrama)
  const moveCallbackRef = useRef(onLocalCursorMove);
  const leaveCallbackRef = useRef(onLocalCursorLeave);
  const canEditRef = useRef(canEdit);

  useEffect(() => {
    moveCallbackRef.current = onLocalCursorMove;
  }, [onLocalCursorMove]);

  useEffect(() => {
    leaveCallbackRef.current = onLocalCursorLeave;
  }, [onLocalCursorLeave]);

  useEffect(() => {
    canEditRef.current = canEdit;
    if (diagramInstanceRef.current) {
      diagramInstanceRef.current.isReadOnly = !canEdit;
    }
  }, [canEdit]);

  // Atajos de teclado
  useEffect(() => {
    const handleKeyDown = (e) => {
      const diagram = window.floorplanDiagram;
      if (!diagram) return;

      // GoJS bloquea comandos cuando isReadOnly = true,
      // así que no necesitamos más lógica aquí.
      if ((e.ctrlKey || e.metaKey) && e.key === 'c') {
        if (diagram.selection.count > 0) {
          diagram.commandHandler.copySelection();
          e.preventDefault();
        }
      } else if ((e.ctrlKey || e.metaKey) && e.key === 'x') {
        if (diagram.selection.count > 0) {
          diagram.commandHandler.cutSelection();
          e.preventDefault();
        }
      } else if ((e.ctrlKey || e.metaKey) && e.key === 'v') {
        diagram.commandHandler.pasteSelection();
        e.preventDefault();
      } else if (e.key === 'Delete' || e.key === 'Backspace') {
        if (diagram.selection.count > 0) {
          diagram.commandHandler.deleteSelection();
          e.preventDefault();
        }
      } else if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey) {
        diagram.commandHandler.undo();
        e.preventDefault();
      } else if (
        (e.ctrlKey || e.metaKey) &&
        (e.key === 'y' || (e.shiftKey && e.key === 'z'))
      ) {
        diagram.commandHandler.redo();
        e.preventDefault();
      } else if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        if (saveDiagramToLocalStorage(diagram)) {
          message.success('Diagrama guardado exitosamente');
        } else {
          message.error('Error al guardar el diagrama');
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Inicializar GoJS + sockets (SOLO UNA VEZ)
  useEffect(() => {
    const socket = getSocket();

    const $ = go.GraphObject.make;
    const diagram = $(go.Diagram, diagramRef.current, {
      'undoManager.isEnabled': true,
      allowDrop: true,
      allowLink: false,
      allowZoom: true,
      grid: $(
        go.Panel,
        'Grid',
        $(go.Shape, 'LineH', {
          stroke: 'rgba(200,200,200,0.3)',
          strokeWidth: 1,
        }),
        $(go.Shape, 'LineV', {
          stroke: 'rgba(200,200,200,0.3)',
          strokeWidth: 1,
        })
      ),
      'animationManager.isEnabled': false,
      initialContentAlignment: go.Spot.Center,
      externalObjectsDropped: (e) => {
        e.subject.each((node) => {
          console.log('Objeto agregado:', node.data);
        });
        saveDiagramToLocalStorage(diagram);
        saveDiagramToBackend(diagram);
      },
    });

    // asegurar permisos
    diagram.isReadOnly = !canEditRef.current;

    // ✅ Configurar DragSelectingTool (cuadro de selección múltiple)
    diagram.toolManager.dragSelectingTool.box = $(
      go.Part,
      { layerName: 'Tool', selectable: false },
      $(
        go.Shape,
        {
          name: 'SHAPE',
          fill: 'rgba(30, 144, 255, 0.15)',
          stroke: 'dodgerblue',
          strokeWidth: 2,
          strokeDashArray: [8, 4],
        }
      )
    );

    // ✅ Herramienta de rotación con snaps a 45°
    class Rotate90Tool extends go.RotatingTool {
      constructor() {
        super();
        this.snapAngleMultiple = 45;
        this.snapAngleEpsilon = 22.5;
      }

      computeRotate(newangle) {
        const angle = super.computeRotate(newangle);
        return Math.round(angle / 45) * 45;
      }
    }

    diagram.toolManager.rotatingTool = new Rotate90Tool();

    // ✅ SNAPPING TOOL AVANZADO
    class SnappingTool extends go.DraggingTool {
      constructor() {
        super();
        this.SNAP_COOLDOWN = 1000;

        // Categorías que NO deben tener snap magnético
        this.NO_SNAP_CATEGORIES = [
          'Toilet',
          'Sink',
          'Bathtub',
          'Bide',
          'Urinal',
          'Shower',
          'VanityCabinet',
          'MedicineCabinet',
          'BathroomShelf',
          'TallCabinet',
          'TowelRack',
          'Mirror',
          'LaundryBasket',
          'Scale',
          'TrashBin',
          'BathPlant',
          'BathMat',
          'BathStool',
          'Fridge',
          'Stove',
          'Oven',
          'Microwave',
          'Dishwasher',
          'Washer',
          'Dryer',
          'KitchenCabinet',
          'KitchenIsland',
          'KitchenTable',
          'KitchenChair',
          'Stool',
          'Counter',
          'Trash',
          'EspejoRedondo',
          'EspejoRectangular',
          'EspejoGrande',
          'EspejoCuerpoEntero',
          'CuadroPequeño',
          'CuadroMediano',
          'CuadroGrande',
          'Triptico',
          'FotografiaEnmarcada',
          'AlfombraRectangularPequeña',
          'AlfombraRectangularGrande',
          'AlfombraRedondaPequeña',
          'AlfombraRedondaGrande',
          'TapeteEntrada',
          'JarronGrande',
          'JarronMediano',
          'Escultura',
          'PercheroPie',
          'Paragüero',
          'Zapatero',
          'BaulDecorativo',
          'Biombo',
          'Cortina',
          'CestaDecorativa',
          'LibrosDecorativos',
          'CojinesDecorativos',
          'Desk',
          'OfficeChair',
          'ExecutiveChair',
          'VisitorChair',
          'Sofa',
          'Table',
          'RoundTable',
          'FilingCabinet',
          'Bookshelf',
          'Credenza',
          'Printer',
          'Whiteboard',
          'Monitor',
          'SimpleFurniture',
          'Bed',
          'SingleBed',
          'DoubleBed',
          'QueenBed',
          'KingBed',
          'BunkBed',
          'Wardrobe',
          'Closet',
          'Armoire',
          'Dresser',
          'ChestOfDrawers',
          'Nightstand',
          'BedsideTable',
          'VanityTable',
          'Bench',
          'Ottoman',
          'ReadingChair',
          'Couch',
          'Loveseat',
          '3SeaterSofa',
          '2SeaterSofa',
          'LSofa',
          'Armchair',
          'Recliner',
          'AccentChair',
          'Lounge',
          'CoffeeTable',
          'SideTable',
          'EndTable',
          'ConsoleTable',
          'TVStand',
          'MediaConsole',
          'TV',
          'Television',
          'EntertainmentCenter',
          'Bookcase',
          'DisplayShelf',
          'Cabinet',
          'Rug',
          'AreaRug',
          'Lamp',
          'FloorLamp',
          'TableLamp',
          'DiningTable',
          'RectangularTable',
          'SquareTable',
          'DiningChair',
          'Chair',
          'Buffet',
          'Sideboard',
          'ChinaCabinet',
          'ServerTable',
          'BarCart',
          'ServingCart',
          'WineRack',
          'Chandelier',
          'Furniture',
          'Object',
          'Item',
          'RoundDiningTable',
          'UpholsteredChair',
          'DiningBench',
          'HeadChair',
          'DisplayCabinet',
          'DrawerUnit',
          'Bar',
          'DiningRug',
          'CutLine',
          'CutDirectionSymbol',
          'CutPlane',
          'HorizontalMeasurement',
          'VerticalMeasurement',
          'DimensionLine',
          'AreaRectangle',
          'AreaPolygon',
          'SolidLine',
          'DashedLine',
          'DottedLine',
          'Square',
          'Rectangle',
          'Circle',
          'TextLabel',
          'Label',
          'Symbol',
          'Annotation',
          'Note',
        ];
      }

      shouldSnap(category) {
        return !this.NO_SNAP_CATEGORIES.includes(category);
      }

      // Permitir que DragSelectingTool funcione correctamente
      canStart() {
        if (this.findDraggablePart() !== null) {
          return super.canStart();
        }
        // Si no hay nodo bajo el cursor, que se encargue DragSelectingTool
        return false;
      }

      moveParts(parts, offset, check) {
        super.moveParts(parts, offset, check);

        const it = parts.iterator;
        while (it.next()) {
          const part = it.key;
          if (part instanceof go.Node && this.shouldSnap(part.category)) {
            this.applySnapping(part);
          }
        }
      }

      applySnapping(movingNode) {
        const now = Date.now();
        if (movingNode._snapUnlockTime && now < movingNode._snapUnlockTime) return;

        const diagram = this.diagram;
        const movingShape = movingNode.findObject('SHAPE');
        if (!movingShape) return;

        const movingBounds = movingShape.getDocumentBounds();

        let bestSnap = null;
        let minDistance = SNAP_DISTANCE;

        const movingPoints = [
          { x: movingBounds.x, y: movingBounds.y },
          { x: movingBounds.x + movingBounds.width / 2, y: movingBounds.y },
          { x: movingBounds.x + movingBounds.width, y: movingBounds.y },
          { x: movingBounds.x, y: movingBounds.y + movingBounds.height / 2 },
          {
            x: movingBounds.x + movingBounds.width / 2,
            y: movingBounds.y + movingBounds.height / 2,
          },
          {
            x: movingBounds.x + movingBounds.width,
            y: movingBounds.y + movingBounds.height / 2,
          },
          { x: movingBounds.x, y: movingBounds.y + movingBounds.height },
          {
            x: movingBounds.x + movingBounds.width / 2,
            y: movingBounds.y + movingBounds.height,
          },
          {
            x: movingBounds.x + movingBounds.width,
            y: movingBounds.y + movingBounds.height,
          },
        ];

        diagram.nodes.each((targetNode) => {
          if (
            targetNode === movingNode ||
            !this.shouldSnap(targetNode.category) ||
            this.draggedParts.contains(targetNode)
          ) {
            return;
          }

          const targetShape = targetNode.findObject('SHAPE');
          if (!targetShape) return;

          const targetBounds = targetShape.getDocumentBounds();

          const targetPoints = [
            { x: targetBounds.x, y: targetBounds.y },
            { x: targetBounds.x + targetBounds.width / 2, y: targetBounds.y },
            { x: targetBounds.x + targetBounds.width, y: targetBounds.y },
            {
              x: targetBounds.x,
              y: targetBounds.y + targetBounds.height / 2,
            },
            {
              x: targetBounds.x + targetBounds.width / 2,
              y: targetBounds.y + targetBounds.height / 2,
            },
            {
              x: targetBounds.x + targetBounds.width,
              y: targetBounds.y + targetBounds.height / 2,
            },
            {
              x: targetBounds.x,
              y: targetBounds.y + targetBounds.height,
            },
            {
              x: targetBounds.x + targetBounds.width / 2,
              y: targetBounds.y + targetBounds.height,
            },
            {
              x: targetBounds.x + targetBounds.width,
              y: targetBounds.y + targetBounds.height,
            },
          ];

          movingPoints.forEach((mp) => {
            targetPoints.forEach((tp) => {
              const dx = tp.x - mp.x;
              const dy = tp.y - mp.y;
              const distance = Math.sqrt(dx * dx + dy * dy);
              if (distance < minDistance) {
                minDistance = distance;
                bestSnap = { dx, dy };
              }
            });
          });
        });

        if (bestSnap) {
          const movingShapeLoc = movingShape.getDocumentPoint(go.Spot.TopLeft);
          const newShapeX = movingShapeLoc.x + bestSnap.dx;
          const newShapeY = movingShapeLoc.y + bestSnap.dy;
          const nodeCurrentLoc = movingNode.location.copy();
          const offsetX = newShapeX - movingShapeLoc.x;
          const offsetY = newShapeY - movingShapeLoc.y;

          movingNode.location = new go.Point(
            nodeCurrentLoc.x + offsetX,
            nodeCurrentLoc.y + offsetY
          );

          movingNode.movable = false;
          movingNode._wasSnapped = true;
        } else {
          movingNode._wasSnapped = false;
        }
      }

      doDeactivate() {
        super.doDeactivate();
        const diagram = this.diagram;
        saveDiagramToLocalStorage(diagram);
        saveDiagramToBackend(diagram);
      }
    }

    diagram.toolManager.draggingTool = new SnappingTool();

    // Manejo de desbloqueo tras selección
    diagram.addDiagramListener('ChangedSelection', (e) => {
      e.diagram.selection.each((node) => {
        if (node instanceof go.Node) {
          node.movable = true;
          if (node._wasSnapped) {
            node._snapUnlockTime = Date.now() + 1000;
          } else {
            node._snapUnlockTime = null;
          }
        }
      });
    });

    // ---------------- Model Change Listener ----------------
    diagram.addModelChangedListener((e) => {
      if (e.model.skipsUndoManager) return;
      if (!e.isTransactionFinished) return;

      // si no puede editar, no enviamos cambios al socket
      if (!canEditRef.current) return;

      let incremental = null;
      try {
        incremental = diagram.model.toIncrementalJson(e);
      } catch (err) {
        console.warn('⚠ No se pudo generar incremental:', err);
        return;
      }

      if (!incremental || incremental === '{}') return;

      const projectId = localStorage.getItem('current_project_id');
      const s = getSocket();
      if (s && projectId) {
        s.emit('modelChange', {
          roomId: `project_${projectId}`,
          change: incremental,
        });
      }
    });

    diagram.nodeTemplateMap.add('Wall', createWallTemplate($));
    
    registerRoomTemplates(diagram, $);
    registerDoorTemplates(diagram, $);
    registerWindowTemplates(diagram, $);
    
    diagram.nodeTemplateMap.add('Label', createLabelTemplate($));
    diagram.nodeTemplateMap.add('TextLabel', createTextLabelTemplate($));
    diagram.nodeTemplateMap.add('Symbol', createSymbolTemplate($));
    registerDimensionTemplates(diagram, $);
    registerSalonTemplates(diagram, $);
    registerDormitorioTemplates(diagram, $);
    registerCocinaTemplates(diagram, $);
    registerBanoTemplates(diagram, $);
    registerComedorTemplates(diagram, $);
    registerOficinaTemplates(diagram, $);
    registerDecoracionTemplates(diagram, $);

    diagram.nodeTemplateMap.add('Furniture', createFurnitureTemplate($));
    diagram.model = new go.GraphLinksModel([]);

    (async () => {
      if (initialData) {
        try {
          diagram.model = go.Model.fromJson(JSON.stringify(initialData));
          console.log('📌 Modelo cargado desde props iniciales');
          return;
        } catch (err) {
          console.error('Error cargando initialData, se intenta backend:', err);
        }
      }

      const loadedFromBackend = await loadFromBackend(diagram);
      if (!loadedFromBackend) {
        loadDiagramFromLocalStorage(diagram);
      }
    })();

    diagramInstanceRef.current = diagram;
    window.floorplanDiagram = diagram;

    // ---------------- JOIN ROOM + listener remoto ----------------
    const projectId = localStorage.getItem('current_project_id');
    const roomId = projectId ? `project_${projectId}` : null;

    const handleRemoteModelChange = (change) => {
      const d = window.floorplanDiagram;
      if (!d) return;

      try {
        let payload = change;
        if (typeof payload !== 'string') {
          payload = JSON.stringify(payload);
        }
        d.model.applyIncrementalJson(payload);
      } catch (err) {
        console.error('❌ Error aplicando incremental remoto:', err);
      }
    };

    let handleConnect;

    if (socket && roomId) {
      const joinRoom = () => {
        socket.emit('joinRoom', { roomId });
        console.log('📌 Joined room:', roomId);
      };

      handleConnect = joinRoom;

      if (socket.connected) {
        joinRoom();
      }

      socket.on('connect', handleConnect);
      socket.on('modelChange', handleRemoteModelChange);
    }

    // --------------- CURSOR LOCAL (DOM mousemove) ---------------
    const handleMouseMove = (ev) => {
      if (!diagram.div) return;
      const rect = diagram.div.getBoundingClientRect();
      const x = ev.clientX - rect.left;
      const y = ev.clientY - rect.top;

      if (typeof moveCallbackRef.current === 'function') {
        moveCallbackRef.current({ x, y });
      }
    };

    const handleMouseLeave = () => {
      if (typeof leaveCallbackRef.current === 'function') {
        leaveCallbackRef.current();
      }
    };

    if (diagram.div) {
      diagram.div.addEventListener('mousemove', handleMouseMove);
      diagram.div.addEventListener('mouseleave', handleMouseLeave);
    }

    // ---------------- Cleanup ----------------
    return () => {
      if (diagram.div) {
        diagram.div.removeEventListener('mousemove', handleMouseMove);
        diagram.div.removeEventListener('mouseleave', handleMouseLeave);
      }

      if (socket) {
        socket.off('modelChange', handleRemoteModelChange);
        if (handleConnect) socket.off('connect', handleConnect);
        if (roomId) {
          socket.emit('leaveRoom', { roomId });
          console.log('🚪 Left room:', roomId);
        }
      }

      if (diagramInstanceRef.current) {
        diagramInstanceRef.current.div = null;
        diagramInstanceRef.current = null;
      }
      window.floorplanDiagram = null;
    };
  }, []); // solo una vez

  // Zoom reactivo
  useEffect(() => {
    if (diagramInstanceRef.current) {
      diagramInstanceRef.current.scale = zoom;
    }
  }, [zoom]);

  return <div ref={diagramRef} className={styles.goJsCanvas} />;
};

// ----------------------------------------------------
// Panel de objetos arrastrables
// ----------------------------------------------------
const ObjectsSubPanel = ({ type, onBack }) => {
  const objects = objectsData[type] || [];

  const handleDragStart = (e, obj) => {
    const diagram = window.floorplanDiagram;
    if (!diagram) return;

    const draggedNode = {
      category: obj.category,
      name: obj.name,
      label: obj.label || obj.name,
      text: obj.text,
      symbol: obj.symbol,
      width: obj.width,
      height: obj.height,
      color: obj.color,
      strokeColor: obj.strokeColor,
      textColor: obj.textColor,
      figure: obj.figure,
      fill: obj.fill,
      stroke: obj.stroke,
      strokeWidth: obj.strokeWidth,
      angle: 0,
    };

    e.dataTransfer.effectAllowed = 'copy';
    e.dataTransfer.setData('text', JSON.stringify(draggedNode));
  };

  return (
    <div className={styles.subPanel}>
      <div className={styles.subPanelHeader}>
        <Button
          type="text"
          icon={<LeftOutlined />}
          onClick={onBack}
          className={styles.backButton}
        />
        <h3>{panelTitles[type] || 'Objetos'}</h3>
      </div>
      <div className={styles.subPanelContent}>
        {objects.map((obj, index) => (
          <div
            key={index}
            className={styles.draggableObject}
            draggable
            onDragStart={(e) => handleDragStart(e, obj)}
          >
            <div
              className={styles.objectPreview}
              style={{
                backgroundColor: obj.color || '#D2691E',
                width: '50px',
                height: '50px',
                borderRadius: '4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: obj.textColor || 'white',
                fontSize: obj.symbol || obj.preview ? '24px' : '10px',
                fontWeight: 'bold',
                border: `2px solid ${obj.strokeColor || '#333'}`,
              }}
            >
              {obj.preview || obj.symbol || obj.label || obj.name}
            </div>
            <span className={styles.objectName}>{obj.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// ----------------------------------------------------
// Panel lateral principal
// ----------------------------------------------------
const SidePanel = ({ type, onItemClick }) => {
  const panelContent = {
    project: {
      title: 'Proyecto',
      items: [
        { icon: <HomeOutlined />, label: 'Nuevo Proyecto', hasArrow: false, action: 'nuevo-proyecto' },
        { icon: <UploadOutlined />, label: 'Abrir Proyecto', hasArrow: false, action: 'abrir-proyecto' },
        { icon: <SaveOutlined />, label: 'Guardar Proyecto', hasArrow: false, action: 'guardar-proyecto' },
      ]
    },

    build: {
      title: 'Construcción',
      items: [
        { icon: <BorderOutlined />, label: 'Dibujar Pared', hasArrow: true, action: 'dibujar-pared' },
        { icon: <DatabaseOutlined />, label: 'Colocar Puertas', hasArrow: true, action: 'colocar-puertas' },
        { icon: <BlockOutlined />, label: 'Colocar Ventanas', hasArrow: true, action: 'colocar-ventanas' },
      ]
    },

    info: {
      title: 'Información',
      items: [
        { icon: <HomeOutlined />, label: 'Tipo de Habitación', hasArrow: true, action: 'tipo-habitacion' },
        { icon: <FontSizeOutlined />, label: 'Colocar Etiqueta', hasArrow: true, action: 'colocar-etiqueta' },
        { icon: <SignatureOutlined />, label: 'Signos y Símbolos', hasArrow: true, action: 'signos-simbolos' },
      ]
    },

    objects: {
      title: 'Objetos',
      items: [
        { icon: <AppstoreOutlined />, label: 'Salón', hasArrow: true, action: 'salon' },
        { icon: <HomeOutlined />, label: 'Dormitorio', hasArrow: true, action: 'dormitorio' },
        { icon: <BuildOutlined />, label: 'Cocina', hasArrow: true, action: 'cocina' },
        { icon: <DatabaseOutlined />, label: 'Baño', hasArrow: true, action: 'bano' },
        { icon: <AppstoreOutlined />, label: 'Comedor', hasArrow: true, action: 'comedor' },
        { icon: <EditOutlined />, label: 'Oficina', hasArrow: true, action: 'oficina' },
        { icon: <HomeOutlined />, label: 'Decoración', hasArrow: true, action: 'decoracion' },
      ]
    },

    dimension: {
      title: 'Dimensión',
      items: [
        { icon: <ScissorOutlined />, label: 'Cortes', hasArrow: true, action: 'cortes' },
        { icon: <ColumnWidthOutlined />, label: 'Medidas', hasArrow: true, action: 'medidas' },
        { icon: <BorderOutlined />, label: 'Líneas', hasArrow: true, action: 'lineas' },
      ]
    },

    profile: { title: 'Perfil', items: [] },
    report: { title: 'Reporte', items: [] },
  };

  const content = panelContent[type];
  if (!content) return null;

  return (
    <div className={styles.sidePanel}>
      <div className={styles.sidePanelHeader}>
        <h3>{content.title}</h3>
      </div>

      <div className={styles.sidePanelContent}>
        {content.items.map((item, index) => (
          <div
            key={index}
            className={styles.sidePanelItem}
            onClick={() => onItemClick && onItemClick(item.action)}
          >
            <div className={styles.sidePanelItemLeft}>
              <span className={styles.sidePanelItemIcon}>{item.icon}</span>
              <span className={styles.sidePanelItemLabel}>{item.label}</span>
            </div>

            {item.hasArrow && (
              <RightOutlined className={styles.sidePanelItemArrow} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};


// ----------------------------------------------------
// Sider flotante
// ----------------------------------------------------
  const FloatingVerticalSider = ({ onMenuClick, selectedKey }) => {
    const siderItems = [
      { key: 'build', icon: <ToolOutlined />, label: 'Construir' },
      { key: 'info', icon: <InfoCircleOutlined />, label: 'Info' },
      { key: 'objects', icon: <ApartmentOutlined />, label: 'Objetos' },
      { key: 'dimension', icon: <ColumnWidthOutlined />, label: 'Dimensión' },
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

// ----------------------------------------------------
// Layout principal + cursores remotos + notificaciones
// ----------------------------------------------------
const BlackboardLayout = ({
  proyectoId: proyectoIdProp,
  initialData = null,
  permission = 'write',
  fromSharedLink = false,
}) => {
  const { id: paramId } = useParams();

  const proyectoId =
    proyectoIdProp || paramId || localStorage.getItem('current_project_id');

  const canEdit = permission === 'write';

  const [zoom, setZoom] = useState(1);
  const [selectedKey, setSelectedKey] = useState(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [subPanelType, setSubPanelType] = useState(null);
  const diagramContainerRef = useRef(null);

  // notificaciones superiores
  const [notifications, setNotifications] = useState([]);

  // cursores remotos: { [clientId]: { x, y, color, label } }
  const [remoteCursors, setRemoteCursors] = useState({});

  // usuarios en línea: { [clientId]: { id, name, color, isMe } }
  const [onlineUsersMap, setOnlineUsersMap] = useState({});
  const knownUsersRef = useRef({});

  const myColorRef = useRef(null);
  const myLabelRef = useRef(null);
  const myClientIdRef = useRef(null); // id del socket propio

  const [shareModalOpen, setShareModalOpen] = useState(false);

  if (!myColorRef.current) {
    const pseudoId = localStorage.getItem('user_id') || 'me';
    myColorRef.current = colorForClient(pseudoId + Date.now());
  }
  if (!myLabelRef.current) {
    const resolved = resolveLocalUserLabel();
    myLabelRef.current = resolved;
  }

  const pushNotification = (msg, color) => {
    const id = Date.now() + Math.random();
    setNotifications((prev) => [...prev, { id, msg, color }]);
    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    }, 5000);
  };

  // Inicializar socket una sola vez
  useEffect(() => {
    initSocket();
  }, []);

  // Guardar id de proyecto en localStorage al entrar
  useEffect(() => {
    if (proyectoId) {
      localStorage.setItem('current_project_id', proyectoId);
      console.log('📌 Proyecto abierto:', proyectoId);
    }
  }, [proyectoId]);

  // Drop de objetos desde panel
  useEffect(() => {
    const handleDrop = (e) => {
      if (!canEdit) return; // no permitir drop en solo lectura

      e.preventDefault();
      const diagram = window.floorplanDiagram;
      if (!diagram) return;

      const data = e.dataTransfer.getData('text');
      if (!data) return;

      const nodeData = JSON.parse(data);
      const rect = diagramContainerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const docPoint = diagram.transformViewToDoc(new go.Point(x, y));

      diagram.startTransaction('add node');
      diagram.model.addNodeData({
        ...nodeData,
        key: Date.now(),
        loc: go.Point.stringify(docPoint),
      });
      diagram.commitTransaction('add node');
    };

    const handleDragOver = (e) => {
      e.preventDefault();
      e.dataTransfer.dropEffect = 'copy';
    };

    const container = diagramContainerRef.current;
    if (container) {
      container.addEventListener('drop', handleDrop);
      container.addEventListener('dragover', handleDragOver);
    }

    return () => {
      if (container) {
        container.removeEventListener('drop', handleDrop);
        container.removeEventListener('dragover', handleDragOver);
      }
    };
  }, [canEdit]);

  // ---- Socket: cursores remotos + usuarios online ----
  useEffect(() => {
    const socket = getSocket();
    if (!socket) return;

    const handleCursorMove = ({ clientId, cursor }) => {
      if (!cursor) return;

      // Si viene marcado como oculto, lo sacamos de cursores y de usuarios online
      if (cursor.hidden) {
        setRemoteCursors((prev) => {
          const clone = { ...prev };
          delete clone[clientId];
          return clone;
        });
        setOnlineUsersMap((prev) => {
          const clone = { ...prev };
          delete clone[clientId];
          return clone;
        });
        return;
      }

      const color = cursor.color || colorForClient(clientId);
      const baseLabel = cursor.label || `User ${clientId.slice(-4)}`;
      const isMe = clientId === myClientIdRef.current;
      const label = isMe ? 'Tú' : baseLabel;

      const alreadyKnown = !!knownUsersRef.current[clientId];
      knownUsersRef.current[clientId] = { name: label, color };

      setRemoteCursors((prev) => ({
        ...prev,
        [clientId]: {
          x: cursor.x,
          y: cursor.y,
          color,
          label,
        },
      }));

      setOnlineUsersMap((prev) => ({
        ...prev,
        [clientId]: {
          id: clientId,
          name: label,
          color,
          isMe,
        },
      }));

      if (!alreadyKnown && !isMe) {
        pushNotification(`${label} se ha unido al proyecto`, color);
      }
    };

    const handleConnect = () => {
      myClientIdRef.current = socket.id;
      const myName =
        myLabelRef.current || resolveLocalUserLabel() || 'Tú';
      const myColor =
        myColorRef.current || colorForClient(socket.id);

      knownUsersRef.current[socket.id] = {
        name: myName,
        color: myColor,
      };

      setOnlineUsersMap((prev) => ({
        ...prev,
        [socket.id]: {
          id: socket.id,
          name: myName,
          color: myColor,
          isMe: true,
        },
      }));
    };

    const handleDisconnect = () => {
      const idSelf = myClientIdRef.current;
      if (!idSelf) return;
      setOnlineUsersMap((prev) => {
        const clone = { ...prev };
        delete clone[idSelf];
        return clone;
      });
    };

    socket.on('cursorMove', handleCursorMove);
    socket.on('connect', handleConnect);
    socket.on('disconnect', handleDisconnect);

    if (socket.connected) {
      handleConnect();
    }

    return () => {
      socket.off('cursorMove', handleCursorMove);
      socket.off('connect', handleConnect);
      socket.off('disconnect', handleDisconnect);
    };
  }, []);

  // ---- Enviar movimiento del cursor local ----
  const emitLocalCursor = (cursor) => {
    const socket = getSocket();
    const currentId = localStorage.getItem('current_project_id');
    if (!socket || !currentId) return;

    const roomId = `project_${currentId}`;

    const payload = {
      ...cursor,
      label: myLabelRef.current || 'Usuario',
      color: myColorRef.current,
    };

    socket.emit('cursorMove', {
      roomId,
      cursor: payload,
    });
  };

  const handleLocalCursorMove = ({ x, y }) => {
    emitLocalCursor({
      x,
      y,
      hidden: false,
    });
  };

  const handleLocalCursorLeave = () => {
    emitLocalCursor({
      x: -9999,
      y: -9999,
      hidden: true,
    });
  };

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 0.1, 3));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 0.1, 0.3));
  const handleResetZoom = () => setZoom(1);

  const handleMenuClick = (e) => {
    if (selectedKey === e.key) {
      setSelectedKey(null);
      setIsPanelOpen(false);
      setSubPanelType(null);
    } else {
      setSelectedKey(e.key);
      setIsPanelOpen(true);
      setSubPanelType(null);
    }
  };

  const handlePanelItemClick = (action) => {
    setSubPanelType(action);
  };

  const handleBackToMainPanel = () => {
    setSubPanelType(null);
  };

  const isSubPanelOpen = subPanelType !== null;
  const onlineUsersArray = Object.values(onlineUsersMap);

  return (
    <Layout
      style={{ height: '97vh', display: 'flex', flexDirection: 'column' }}
    >
      <TopNavbar onlineUsers={onlineUsersArray} />

      <Layout style={{ flex: 1 }}>
        <Content
          className={styles.blackboardWrapper}
          ref={diagramContainerRef}
        >
          <FloatingVerticalSider
            onMenuClick={handleMenuClick}
            selectedKey={selectedKey}
          />

          {isPanelOpen && !isSubPanelOpen && (
            <SidePanel type={selectedKey} onItemClick={handlePanelItemClick} />
          )}

          {isSubPanelOpen && (
            <ObjectsSubPanel
              type={subPanelType}
              onBack={handleBackToMainPanel}
            />
          )}

          <div
            className={styles.zoomWindow}
            style={{
              left: isPanelOpen ? '370px' : '110px',
              transition: 'left 0.3s ease',
            }}
          >
            <Tooltip title="Zoom In">
              <Button
                icon={<PlusOutlined />}
                className={styles.zoomWindowButton}
                onClick={handleZoomIn}
              />
            </Tooltip>
            <Tooltip title="Zoom Out">
              <Button
                icon={<MinusOutlined />}
                className={styles.zoomWindowButton}
                onClick={handleZoomOut}
              />
            </Tooltip>
            <Tooltip title="Reset Zoom">
              <Button
                icon={<ReloadOutlined />}
                className={styles.zoomWindowButton}
                onClick={handleResetZoom}
              />
            </Tooltip>

            {canEdit && (
              <Tooltip title="Compartir proyecto">
                <Button
                  icon={<ShareAltOutlined />}
                  className={styles.zoomWindowButton}
                  onClick={() => setShareModalOpen(true)}
                />
              </Tooltip>
            )}
          </div>

          {!canEdit && (
            <div
              style={{
                position: 'absolute',
                top: 15,
                right: 15,
                background: '#faad14',
                padding: '6px 12px',
                borderRadius: 6,
                color: 'white',
                fontWeight: 'bold',
                zIndex: 999,
              }}
            >
              MODO SOLO LECTURA
            </div>
          )}

          {/* Canvas GoJS */}
          <FloorplanCanvas
            zoom={zoom}
            onZoomChange={setZoom}
            onLocalCursorMove={handleLocalCursorMove}
            onLocalCursorLeave={handleLocalCursorLeave}
            canEdit={canEdit}
            initialData={initialData}
          />

          {/* Notificaciones superiores de usuarios */}
          <div className={styles.topNotificationsContainer}>
            {notifications.map((n) => (
              <div
                key={n.id}
                className={styles.topNotification}
                style={{ borderLeftColor: n.color || '#1890ff' }}
              >
                {n.msg}
              </div>
            ))}
          </div>

          {/* Cursores remotos dibujados encima del canvas */}
          {Object.entries(remoteCursors).map(([clientId, cursor]) => (
            <div
              key={clientId}
              className={styles.remoteCursor}
              style={{
                left: `${cursor.x}px`,
                top: `${cursor.y}px`,
              }}
            >
              <div
                className={styles.remoteCursorDot}
                style={{ backgroundColor: cursor.color || '#000' }}
              />
              <div className={styles.remoteCursorLabel}>{cursor.label}</div>
            </div>
          ))}

          {/* Modal para compartir proyecto */}
          {proyectoId && (
            <ShareProjectModal
              open={shareModalOpen}
              onClose={() => setShareModalOpen(false)}
              proyectoId={proyectoId}
            />
          )}
        </Content>
      </Layout>
    </Layout>
  );
};

export default BlackboardLayout;
