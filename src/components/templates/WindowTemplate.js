// WindowTemplate.js
import * as go from 'gojs';

// Template para ventanas estándar
export const createWindowTemplate = ($) => {
    return $(go.Node, 'Auto',
        { 
            locationSpot: go.Spot.Center, 
            rotatable: true,
            resizable: true,
            resizeObjectName: 'SHAPE'
        },
        new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
        new go.Binding('angle', 'angle').makeTwoWay(),
        $(go.Shape, 'Rectangle',
            { 
                name: 'SHAPE',
                fill: '#87CEEB', 
                stroke: '#4682B4', 
                strokeWidth: 2, 
                width: 60, 
                height: 8 
            },
            new go.Binding('width', 'width').makeTwoWay(),
            new go.Binding('height', 'height').makeTwoWay(),
            new go.Binding('fill', 'color'),
            new go.Binding('stroke', 'strokeColor'),
            new go.Binding('strokeWidth', 'strokeWidth')
        )
    );
};

// Template para ventanas con divisiones
export const createDividedWindowTemplate = ($) => {
    return $(go.Node, 'Spot',
        { 
            locationSpot: go.Spot.Center, 
            rotatable: true,
            resizable: true
        },
        new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
        new go.Binding('angle', 'angle').makeTwoWay(),
        $(go.Shape, 'Rectangle',
            { 
                fill: '#87CEEB', 
                stroke: '#4682B4', 
                strokeWidth: 2, 
                width: 60, 
                height: 8 
            },
            new go.Binding('width', 'width').makeTwoWay(),
            new go.Binding('height', 'height').makeTwoWay(),
            new go.Binding('fill', 'color'),
            new go.Binding('stroke', 'strokeColor')
        ),
        $(go.Shape, 'LineV',
            { 
                stroke: '#4682B4', 
                strokeWidth: 2, 
                width: 0, 
                height: 8 
            },
            new go.Binding('height', 'height'),
            new go.Binding('stroke', 'strokeColor')
        )
    );
};

// Template para ventanas arqueadas
export const createArchedWindowTemplate = ($) => {
    return $(go.Node, 'Vertical',
        { 
            locationSpot: go.Spot.Center, 
            rotatable: true
        },
        new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
        new go.Binding('angle', 'angle').makeTwoWay(),
        $(go.Shape, 'Circle',
            { 
                fill: '#87CEEB', 
                stroke: '#4682B4', 
                strokeWidth: 2, 
                width: 60, 
                height: 30,
                angle: 0,
                geometryString: 'F M0 30 L0 0 A30 30 0 0 1 60 0 L60 30 Z'
            },
            new go.Binding('fill', 'color'),
            new go.Binding('stroke', 'strokeColor')
        )
    );
};

// Template para ventanas circulares
export const createCircularWindowTemplate = ($) => {
    return $(go.Node, 'Auto',
        { 
            locationSpot: go.Spot.Center, 
            rotatable: true
        },
        new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
        new go.Binding('angle', 'angle').makeTwoWay(),
        $(go.Shape, 'Circle',
            { 
                fill: '#87CEEB', 
                stroke: '#4682B4', 
                strokeWidth: 2, 
                width: 40, 
                height: 40 
            },
            new go.Binding('width', 'width').makeTwoWay(),
            new go.Binding('height', 'height').makeTwoWay(),
            new go.Binding('fill', 'color'),
            new go.Binding('stroke', 'strokeColor')
        )
    );
};

// Template para ventanas de bahía
export const createBayWindowTemplate = ($) => {
    return $(go.Node, 'Spot',
        { 
            locationSpot: go.Spot.Center, 
            rotatable: true
        },
        new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
        new go.Binding('angle', 'angle').makeTwoWay(),
        $(go.Panel, 'Auto',
            $(go.Shape, 'Rectangle',
                { 
                    fill: '#87CEEB', 
                    stroke: '#4682B4', 
                    strokeWidth: 3, 
                    width: 80, 
                    height: 12 
                },
                new go.Binding('fill', 'color'),
                new go.Binding('stroke', 'strokeColor')
            )
        ),
        $(go.Shape, 'LineH',
            { 
                stroke: '#4682B4', 
                strokeWidth: 2, 
                width: 80, 
                alignment: new go.Spot(0.5, 0.5),
                margin: new go.Margin(-6, 0, 0, 0)
            },
            new go.Binding('stroke', 'strokeColor')
        )
    );
};

// Template para ventanas corredizas
export const createSlidingWindowTemplate = ($) => {
    return $(go.Node, 'Spot',
        { 
            locationSpot: go.Spot.Center, 
            rotatable: true
        },
        new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
        new go.Binding('angle', 'angle').makeTwoWay(),
        $(go.Shape, 'Rectangle',
            { 
                fill: '#87CEEB', 
                stroke: '#4682B4', 
                strokeWidth: 2, 
                width: 60, 
                height: 8 
            },
            new go.Binding('fill', 'color'),
            new go.Binding('stroke', 'strokeColor')
        ),
        $(go.Shape, 'Rectangle',
            { 
                fill: 'transparent', 
                stroke: '#4682B4', 
                strokeWidth: 1, 
                strokeDashArray: [4, 2],
                width: 30, 
                height: 8,
                alignment: go.Spot.Left 
            },
            new go.Binding('stroke', 'strokeColor')
        )
    );
};

// Template para claraboyas
export const createSkylightTemplate = ($) => {
    return $(go.Node, 'Auto',
        { 
            locationSpot: go.Spot.Center, 
            rotatable: true
        },
        new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
        new go.Binding('angle', 'angle').makeTwoWay(),
        $(go.Shape, 'Rectangle',
            { 
                fill: '#B0E0E6', 
                stroke: '#5F9EA0', 
                strokeWidth: 2, 
                width: 50, 
                height: 50,
                strokeDashArray: [3, 3]
            },
            new go.Binding('fill', 'color'),
            new go.Binding('stroke', 'strokeColor')
        )
    );
};

// Objetos de ventanas (15+ tipos)
export const windowObjects = [
    { 
        category: 'Window', 
        name: 'Ventana Estándar', 
        label: 'Ventana', 
        width: 60, 
        height: 8,
        color: '#87CEEB',
        strokeColor: '#4682B4',
        strokeWidth: 2,
        preview: '🪟'
    },
    { 
        category: 'Window', 
        name: 'Ventana Grande', 
        label: 'Ventana Grande', 
        width: 100, 
        height: 8,
        color: '#87CEEB',
        strokeColor: '#4682B4',
        strokeWidth: 2,
        preview: '🪟'
    },
    { 
        category: 'Window', 
        name: 'Ventana Pequeña', 
        label: 'Ventana Pequeña', 
        width: 40, 
        height: 8,
        color: '#87CEEB',
        strokeColor: '#4682B4',
        strokeWidth: 2,
        preview: '🪟'
    },
    { 
        category: 'DividedWindow', 
        name: 'Ventana Doble', 
        label: 'Doble', 
        width: 60, 
        height: 8,
        color: '#87CEEB',
        strokeColor: '#4682B4',
        preview: '⊞'
    },
    { 
        category: 'DividedWindow', 
        name: 'Ventana con Marco', 
        label: 'Con Marco', 
        width: 80, 
        height: 8,
        color: '#ADD8E6',
        strokeColor: '#4682B4',
        preview: '⊞'
    },
    { 
        category: 'ArchedWindow', 
        name: 'Ventana Arqueada', 
        label: 'Arqueada', 
        width: 60, 
        height: 30,
        color: '#87CEEB',
        strokeColor: '#4682B4',
        preview: '⌒'
    },
    { 
        category: 'CircularWindow', 
        name: 'Ventana Circular', 
        label: 'Circular', 
        width: 40, 
        height: 40,
        color: '#87CEEB',
        strokeColor: '#4682B4',
        preview: '◯'
    },
    { 
        category: 'CircularWindow', 
        name: 'Ojo de Buey', 
        label: 'Ojo de Buey', 
        width: 35, 
        height: 35,
        color: '#4682B4',
        strokeColor: '#2F4F4F',
        preview: '●'
    },
    { 
        category: 'BayWindow', 
        name: 'Ventana de Bahía', 
        label: 'Bahía', 
        width: 80, 
        height: 12,
        color: '#87CEEB',
        strokeColor: '#4682B4',
        preview: '⊐'
    },
    { 
        category: 'SlidingWindow', 
        name: 'Ventana Corrediza', 
        label: 'Corrediza', 
        width: 60, 
        height: 8,
        color: '#87CEEB',
        strokeColor: '#4682B4',
        preview: '⇄'
    },
    { 
        category: 'SlidingWindow', 
        name: 'Ventana Deslizante Grande', 
        label: 'Deslizante', 
        width: 90, 
        height: 8,
        color: '#ADD8E6',
        strokeColor: '#4682B4',
        preview: '⇄'
    },
    { 
        category: 'Skylight', 
        name: 'Claraboya', 
        label: 'Claraboya', 
        width: 50, 
        height: 50,
        color: '#B0E0E6',
        strokeColor: '#5F9EA0',
        preview: '▢'
    },
    { 
        category: 'Skylight', 
        name: 'Claraboya Rectangular', 
        label: 'Claraboya Rect.', 
        width: 70, 
        height: 40,
        color: '#B0E0E6',
        strokeColor: '#5F9EA0',
        preview: '▭'
    },
    { 
        category: 'Window', 
        name: 'Ventana Francesa', 
        label: 'Francesa', 
        width: 50, 
        height: 10,
        color: '#F0F8FF',
        strokeColor: '#4682B4',
        strokeWidth: 2,
        preview: '🪟'
    },
    { 
        category: 'Window', 
        name: 'Ventana Panorámica', 
        label: 'Panorámica', 
        width: 120, 
        height: 8,
        color: '#E0F6FF',
        strokeColor: '#4682B4',
        strokeWidth: 3,
        preview: '🪟'
    },
    { 
        category: 'DividedWindow', 
        name: 'Ventana Cuádruple', 
        label: 'Cuádruple', 
        width: 80, 
        height: 8,
        color: '#87CEEB',
        strokeColor: '#4682B4',
        preview: '⊞⊞'
    },
    { 
        category: 'CircularWindow', 
        name: 'Ventana Ovalada', 
        label: 'Ovalada', 
        width: 50, 
        height: 30,
        color: '#87CEEB',
        strokeColor: '#4682B4',
        preview: '⬭'
    }
];

export const windowPanelTitle = 'Ventanas';

// Función helper para registrar todos los templates de ventanas
export const registerWindowTemplates = (diagram, $) => {
    diagram.nodeTemplateMap.add('Window', createWindowTemplate($));
    diagram.nodeTemplateMap.add('DividedWindow', createDividedWindowTemplate($));
    diagram.nodeTemplateMap.add('ArchedWindow', createArchedWindowTemplate($));
    diagram.nodeTemplateMap.add('CircularWindow', createCircularWindowTemplate($));
    diagram.nodeTemplateMap.add('BayWindow', createBayWindowTemplate($));
    diagram.nodeTemplateMap.add('SlidingWindow', createSlidingWindowTemplate($));
    diagram.nodeTemplateMap.add('Skylight', createSkylightTemplate($));
};