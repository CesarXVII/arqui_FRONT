// objectsDataIndex.js
// Archivo central para importar todos los objetos y títulos
import { doorObjects, doorPanelTitle } from './DoorTemplate';
import { windowObjects, windowPanelTitle } from './WindowTemplate';
import { wallObjects, wallPanelTitle } from './WallTemplate';
import { roomObjects, roomPanelTitle } from './RoomTemplate';
import { labelObjects, labelPanelTitle } from './LabelTemplate';
import { symbolObjects, symbolPanelTitle } from './SymbolTemplate';

// Importar todos los muebles desde archivos separados
import { salonObjects, salonPanelTitle } from './object/SalonFurniture';
import { dormitorioObjects, dormitorioPanelTitle } from './object/DormitorioFurniture';
import { cocinaObjects, cocinaPanelTitle } from './object/CocinaFurniture';
import { banoObjects, banoPanelTitle } from './object/BanoFurniture';
import { comedorObjects, comedorPanelTitle } from './object/ComedorFurniture';
import { oficinaObjects, oficinaPanelTitle } from './object/OficinaFurniture';
import { decoracionObjects, decoracionPanelTitle } from './object/DecoracionFurniture';

// IMPORTAR DATOS DE DIMENSIONAR
import { dimensionarData, dimensionarPanelTitles } from './dimensionarData';

// ============================================
// DATOS PARA COTAS Y CORTES (MANTENER COMPATIBILIDAD)
// ============================================

// Datos para las líneas de cota horizontal
const cotaHorizontalObjects = [
    {
        category: 'HorizontalDimension',
        name: 'Cota 1m',
        measurement: '1.00 m',
        width: 100,
        color: 'black',
        textColor: 'black',
        preview: '↔'
    },
    {
        category: 'HorizontalDimension',
        name: 'Cota 2m',
        measurement: '2.00 m',
        width: 150,
        color: 'black',
        textColor: 'black',
        preview: '↔'
    },
    {
        category: 'HorizontalDimension',
        name: 'Cota 3m',
        measurement: '3.00 m',
        width: 200,
        color: 'black',
        textColor: 'black',
        preview: '↔'
    },
    {
        category: 'HorizontalDimension',
        name: 'Cota 5m',
        measurement: '5.00 m',
        width: 250,
        color: 'black',
        textColor: 'black',
        preview: '↔'
    },
    {
        category: 'HorizontalDimension',
        name: 'Cota Personalizada',
        measurement: '0.00 m',
        width: 150,
        color: 'black',
        textColor: 'black',
        preview: '↔'
    }
];

// Datos para las líneas de cota vertical
const cotaVerticalObjects = [
    {
        category: 'VerticalDimension',
        name: 'Cota 1m',
        measurement: '1.00 m',
        height: 100,
        color: 'black',
        textColor: 'black',
        preview: '↕'
    },
    {
        category: 'VerticalDimension',
        name: 'Cota 2m',
        measurement: '2.00 m',
        height: 150,
        color: 'black',
        textColor: 'black',
        preview: '↕'
    },
    {
        category: 'VerticalDimension',
        name: 'Cota 2.5m',
        measurement: '2.50 m',
        height: 175,
        color: 'black',
        textColor: 'black',
        preview: '↕'
    },
    {
        category: 'VerticalDimension',
        name: 'Cota 3m',
        measurement: '3.00 m',
        height: 200,
        color: 'black',
        textColor: 'black',
        preview: '↕'
    },
    {
        category: 'VerticalDimension',
        name: 'Cota Personalizada',
        measurement: '0.00 m',
        height: 150,
        color: 'black',
        textColor: 'black',
        preview: '↕'
    }
];

// Datos para líneas de corte
const lineaCorteObjects = [
    {
        category: 'CutLine',
        name: 'Corte A-A',
        label: 'A-A',
        width: 200,
        color: 'red',
        preview: '✂'
    },
    {
        category: 'CutLine',
        name: 'Corte B-B',
        label: 'B-B',
        width: 200,
        color: 'red',
        preview: '✂'
    },
    {
        category: 'CutLine',
        name: 'Corte C-C',
        label: 'C-C',
        width: 200,
        color: 'red',
        preview: '✂'
    },
    {
        category: 'CutLine',
        name: 'Corte 1-1',
        label: '1-1',
        width: 200,
        color: 'blue',
        preview: '✂'
    },
    {
        category: 'CutLine',
        name: 'Corte Personalizado',
        label: 'X-X',
        width: 200,
        color: 'red',
        preview: '✂'
    }
];

// Datos para planos de corte
const planoCorteObjects = [
    {
        category: 'CutPlane',
        name: 'Plano de Corte A',
        label: 'Sección A',
        width: 200,
        height: 300,
        fillColor: 'rgba(255, 0, 0, 0.1)',
        strokeColor: 'red',
        preview: '▭'
    },
    {
        category: 'CutPlane',
        name: 'Plano de Corte B',
        label: 'Sección B',
        width: 200,
        height: 300,
        fillColor: 'rgba(0, 0, 255, 0.1)',
        strokeColor: 'blue',
        preview: '▭'
    },
    {
        category: 'CutPlane',
        name: 'Plano Longitudinal',
        label: 'Corte Longitudinal',
        width: 300,
        height: 200,
        fillColor: 'rgba(0, 255, 0, 0.1)',
        strokeColor: 'green',
        preview: '▭'
    },
    {
        category: 'CutPlane',
        name: 'Plano Transversal',
        label: 'Corte Transversal',
        width: 200,
        height: 300,
        fillColor: 'rgba(255, 165, 0, 0.1)',
        strokeColor: 'orange',
        preview: '▭'
    }
];

// Títulos para los paneles de cortes
const cotaHorizontalPanelTitle = 'Líneas de Cota Horizontal';
const cotaVerticalPanelTitle = 'Líneas de Cota Vertical';
const lineaCortePanelTitle = 'Líneas de Corte';
const planoCortePanelTitle = 'Planos de Corte';

// ============================================
// CONSOLIDAR TODOS LOS OBJETOS
// ============================================
export const objectsData = {
    // BUILD
    'colocar-puertas': doorObjects,
    'colocar-ventanas': windowObjects,
    'dibujar-pared': wallObjects,
    
    // INFO
    'tipo-habitacion': roomObjects,
    'signos-simbolos': symbolObjects,
    'colocar-etiqueta': labelObjects,
    
    // CUTS (CORTES) - Mantener compatibilidad con código anterior
    'cota-horizontal': cotaHorizontalObjects,
    'cota-vertical': cotaVerticalObjects,
    'linea-corte': lineaCorteObjects,
    'plano-corte': planoCorteObjects,
    
    // DIMENSIONAR - Nuevo sistema completo
    'cortes': dimensionarData.cortes,
    'medidas': dimensionarData.medidas,
    'areas': dimensionarData.areas,
    'lineas': dimensionarData.lineas,
    
    // OBJECTS
    'salon': salonObjects,
    'dormitorio': dormitorioObjects,
    'cocina': cocinaObjects,
    'bano': banoObjects,
    'comedor': comedorObjects,
    'oficina': oficinaObjects,
    'decoracion': decoracionObjects,
};

// ============================================
// CONSOLIDAR TODOS LOS TÍTULOS
// ============================================
export const panelTitles = {
    // BUILD
    'colocar-puertas': doorPanelTitle,
    'colocar-ventanas': windowPanelTitle,
    'dibujar-pared': wallPanelTitle,
    
    // INFO
    'tipo-habitacion': roomPanelTitle,
    'signos-simbolos': symbolPanelTitle,
    'colocar-etiqueta': labelPanelTitle,
    
    // CUTS - Mantener compatibilidad
    'cota-horizontal': cotaHorizontalPanelTitle,
    'cota-vertical': cotaVerticalPanelTitle,
    'linea-corte': lineaCortePanelTitle,
    'plano-corte': planoCortePanelTitle,
    
    // DIMENSIONAR - Nuevo sistema
    'cortes': dimensionarPanelTitles.cortes,
    'medidas': dimensionarPanelTitles.medidas,
    'areas': dimensionarPanelTitles.areas,
    'lineas': dimensionarPanelTitles.lineas,
    
    // OBJECTS
    'salon': salonPanelTitle,
    'dormitorio': dormitorioPanelTitle,
    'cocina': cocinaPanelTitle,
    'bano': banoPanelTitle,
    'comedor': comedorPanelTitle,
    'oficina': oficinaPanelTitle,
    'decoracion': decoracionPanelTitle,
};