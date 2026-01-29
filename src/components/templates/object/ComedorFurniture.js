const SCALE_FACTOR = 0.4;

const scaled = (value) => value * SCALE_FACTOR;

export const createDiningTableTemplate = ($) => {
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
                stroke: '#5D4037',
                fill: '#8D6E63',
                parameter1: 10
            },
            new go.Binding('width', 'width', w => scaled(w || 90)),
            new go.Binding('height', 'height', h => scaled(h || 90))
        )
    );
};

export const createRoundDiningTableTemplate = ($) => {
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
        
        $(go.Shape, 'Circle',
            { 
                name: 'SHAPE',
                strokeWidth: 2,
                stroke: '#5D4037',
                fill: '#8D6E63'
            },
            new go.Binding('width', 'width', w => scaled(w || 100)),
            new go.Binding('height', 'width', w => scaled(w || 100))
        )
    );
};

export const createDiningChairTemplate = ($) => {
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
                stroke: '#5D4037',
                fill: '#6D4C41',
                parameter1: 5
            },
            new go.Binding('width', 'width', w => scaled(w || 55)),
            new go.Binding('height', 'height', h => scaled(h || 60))
        ),
        
        $(go.Shape, 'Rectangle',
            { 
                strokeWidth: 0,
                fill: '#4E342E',
                alignment: new go.Spot(0.5, 0.07)
            },
            new go.Binding('width', 'width', w => scaled((w || 55) * 0.7)),
            new go.Binding('height', '', () => scaled(8))
        ),
        
        $(go.Shape, 'Circle', { width: scaled(5), height: scaled(5), fill: '#3E2723', stroke: null, alignment: new go.Spot(0.15, 0.15) }),
        $(go.Shape, 'Circle', { width: scaled(5), height: scaled(5), fill: '#3E2723', stroke: null, alignment: new go.Spot(0.85, 0.15) }),
        $(go.Shape, 'Circle', { width: scaled(5), height: scaled(5), fill: '#3E2723', stroke: null, alignment: new go.Spot(0.15, 0.85) }),
        $(go.Shape, 'Circle', { width: scaled(5), height: scaled(5), fill: '#3E2723', stroke: null, alignment: new go.Spot(0.85, 0.85) })
    );
};

export const createArmchairTemplate = ($) => {
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
                width: scaled(65),
                height: scaled(60),
                strokeWidth: 2,
                stroke: '#4E342E',
                fill: '#5D4037',
                parameter1: 5
            }
        ),
        
        $(go.Shape, 'Rectangle',
            { 
                width: scaled(65),
                height: scaled(10),
                strokeWidth: 0,
                fill: '#3E2723',
                alignment: new go.Spot(0.5, 0.05)
            }
        ),
        
        $(go.Shape, 'Rectangle',
            { 
                width: scaled(8),
                height: scaled(48),
                strokeWidth: 0,
                fill: '#4E342E',
                alignment: new go.Spot(0.05, 0.5)
            }
        ),
        $(go.Shape, 'Rectangle',
            { 
                width: scaled(8),
                height: scaled(48),
                strokeWidth: 0,
                fill: '#4E342E',
                alignment: new go.Spot(0.95, 0.5)
            }
        )
    );
};

export const createUpholsteredChairTemplate = ($) => {
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
                width: scaled(60),
                height: scaled(65),
                strokeWidth: 2,
                stroke: '#6D4C41',
                fill: '#8D6E63',
                parameter1: 8
            }
        ),
        
        $(go.Shape, 'RoundedRectangle',
            { 
                width: scaled(48),
                height: scaled(12),
                strokeWidth: 1,
                stroke: '#5D4037',
                fill: '#6D4C41',
                parameter1: 3,
                alignment: new go.Spot(0.5, 0.08)
            }
        )
    );
};

export const createDiningBenchTemplate = ($) => {
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
                width: scaled(100),
                height: scaled(40),
                strokeWidth: 2,
                stroke: '#5D4037',
                fill: '#6D4C41',
                parameter1: 5
            }
        )
    );
};

export const createHeadChairTemplate = ($) => {
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
                width: scaled(70),
                height: scaled(70),
                strokeWidth: 3,
                stroke: '#3E2723',
                fill: '#4E342E',
                parameter1: 8
            }
        ),
        
        $(go.Shape, 'RoundedRectangle',
            { 
                width: scaled(64),
                height: scaled(14),
                strokeWidth: 0,
                fill: '#3E2723',
                parameter1: 3,
                alignment: new go.Spot(0.5, 0.08)
            }
        ),
        
        $(go.Shape, 'Rectangle',
            { 
                width: scaled(10),
                height: scaled(52),
                strokeWidth: 0,
                fill: '#3E2723',
                alignment: new go.Spot(0.08, 0.5)
            }
        ),
        $(go.Shape, 'Rectangle',
            { 
                width: scaled(10),
                height: scaled(52),
                strokeWidth: 0,
                fill: '#3E2723',
                alignment: new go.Spot(0.92, 0.5)
            }
        )
    );
};

export const createBuffetTemplate = ($) => {
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
                stroke: '#4E342E',
                fill: '#5D4037'
            },
            new go.Binding('width', 'width', w => scaled(w || 160)),
            new go.Binding('height', 'height', h => scaled(h || 50))
        ),
        
        $(go.Shape, 'LineV', { strokeWidth: 2, stroke: '#3E2723', height: scaled(40), alignment: new go.Spot(0.33, 0.5) }),
        $(go.Shape, 'LineV', { strokeWidth: 2, stroke: '#3E2723', height: scaled(40), alignment: new go.Spot(0.67, 0.5) }),
        
        $(go.Shape, 'Circle', { width: scaled(5), height: scaled(5), fill: '#C0C0C0', stroke: null, alignment: new go.Spot(0.17, 0.5) }),
        $(go.Shape, 'Circle', { width: scaled(5), height: scaled(5), fill: '#C0C0C0', stroke: null, alignment: new go.Spot(0.5, 0.5) }),
        $(go.Shape, 'Circle', { width: scaled(5), height: scaled(5), fill: '#C0C0C0', stroke: null, alignment: new go.Spot(0.83, 0.5) })
    );
};

export const createSideboardTemplate = ($) => {
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
                fill: '#6D4C41'
            },
            new go.Binding('width', 'width', w => scaled(w || 140)),
            new go.Binding('height', 'height', h => scaled(h || 80))
        ),
        
        $(go.Shape, 'Rectangle',
            { 
                width: scaled(130),
                height: scaled(35),
                strokeWidth: 1,
                stroke: '#4E342E',
                fill: '#5D4037',
                alignment: new go.Spot(0.5, 0.3)
            }
        ),
        
        $(go.Shape, 'LineV', { strokeWidth: 2, stroke: '#4E342E', height: scaled(25), alignment: new go.Spot(0.33, 0.7) }),
        $(go.Shape, 'LineV', { strokeWidth: 2, stroke: '#4E342E', height: scaled(25), alignment: new go.Spot(0.67, 0.7) }),
        
        $(go.Shape, 'Circle', { width: scaled(5), height: scaled(5), fill: '#C0C0C0', stroke: null, alignment: new go.Spot(0.17, 0.7) }),
        $(go.Shape, 'Circle', { width: scaled(5), height: scaled(5), fill: '#C0C0C0', stroke: null, alignment: new go.Spot(0.5, 0.7) }),
        $(go.Shape, 'Circle', { width: scaled(5), height: scaled(5), fill: '#C0C0C0', stroke: null, alignment: new go.Spot(0.83, 0.7) })
    );
};

export const createChinaCabinetTemplate = ($) => {
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
            new go.Binding('width', 'width', w => scaled(w || 60)),
            new go.Binding('height', 'height', h => scaled(h || 180))
        ),
        
        $(go.Shape, 'Rectangle',
            { 
                width: scaled(50),
                height: scaled(120),
                strokeWidth: 2,
                stroke: '#B0BEC5',
                fill: 'rgba(176, 190, 197, 0.3)',
                alignment: new go.Spot(0.5, 0.35)
            }
        ),
        
        $(go.Shape, 'LineH', { strokeWidth: 1, stroke: '#CFD8DC', width: scaled(45), alignment: new go.Spot(0.5, 0.2) }),
        $(go.Shape, 'LineH', { strokeWidth: 1, stroke: '#CFD8DC', width: scaled(45), alignment: new go.Spot(0.5, 0.35) }),
        $(go.Shape, 'LineH', { strokeWidth: 1, stroke: '#CFD8DC', width: scaled(45), alignment: new go.Spot(0.5, 0.5) }),
        
        $(go.Shape, 'Rectangle',
            { 
                width: scaled(50),
                height: scaled(40),
                strokeWidth: 1,
                stroke: '#4E342E',
                fill: '#6D4C41',
                alignment: new go.Spot(0.5, 0.85)
            }
        )
    );
};

export const createDisplayCabinetTemplate = ($) => {
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
                stroke: '#6D4C41',
                fill: '#A1887F'
            },
            new go.Binding('width', 'width', w => scaled(w || 70)),
            new go.Binding('height', 'height', h => scaled(h || 200))
        ),
        
        $(go.Shape, 'Rectangle',
            { 
                width: scaled(60),
                height: scaled(180),
                strokeWidth: 2,
                stroke: '#90A4AE',
                fill: 'rgba(144, 164, 174, 0.2)',
                alignment: go.Spot.Center
            }
        ),
        
        $(go.Shape, 'LineH', { strokeWidth: 1, stroke: '#B0BEC5', width: scaled(55), alignment: new go.Spot(0.5, 0.25) }),
        $(go.Shape, 'LineH', { strokeWidth: 1, stroke: '#B0BEC5', width: scaled(55), alignment: new go.Spot(0.5, 0.5) }),
        $(go.Shape, 'LineH', { strokeWidth: 1, stroke: '#B0BEC5', width: scaled(55), alignment: new go.Spot(0.5, 0.75) })
    );
};

export const createDrawerUnitTemplate = ($) => {
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
                width: scaled(80),
                height: scaled(60),
                strokeWidth: 2,
                stroke: '#5D4037',
                fill: '#6D4C41'
            }
        ),
        
        $(go.Shape, 'LineH', { strokeWidth: 2, stroke: '#4E342E', width: scaled(75), alignment: new go.Spot(0.5, 0.33) }),
        $(go.Shape, 'LineH', { strokeWidth: 2, stroke: '#4E342E', width: scaled(75), alignment: new go.Spot(0.5, 0.67) }),
        
        $(go.Shape, 'Circle', { width: scaled(5), height: scaled(5), fill: '#C0C0C0', stroke: null, alignment: new go.Spot(0.5, 0.17) }),
        $(go.Shape, 'Circle', { width: scaled(5), height: scaled(5), fill: '#C0C0C0', stroke: null, alignment: new go.Spot(0.5, 0.5) }),
        $(go.Shape, 'Circle', { width: scaled(5), height: scaled(5), fill: '#C0C0C0', stroke: null, alignment: new go.Spot(0.5, 0.83) })
    );
};

export const createBarTemplate = ($) => {
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
                height: scaled(50),
                strokeWidth: 2,
                stroke: '#3E2723',
                fill: '#4E342E',
                parameter1: 8
            }
        ),
        
        $(go.Shape, 'RoundedRectangle',
            { 
                width: scaled(110),
                height: scaled(15),
                strokeWidth: 0,
                fill: '#5D4037',
                parameter1: 5,
                alignment: new go.Spot(0.5, 0.2)
            }
        ),
        
        $(go.Shape, 'Rectangle',
            { 
                width: scaled(100),
                height: scaled(25),
                strokeWidth: 1,
                stroke: '#3E2723',
                fill: '#6D4C41',
                alignment: new go.Spot(0.5, 0.7)
            }
        )
    );
};

export const createServingCartTemplate = ($) => {
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
                height: scaled(80),
                strokeWidth: 2,
                stroke: '#607D8B',
                fill: '#78909C'
            }
        ),
        
        $(go.Shape, 'Rectangle',
            { 
                width: scaled(55),
                height: scaled(25),
                strokeWidth: 1,
                stroke: '#546E7A',
                fill: '#90A4AE',
                alignment: new go.Spot(0.5, 0.25)
            }
        ),
        $(go.Shape, 'Rectangle',
            { 
                width: scaled(55),
                height: scaled(25),
                strokeWidth: 1,
                stroke: '#546E7A',
                fill: '#90A4AE',
                alignment: new go.Spot(0.5, 0.75)
            }
        ),
        
        $(go.Shape, 'Circle', { width: scaled(8), height: scaled(8), fill: '#424242', stroke: '#263238', strokeWidth: 1, alignment: new go.Spot(0.2, 0.95) }),
        $(go.Shape, 'Circle', { width: scaled(8), height: scaled(8), fill: '#424242', stroke: '#263238', strokeWidth: 1, alignment: new go.Spot(0.8, 0.95) })
    );
};

export const createDiningRugTemplate = ($) => {
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
                width: scaled(140),
                height: scaled(100),
                strokeWidth: 3,
                stroke: '#615c5bff',
                fill: '#797675ff'
            }
        )
    );
};

export const registerComedorTemplates = (diagram, $) => {
    diagram.nodeTemplateMap.add('DiningTable', createDiningTableTemplate($));
    diagram.nodeTemplateMap.add('RoundDiningTable', createRoundDiningTableTemplate($));
    diagram.nodeTemplateMap.add('DiningChair', createDiningChairTemplate($));
    diagram.nodeTemplateMap.add('Armchair', createArmchairTemplate($));
    diagram.nodeTemplateMap.add('UpholsteredChair', createUpholsteredChairTemplate($));
    diagram.nodeTemplateMap.add('DiningBench', createDiningBenchTemplate($));
    diagram.nodeTemplateMap.add('HeadChair', createHeadChairTemplate($));
    diagram.nodeTemplateMap.add('Buffet', createBuffetTemplate($));
    diagram.nodeTemplateMap.add('Sideboard', createSideboardTemplate($));
    diagram.nodeTemplateMap.add('ChinaCabinet', createChinaCabinetTemplate($));
    diagram.nodeTemplateMap.add('DisplayCabinet', createDisplayCabinetTemplate($));
    diagram.nodeTemplateMap.add('DrawerUnit', createDrawerUnitTemplate($));
    diagram.nodeTemplateMap.add('Bar', createBarTemplate($));
    diagram.nodeTemplateMap.add('ServingCart', createServingCartTemplate($));
    diagram.nodeTemplateMap.add('DiningRug', createDiningRugTemplate($));
};

export const comedorObjects = [
    { category: 'DiningTable', name: 'Mesa 4 Personas', label: 'Mesa', width: 90, height: 90, preview: '🍽️' },
    { category: 'DiningTable', name: 'Mesa 6 Personas', label: 'Mesa', width: 160, height: 90, preview: '🍽️' },
    { category: 'DiningTable', name: 'Mesa 8 Personas', label: 'Mesa', width: 200, height: 100, preview: '🍽️' },
    { category: 'DiningTable', name: 'Mesa 10 Personas', label: 'Mesa', width: 240, height: 100, preview: '🍽️' },
    { category: 'RoundDiningTable', name: 'Mesa Redonda 4 Personas', label: 'Mesa', width: 100, preview: '⭕' },
    { category: 'RoundDiningTable', name: 'Mesa Redonda 6 Personas', label: 'Mesa', width: 130, preview: '⭕' },
    { category: 'DiningTable', name: 'Mesa Extensible', label: 'Mesa', width: 140, height: 90, preview: '📏' },
    { category: 'DiningTable', name: 'Mesa Auxiliar', label: 'Auxiliar', width: 60, height: 60, preview: '◽' },
    
    { category: 'DiningChair', name: 'Silla Comedor', label: 'Silla', width: 55, height: 60, preview: '🪑' },
    { category: 'Armchair', name: 'Silla con Brazos', label: 'Silla', preview: '🪑' },
    { category: 'UpholsteredChair', name: 'Silla Tapizada', label: 'Silla', preview: '💺' },
    { category: 'DiningBench', name: 'Banco Comedor', label: 'Banco', preview: '🪑' },
    { category: 'HeadChair', name: 'Silla Cabecera', label: 'Cabecera', preview: '👑' },
    
    { category: 'Buffet', name: 'Buffet', label: 'Buffet', width: 160, height: 30, preview: '🗄️' },
    { category: 'Sideboard', name: 'Aparador', label: 'Aparador', width: 100, height: 40, preview: '🗃️' },
    { category: 'ChinaCabinet', name: 'Vitrina', label: 'Vitrina', width: 40, height: 180, preview: '🪟' },
    { category: 'DisplayCabinet', name: 'Cristalera', label: 'Cristalera', width: 50, height: 180, preview: '🏛️' },
    { category: 'Bar', name: 'Barra de Bar', label: 'Bar', preview: '🍷' },
    { category: 'ServingCart', name: 'Carro Camarero', label: 'Carro', preview: '🛒' },
    
    { category: 'DiningRug', name: 'Alfombra Comedor', label: 'Alfombra', preview: '🟥' }
];

export const comedorPanelTitle = 'Comedor';