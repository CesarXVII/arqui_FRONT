import * as go from 'gojs';

export const DEFAULT_FONT_SIZE = 11;

export const createTextLabelTemplate = ($) =>
  $(
    go.Node,
    'Position',
    { locationSpot: go.Spot.Center },
    new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
    $(
      go.TextBlock,
      {
        margin: 0,
        editable: true,
        background: 'transparent',
      },
      new go.Binding('text', 'text').makeTwoWay(),
      new go.Binding('stroke', 'textColor'),
      new go.Binding('font', 'fontSize', (size) => `${size || DEFAULT_FONT_SIZE}px sans-serif`)
    )
  );

export const labelObjects = [
  {
    category: 'TextLabel',
    name: 'Texto Negro',
    text: 'Texto',
    label: 'Negro',
    fontSize: 11,
    textColor: '#000000',
    preview: 'Aa',
  },
  {
    category: 'TextLabel',
    name: 'Texto Blanco',
    text: 'Texto',
    label: 'Blanco',
    fontSize: 11,
    textColor: '#FFFFFF',
    preview: 'Aa',
  },
  {
    category: 'TextLabel',
    name: 'Texto Rojo',
    text: 'Texto',
    label: 'Rojo',
    fontSize: 11,
    textColor: '#FF0000',
    preview: 'Aa',
  },
];

export const labelPanelTitle = 'Etiquetas';

export const registerLabelTemplates = (diagram, $) => {
  diagram.nodeTemplateMap.add('TextLabel', createTextLabelTemplate($));
};

export const createLabelTemplate = ($) => null;
