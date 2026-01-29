const SCALE_FACTOR = 0.3;

const scaled = (value) => value * SCALE_FACTOR;

export const createDeskTemplate = ($) => {
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
                strokeWidth: 2,
                stroke: '#3E2723'
            },
            new go.Binding('width', 'width', w => scaled(w)),
            new go.Binding('height', 'height', h => scaled(h)),
            new go.Binding('fill', 'color')
        ),
        
        $(go.Shape, 'Rectangle',
            { 
                strokeWidth: 1,
                stroke: '#3E2723',
                fill: 'transparent',
                alignment: new go.Spot(0.25, 0.5)
            },
            new go.Binding('width', 'width', w => scaled(w * 0.35)),
            new go.Binding('height', 'height', h => scaled(h * 0.5))
        ),
        
        $(go.Shape, 'LineV', 
            { 
                strokeWidth: 2, 
                stroke: '#3E2723',
                alignment: new go.Spot(0.5, 0.5)
            },
            new go.Binding('height', 'height', h => scaled(h * 0.8))
        )
    );
};

export const createOfficeChairTemplate = ($) => {
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
                strokeWidth: 2,
                stroke: '#212121',
                parameter1: 8
            },
            new go.Binding('width', 'width', w => scaled(w)),
            new go.Binding('height', 'height', h => scaled(h)),
            new go.Binding('fill', 'color')
        ),
        
        $(go.Shape, 'Circle',
            { 
                width: scaled(12),
                height: scaled(12),
                strokeWidth: 2,
                stroke: '#212121',
                fill: '#616161',
                alignment: go.Spot.Center
            }
        ),
        
        $(go.Shape, 'Rectangle',
            { 
                width: scaled(3),
                height: scaled(15),
                strokeWidth: 0,
                fill: '#424242',
                alignment: new go.Spot(0.5, 0.85)
            }
        ),
        $(go.Shape, 'Rectangle',
            { 
                width: scaled(15),
                height: scaled(3),
                strokeWidth: 0,
                fill: '#424242',
                alignment: new go.Spot(0.5, 0.85)
            }
        ),
        $(go.Shape, 'Circle',
            { 
                width: scaled(4),
                height: scaled(4),
                strokeWidth: 0,
                fill: '#757575',
                alignment: new go.Spot(0.5, 0.95)
            }
        ),
        $(go.Shape, 'Circle',
            { 
                width: scaled(4),
                height: scaled(4),
                strokeWidth: 0,
                fill: '#757575',
                alignment: new go.Spot(0.15, 0.85)
            }
        ),
        $(go.Shape, 'Circle',
            { 
                width: scaled(4),
                height: scaled(4),
                strokeWidth: 0,
                fill: '#757575',
                alignment: new go.Spot(0.85, 0.85)
            }
        ),
        $(go.Shape, 'Circle',
            { 
                width: scaled(4),
                height: scaled(4),
                strokeWidth: 0,
                fill: '#757575',
                alignment: new go.Spot(0.25, 0.7)
            }
        ),
        $(go.Shape, 'Circle',
            { 
                width: scaled(4),
                height: scaled(4),
                strokeWidth: 0,
                fill: '#757575',
                alignment: new go.Spot(0.75, 0.7)
            }
        )
    );
};

export const createExecutiveChairTemplate = ($) => {
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
                strokeWidth: 3,
                stroke: '#212121',
                parameter1: 10
            },
            new go.Binding('width', 'width', w => scaled(w)),
            new go.Binding('height', 'height', h => scaled(h)),
            new go.Binding('fill', 'color')
        ),
        
        $(go.Shape, 'RoundedRectangle',
            { 
                strokeWidth: 2,
                stroke: '#000000',
                parameter1: 6,
                alignment: new go.Spot(0.5, 0.3)
            },
            new go.Binding('width', 'width', w => scaled(w * 0.7)),
            new go.Binding('height', 'height', h => scaled(h * 0.4)),
            new go.Binding('fill', 'color')
        ),
        
        $(go.Shape, 'Circle',
            { 
                width: scaled(15),
                height: scaled(15),
                strokeWidth: 2,
                stroke: '#212121',
                fill: '#616161',
                alignment: new go.Spot(0.5, 0.7)
            }
        ),
        
        $(go.Shape, 'Rectangle',
            { 
                width: scaled(4),
                height: scaled(18),
                strokeWidth: 0,
                fill: '#424242',
                alignment: new go.Spot(0.5, 0.85)
            }
        ),
        $(go.Shape, 'Rectangle',
            { 
                width: scaled(18),
                height: scaled(4),
                strokeWidth: 0,
                fill: '#424242',
                alignment: new go.Spot(0.5, 0.85)
            }
        ),
        $(go.Shape, 'Circle',
            { 
                width: scaled(5),
                height: scaled(5),
                strokeWidth: 0,
                fill: '#757575',
                alignment: new go.Spot(0.5, 0.95)
            }
        ),
        $(go.Shape, 'Circle',
            { 
                width: scaled(5),
                height: scaled(5),
                strokeWidth: 0,
                fill: '#757575',
                alignment: new go.Spot(0.15, 0.85)
            }
        ),
        $(go.Shape, 'Circle',
            { 
                width: scaled(5),
                height: scaled(5),
                strokeWidth: 0,
                fill: '#757575',
                alignment: new go.Spot(0.85, 0.85)
            }
        ),
        $(go.Shape, 'Circle',
            { 
                width: scaled(5),
                height: scaled(5),
                strokeWidth: 0,
                fill: '#757575',
                alignment: new go.Spot(0.2, 0.7)
            }
        ),
        $(go.Shape, 'Circle',
            { 
                width: scaled(5),
                height: scaled(5),
                strokeWidth: 0,
                fill: '#757575',
                alignment: new go.Spot(0.8, 0.7)
            }
        )
    );
};

export const createVisitorChairTemplate = ($) => {
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
                strokeWidth: 2,
                stroke: '#3E2723',
                parameter1: 6
            },
            new go.Binding('width', 'width', w => scaled(w)),
            new go.Binding('height', 'height', h => scaled(h)),
            new go.Binding('fill', 'color')
        ),
        
        $(go.Shape, 'Rectangle',
            { 
                strokeWidth: 0,
                fill: '#3E2723',
                alignment: new go.Spot(0.5, 0.15)
            },
            new go.Binding('width', 'width', w => scaled(w * 0.8)),
            new go.Binding('height', 'height', h => scaled(h * 0.15))
        ),
        
        $(go.Shape, 'Rectangle',
            { 
                width: scaled(6),
                strokeWidth: 0,
                fill: '#3E2723',
                alignment: new go.Spot(0.1, 0.5)
            },
            new go.Binding('height', 'height', h => scaled(h * 0.7))
        ),
        $(go.Shape, 'Rectangle',
            { 
                width: scaled(6),
                strokeWidth: 0,
                fill: '#3E2723',
                alignment: new go.Spot(0.9, 0.5)
            },
            new go.Binding('height', 'height', h => scaled(h * 0.7))
        )
    );
};

export const createOfficeSofaTemplate = ($) => {
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
                strokeWidth: 2,
                stroke: '#3E2723',
                parameter1: 8
            },
            new go.Binding('width', 'width', w => scaled(w)),
            new go.Binding('height', 'height', h => scaled(h)),
            new go.Binding('fill', 'color')
        ),
        
        $(go.Shape, 'RoundedRectangle',
            { 
                strokeWidth: 1,
                stroke: '#3E2723',
                parameter1: 5,
                alignment: new go.Spot(0.5, 0.5)
            },
            new go.Binding('width', 'width', w => scaled(w * 0.8)),
            new go.Binding('height', 'height', h => scaled(h * 0.6)),
            new go.Binding('fill', 'color')
        ),
        
        $(go.Shape, 'Rectangle',
            { 
                strokeWidth: 0,
                fill: '#4E342E',
                alignment: new go.Spot(0.5, 0.15)
            },
            new go.Binding('width', 'width', w => scaled(w * 0.7)),
            new go.Binding('height', 'height', h => scaled(h * 0.15))
        ),
        
        $(go.Shape, 'RoundedRectangle',
            { 
                width: scaled(12),
                strokeWidth: 0,
                fill: '#4E342E',
                parameter1: 3,
                alignment: new go.Spot(0.12, 0.5)
            },
            new go.Binding('height', 'height', h => scaled(h * 0.5))
        ),
        $(go.Shape, 'RoundedRectangle',
            { 
                width: scaled(12),
                strokeWidth: 0,
                fill: '#4E342E',
                parameter1: 3,
                alignment: new go.Spot(0.88, 0.5)
            },
            new go.Binding('height', 'height', h => scaled(h * 0.5))
        )
    );
};

export const createMeetingTableTemplate = ($) => {
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
                strokeWidth: 2,
                stroke: '#3E2723',
                parameter1: 10
            },
            new go.Binding('width', 'width', w => scaled(w)),
            new go.Binding('height', 'height', h => scaled(h)),
            new go.Binding('fill', 'color')
        )
    );
};

export const createRoundMeetingTableTemplate = ($) => {
    return $(go.Node, 'Auto',
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
                strokeWidth: 2,
                stroke: '#3E2723'
            },
            new go.Binding('width', 'width', w => scaled(w)),
            new go.Binding('height', 'width', w => scaled(w)),
            new go.Binding('fill', 'color')
        )
    );
};

export const createFilingCabinetTemplate = ($) => {
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
                strokeWidth: 2,
                stroke: '#424242'
            },
            new go.Binding('width', 'width', w => scaled(w)),
            new go.Binding('height', 'height', h => scaled(h)),
            new go.Binding('fill', 'color')
        ),
        
        $(go.Shape, 'LineV',
            { 
                strokeWidth: 2,
                stroke: '#212121',
                alignment: new go.Spot(0.5, 0.5)
            },
            new go.Binding('height', 'height', h => scaled(h * 0.85))
        ),
        
        $(go.Shape, 'Circle',
            { 
                width: scaled(6),
                height: scaled(6),
                strokeWidth: 0,
                fill: '#C0C0C0',
                alignment: new go.Spot(0.5, 0.3)
            }
        ),
        $(go.Shape, 'Circle',
            { 
                width: scaled(6),
                height: scaled(6),
                strokeWidth: 0,
                fill: '#C0C0C0',
                alignment: new go.Spot(0.5, 0.7)
            }
        )
    );
};

export const createBookshelfTemplate = ($) => {
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
                strokeWidth: 2,
                stroke: '#3E2723'
            },
            new go.Binding('width', 'width', w => scaled(w)),
            new go.Binding('height', 'height', h => scaled(h)),
            new go.Binding('fill', 'color')
        ),
        
        $(go.Shape, 'Rectangle',
            { 
                strokeWidth: 1,
                stroke: '#3E2723',
                fill: 'transparent',
                alignment: go.Spot.Center
            },
            new go.Binding('width', 'width', w => scaled(w * 0.85)),
            new go.Binding('height', 'height', h => scaled(h * 0.85))
        ),
        
        $(go.Shape, 'LineV',
            { 
                strokeWidth: 2,
                stroke: '#3E2723',
                alignment: new go.Spot(0.33, 0.5)
            },
            new go.Binding('height', 'height', h => scaled(h * 0.85))
        ),
        $(go.Shape, 'LineV',
            { 
                strokeWidth: 2,
                stroke: '#3E2723',
                alignment: new go.Spot(0.67, 0.5)
            },
            new go.Binding('height', 'height', h => scaled(h * 0.85))
        )
    );
};

export const createCredenzaTemplate = ($) => {
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
                strokeWidth: 2,
                stroke: '#3E2723'
            },
            new go.Binding('width', 'width', w => scaled(w)),
            new go.Binding('height', 'height', h => scaled(h)),
            new go.Binding('fill', 'color')
        ),
        
        $(go.Shape, 'LineV',
            { 
                strokeWidth: 2,
                stroke: '#3E2723',
                alignment: new go.Spot(0.33, 0.5)
            },
            new go.Binding('height', 'height', h => scaled(h * 0.8))
        ),
        $(go.Shape, 'LineV',
            { 
                strokeWidth: 2,
                stroke: '#3E2723',
                alignment: new go.Spot(0.67, 0.5)
            },
            new go.Binding('height', 'height', h => scaled(h * 0.8))
        ),
        
        $(go.Shape, 'Circle',
            { 
                width: scaled(5),
                height: scaled(5),
                strokeWidth: 0,
                fill: '#C0C0C0',
                alignment: new go.Spot(0.17, 0.5)
            }
        ),
        $(go.Shape, 'Circle',
            { 
                width: scaled(5),
                height: scaled(5),
                strokeWidth: 0,
                fill: '#C0C0C0',
                alignment: new go.Spot(0.5, 0.5)
            }
        ),
        $(go.Shape, 'Circle',
            { 
                width: scaled(5),
                height: scaled(5),
                strokeWidth: 0,
                fill: '#C0C0C0',
                alignment: new go.Spot(0.83, 0.5)
            }
        )
    );
};

export const createPrinterTemplate = ($) => {
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
                strokeWidth: 2,
                stroke: '#212121'
            },
            new go.Binding('width', 'width', w => scaled(w)),
            new go.Binding('height', 'height', h => scaled(h)),
            new go.Binding('fill', 'color')
        ),
        
        $(go.Shape, 'Rectangle',
            { 
                strokeWidth: 1,
                stroke: '#212121',
                fill: '#616161',
                alignment: new go.Spot(0.5, 0.3)
            },
            new go.Binding('width', 'width', w => scaled(w * 0.6)),
            new go.Binding('height', 'height', h => scaled(h * 0.4))
        ),
        
        $(go.Shape, 'Circle',
            { 
                width: scaled(6),
                height: scaled(6),
                strokeWidth: 0,
                fill: '#4CAF50',
                alignment: new go.Spot(0.2, 0.75)
            }
        ),
        $(go.Shape, 'Circle',
            { 
                width: scaled(6),
                height: scaled(6),
                strokeWidth: 0,
                fill: '#F44336',
                alignment: new go.Spot(0.35, 0.75)
            }
        )
    );
};

export const createWhiteboardTemplate = ($) => {
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
                strokeWidth: 3,
                stroke: '#424242',
                fill: '#FFFFFF'
            },
            new go.Binding('width', 'width', w => scaled(w)),
            new go.Binding('height', 'height', h => scaled(h))
        ),
        
        $(go.Shape, 'Rectangle',
            { 
                strokeWidth: 0,
                fill: '#757575',
                alignment: new go.Spot(0.5, 0.95)
            },
            new go.Binding('width', 'width', w => scaled(w * 0.15)),
            new go.Binding('height', 'height', h => scaled(h * 0.08))
        )
    );
};

export const createMonitorTemplate = ($) => {
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
                strokeWidth: 3,
                stroke: '#212121',
                fill: '#424242'
            },
            new go.Binding('width', 'width', w => scaled(w)),
            new go.Binding('height', 'height', h => scaled(h))
        ),
        
        $(go.Shape, 'Rectangle',
            { 
                strokeWidth: 2,
                stroke: '#616161',
                fill: '#263238',
                alignment: go.Spot.Center
            },
            new go.Binding('width', 'width', w => scaled(w * 0.85)),
            new go.Binding('height', 'height', h => scaled(h * 0.85))
        ),
        
        $(go.Shape, 'RoundedRectangle',
            { 
                strokeWidth: 0,
                fill: '#546E7A',
                parameter1: 3,
                alignment: new go.Spot(0.5, 0.92)
            },
            new go.Binding('width', 'width', w => scaled(w * 0.3)),
            new go.Binding('height', 'height', h => scaled(h * 0.12))
        )
    );
};

export const createSimpleFurnitureTemplate = ($) => {
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
                strokeWidth: 2,
                stroke: '#424242'
            },
            new go.Binding('width', 'width', w => scaled(w)),
            new go.Binding('height', 'height', h => scaled(h)),
            new go.Binding('fill', 'color')
        )
    );
};

export const registerOficinaTemplates = (diagram, $) => {
    diagram.nodeTemplateMap.add('Desk', createDeskTemplate($));
    diagram.nodeTemplateMap.add('OfficeChair', createOfficeChairTemplate($));
    diagram.nodeTemplateMap.add('ExecutiveChair', createExecutiveChairTemplate($));
    diagram.nodeTemplateMap.add('VisitorChair', createVisitorChairTemplate($));
    diagram.nodeTemplateMap.add('Sofa', createOfficeSofaTemplate($));
    diagram.nodeTemplateMap.add('Table', createMeetingTableTemplate($));
    diagram.nodeTemplateMap.add('RoundTable', createRoundMeetingTableTemplate($));
    diagram.nodeTemplateMap.add('FilingCabinet', createFilingCabinetTemplate($));
    diagram.nodeTemplateMap.add('Bookshelf', createBookshelfTemplate($));
    diagram.nodeTemplateMap.add('Credenza', createCredenzaTemplate($));
    diagram.nodeTemplateMap.add('Printer', createPrinterTemplate($));
    diagram.nodeTemplateMap.add('Whiteboard', createWhiteboardTemplate($));
    diagram.nodeTemplateMap.add('Monitor', createMonitorTemplate($));
    diagram.nodeTemplateMap.add('SimpleFurniture', createSimpleFurnitureTemplate($));
};

export const oficinaObjects = [
    { category: 'Desk', name: 'Escritorio Ejecutivo', label: 'Escritorio', width: 160, height: 80, color: '#4E342E', preview: '🖥️' },
    { category: 'Desk', name: 'Escritorio Estándar', label: 'Escritorio', width: 120, height: 60, color: '#6D4C41', preview: '🖥️' },
    { category: 'Desk', name: 'Escritorio en L', label: 'Escritorio L', width: 120, height: 100, color: '#5D4037', preview: '🖥️' },
    { category: 'Desk', name: 'Escritorio en U', label: 'Escritorio U', width: 150, height: 100, color: '#4E342E', preview: '🖥️' },
    { category: 'Desk', name: 'Mesa de Trabajo', label: 'Mesa', width: 140, height: 70, color: '#8D6E63', preview: '📋' },
    { category: 'Desk', name: 'Escritorio de Pie', label: 'Escritorio', width: 120, height: 60, color: '#546E7A', preview: '⬆️' },
    { category: 'SimpleFurniture', name: 'Mesa Auxiliar', label: 'Auxiliar', width: 80, height: 50, color: '#6D4C41', preview: '📦' },
    
    { category: 'ExecutiveChair', name: 'Silla Ejecutiva', label: 'Ejecutiva', width: 60, height: 60, color: '#212121', preview: '💺' },
    { category: 'OfficeChair', name: 'Silla de Oficina', label: 'Silla', width: 50, height: 55, color: '#424242', preview: '🪑' },
    { category: 'OfficeChair', name: 'Silla Ergonómica', label: 'Ergonómica', width: 55, height: 60, color: '#546E7A', preview: '💺' },
    { category: 'VisitorChair', name: 'Silla Visitante', label: 'Visitante', width: 45, height: 50, color: '#6D4C41', preview: '🪑' },
    { category: 'Sofa', name: 'Sofá Oficina 2 Plazas', label: 'Sofá', width: 120, height: 70, color: '#5D4037', preview: '🛋️' },
    { category: 'Sofa', name: 'Sofá Oficina 3 Plazas', label: 'Sofá', width: 180, height: 70, color: '#6D4C41', preview: '🛋️' },
    { category: 'FilingCabinet', name: 'Archivador 2 Cajones', label: 'Archivador', width: 50, height: 60, color: '#616161', preview: '🗄️' },
    { category: 'FilingCabinet', name: 'Archivador 4 Cajones', label: 'Archivador', width: 50, height: 120, color: '#546E7A', preview: '🗄️' },
    { category: 'Bookshelf', name: 'Librero', label: 'Librero', width: 90, height: 180, color: '#5D4037', preview: '📚' },
    { category: 'Bookshelf', name: 'Estantería Abierta', label: 'Estante', width: 100, height: 200, color: '#6D4C41', preview: '📖' },
    { category: 'Credenza', name: 'Credenza', label: 'Credenza', width: 160, height: 70, color: '#4E342E', preview: '🗃️' },
    { category: 'FilingCabinet', name: 'Cajonera Móvil', label: 'Cajonera', width: 40, height: 50, color: '#78909C', preview: '📦' },
    { category: 'SimpleFurniture', name: 'Armario Alto', label: 'Armario', width: 80, height: 180, color: '#546E7A', preview: '🚪' },
    { category: 'SimpleFurniture', name: 'Módulo de Almacenaje', label: 'Módulo', width: 80, height: 100, color: '#607D8B', preview: '📦' },
    
    { category: 'Table', name: 'Mesa Reunión 4 Personas', label: 'Reunión', width: 120, height: 80, color: '#6D4C41', preview: '👥' },
    { category: 'Table', name: 'Mesa Reunión 6 Personas', label: 'Reunión', width: 180, height: 100, color: '#5D4037', preview: '👥' },
    { category: 'Table', name: 'Mesa Reunión 8 Personas', label: 'Reunión', width: 240, height: 100, color: '#4E342E', preview: '👥' },
    { category: 'RoundTable', name: 'Mesa Redonda Reunión', label: 'Reunión', width: 120, color: '#6D4C41', preview: '⭕' },
    { category: 'Table', name: 'Mesa Conferencia', label: 'Conferencia', width: 300, height: 120, color: '#3E2723', preview: '🏛️' },
    
    { category: 'Printer', name: 'Impresora', label: 'Impresora', width: 50, height: 40, color: '#424242', preview: '🖨️' },
    { category: 'Printer', name: 'Fotocopiadora', label: 'Fotocopiadora', width: 60, height: 50, color: '#616161', preview: '📠' },
    { category: 'SimpleFurniture', name: 'Trituradora', label: 'Trituradora', width: 30, height: 40, color: '#546E7A', preview: '🗑️' },
    
    { category: 'Whiteboard', name: 'Pizarra Blanca', label: 'Pizarra', width: 150, height: 30, color: '#FFFFFF', preview: '⬜' },
    { category: 'Whiteboard', name: 'Pantalla Proyector', label: 'Pantalla', width: 150, height: 40, color: '#ECEFF1', preview: '📽️' },
    { category: 'Monitor', name: 'Monitor Grande', label: 'Monitor', width: 100, height: 30, color: '#212121', preview: '🖥️' },
    { category: 'SimpleFurniture', name: 'Atril', label: 'Atril', width: 40, height: 100, color: '#546E7A', preview: '📖' },
    { category: 'SimpleFurniture', name: 'Perchero', label: 'Perchero', width: 55, height: 55, color: '#5D4037', preview: '🧥' },
    { category: 'SimpleFurniture', name: 'Cesto Papeles', label: 'Basura', width: 35, height: 40, color: '#616161', preview: '🗑️' }
];

export const oficinaPanelTitle = 'Oficina';