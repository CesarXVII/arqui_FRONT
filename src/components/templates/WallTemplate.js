// WallTemplate.js v8 - Con indicador de medidas que se posiciona correctamente según orientación
import * as go from 'gojs';

// Constante de conversión: pixeles a metros (ajusta según tu escala)
const PIXELS_PER_METER = 40; // 40 pixeles = 1 metro (ajusta según necesites)

// *** CONFIGURACIÓN DE ESTILO DEL INDICADOR DE MEDIDAS ***
const DIMENSION_COLOR = 'black'; // Color del indicador (prueba: 'gray', '#666666', 'blue', etc.)
const DIMENSION_OPACITY = 1.0; // Opacidad del indicador (0.0 = invisible, 1.0 = completamente opaco)
// Valores recomendados para opacidad: 0.3 (muy tenue), 0.5 (medio), 0.7 (visible), 1.0 (sólido)

// Función para convertir pixeles a metros
const pixelsToMeters = (pixels) => {
  const meters = (pixels / PIXELS_PER_METER).toFixed(2);
  return isNaN(meters) ? '0.00' : meters;
};

// Template para paredes con indicador de medida en metros estilo arquitectónico
export const createWallTemplate = ($) => {
  return $(go.Node, 'Spot',
    {
      locationSpot: go.Spot.Center,
      rotatable: true,
      resizable: true,
      resizeObjectName: 'SHAPE',
      selectionAdorned: true,
      background: 'transparent'
    },
    new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
    new go.Binding('angle', 'angle').makeTwoWay(),
    
    // La pared principal
    $(go.Shape, 'Rectangle',
      {
        name: 'SHAPE',
        fill: '#808080',
        stroke: '#404040',
        strokeWidth: 2,
        width: 10,
        height: 100
      },
      new go.Binding('width', 'width').makeTwoWay(),
      new go.Binding('height', 'height').makeTwoWay(),
      new go.Binding('fill', 'fill'),
      new go.Binding('stroke', 'stroke'),
      new go.Binding('strokeWidth', 'strokeWidth')
    ),
    
    // Panel de dimensión HORIZONTAL (para paredes horizontales)
    $(go.Panel, 'Horizontal',
      {
        name: 'DIMENSION_HORIZONTAL',
        alignment: go.Spot.Bottom,
        alignmentFocus: go.Spot.Top,
        margin: new go.Margin(8, 0, 0, 0),
        background: 'transparent'
      },
      new go.Binding('visible', 'width', function(w, obj) {
        const data = obj.part.data;
        const width = data.width || 10;
        const height = data.height || 100;
        return width >= height; // Visible solo si es horizontal
      }).ofObject('SHAPE'),
      
      // Flecha izquierda
      $(go.Shape, 'TriangleLeft',
        { width: 6, height: 6, fill: DIMENSION_COLOR, stroke: null, margin: new go.Margin(0, 2, 0, 0), opacity: DIMENSION_OPACITY }
      ),
      
      // Línea izquierda
      $(go.Shape, 'LineH',
        {
          stroke: DIMENSION_COLOR,
          strokeWidth: 1,
          height: 1,
          opacity: DIMENSION_OPACITY
        },
        new go.Binding('width', 'width', function(w) {
          const textWidth = 70;
          const arrowsWidth = 12;
          const remainingLength = (w || 10) - textWidth - arrowsWidth - 4;
          return Math.max(0, remainingLength / 2);
        }).ofObject('SHAPE')
      ),
      
      // Texto
      $(go.TextBlock,
        {
          margin: new go.Margin(2, 5, 2, 5),
          font: 'bold 10px Arial',
          stroke: DIMENSION_COLOR,
          textAlign: 'center',
          minSize: new go.Size(40, 14),
          background: 'transparent',
          opacity: DIMENSION_OPACITY
        },
        new go.Binding('text', 'width', function(w, obj) {
          const data = obj.part.data;
          const length = data.width || 10;
          return `${pixelsToMeters(length)} m`;
        }).ofObject('SHAPE')
      ),
      
      // Línea derecha
      $(go.Shape, 'LineH',
        {
          stroke: DIMENSION_COLOR,
          strokeWidth: 1,
          height: 1,
          opacity: DIMENSION_OPACITY
        },
        new go.Binding('width', 'width', function(w) {
          const textWidth = 70;
          const arrowsWidth = 12;
          const remainingLength = (w || 10) - textWidth - arrowsWidth - 4;
          return Math.max(0, remainingLength / 2);
        }).ofObject('SHAPE')
      ),
      
      // Flecha derecha
      $(go.Shape, 'TriangleRight',
        { width: 6, height: 6, fill: DIMENSION_COLOR, stroke: null, margin: new go.Margin(0, 0, 0, 2), opacity: DIMENSION_OPACITY }
      )
    ),
    
    // Panel de dimensión VERTICAL (para paredes verticales)
    $(go.Panel, 'Vertical',
      {
        name: 'DIMENSION_VERTICAL',
        alignment: go.Spot.Left,
        alignmentFocus: go.Spot.Right,
        margin: new go.Margin(0, 0, 0, 0),
        background: 'transparent'
      },
      new go.Binding('visible', 'width', function(w, obj) {
        const data = obj.part.data;
        const width = data.width || 10;
        const height = data.height || 100;
        return height > width; // Visible solo si es vertical
      }).ofObject('SHAPE'),
      
      // Flecha arriba
      $(go.Shape, 'TriangleUp',
        { width: 6, height: 6, fill: DIMENSION_COLOR, stroke: null, margin: new go.Margin(0, 0, 2, 0), opacity: DIMENSION_OPACITY }
      ),
      
      // Línea superior
      $(go.Shape, 'LineV',
        {
          stroke: DIMENSION_COLOR,
          strokeWidth: 1,
          width: 1,
          opacity: DIMENSION_OPACITY
        },
        new go.Binding('height', 'height', function(h) {
          const textHeight = 70;
          const arrowsHeight = 12;
          const remainingLength = (h || 100) - textHeight - arrowsHeight - 4;
          return Math.max(0, remainingLength / 2);
        }).ofObject('SHAPE')
      ),
      
      // Texto (rotado)
      $(go.TextBlock,
        {
          margin: new go.Margin(5, 2, 5, 2),
          font: 'bold 10px Arial',
          stroke: DIMENSION_COLOR,
          textAlign: 'center',
          minSize: new go.Size(14, 40),
          background: 'transparent',
          angle: -90,
          opacity: DIMENSION_OPACITY
        },
        new go.Binding('text', 'height', function(h, obj) {
          const data = obj.part.data;
          const length = data.height || 100;
          return `${pixelsToMeters(length)} m`;
        }).ofObject('SHAPE')
      ),
      
      // Línea inferior
      $(go.Shape, 'LineV',
        {
          stroke: DIMENSION_COLOR,
          strokeWidth: 1,
          width: 1,
          opacity: DIMENSION_OPACITY
        },
        new go.Binding('height', 'height', function(h) {
          const textHeight = 70;
          const arrowsHeight = 12;
          const remainingLength = (h || 100) - textHeight - arrowsHeight - 4;
          return Math.max(0, remainingLength / 2);
        }).ofObject('SHAPE')
      ),
      
      // Flecha abajo
      $(go.Shape, 'TriangleDown',
        { width: 6, height: 6, fill: DIMENSION_COLOR, stroke: null, margin: new go.Margin(2, 0, 0, 0), opacity: DIMENSION_OPACITY }
      )
    )
  );
};

// Objetos de paredes con diferentes materiales
export const wallObjects = [
  // Negro
  { category: 'Wall', name: 'Pared Negra Horizontal', label: 'Negro', width: 100, height: 10, fill: '#000000', stroke: '#1A1A1A', strokeWidth: 2, preview: '⬛' },
  { category: 'Wall', name: 'Pared Negra Vertical', label: 'Negro', width: 10, height: 100, fill: '#000000', stroke: '#1A1A1A', strokeWidth: 2, preview: '⬛' },
  { category: 'Wall', name: 'Pared Negra Larga', label: 'Negro', width: 10, height: 200, fill: '#000000', stroke: '#1A1A1A', strokeWidth: 2, preview: '⬛' },

  // Ladrillo
  { category: 'Wall', name: 'Pared de Ladrillo Horizontal', label: 'Ladrillo', width: 100, height: 12, fill: '#A0522D', stroke: '#8B4513', strokeWidth: 2, preview: '🧱' },
  { category: 'Wall', name: 'Pared de Ladrillo Vertical', label: 'Ladrillo', width: 12, height: 100, fill: '#A0522D', stroke: '#8B4513', strokeWidth: 2, preview: '🧱' },
  { category: 'Wall', name: 'Pared de Ladrillo Larga', label: 'Ladrillo', width: 12, height: 200, fill: '#A0522D', stroke: '#8B4513', strokeWidth: 2, preview: '🧱' },

  // Concreto
  { category: 'Wall', name: 'Pared de Concreto Horizontal', label: 'Concreto', width: 100, height: 10, fill: '#808080', stroke: '#404040', strokeWidth: 2, preview: '▬' },
  { category: 'Wall', name: 'Pared de Concreto Vertical', label: 'Concreto', width: 10, height: 100, fill: '#808080', stroke: '#404040', strokeWidth: 2, preview: '▐' },
  { category: 'Wall', name: 'Pared de Concreto Larga', label: 'Concreto', width: 10, height: 200, fill: '#808080', stroke: '#404040', strokeWidth: 2, preview: '▐' },

  // Piedra/Roca
  { category: 'Wall', name: 'Pared de Piedra Horizontal', label: 'Piedra', width: 100, height: 15, fill: '#696969', stroke: '#2F4F4F', strokeWidth: 3, preview: '🪨' },
  { category: 'Wall', name: 'Pared de Piedra Vertical', label: 'Piedra', width: 15, height: 100, fill: '#696969', stroke: '#2F4F4F', strokeWidth: 3, preview: '🪨' },
  { category: 'Wall', name: 'Pared de Piedra Larga', label: 'Piedra', width: 15, height: 200, fill: '#696969', stroke: '#2F4F4F', strokeWidth: 3, preview: '🪨' },

  // Madera
  { category: 'Wall', name: 'Pared de Madera Horizontal', label: 'Madera', width: 100, height: 10, fill: '#D2691E', stroke: '#8B4513', strokeWidth: 2, preview: '🪵' },
  { category: 'Wall', name: 'Pared de Madera Vertical', label: 'Madera', width: 10, height: 100, fill: '#D2691E', stroke: '#8B4513', strokeWidth: 2, preview: '🪵' },
  { category: 'Wall', name: 'Pared de Madera Larga', label: 'Madera', width: 10, height: 200, fill: '#D2691E', stroke: '#8B4513', strokeWidth: 2, preview: '🪵' },

  // Vidrio
  { category: 'Wall', name: 'Muro de Vidrio Horizontal', label: 'Vidrio', width: 100, height: 8, fill: '#E0F7FA', stroke: '#00ACC1', strokeWidth: 2, preview: '🪟' },
  { category: 'Wall', name: 'Muro de Vidrio Vertical', label: 'Vidrio', width: 8, height: 100, fill: '#E0F7FA', stroke: '#00ACC1', strokeWidth: 2, preview: '🪟' },

  // Yeso/Drywall
  { category: 'Wall', name: 'Pared de Yeso Horizontal', label: 'Yeso', width: 100, height: 8, fill: '#F5F5F5', stroke: '#BDBDBD', strokeWidth: 1, preview: '▭' },
  { category: 'Wall', name: 'Pared de Yeso Vertical', label: 'Yeso', width: 8, height: 100, fill: '#F5F5F5', stroke: '#BDBDBD', strokeWidth: 1, preview: '▯' },
  { category: 'Wall', name: 'Pared de Yeso Larga', label: 'Yeso', width: 8, height: 200, fill: '#F5F5F5', stroke: '#BDBDBD', strokeWidth: 1, preview: '▯' }
];

export const wallPanelTitle = 'Paredes';

// Función auxiliar para exportar la constante de conversión
export { PIXELS_PER_METER };