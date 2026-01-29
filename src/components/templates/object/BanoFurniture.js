const SCALE_FACTOR = 0.5;

const scaled = (value) => value * SCALE_FACTOR;

export const createToiletTemplate = ($) => {
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
                height: scaled(60),
                strokeWidth: 2,
                stroke: '#999',
                fill: '#FFFFFF',
                parameter1: 8
            }
        ),
        
        $(go.Shape, 'Ellipse',
            { 
                width: scaled(32),
                height: scaled(40),
                strokeWidth: 2,
                stroke: '#AAA',
                fill: '#F5F5F5',
                alignment: new go.Spot(0.5, 0.4)
            }
        ),
        
        $(go.Shape, 'RoundedRectangle',
            { 
                width: scaled(35),
                height: scaled(12),
                strokeWidth: 1,
                stroke: '#888',
                fill: '#E0E0E0',
                parameter1: 4,
                alignment: new go.Spot(0.5, 0.85)
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

export const createBathtubTemplate = ($) => {
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
        
        $(go.Shape, 'RoundedRectangle',
            { 
                name: 'SHAPE',
                strokeWidth: 2,
                stroke: '#666',
                fill: '#FFFFFF',
                parameter1: 10
            },
            new go.Binding('width', 'width', w => scaled(w || 80)),
            new go.Binding('height', 'height', h => scaled(h || 160))
        ),
        
        $(go.Shape, 'RoundedRectangle',
            { 
                strokeWidth: 2,
                stroke: '#999',
                fill: '#E3F2FD',
                parameter1: 8,
                alignment: go.Spot.Center
            },
            new go.Binding('width', 'width', w => scaled((w || 80) - 12)),
            new go.Binding('height', 'height', h => scaled((h || 160) - 12))
        ),
        
        $(go.Shape, 'Circle',
            { 
                width: scaled(10),
                height: scaled(10),
                fill: '#C0C0C0',
                stroke: '#666',
                strokeWidth: 1,
                alignment: new go.Spot(0.5, 0.1)
            }
        )
    );
};

export const createBideTemplate = ($) => {
    return $(go.Node, 'Spot',
        { 
            locationSpot: go.Spot.Center, 
            rotatable: true,
            resizable: false,
            selectionAdorned: true
        },
        new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
        new go.Binding('angle', 'angle').makeTwoWay(),
        
        $(go.Shape, 'Ellipse',
            { 
                name: 'SHAPE',
                width: scaled(35),
                height: scaled(50),
                strokeWidth: 2,
                stroke: '#999',
                fill: '#FFFFFF'
            }
        ),
        
        $(go.Shape, 'Circle',
            { 
                width: scaled(6),
                height: scaled(6),
                fill: '#C0C0C0',
                stroke: '#666',
                strokeWidth: 1,
                alignment: new go.Spot(0.5, 0.3)
            }
        )
    );
};

export const createUrinalTemplate = ($) => {
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
                width: scaled(30),
                height: scaled(40),
                strokeWidth: 2,
                stroke: '#999',
                fill: '#ECEFF1',
                parameter1: 5
            }
        ),
        
        $(go.Shape, 'Ellipse',
            { 
                width: scaled(15),
                height: scaled(20),
                strokeWidth: 1,
                stroke: '#AAA',
                fill: '#FFF',
                alignment: go.Spot.Center
            }
        )
    );
};

export const createShowerTemplate = ($) => {
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
                stroke: '#666',
                fill: '#B0BEC5'
            },
            new go.Binding('width', 'width', w => scaled(w || 90)),
            new go.Binding('height', 'height', h => scaled(h || 90))
        ),
        
        $(go.Shape, 'LineH', { strokeWidth: 1, stroke: '#546E7A', alignment: new go.Spot(0.5, 0.33) },
            new go.Binding('width', 'width', w => scaled((w || 90) - 20))
        ),
        $(go.Shape, 'LineH', { strokeWidth: 1, stroke: '#546E7A', alignment: new go.Spot(0.5, 0.67) },
            new go.Binding('width', 'width', w => scaled((w || 90) - 20))
        ),
        
        $(go.Shape, 'Circle',
            { 
                width: scaled(12),
                height: scaled(12),
                fill: '#78909C',
                stroke: '#546E7A',
                strokeWidth: 2,
                alignment: new go.Spot(0.15, 0.15)
            }
        )
    );
};

export const createVanityCabinetTemplate = ($) => {
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
                fill: '#6D4C41'
            },
            new go.Binding('width', 'width', w => scaled(w || 80)),
            new go.Binding('height', '', () => scaled(50))
        ),
        
        $(go.Shape, 'LineV',
            { 
                strokeWidth: 2,
                stroke: '#4E342E',
                alignment: go.Spot.Center
            },
            new go.Binding('height', '', () => scaled(40))
        ),
        
        $(go.Shape, 'Circle',
            { 
                width: scaled(5),
                height: scaled(5),
                fill: '#C0C0C0',
                stroke: null,
                alignment: new go.Spot(0.3, 0.5)
            }
        ),
        $(go.Shape, 'Circle',
            { 
                width: scaled(5),
                height: scaled(5),
                fill: '#C0C0C0',
                stroke: null,
                alignment: new go.Spot(0.7, 0.5)
            }
        )
    );
};

export const createMedicineCabinetTemplate = ($) => {
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
                height: scaled(70),
                strokeWidth: 2,
                stroke: '#999',
                fill: '#FFFFFF'
            }
        ),
        
        $(go.Shape, 'LineV',
            { 
                strokeWidth: 1,
                stroke: '#CCC',
                height: scaled(60),
                alignment: go.Spot.Center
            }
        ),
        
        $(go.Shape, 'LineH',
            { 
                strokeWidth: 1,
                stroke: '#CCC',
                width: scaled(50),
                alignment: go.Spot.Center
            }
        ),
        
        $(go.Shape, 'Circle',
            { 
                width: scaled(4),
                height: scaled(4),
                fill: '#999',
                stroke: null,
                alignment: new go.Spot(0.3, 0.5)
            }
        ),
        $(go.Shape, 'Circle',
            { 
                width: scaled(4),
                height: scaled(4),
                fill: '#999',
                stroke: null,
                alignment: new go.Spot(0.7, 0.5)
            }
        )
    );
};

export const createBathroomShelfTemplate = ($) => {
    return $(go.Node, 'Auto',
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
                height: scaled(20),
                strokeWidth: 2,
                stroke: '#5D4037',
                fill: '#8D6E63'
            }
        )
    );
};

export const createTallCabinetTemplate = ($) => {
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
                width: scaled(40),
                height: scaled(150),
                strokeWidth: 2,
                stroke: '#666',
                fill: '#FFFFFF'
            }
        ),
        
        $(go.Shape, 'LineH', { strokeWidth: 1, stroke: '#999', width: scaled(35), alignment: new go.Spot(0.5, 0.25) }),
        $(go.Shape, 'LineH', { strokeWidth: 1, stroke: '#999', width: scaled(35), alignment: new go.Spot(0.5, 0.5) }),
        $(go.Shape, 'LineH', { strokeWidth: 1, stroke: '#999', width: scaled(35), alignment: new go.Spot(0.5, 0.75) }),
        
        $(go.Shape, 'Circle', { width: scaled(4), height: scaled(4), fill: '#999', stroke: null, alignment: new go.Spot(0.5, 0.15) }),
        $(go.Shape, 'Circle', { width: scaled(4), height: scaled(4), fill: '#999', stroke: null, alignment: new go.Spot(0.5, 0.4) }),
        $(go.Shape, 'Circle', { width: scaled(4), height: scaled(4), fill: '#999', stroke: null, alignment: new go.Spot(0.5, 0.65) })
    );
};

export const createTowelRackTemplate = ($) => {
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
                height: scaled(80),
                strokeWidth: 2,
                stroke: '#607D8B',
                fill: '#78909C'
            }
        ),
        
        $(go.Shape, 'LineH', { strokeWidth: 3, stroke: '#546E7A', width: scaled(45), alignment: new go.Spot(0.5, 0.3) }),
        $(go.Shape, 'LineH', { strokeWidth: 3, stroke: '#546E7A', width: scaled(45), alignment: new go.Spot(0.5, 0.5) }),
        $(go.Shape, 'LineH', { strokeWidth: 3, stroke: '#546E7A', width: scaled(45), alignment: new go.Spot(0.5, 0.7) })
    );
};

export const createMirrorTemplate = ($) => {
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
                strokeWidth: 3,
                stroke: '#999',
                fill: '#B0BEC5'
            },
            new go.Binding('width', 'width', w => scaled(w || 60)),
            new go.Binding('height', 'height', h => scaled(h || 80))
        ),
        
        $(go.Shape, 'Rectangle',
            { 
                strokeWidth: 0,
                fill: '#CFD8DC',
                alignment: go.Spot.Center
            },
            new go.Binding('width', 'width', w => scaled((w || 60) - 12)),
            new go.Binding('height', 'height', h => scaled((h || 80) - 12))
        )
    );
};

export const createLaundryBasketTemplate = ($) => {
    return $(go.Node, 'Auto',
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
                width: scaled(35),
                height: scaled(50),
                strokeWidth: 2,
                stroke: '#5D4037',
                fill: '#8D6E63'
            }
        )
    );
};

export const createScaleTemplate = ($) => {
    return $(go.Node, 'Auto',
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
                width: scaled(30),
                height: scaled(30),
                strokeWidth: 2,
                stroke: '#546E7A',
                fill: '#607D8B',
                parameter1: 3
            }
        )
    );
};

export const createTrashBinTemplate = ($) => {
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
                width: scaled(25),
                height: scaled(35),
                strokeWidth: 2,
                stroke: '#424242',
                fill: '#546E7A'
            }
        ),
        
        $(go.Shape, 'Rectangle',
            { 
                width: scaled(22),
                height: scaled(6),
                strokeWidth: 1,
                stroke: '#616161',
                fill: '#757575',
                alignment: new go.Spot(0.5, 0.08)
            }
        )
    );
};

export const createBathPlantTemplate = ($) => {
    return $(go.Node, 'Spot',
        { 
            locationSpot: go.Spot.Center, 
            rotatable: true,
            resizable: false,
            selectionAdorned: true
        },
        new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
        new go.Binding('angle', 'angle').makeTwoWay(),
        
        $(go.Shape, 'Ellipse',
            { 
                name: 'SHAPE',
                width: scaled(20),
                height: scaled(35),
                strokeWidth: 2,
                stroke: '#558B2F',
                fill: '#66BB6A'
            }
        ),
        
        $(go.Shape, 'Ellipse',
            { 
                width: scaled(12),
                height: scaled(15),
                strokeWidth: 0,
                fill: '#81C784',
                alignment: new go.Spot(0.5, 0.3)
            }
        )
    );
};

export const createBathMatTemplate = ($) => {
    return $(go.Node, 'Auto',
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
                width: scaled(60),
                height: scaled(40),
                strokeWidth: 2,
                stroke: '#1976D2',
                fill: '#64B5F6',
                parameter1: 5
            }
        )
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
                width: scaled(30),
                height: scaled(30),
                strokeWidth: 2,
                stroke: '#999',
                fill: '#FFFFFF'
            }
        ),
        
        $(go.Shape, 'Circle',
            { 
                width: scaled(18),
                height: scaled(18),
                strokeWidth: 1,
                stroke: '#CCC',
                fill: '#F5F5F5',
                alignment: go.Spot.Center
            }
        )
    );
};

export const registerBanoTemplates = (diagram, $) => {
    diagram.nodeTemplateMap.add('Toilet', createToiletTemplate($));
    diagram.nodeTemplateMap.add('Sink', createSinkTemplate($));
    diagram.nodeTemplateMap.add('Bathtub', createBathtubTemplate($));
    diagram.nodeTemplateMap.add('Bide', createBideTemplate($));
    diagram.nodeTemplateMap.add('Urinal', createUrinalTemplate($));
    diagram.nodeTemplateMap.add('Shower', createShowerTemplate($));
    diagram.nodeTemplateMap.add('VanityCabinet', createVanityCabinetTemplate($));
    diagram.nodeTemplateMap.add('MedicineCabinet', createMedicineCabinetTemplate($));
    diagram.nodeTemplateMap.add('BathroomShelf', createBathroomShelfTemplate($));
    diagram.nodeTemplateMap.add('TallCabinet', createTallCabinetTemplate($));
    diagram.nodeTemplateMap.add('TowelRack', createTowelRackTemplate($));
    diagram.nodeTemplateMap.add('Mirror', createMirrorTemplate($));
    diagram.nodeTemplateMap.add('LaundryBasket', createLaundryBasketTemplate($));
    diagram.nodeTemplateMap.add('Scale', createScaleTemplate($));
    diagram.nodeTemplateMap.add('TrashBin', createTrashBinTemplate($));
    diagram.nodeTemplateMap.add('BathPlant', createBathPlantTemplate($));
    diagram.nodeTemplateMap.add('BathMat', createBathMatTemplate($));
    diagram.nodeTemplateMap.add('BathStool', createStoolTemplate($));
};

export const banoObjects = [
    { category: 'Toilet', name: 'Inodoro Estándar', label: 'WC', preview: '🚽' },
    { category: 'Toilet', name: 'Inodoro con Bidé', label: 'WC', preview: '🚽' },
    { category: 'Bide', name: 'Bidé', label: 'Bidé', preview: '🚿' },
    { category: 'Urinal', name: 'Mingitorio', label: 'Mingitorio', preview: '🚻' },
    
    { category: 'Sink', name: 'Lavabo Simple', label: 'Lavabo', preview: '🚰' },
    { category: 'Sink', name: 'Lavabo Doble', label: 'Lavabo', preview: '🚰' },
    { category: 'Sink', name: 'Lavabo Pedestal', label: 'Lavabo', preview: '🚰' },
    { category: 'Sink', name: 'Lavabo sobre Encimera', label: 'Lavabo', preview: '🚰' },
    
    { category: 'Bathtub', name: 'Bañera Estándar', label: 'Bañera', width: 80, height: 160, preview: '🛁' },
    { category: 'Bathtub', name: 'Bañera de Esquina', label: 'Bañera', width: 140, height: 140, preview: '🛁' },
    { category: 'Bathtub', name: 'Bañera Hidromasaje', label: 'Jacuzzi', width: 150, height: 150, preview: '🛁' },
    { category: 'Shower', name: 'Ducha Cuadrada', label: 'Ducha', width: 90, height: 90, preview: '🚿' },
    { category: 'Shower', name: 'Ducha Rectangular', label: 'Ducha', width: 80, height: 120, preview: '🚿' },
    { category: 'Shower', name: 'Plato de Ducha', label: 'Plato', width: 100, height: 100, preview: '⬜' },
    
    { category: 'VanityCabinet', name: 'Mueble Lavabo', label: 'Mueble', width: 80, preview: '🗄️' },
    { category: 'VanityCabinet', name: 'Mueble Lavabo Doble', label: 'Mueble', width: 140, preview: '🗄️' },
    { category: 'MedicineCabinet', name: 'Botiquín', label: 'Botiquín', preview: '💊' },
    { category: 'BathroomShelf', name: 'Estante Baño', label: 'Estante', preview: '📦' },
    { category: 'TallCabinet', name: 'Mueble Columna', label: 'Columna', preview: '🏛️' },
    { category: 'TowelRack', name: 'Toallero de Pie', label: 'Toallero', preview: '🧖' },
    
    { category: 'Mirror', name: 'Espejo Simple', label: 'Espejo', width: 15, height: 80, preview: '🪞' },
    { category: 'Mirror', name: 'Espejo Grande', label: 'Espejo', width: 15, height: 100, preview: '🪞' },
    { category: 'Mirror', name: 'Espejo con Luz', label: 'Espejo', width: 15, height: 90, preview: '💡' },
    
    { category: 'LaundryBasket', name: 'Cesto Ropa', label: 'Cesto', preview: '🧺' },
    { category: 'Scale', name: 'Báscula', label: 'Báscula', preview: '⚖️' },
    { category: 'TrashBin', name: 'Cesto Basura', label: 'Basura', preview: '🗑️' },
    { category: 'BathPlant', name: 'Planta de Baño', label: 'Planta', preview: '🪴' },
    { category: 'BathMat', name: 'Alfombra Baño', label: 'Alfombra', preview: '🟦' },
    { category: 'BathStool', name: 'Taburete', label: 'Taburete', preview: '⭕' }
];

export const banoPanelTitle = 'Baño';