import * as go from 'gojs';

const DOOR_STANDARD_WIDTH = 40;
const DOOR_STANDARD_HEIGHT = 4;
const DOOR_DOUBLE_WIDTH = 80;
const DOOR_DOUBLE_HEIGHT = 4;
const DOOR_ENTRY_WIDTH = 60;
const DOOR_ENTRY_HEIGHT = 6;
const DOOR_SLIDING_SIMPLE_WIDTH = 50;
const DOOR_SLIDING_SIMPLE_HEIGHT = 4;
const DOOR_SLIDING_DOUBLE_WIDTH = 100;
const DOOR_SLIDING_DOUBLE_HEIGHT = 4;
const DOOR_FOLDING_WIDTH = 55;
const DOOR_FOLDING_HEIGHT = 4;
const DOOR_ACCORDION_WIDTH = 70;
const DOOR_ACCORDION_HEIGHT = 4;
const DOOR_REVOLVING_SIZE = 56;
const DOOR_GARAGE_WIDTH = 100;
const DOOR_GARAGE_HEIGHT = 4;
const DOOR_PATIO_WIDTH = 80;
const DOOR_PATIO_HEIGHT = 4;
const DOOR_EMERGENCY_WIDTH = 50;
const DOOR_EMERGENCY_HEIGHT = 4;

const ARC_STROKE_COLOR = '#423e3bff';
const ARC_STROKE_WIDTH = 1.5;
const ARC_FILL_OPACITY = 0.05;

export const createDoorTemplate = ($) => {
  return $(go.Node, "Spot",
    { 
      locationSpot: go.Spot.Center, 
      rotatable: true,
      resizable: true,
      resizeObjectName: "SHAPE"
    },
    new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
    new go.Binding("angle", "angle").makeTwoWay(),

    $(go.Panel, "Position",

      // Arco de apertura
      $(go.Shape,
        { 
          stroke: ARC_STROKE_COLOR,
          strokeWidth: ARC_STROKE_WIDTH,
          fill: `rgba(139, 69, 19, ${ARC_FILL_OPACITY})`
        },
        new go.Binding("geometryString", "", (data) => {
            const width = data.width || DOOR_STANDARD_WIDTH;
            const color = (data.color || "#8B4513").toLowerCase();

            // Mapeo color → dirección
            const leftColors = ['#000000', '#1a1a1a', '#3f1e0f', '#6f2e0f']; // colores que deben girar a la izquierda
            const isLeft = leftColors.includes(color);

            if (isLeft) {
                return `M ${width/2} 0 L ${width/2} ${width} A ${width} ${width} 0 0 1 ${-width/2} 0 Z`;
            } else {
                return `M ${-width/2} 0 L ${-width/2} ${width} A ${width} ${width} 0 0 0 ${width/2} 0 Z`;
            }
        })

      ),

      // Cuerpo de la puerta
      $(go.Shape, "Rectangle",
        { 
          name: "SHAPE",
          fill: "#8B4513", 
          stroke: "#654321", 
          strokeWidth: 2.5, 
          width: DOOR_STANDARD_WIDTH, 
          height: DOOR_STANDARD_HEIGHT
        },
        new go.Binding("width", "width").makeTwoWay(),
        new go.Binding("height", "height").makeTwoWay(),
        new go.Binding("fill", "color"),
        new go.Binding("stroke", "strokeColor"),
        new go.Binding("position", "width", (w) => new go.Point(-w/2, -4))
      )
    )
  );
};

export const createSlidingDoorTemplate = ($) => {
  return $(go.Node, 'Vertical',
    { locationSpot: go.Spot.Center, rotatable: true, resizable: true },
    new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
    new go.Binding('angle', 'angle').makeTwoWay(),
    $(go.Panel, 'Auto',
      $(go.Shape, 'Rectangle',
        { fill: '#8B4513', stroke: '#654321', strokeWidth: 2, width: DOOR_SLIDING_SIMPLE_WIDTH, height: DOOR_SLIDING_SIMPLE_HEIGHT },
        new go.Binding('width', 'width').makeTwoWay(),
        new go.Binding('height', 'height').makeTwoWay(),
        new go.Binding('fill', 'color'),
        new go.Binding('stroke', 'strokeColor')
      )
    ),
    $(go.Shape, 'LineH',
      { stroke: '#654321', strokeWidth: 2, width: DOOR_SLIDING_SIMPLE_WIDTH, height: 0, margin: new go.Margin(-4,0,0,0) },
      new go.Binding('width', 'width'),
      new go.Binding('stroke', 'strokeColor')
    )
  );
};

export const createFoldingDoorTemplate = ($) => {
  return $(go.Node, 'Spot',
    { locationSpot: go.Spot.Center, rotatable: true, resizable: true },
    new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
    new go.Binding('angle', 'angle').makeTwoWay(),
    $(go.Panel, 'Horizontal',
      $(go.Shape, 'Rectangle', { fill: '#8B4513', stroke: '#654321', strokeWidth: 2, width: 10, height: DOOR_FOLDING_HEIGHT },
        new go.Binding('fill', 'color'), new go.Binding('stroke', 'strokeColor')),
      $(go.Shape, 'Rectangle', { fill: '#A0522D', stroke: '#654321', strokeWidth: 2, width: 10, height: DOOR_FOLDING_HEIGHT, margin: new go.Margin(0,0,0,-2) },
        new go.Binding('fill', 'color'), new go.Binding('stroke', 'strokeColor')),
      $(go.Shape, 'Rectangle', { fill: '#8B4513', stroke: '#654321', strokeWidth: 2, width: 10, height: DOOR_FOLDING_HEIGHT, margin: new go.Margin(0,0,0,-2) },
        new go.Binding('fill', 'color'), new go.Binding('stroke', 'strokeColor'))
    )
  );
};

export const createRevolvingDoorTemplate = ($) => {
  return $(go.Node, 'Spot',
    { locationSpot: go.Spot.Center, rotatable: true },
    new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
    new go.Binding('angle', 'angle').makeTwoWay(),
    $(go.Shape, 'Circle', { fill: 'transparent', stroke: '#654321', strokeWidth: 3, width: 10, height: DOOR_REVOLVING_SIZE },
      new go.Binding('stroke', 'strokeColor')),
    $(go.Shape, 'LineH', { stroke: '#8B4513', strokeWidth: 3, width: 10, height: 0 },
      new go.Binding('stroke', 'color')),
    $(go.Shape, 'LineV', { stroke: '#8B4513', strokeWidth: 3, width: 0, height: DOOR_REVOLVING_SIZE },
      new go.Binding('stroke', 'color'))
  );
};

export const createGarageDoorTemplate = ($) => {
  return $(go.Node, 'Vertical',
    { locationSpot: go.Spot.Center, rotatable: true },
    new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
    new go.Binding('angle', 'angle').makeTwoWay(),
    $(go.Shape, 'Rectangle', { fill: '#696969', stroke: '#404040', strokeWidth: 2, width: DOOR_GARAGE_WIDTH, height: DOOR_GARAGE_HEIGHT },
      new go.Binding('width', 'width').makeTwoWay(),
      new go.Binding('height', 'height').makeTwoWay(),
      new go.Binding('fill', 'color'),
      new go.Binding('stroke', 'strokeColor')
    ),
    $(go.Shape, 'LineH', { stroke: '#404040', strokeWidth: 1, width: DOOR_GARAGE_WIDTH, margin: new go.Margin(2,0,0,0) },
      new go.Binding('width', 'width'), new go.Binding('stroke', 'strokeColor')),
    $(go.Shape, 'LineH', { stroke: '#404040', strokeWidth: 1, width: DOOR_GARAGE_WIDTH, margin: new go.Margin(2,0,0,0) },
      new go.Binding('width', 'width'), new go.Binding('stroke', 'strokeColor'))
  );
};

export const doorObjects = [
  { category: 'Door', name: 'Puerta Negra (→)', label: 'Puerta Negra →', width: DOOR_STANDARD_WIDTH, height: DOOR_STANDARD_HEIGHT, color: '#111111', strokeColor: '#1a1a1a', preview: '🚪→' },
  { category: 'Door', name: 'Puerta Negra (←)', label: 'Puerta Negra ←', width: DOOR_STANDARD_WIDTH, height: DOOR_STANDARD_HEIGHT, color: '#000000', strokeColor: '#1a1a1a', preview: '←🚪' },
  { category: 'Door', name: 'Puerta Estándar (→)', label: 'Puerta →', width: DOOR_STANDARD_WIDTH, height: DOOR_STANDARD_HEIGHT, color: '#8B4513', strokeColor: '#654321', preview: '🚪→' },
  { category: 'Door', name: 'Puerta Estándar (←)', label: 'Puerta ←', width: DOOR_STANDARD_WIDTH, height: DOOR_STANDARD_HEIGHT, color: '#6F2E0F', strokeColor: '#654321', preview: '←🚪' },
  { category: 'Door', name: 'Puerta Doble', label: 'Puerta Doble', width: DOOR_DOUBLE_WIDTH, height: DOOR_DOUBLE_HEIGHT, color: '#8B4513', strokeColor: '#654321', preview: '🚪🚪' },
  { category: 'SlidingDoor', name: 'Puerta Corrediza Simple', label: 'Corrediza', width: DOOR_SLIDING_SIMPLE_WIDTH, height: DOOR_SLIDING_SIMPLE_HEIGHT, color: '#8B4513', strokeColor: '#654321', preview: '⬌' },
  { category: 'SlidingDoor', name: 'Puerta Corrediza Doble', label: 'Corrediza Doble', width: DOOR_SLIDING_DOUBLE_WIDTH, height: DOOR_SLIDING_DOUBLE_HEIGHT, color: '#8B4513', strokeColor: '#654321', preview: '⬌⬌' },
  { category: 'FoldingDoor', name: 'Puerta Plegable', label: 'Plegable', width: DOOR_FOLDING_WIDTH, height: DOOR_FOLDING_HEIGHT, color: '#8B4513', strokeColor: '#654321', preview: '⫸' },
  { category: 'FoldingDoor', name: 'Puerta Acordeón', label: 'Acordeón', width: DOOR_ACCORDION_WIDTH, height: DOOR_ACCORDION_HEIGHT, color: '#A0522D', strokeColor: '#654321', preview: '≡' },
  { category: 'RevolvingDoor', name: 'Puerta Giratoria', label: 'Giratoria', width: DOOR_REVOLVING_SIZE, height: DOOR_REVOLVING_SIZE, color: '#8B4513', strokeColor: '#654321', preview: '⟲' },
  { category: 'GarageDoor', name: 'Puerta de Garaje', label: 'Garaje', width: DOOR_GARAGE_WIDTH, height: DOOR_GARAGE_HEIGHT, color: '#696969', strokeColor: '#404040', preview: '▬' },
  { category: 'Door', name: 'Puerta con Vidrio (→)', label: 'Vidrio →', width: DOOR_STANDARD_WIDTH, height: DOOR_STANDARD_HEIGHT, color: '#B0E0E6', strokeColor: '#4682B4', preview: '🪟→' },
  { category: 'Door', name: 'Puerta con Vidrio (←)', label: 'Vidrio ←', width: DOOR_STANDARD_WIDTH, height: DOOR_STANDARD_HEIGHT, color: '#91CFE1', strokeColor: '#4682B4', preview: '←🪟' },
  { category: 'Door', name: 'Puerta de Entrada (→)', label: 'Entrada →', width: DOOR_ENTRY_WIDTH, height: DOOR_ENTRY_HEIGHT, color: '#654321', strokeColor: '#3E2723', preview: '🚪→' },
  { category: 'Door', name: 'Puerta de Entrada (←)', label: 'Entrada ←', width: DOOR_ENTRY_WIDTH, height: DOOR_ENTRY_HEIGHT, color: '#3F1E0F', strokeColor: '#3E2723', preview: '←🚪' },
  { category: 'SlidingDoor', name: 'Puerta de Patio', label: 'Patio', width: DOOR_PATIO_WIDTH, height: DOOR_PATIO_HEIGHT, color: '#B0E0E6', strokeColor: '#4682B4', preview: '⬌' },
  { category: 'Door', name: 'Puerta de Emergencia (→)', label: 'Emergencia →', width: DOOR_EMERGENCY_WIDTH, height: DOOR_EMERGENCY_HEIGHT, color: '#FF6347', strokeColor: '#8B0000', preview: '🚨→' }
];

export const doorPanelTitle = 'Puertas';

export const registerDoorTemplates = (diagram, $) => {
  diagram.nodeTemplateMap.add('Door', createDoorTemplate($));
  diagram.nodeTemplateMap.add('SlidingDoor', createSlidingDoorTemplate($));
  diagram.nodeTemplateMap.add('FoldingDoor', createFoldingDoorTemplate($));
  diagram.nodeTemplateMap.add('RevolvingDoor', createRevolvingDoorTemplate($));
  diagram.nodeTemplateMap.add('GarageDoor', createGarageDoorTemplate($));
};
