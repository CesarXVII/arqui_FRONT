import * as go from 'gojs';

const SECTION_LINE_LENGTH = 100;

export const createSymbolTemplate = ($) =>
  $(
    go.Node,
    'Spot',
    {
      locationSpot: go.Spot.Center,
      rotatable: true,
      selectionAdorned: true,
      angle: 0,
      category: 'Symbol',
    },
    new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
    new go.Binding('angle', 'angle').makeTwoWay(),
    $(
      go.TextBlock,
      {
        font: 'bold 22px sans-serif',
        margin: 5,
        editable: false,
        textAlign: 'center',
        wrap: go.TextBlock.None,
      },
      new go.Binding('text', 'symbol'),
      new go.Binding('stroke', 'color')
    ),
    {
      toolTip: $(
        'ToolTip',
        $(
          go.TextBlock,
          { margin: 4 },
          new go.Binding('text', 'name', (n) => `Símbolo: ${n}`)
        )
      ),
    }
  );

export const createSectionSymbolTemplate = ($) =>
  $(
    go.Node,
    'Spot',
    {
      locationSpot: go.Spot.Center,
      rotatable: true,
      resizable: true,
      angle: 0,
      minSize: new go.Size(50, 30),
      category: 'SectionSymbol',
    },
    new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
    new go.Binding('angle', 'angle').makeTwoWay(),
    $(
      go.Panel,
      'Horizontal',
      {
        minSize: new go.Size(SECTION_LINE_LENGTH, 30),
      },
      new go.Binding('width').makeTwoWay(),
      $(
        go.Panel,
        'Vertical',
        { alignment: go.Spot.Center, width: 20 },
        $(
          go.Shape,
          'Triangle',
          { width: 10, height: 10, fill: 'red', angle: 270 }
        ),
        $(
          go.TextBlock,
          { stroke: 'red', font: 'bold 10pt sans-serif', margin: 2 },
          new go.Binding('text', 'label', (l) => l || 'A')
        )
      ),
      $(
        go.Shape,
        {
          figure: 'LineH',
          stroke: 'red',
          strokeWidth: 3,
          strokeDashArray: [10, 5],
          stretch: go.GraphObject.Fill,
          height: 1,
        }
      ),
      $(
        go.Panel,
        'Vertical',
        { alignment: go.Spot.Center, width: 20 },
        $(
          go.TextBlock,
          { stroke: 'red', font: 'bold 10pt sans-serif', margin: 2 },
          new go.Binding('text', 'label', (l) => `${l}'` || "A'")
        ),
        $(
          go.Shape,
          'Triangle',
          { width: 10, height: 10, fill: 'red', angle: 90 }
        )
      )
    )
  );

export const symbolObjects = [
  { category: 'Symbol', name: 'Norte', symbol: '↑', color: '#000080', preview: '↑' },
  {
    category: 'SectionSymbol',
    name: 'Línea de Corte',
    label: 'A',
    width: 200,
    color: 'red',
    preview: '—(A)—',
  },
  { category: 'Symbol', name: 'Salida', symbol: '🚪', color: '#228B22', preview: '🚪' },
  { category: 'Symbol', name: 'Escalera', symbol: '📶', color: '#DC143C', preview: '📶' },
  { category: 'Symbol', name: 'Luz', symbol: '💡', color: '#FFA500', preview: '💡' },
  { category: 'Symbol', name: 'Ventana', symbol: '🪟', color: '#2F4F4F', preview: '🪟' },
  { category: 'Symbol', name: 'Extintor', symbol: '🧯', color: '#8B0000', preview: '🧯' },
  { category: 'Symbol', name: 'Baño', symbol: '🚻', color: '#483D8B', preview: '🚻' },
  { category: 'Symbol', name: 'Ascensor', symbol: '🛗', color: '#556B2F', preview: '🛗' },
  { category: 'Symbol', name: 'Cámara', symbol: '📹', color: '#2F4F4F', preview: '📹' },
  { category: 'Symbol', name: 'Alarma', symbol: '🔔', color: '#8B4513', preview: '🔔' },
  { category: 'Symbol', name: 'Agua', symbol: '💧', color: '#1E3A5F', preview: '💧' },
  { category: 'Symbol', name: 'Electricidad', symbol: '⚡', color: '#4B0082', preview: '⚡' },
  { category: 'Symbol', name: 'Prohibido', symbol: '🚫', color: '#800000', preview: '🚫' },
  { category: 'Symbol', name: 'Atención', symbol: '⚠️', color: '#8B6914', preview: '⚠️' },
  { category: 'Symbol', name: 'Riesgo Bio', symbol: '☣️', color: '#2F5F2F', preview: '☣️' },
  { category: 'Symbol', name: 'Radiación', symbol: '☢️', color: '#8B8B00', preview: '☢️' },
];

export const symbolPanelTitle = 'Signos y Símbolos';
