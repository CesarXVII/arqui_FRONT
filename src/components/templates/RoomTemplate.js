// RoomTemplate.js
import * as go from 'gojs';

// ============================================
// CONFIGURACIÓN DE COLORES - FÁCIL DE MODIFICAR
// ============================================

// Color principal de las habitaciones (celeste cristal)
export const ROOM_FILL_COLOR = '#caeeffff'; 

// Opacidad del color (0.0 a 1.0, donde 1.0 es completamente opaco)
export const ROOM_OPACITY = 0.7;  // 1.0 = opaco, 0.8 = semi-transparente, 0.5 = muy transparente

// Color del borde
export const ROOM_STROKE_COLOR = '#666262ff';  // Color del borde (negro por defecto)

// Color del texto
export const ROOM_TEXT_COLOR = '#464343ff';  // Color del texto (negro por defecto)

// Tamaño de la fuente del nombre de las habitaciones
export const ROOM_FONT_SIZE = 10;  // Tamaño en píxeles (14px por defecto)

// Estilo de la fuente (bold, normal, italic, etc.)
export const ROOM_FONT_WEIGHT = 'bold';  // 'bold', 'normal', '600', '700', etc.

// Familia de la fuente
export const ROOM_FONT_FAMILY = 'sans-serif';  // 'sans-serif', 'Arial', 'Helvetica', etc.

// Función para aplicar opacidad al color
const applyOpacity = (hexColor, opacity) => {
    // Convertir hex a RGB
    const r = parseInt(hexColor.slice(1, 3), 16);
    const g = parseInt(hexColor.slice(3, 5), 16);
    const b = parseInt(hexColor.slice(5, 7), 16);
    
    // Retornar color con opacidad
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

// Color final con opacidad aplicada
export const ROOM_FILL_COLOR_WITH_OPACITY = applyOpacity(ROOM_FILL_COLOR, ROOM_OPACITY);

// ============================================
// EJEMPLOS DE CONFIGURACIÓN DE FUENTE:
// ============================================
// Tamaños comunes:
// - 10: Muy pequeño
// - 12: Pequeño
// - 14: Normal (por defecto)
// - 16: Mediano
// - 18: Grande
// - 20: Muy grande
// - 24: Extra grande
//
// Pesos de fuente:
// - 'normal': Peso normal
// - 'bold': Negrita (por defecto)
// - '600': Semi-negrita
// - '700': Negrita fuerte
// - '800': Extra negrita
//
// Familias de fuente:
// - 'sans-serif': Fuente sin serifas (moderna)
// - 'Arial': Arial clásica
// - 'Helvetica': Helvetica
// - 'Georgia': Con serifas (elegante)
// - 'Courier New': Monoespaciada
// ============================================

// ============================================
// EJEMPLOS DE COLORES PARA USAR:
// ============================================
// Celeste cristal claro: '#B3E5FC'
// Celeste cristal medio: '#81D4FA'
// Celeste cristal oscuro: '#4FC3F7'
// Azul suave: '#90CAF9'
// Verde menta: '#B2DFDB'
// Lavanda suave: '#E1BEE7'
// Rosa suave: '#F8BBD0'
// Melocotón: '#FFCCBC'
// Amarillo claro: '#FFF9C4'
// Gris claro: '#EEEEEE'
// Blanco: '#FFFFFF'
// ============================================

// Template para habitaciones estándar
export const createRoomTemplate = ($) => {
    return $(go.Node, 'Auto',
        { 
            locationSpot: go.Spot.Center, 
            resizable: true,
            resizeObjectName: 'SHAPE'
        },
        new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
        $(go.Shape, 'Rectangle',
            {
                name: 'SHAPE',
                fill: ROOM_FILL_COLOR_WITH_OPACITY,
                stroke: ROOM_STROKE_COLOR,
                strokeWidth: 3,
                width: 150,
                height: 150
            },
            new go.Binding('width', 'width').makeTwoWay(),
            new go.Binding('height', 'height').makeTwoWay(),
            new go.Binding('fill', 'color'),
            new go.Binding('stroke', 'strokeColor'),
            new go.Binding('strokeWidth', 'strokeWidth')
        ),
        $(go.TextBlock,
            {
                margin: 8,
                font: `${ROOM_FONT_WEIGHT} ${ROOM_FONT_SIZE}px ${ROOM_FONT_FAMILY}`,
                stroke: ROOM_TEXT_COLOR
            },
            new go.Binding('text', 'name'),
            new go.Binding('stroke', 'textColor')
        )
    );
};

// Template para habitaciones circulares
export const createCircularRoomTemplate = ($) => {
    return $(go.Node, 'Auto',
        { 
            locationSpot: go.Spot.Center, 
            resizable: true,
            resizeObjectName: 'SHAPE'
        },
        new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
        $(go.Shape, 'Circle',
            {
                name: 'SHAPE',
                fill: ROOM_FILL_COLOR_WITH_OPACITY,
                stroke: ROOM_STROKE_COLOR,
                strokeWidth: 3,
                width: 150,
                height: 150
            },
            new go.Binding('width', 'width').makeTwoWay(),
            new go.Binding('height', 'height').makeTwoWay(),
            new go.Binding('fill', 'color'),
            new go.Binding('stroke', 'strokeColor')
        ),
        $(go.TextBlock,
            {
                margin: 8,
                font: `${ROOM_FONT_WEIGHT} ${ROOM_FONT_SIZE - 2}px ${ROOM_FONT_FAMILY}`,
                stroke: ROOM_TEXT_COLOR
            },
            new go.Binding('text', 'name'),
            new go.Binding('stroke', 'textColor')
        )
    );
};

// Template para habitaciones en forma de L
export const createLShapedRoomTemplate = ($) => {
    return $(go.Node, 'Spot',
        { 
            locationSpot: go.Spot.Center, 
            resizable: true
        },
        new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
        $(go.Shape,
            {
                name: 'SHAPE',
                fill: ROOM_FILL_COLOR_WITH_OPACITY,
                stroke: ROOM_STROKE_COLOR,
                strokeWidth: 3,
                geometryString: 'F M0 0 L100 0 L100 60 L60 60 L60 100 L0 100 Z'
            },
            new go.Binding('fill', 'color'),
            new go.Binding('stroke', 'strokeColor')
        ),
        $(go.TextBlock,
            {
                margin: 8,
                font: `${ROOM_FONT_WEIGHT} ${ROOM_FONT_SIZE - 2}px ${ROOM_FONT_FAMILY}`,
                stroke: ROOM_TEXT_COLOR,
                alignment: go.Spot.Center
            },
            new go.Binding('text', 'name'),
            new go.Binding('stroke', 'textColor')
        )
    );
};

// Objetos de habitaciones - Usando variables de color configurables
export const roomObjects = [
    // Habitaciones principales
    { 
        category: 'Room', 
        name: 'Sala de Estar', 
        label: 'Sala', 
        width: 200, 
        height: 200, 
        color: ROOM_FILL_COLOR_WITH_OPACITY,
        strokeColor: ROOM_STROKE_COLOR,
        strokeWidth: 3,
        textColor: ROOM_TEXT_COLOR,
        preview: '🛋️'
    },
    { 
        category: 'Room', 
        name: 'Dormitorio Principal', 
        label: 'Dormitorio', 
        width: 180, 
        height: 180, 
        color: ROOM_FILL_COLOR_WITH_OPACITY,
        strokeColor: ROOM_STROKE_COLOR,
        strokeWidth: 3,
        textColor: ROOM_TEXT_COLOR,
        preview: '🛏️'
    },
    { 
        category: 'Room', 
        name: 'Cocina', 
        label: 'Cocina', 
        width: 150, 
        height: 150, 
        color: ROOM_FILL_COLOR_WITH_OPACITY,
        strokeColor: ROOM_STROKE_COLOR,
        strokeWidth: 3,
        textColor: ROOM_TEXT_COLOR,
        preview: '🍳'
    },
    { 
        category: 'Room', 
        name: 'Baño Principal', 
        label: 'Baño', 
        width: 120, 
        height: 120, 
        color: ROOM_FILL_COLOR_WITH_OPACITY,
        strokeColor: ROOM_STROKE_COLOR,
        strokeWidth: 3,
        textColor: ROOM_TEXT_COLOR,
        preview: '🚿'
    },
    { 
        category: 'Room', 
        name: 'Comedor', 
        label: 'Comedor', 
        width: 160, 
        height: 160, 
        color: ROOM_FILL_COLOR_WITH_OPACITY,
        strokeColor: ROOM_STROKE_COLOR,
        strokeWidth: 3,
        textColor: ROOM_TEXT_COLOR,
        preview: '🍽️'
    },
    { 
        category: 'Room', 
        name: 'Oficina', 
        label: 'Oficina', 
        width: 140, 
        height: 140, 
        color: ROOM_FILL_COLOR_WITH_OPACITY,
        strokeColor: ROOM_STROKE_COLOR,
        strokeWidth: 3,
        textColor: ROOM_TEXT_COLOR,
        preview: '💼'
    },
    
    // Habitaciones adicionales
    { 
        category: 'Room', 
        name: 'Dormitorio Secundario', 
        label: 'Dormitorio 2', 
        width: 150, 
        height: 150, 
        color: ROOM_FILL_COLOR_WITH_OPACITY,
        strokeColor: ROOM_STROKE_COLOR,
        strokeWidth: 3,
        textColor: ROOM_TEXT_COLOR,
        preview: '🛏️'
    },
    { 
        category: 'Room', 
        name: 'Dormitorio Infantil', 
        label: 'Habitación Niños', 
        width: 140, 
        height: 140, 
        color: ROOM_FILL_COLOR_WITH_OPACITY,
        strokeColor: ROOM_STROKE_COLOR,
        strokeWidth: 3,
        textColor: ROOM_TEXT_COLOR,
        preview: '🧸'
    },
    { 
        category: 'Room', 
        name: 'Baño Secundario', 
        label: 'Baño 2', 
        width: 100, 
        height: 100, 
        color: ROOM_FILL_COLOR_WITH_OPACITY,
        strokeColor: ROOM_STROKE_COLOR,
        strokeWidth: 3,
        textColor: ROOM_TEXT_COLOR,
        preview: '🚿'
    },
    { 
        category: 'Room', 
        name: 'Lavandería', 
        label: 'Lavandería', 
        width: 100, 
        height: 100, 
        color: ROOM_FILL_COLOR_WITH_OPACITY,
        strokeColor: ROOM_STROKE_COLOR,
        strokeWidth: 3,
        textColor: ROOM_TEXT_COLOR,
        preview: '🧺'
    },
    
    // Áreas especiales
    { 
        category: 'Room', 
        name: 'Vestidor', 
        label: 'Vestidor', 
        width: 120, 
        height: 100, 
        color: ROOM_FILL_COLOR_WITH_OPACITY,
        strokeColor: ROOM_STROKE_COLOR,
        strokeWidth: 3,
        textColor: ROOM_TEXT_COLOR,
        preview: '👔'
    },
    { 
        category: 'Room', 
        name: 'Despensa', 
        label: 'Despensa', 
        width: 80, 
        height: 100, 
        color: ROOM_FILL_COLOR_WITH_OPACITY,
        strokeColor: ROOM_STROKE_COLOR,
        strokeWidth: 3,
        textColor: ROOM_TEXT_COLOR,
        preview: '🥫'
    },
    { 
        category: 'Room', 
        name: 'Garaje', 
        label: 'Garaje', 
        width: 250, 
        height: 180, 
        color: ROOM_FILL_COLOR_WITH_OPACITY,
        strokeColor: ROOM_STROKE_COLOR,
        strokeWidth: 3,
        textColor: ROOM_TEXT_COLOR,
        preview: '🚗'
    },
    { 
        category: 'Room', 
        name: 'Terraza', 
        label: 'Terraza', 
        width: 200, 
        height: 150, 
        color: ROOM_FILL_COLOR_WITH_OPACITY,
        strokeColor: ROOM_STROKE_COLOR,
        strokeWidth: 3,
        textColor: ROOM_TEXT_COLOR,
        preview: '🌿'
    },
    { 
        category: 'Room', 
        name: 'Balcón', 
        label: 'Balcón', 
        width: 120, 
        height: 80, 
        color: ROOM_FILL_COLOR_WITH_OPACITY,
        strokeColor: ROOM_STROKE_COLOR,
        strokeWidth: 3,
        textColor: ROOM_TEXT_COLOR,
        preview: '🪴'
    },
    
    // Espacios funcionales
    { 
        category: 'Room', 
        name: 'Pasillo', 
        label: 'Pasillo', 
        width: 200, 
        height: 80, 
        color: ROOM_FILL_COLOR_WITH_OPACITY,
        strokeColor: ROOM_STROKE_COLOR,
        strokeWidth: 2,
        textColor: ROOM_TEXT_COLOR,
        preview: '↔️'
    },
    { 
        category: 'Room', 
        name: 'Recibidor', 
        label: 'Recibidor', 
        width: 120, 
        height: 100, 
        color: ROOM_FILL_COLOR_WITH_OPACITY,
        strokeColor: ROOM_STROKE_COLOR,
        strokeWidth: 3,
        textColor: ROOM_TEXT_COLOR,
        preview: '🚪'
    },
    { 
        category: 'Room', 
        name: 'Biblioteca', 
        label: 'Biblioteca', 
        width: 150, 
        height: 150, 
        color: ROOM_FILL_COLOR_WITH_OPACITY,
        strokeColor: ROOM_STROKE_COLOR,
        strokeWidth: 3,
        textColor: ROOM_TEXT_COLOR,
        preview: '📚'
    },
    { 
        category: 'Room', 
        name: 'Sala de Juegos', 
        label: 'Sala Juegos', 
        width: 180, 
        height: 160, 
        color: ROOM_FILL_COLOR_WITH_OPACITY,
        strokeColor: ROOM_STROKE_COLOR,
        strokeWidth: 3,
        textColor: ROOM_TEXT_COLOR,
        preview: '🎮'
    },
    { 
        category: 'Room', 
        name: 'Gimnasio', 
        label: 'Gimnasio', 
        width: 170, 
        height: 150, 
        color: ROOM_FILL_COLOR_WITH_OPACITY,
        strokeColor: ROOM_STROKE_COLOR,
        strokeWidth: 3,
        textColor: ROOM_TEXT_COLOR,
        preview: '💪'
    },
    
    // Espacios creativos
    { 
        category: 'CircularRoom', 
        name: 'Sala Circular', 
        label: 'Sala Circular', 
        width: 150, 
        height: 150, 
        color: ROOM_FILL_COLOR_WITH_OPACITY,
        strokeColor: ROOM_STROKE_COLOR,
        textColor: ROOM_TEXT_COLOR,
        preview: '⭕'
    },
    { 
        category: 'Room', 
        name: 'Estudio', 
        label: 'Estudio', 
        width: 130, 
        height: 130, 
        color: ROOM_FILL_COLOR_WITH_OPACITY,
        strokeColor: ROOM_STROKE_COLOR,
        strokeWidth: 3,
        textColor: ROOM_TEXT_COLOR,
        preview: '🎨'
    },
    { 
        category: 'Room', 
        name: 'Bodega', 
        label: 'Bodega', 
        width: 100, 
        height: 120, 
        color: ROOM_FILL_COLOR_WITH_OPACITY,
        strokeColor: ROOM_STROKE_COLOR,
        strokeWidth: 2,
        textColor: ROOM_TEXT_COLOR,
        preview: '📦'
    },
    { 
        category: 'Room', 
        name: 'Sala Multimedia', 
        label: 'Multimedia', 
        width: 180, 
        height: 140, 
        color: ROOM_FILL_COLOR_WITH_OPACITY,
        strokeColor: ROOM_STROKE_COLOR,
        strokeWidth: 3,
        textColor: ROOM_TEXT_COLOR,
        preview: '🎬'
    },
    { 
        category: 'LShapedRoom', 
        name: 'Sala en L', 
        label: 'Sala L', 
        width: 100, 
        height: 100, 
        color: ROOM_FILL_COLOR_WITH_OPACITY,
        strokeColor: ROOM_STROKE_COLOR,
        textColor: ROOM_TEXT_COLOR,
        preview: '⅃'
    }
];

export const roomPanelTitle = 'Tipos de Habitación';

// Función helper para registrar todos los templates de habitaciones
export const registerRoomTemplates = (diagram, $) => {
    diagram.nodeTemplateMap.add('Room', createRoomTemplate($));
    diagram.nodeTemplateMap.add('CircularRoom', createCircularRoomTemplate($));
    diagram.nodeTemplateMap.add('LShapedRoom', createLShapedRoomTemplate($));
};