const SCALE_FACTOR = 0.4;

const scaled = (value) => value * SCALE_FACTOR;

export const createFridgeTemplate = ($) => {
    return $(go.Node, 'Spot',
        { 
            locationSpot: go.Spot.Center, 
            rotatable: true,
            resizable: false,
            selectionAdorned: true
        },
        new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
        new go.Binding('angle', 'angle').makeTwoWay(),
        
        $(go.Shape, 'Rectangle',
            { 
                name: 'SHAPE',
                width: scaled(63),
                height: scaled(65),
                strokeWidth: 2,
                stroke: '#666',
                fill: '#E8E8E8'
            }
        ),
        
        $(go.Shape, 'LineH',
            { 
                strokeWidth: 2,
                stroke: '#999',
                width: scaled(60),
                alignment: new go.Spot(0.5, 0.35)
            }
        )
    );
};

export const createStoveTemplate = ($) => {
    return $(go.Node, 'Spot',
        { 
            locationSpot: go.Spot.Center, 
            rotatable: true,
            resizable: false,
            selectionAdorned: true
        },
        new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
        new go.Binding('angle', 'angle').makeTwoWay(),
        
        $(go.Shape, 'Rectangle',
            { 
                name: 'SHAPE',
                width: scaled(60),
                height: scaled(60),
                strokeWidth: 2,
                stroke: '#333',
                fill: '#555'
            }
        ),
        
        $(go.Shape, 'Circle', 
            { 
                width: scaled(15), 
                height: scaled(15), 
                fill: '#333', 
                stroke: '#888', 
                strokeWidth: 2,
                alignment: new go.Spot(0.3, 0.3)
            }
        ),
        $(go.Shape, 'Circle', 
            { 
                width: scaled(15), 
                height: scaled(15), 
                fill: '#333', 
                stroke: '#888', 
                strokeWidth: 2,
                alignment: new go.Spot(0.7, 0.3)
            }
        ),
        $(go.Shape, 'Circle', 
            { 
                width: scaled(15), 
                height: scaled(15), 
                fill: '#333', 
                stroke: '#888', 
                strokeWidth: 2,
                alignment: new go.Spot(0.3, 0.7)
            }
        ),
        $(go.Shape, 'Circle', 
            { 
                width: scaled(15), 
                height: scaled(15), 
                fill: '#333', 
                stroke: '#888', 
                strokeWidth: 2,
                alignment: new go.Spot(0.7, 0.7)
            }
        )
    );
};

export const createSinkTemplate = ($) => {
    return $(go.Node, 'Spot',
        { 
            locationSpot: go.Spot.Center, 
            rotatable: true,
            resizable: false,
            selectionAdorned: true
        },
        new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
        new go.Binding('angle', 'angle').makeTwoWay(),
        
        $(go.Shape, 'RoundedRectangle',
            { 
                name: 'SHAPE',
                width: scaled(50),
                height: scaled(40),
                strokeWidth: 2,
                stroke: '#666',
                fill: '#D4A574',
                parameter1: 5
            }
        ),
        
        $(go.Shape, 'Ellipse',
            { 
                width: scaled(30),
                height: scaled(24),
                strokeWidth: 2,
                stroke: '#999',
                fill: '#FFF',
                alignment: go.Spot.Center
            }
        ),
        
        $(go.Shape, 'Circle',
            { 
                width: scaled(8),
                height: scaled(8),
                fill: '#C0C0C0',
                stroke: '#666',
                strokeWidth: 1,
                alignment: new go.Spot(0.5, 0.1)
            }
        )
    );
};

export const createOvenTemplate = ($) => {
    return $(go.Node, 'Spot',
        { 
            locationSpot: go.Spot.Center, 
            rotatable: true,
            resizable: false,
            selectionAdorned: true
        },
        new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
        new go.Binding('angle', 'angle').makeTwoWay(),
        
        $(go.Shape, 'Rectangle',
            { 
                name: 'SHAPE',
                width: scaled(60),
                height: scaled(60),
                strokeWidth: 2,
                stroke: '#333',
                fill: '#424242'
            }
        ),
        
        $(go.Shape, 'Rectangle',
            { 
                width: scaled(42),
                height: scaled(36),
                strokeWidth: 2,
                stroke: '#666',
                fill: '#1A1A1A',
                alignment: go.Spot.Center
            }
        ),
        
        $(go.Shape, 'Rectangle',
            { 
                width: scaled(30),
                height: scaled(6),
                fill: '#C0C0C0',
                stroke: null,
                alignment: new go.Spot(0.5, 0.95)
            }
        )
    );
};

export const createMicrowaveTemplate = ($) => {
    return $(go.Node, 'Spot',
        { 
            locationSpot: go.Spot.Center, 
            rotatable: true,
            resizable: false,
            selectionAdorned: true
        },
        new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
        new go.Binding('angle', 'angle').makeTwoWay(),
        
        $(go.Shape, 'Rectangle',
            { 
                name: 'SHAPE',
                width: scaled(50),
                height: scaled(35),
                strokeWidth: 2,
                stroke: '#444',
                fill: '#616161'
            }
        ),
        
        $(go.Shape, 'Rectangle',
            { 
                width: scaled(30),
                height: scaled(17.5),
                strokeWidth: 1,
                stroke: '#888',
                fill: '#333',
                alignment: new go.Spot(0.35, 0.5)
            }
        ),
        
        $(go.Shape, 'Rectangle',
            { 
                width: scaled(12),
                height: scaled(28),
                strokeWidth: 1,
                stroke: '#333',
                fill: '#757575',
                alignment: new go.Spot(0.85, 0.5)
            }
        )
    );
};

export const createDishwasherTemplate = ($) => {
    return $(go.Node, 'Spot',
        { 
            locationSpot: go.Spot.Center, 
            rotatable: true,
            resizable: false,
            selectionAdorned: true
        },
        new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
        new go.Binding('angle', 'angle').makeTwoWay(),
        
        $(go.Shape, 'Rectangle',
            { 
                name: 'SHAPE',
                width: scaled(60),
                height: scaled(60),
                strokeWidth: 2,
                stroke: '#555',
                fill: '#546E7A'
            }
        ),
        
        $(go.Shape, 'LineH', { strokeWidth: 1, stroke: '#333', width: scaled(40), alignment: new go.Spot(0.5, 0.4) }),
        $(go.Shape, 'LineH', { strokeWidth: 1, stroke: '#333', width: scaled(40), alignment: new go.Spot(0.5, 0.5) }),
        $(go.Shape, 'LineH', { strokeWidth: 1, stroke: '#333', width: scaled(40), alignment: new go.Spot(0.5, 0.6) }),
        
        $(go.Shape, 'Rectangle',
            { 
                width: scaled(35),
                height: scaled(6),
                fill: '#C0C0C0',
                stroke: null,
                alignment: new go.Spot(0.5, 0.9)
            }
        )
    );
};

export const createWasherTemplate = ($) => {
    return $(go.Node, 'Spot',
        { 
            locationSpot: go.Spot.Center, 
            rotatable: true,
            resizable: false,
            selectionAdorned: true
        },
        new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
        new go.Binding('angle', 'angle').makeTwoWay(),
        
        $(go.Shape, 'Rectangle',
            { 
                name: 'SHAPE',
                width: scaled(60),
                height: scaled(60),
                strokeWidth: 2,
                stroke: '#555',
                fill: '#78909C'
            }
        ),
        
        $(go.Shape, 'Circle',
            { 
                width: scaled(36),
                height: scaled(36),
                strokeWidth: 2,
                stroke: '#333',
                fill: '#ECEFF1',
                alignment: go.Spot.Center
            }
        ),
        
        $(go.Shape, 'Circle', { width: scaled(6), height: scaled(6), fill: '#4CAF50', stroke: null, alignment: new go.Spot(0.3, 0.15) }),
        $(go.Shape, 'Circle', { width: scaled(6), height: scaled(6), fill: '#FFC107', stroke: null, alignment: new go.Spot(0.5, 0.15) }),
        $(go.Shape, 'Circle', { width: scaled(6), height: scaled(6), fill: '#F44336', stroke: null, alignment: new go.Spot(0.7, 0.15) })
    );
};

export const createDryerTemplate = ($) => {
    return $(go.Node, 'Spot',
        { 
            locationSpot: go.Spot.Center, 
            rotatable: true,
            resizable: false,
            selectionAdorned: true
        },
        new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
        new go.Binding('angle', 'angle').makeTwoWay(),
        
        $(go.Shape, 'Rectangle',
            { 
                name: 'SHAPE',
                width: scaled(60),
                height: scaled(60),
                strokeWidth: 2,
                stroke: '#555',
                fill: '#90A4AE'
            }
        ),
        
        $(go.Shape, 'Circle',
            { 
                width: scaled(36),
                height: scaled(36),
                strokeWidth: 2,
                stroke: '#333',
                fill: '#CFD8DC',
                alignment: go.Spot.Center
            }
        ),
        
        $(go.Shape, 'LineV', { strokeWidth: 1, stroke: '#666', height: scaled(20), alignment: new go.Spot(0.45, 0.5) }),
        $(go.Shape, 'LineV', { strokeWidth: 1, stroke: '#666', height: scaled(20), alignment: new go.Spot(0.55, 0.5) }),
        
        $(go.Shape, 'Rectangle',
            { 
                width: scaled(40),
                height: scaled(10),
                fill: '#37474F',
                stroke: '#263238',
                strokeWidth: 1,
                alignment: new go.Spot(0.5, 0.13)
            }
        )
    );
};

export const createKitchenCabinetTemplate = ($) => {
    return $(go.Node, 'Spot',
        { 
            locationSpot: go.Spot.Center, 
            rotatable: true,
            resizable: false,
            selectionAdorned: true
        },
        new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
        new go.Binding('angle', 'angle').makeTwoWay(),
        new go.Binding('width', 'width'),
        new go.Binding('height', 'height'),
        
        $(go.Shape, 'Rectangle',
            { 
                name: 'SHAPE',
                strokeWidth: 2,
                stroke: '#5D4037',
                fill: '#8D6E63'
            },
            new go.Binding('width', 'width', w => scaled(w || 80)),
            new go.Binding('height', 'height', h => scaled(h || 60))
        ),
        
        $(go.Shape, 'LineV',
            { 
                strokeWidth: 2,
                stroke: '#4E342E',
                alignment: go.Spot.Center
            },
            new go.Binding('height', 'height', h => scaled((h || 60) - 10))
        ),
        
        $(go.Shape, 'Circle',
            { 
                width: scaled(6),
                height: scaled(6),
                fill: '#C0C0C0',
                stroke: null,
                alignment: new go.Spot(0.3, 0.5)
            }
        ),
        $(go.Shape, 'Circle',
            { 
                width: scaled(6),
                height: scaled(6),
                fill: '#C0C0C0',
                stroke: null,
                alignment: new go.Spot(0.7, 0.5)
            }
        )
    );
};

export const createKitchenIslandTemplate = ($) => {
    return $(go.Node, 'Spot',
        { 
            locationSpot: go.Spot.Center, 
            rotatable: true,
            resizable: false,
            selectionAdorned: true
        },
        new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
        new go.Binding('angle', 'angle').makeTwoWay(),
        
        $(go.Shape, 'RoundedRectangle',
            { 
                name: 'SHAPE',
                width: scaled(120),
                height: scaled(80),
                strokeWidth: 2,
                stroke: '#5D4037',
                fill: '#A1887F',
                parameter1: 8
            }
        ),
        
        $(go.Shape, 'RoundedRectangle',
            { 
                width: scaled(104),
                height: scaled(64),
                strokeWidth: 0,
                fill: '#8D6E63',
                parameter1: 6,
                alignment: go.Spot.Center
            }
        ),
        
        $(go.Shape, 'LineH',
            { 
                width: scaled(90),
                strokeWidth: 1,
                stroke: '#5D4037',
                alignment: go.Spot.Center
            }
        )
    );
};

export const createKitchenTableTemplate = ($) => {
    return $(go.Node, 'Auto',
        { 
            locationSpot: go.Spot.Center, 
            rotatable: true,
            resizable: false,
            selectionAdorned: true
        },
        new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
        new go.Binding('angle', 'angle').makeTwoWay(),
        new go.Binding('width', 'width'),
        new go.Binding('height', 'height'),
        
        $(go.Shape, 'RoundedRectangle',
            { 
                name: 'SHAPE',
                strokeWidth: 2,
                stroke: '#6D4C41',
                fill: '#A1887F',
                parameter1: 10
            },
            new go.Binding('width', 'width', w => scaled(w || 100)),
            new go.Binding('height', 'height', h => scaled(h || 100))
        )
    );
};

export const createKitchenChairTemplate = ($) => {
    return $(go.Node, 'Spot',
        { 
            locationSpot: go.Spot.Center, 
            rotatable: true,
            resizable: false,
            selectionAdorned: true
        },
        new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
        new go.Binding('angle', 'angle').makeTwoWay(),
        
        $(go.Shape, 'RoundedRectangle',
            { 
                name: 'SHAPE',
                width: scaled(40),
                height: scaled(45),
                strokeWidth: 2,
                stroke: '#5D4037',
                fill: '#8D6E63',
                parameter1: 5
            }
        ),
        
        $(go.Shape, 'Rectangle',
            { 
                width: scaled(28),
                height: scaled(6),
                strokeWidth: 0,
                fill: '#4E342E',
                alignment: new go.Spot(0.5, 0.07)
            }
        ),
        
        $(go.Shape, 'Circle', { width: scaled(4), height: scaled(4), fill: '#3E2723', stroke: null, alignment: new go.Spot(0.15, 0.15) }),
        $(go.Shape, 'Circle', { width: scaled(4), height: scaled(4), fill: '#3E2723', stroke: null, alignment: new go.Spot(0.85, 0.15) }),
        $(go.Shape, 'Circle', { width: scaled(4), height: scaled(4), fill: '#3E2723', stroke: null, alignment: new go.Spot(0.15, 0.85) }),
        $(go.Shape, 'Circle', { width: scaled(4), height: scaled(4), fill: '#3E2723', stroke: null, alignment: new go.Spot(0.85, 0.85) })
    );
};

export const createStoolTemplate = ($) => {
    return $(go.Node, 'Spot',
        { 
            locationSpot: go.Spot.Center, 
            rotatable: true,
            resizable: false,
            selectionAdorned: true
        },
        new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
        new go.Binding('angle', 'angle').makeTwoWay(),
        
        $(go.Shape, 'Circle',
            { 
                name: 'SHAPE',
                width: scaled(35),
                height: scaled(35),
                strokeWidth: 2,
                stroke: '#4E342E',
                fill: '#6D4C41'
            }
        ),
        
        $(go.Shape, 'Circle',
            { 
                width: scaled(14),
                height: scaled(14),
                strokeWidth: 1,
                stroke: '#3E2723',
                fill: '#5D4037',
                alignment: go.Spot.Center
            }
        )
    );
};

export const createCounterTemplate = ($) => {
    return $(go.Node, 'Spot',
        { 
            locationSpot: go.Spot.Center, 
            rotatable: true,
            resizable: false,
            selectionAdorned: true
        },
        new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
        new go.Binding('angle', 'angle').makeTwoWay(),
        new go.Binding('width', 'width'),
        
        $(go.Shape, 'Rectangle',
            { 
                name: 'SHAPE',
                strokeWidth: 2,
                stroke: '#5D4037',
                fill: '#BCAAA4'
            },
            new go.Binding('width', 'width', w => scaled(w || 150)),
            new go.Binding('height', '', () => scaled(40))
        ),
        
        $(go.Shape, 'Rectangle',
            { 
                strokeWidth: 0,
                fill: '#8D6E63',
                alignment: new go.Spot(0.5, 0.1)
            },
            new go.Binding('width', 'width', w => scaled((w || 150) - 8)),
            new go.Binding('height', '', () => scaled(8))
        )
    );
};

export const createTrashTemplate = ($) => {
    return $(go.Node, 'Spot',
        { 
            locationSpot: go.Spot.Center, 
            rotatable: true,
            resizable: false,
            selectionAdorned: true
        },
        new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
        new go.Binding('angle', 'angle').makeTwoWay(),
        
        $(go.Shape, 'Rectangle',
            { 
                name: 'SHAPE',
                width: scaled(30),
                height: scaled(40),
                strokeWidth: 2,
                stroke: '#212121',
                fill: '#424242'
            }
        ),
        
        $(go.Shape, 'Rectangle',
            { 
                width: scaled(26),
                height: scaled(8),
                strokeWidth: 1,
                stroke: '#616161',
                fill: '#757575',
                alignment: new go.Spot(0.5, 0.075)
            }
        )
    );
};

export const registerCocinaTemplates = (diagram, $) => {
    diagram.nodeTemplateMap.add('Fridge', createFridgeTemplate($));
    diagram.nodeTemplateMap.add('Stove', createStoveTemplate($));
    diagram.nodeTemplateMap.add('Sink', createSinkTemplate($));
    diagram.nodeTemplateMap.add('Oven', createOvenTemplate($));
    diagram.nodeTemplateMap.add('Microwave', createMicrowaveTemplate($));
    diagram.nodeTemplateMap.add('Dishwasher', createDishwasherTemplate($));
    diagram.nodeTemplateMap.add('Washer', createWasherTemplate($));
    diagram.nodeTemplateMap.add('Dryer', createDryerTemplate($));
    diagram.nodeTemplateMap.add('KitchenCabinet', createKitchenCabinetTemplate($));
    diagram.nodeTemplateMap.add('KitchenIsland', createKitchenIslandTemplate($));
    diagram.nodeTemplateMap.add('KitchenTable', createKitchenTableTemplate($));
    diagram.nodeTemplateMap.add('KitchenChair', createKitchenChairTemplate($));
    diagram.nodeTemplateMap.add('Stool', createStoolTemplate($));
    diagram.nodeTemplateMap.add('Counter', createCounterTemplate($));
    diagram.nodeTemplateMap.add('Trash', createTrashTemplate($));
};

export const cocinaObjects = [
    { category: 'Fridge', name: 'Refrigerador', label: 'Nevera', preview: '🧊' },
    { category: 'Fridge', name: 'Refrigerador Side by Side', label: 'Nevera', width: 90, height: 120, preview: '🧊' },
    { category: 'Fridge', name: 'Mini Refrigerador', label: 'Mini Nevera', width: 50, height: 60, preview: '🧊' },
    { category: 'Stove', name: 'Estufa 4 Hornillas', label: 'Estufa', preview: '🔥' },
    { category: 'Oven', name: 'Horno Empotrado', label: 'Horno', preview: '🔥' },
    { category: 'Microwave', name: 'Microondas', label: 'Microondas', preview: '📦' },
    { category: 'Dishwasher', name: 'Lavavajillas', label: 'Lavavajillas', preview: '🚰' },
    { category: 'Washer', name: 'Lavadora', label: 'Lavadora', preview: '🧺' },
    { category: 'Dryer', name: 'Secadora', label: 'Secadora', preview: '🌀' },
    { category: 'Sink', name: 'Fregadero Simple', label: 'Fregadero', width: 16, height: 25, preview: '🚰' },
    { category: 'Sink', name: 'Fregadero Doble', label: 'Fregadero', width: 20, height: 35, preview: '🚰' },
    { category: 'KitchenCabinet', name: 'Mueble Bajo', label: 'Mueble', width: 50, height: 60, preview: '🗄️' },
    { category: 'KitchenCabinet', name: 'Mueble Alto', label: 'Mueble', width: 70, height: 80, preview: '🗄️' },
    { category: 'KitchenCabinet', name: 'Alacena', label: 'Alacena', width: 90, height: 100, preview: '🗃️' },
    { category: 'KitchenIsland', name: 'Isla de Cocina', label: 'Isla', preview: '🏝️' },
    { category: 'Counter', name: 'Barra Desayunador', label: 'Barra', width: 150, preview: '🍽️' },
    { category: 'KitchenTable', name: 'Mesa Cocina 2 Personas', label: 'Mesa', width: 70, height: 70, preview: '🍽️' },
    { category: 'KitchenTable', name: 'Mesa Cocina 4 Personas', label: 'Mesa', width: 100, height: 100, preview: '🍽️' },
    { category: 'KitchenChair', name: 'Silla de Cocina', label: 'Silla', preview: '🪑' },
    { category: 'Stool', name: 'Taburete Alto', label: 'Taburete', preview: '🪑' },
    { category: 'KitchenCabinet', name: 'Despensa', label: 'Despensa', width: 60, height: 80, preview: '📦' },
    { category: 'Trash', name: 'Basura', label: 'Basura', preview: '🗑️' }
];

export const cocinaPanelTitle = 'Cocina';