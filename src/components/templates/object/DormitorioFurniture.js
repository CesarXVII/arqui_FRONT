// DormitorioFurniture.js
// Muebles y objetos para el dormitorio en vista de planta (desde arriba)
import * as go from 'gojs';

// ============================================
// ESCALA GLOBAL
// ============================================
export const SCALE = 0.4

// ============================================
// VARIABLES DE TAMAÑO BASE (sin escala)
// ============================================

// Camas
export const BED_SINGLE_WIDTH = 80;
export const BED_SINGLE_HEIGHT = 140;
export const BED_DOUBLE_WIDTH = 120;
export const BED_DOUBLE_HEIGHT = 140;
export const BED_QUEEN_WIDTH = 140;
export const BED_QUEEN_HEIGHT = 150;
export const BED_KING_WIDTH = 160;
export const BED_KING_HEIGHT = 160;

// Mesas de noche
export const NIGHTSTAND_SMALL_WIDTH = 45;
export const NIGHTSTAND_SMALL_HEIGHT = 40;
export const NIGHTSTAND_MEDIUM_WIDTH = 50;
export const NIGHTSTAND_MEDIUM_HEIGHT = 50;

// Armarios y cómodas
export const WARDROBE_2_WIDTH = 100;
export const WARDROBE_2_HEIGHT = 60;
export const WARDROBE_3_WIDTH = 150;
export const WARDROBE_3_HEIGHT = 60;
export const CABINET_WIDTH = 90;
export const CABINET_HEIGHT = 50;

// Sillas
export const CHAIR_DESK_WIDTH = 45;
export const CHAIR_DESK_HEIGHT = 50;
export const CHAIR_POLTRONA_WIDTH = 70;
export const CHAIR_POLTRONA_HEIGHT = 80;

// Escritorios y tocadores
export const DESK_SMALL_WIDTH = 100;
export const DESK_SMALL_HEIGHT = 50;
export const DESK_LARGE_WIDTH = 140;
export const DESK_LARGE_HEIGHT = 60;
export const TOCADOR_WIDTH = 110;
export const TOCADOR_HEIGHT = 50;

// Iluminación
export const LAMP_NIGHT_WIDTH = 25;
export const LAMP_NIGHT_HEIGHT = 25;

// Decoración
export const PLANT_DECOR_WIDTH = 25;
export const PLANT_DECOR_HEIGHT = 25;


// ============================================
// TEMPLATES ESPECÍFICOS DEL DORMITORIO
// ============================================

// CAMA - Vista desde arriba con cabecera
export const createBedTemplate = ($) => {
    return $(go.Node, 'Vertical',
        { 
            locationSpot: go.Spot.Center, 
            rotatable: true,
        },
        new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
        new go.Binding('angle', 'angle').makeTwoWay(),
        
        // Cabecera (rectángulo marrón)
        $(go.Shape, 'Rectangle',
            { 
                strokeWidth: 2,
                stroke: '#6B4423',
                fill: '#8B6F47'
            },
            new go.Binding('width', 'width'),
            new go.Binding('height', '', () => 12)
        ),
        
        // Colchón principal
        $(go.Shape, 'Rectangle',
            { 
                strokeWidth: 2,
                stroke: '#8B6F47',
                fill: '#F5F5DC'
            },
            new go.Binding('width', 'width'),
            new go.Binding('height', 'height')
        )
    );
};

// ARMARIO/WARDROBE - Vista desde arriba
export const createWardrobeTemplate = ($) => {
    return $(go.Node, 'Auto',
        { 
            locationSpot: go.Spot.Center, 
            rotatable: true,
        },
        new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
        new go.Binding('angle', 'angle').makeTwoWay(),
        
        $(go.Panel, 'Spot',
            // Cuerpo principal
            $(go.Shape, 'Rectangle',
                { 
                    strokeWidth: 2,
                    stroke: '#6B4423',
                    fill: '#A0826D'
                },
                new go.Binding('width', 'width'),
                new go.Binding('height', 'height')
            ),
            
            // Línea divisoria de puertas
            $(go.Shape, 'LineV',
                { 
                    strokeWidth: 2,
                    stroke: '#6B4423'
                },
                new go.Binding('height', 'height', h => h - 8)
            )
        )
    );
};

// ESCRITORIO/DESK - Vista desde arriba
export const createDeskTemplate = ($) => {
    return $(go.Node, 'Auto',
        { 
            locationSpot: go.Spot.Center, 
            rotatable: true,
        },
        new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
        new go.Binding('angle', 'angle').makeTwoWay(),
        
        $(go.Panel, 'Spot',
            $(go.Shape, 'Rectangle',
                { 
                    strokeWidth: 2,
                    stroke: '#8B6F47',
                    fill: '#D4A574'
                },
                new go.Binding('width', 'width'),
                new go.Binding('height', 'height')
            ),
            
            // Sección de cajones (rectángulo más oscuro)
            $(go.Shape, 'Rectangle',
                { 
                    width: 20,
                    strokeWidth: 1,
                    stroke: '#6B4423',
                    fill: '#A0826D',
                    alignment: new go.Spot(1, 0.5, -10, 0)
                },
                new go.Binding('height', 'height', h => h - 10)
            )
        )
    );
};

// SILLA - Vista desde arriba simplificada
export const createChairTemplate = ($) => {
    return $(go.Node, 'Spot',
        { 
            locationSpot: go.Spot.Center, 
            rotatable: true,
        },
        new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
        new go.Binding('angle', 'angle').makeTwoWay(),
        
        // Asiento
        $(go.Shape, 'RoundedRectangle',
            { 
                strokeWidth: 2,
                stroke: '#8B6F47',
                fill: '#D4A574',
                parameter1: 5
            },
            new go.Binding('width', 'width'),
            new go.Binding('height', 'height')
        ),
        
        // Respaldo (barra superior)
        $(go.Shape, 'Rectangle',
            { 
                strokeWidth: 0,
                fill: '#6B4423',
                alignment: new go.Spot(0.5, 0, 0, 3)
            },
            new go.Binding('width', 'width', w => w * 0.7),
            new go.Binding('height', '', () => 6)
        )
    );
};

// MESA DE NOCHE / NIGHTSTAND - Vista desde arriba
export const createNightstandTemplate = ($) => {
    return $(go.Node, 'Auto',
        { 
            locationSpot: go.Spot.Center, 
            rotatable: true,
        },
        new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
        new go.Binding('angle', 'angle').makeTwoWay(),
        
        $(go.Panel, 'Spot',
            $(go.Shape, 'RoundedRectangle',
                { 
                    strokeWidth: 2,
                    stroke: '#8B6F47',
                    fill: '#D4A574',
                    parameter1: 5
                },
                new go.Binding('width', 'width'),
                new go.Binding('height', 'height')
            ),
            
            // Manija del cajón
            $(go.Shape, 'Circle',
                { 
                    width: 8,
                    height: 8,
                    strokeWidth: 1,
                    stroke: '#6B4423',
                    fill: '#8B6F47'
                }
            )
        )
    );
};

// CÓMODA / CABINET - Vista desde arriba
export const createCabinetTemplate = ($) => {
    return $(go.Node, 'Auto',
        { 
            locationSpot: go.Spot.Center, 
            rotatable: true,
        },
        new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
        new go.Binding('angle', 'angle').makeTwoWay(),
        
        $(go.Panel, 'Spot',
            $(go.Shape, 'Rectangle',
                { 
                    strokeWidth: 2,
                    stroke: '#8B6F47',
                    fill: '#D4A574'
                },
                new go.Binding('width', 'width'),
                new go.Binding('height', 'height')
            ),
            
            // Líneas horizontales de cajones
            $(go.Panel, 'Vertical',
                { 
                    alignment: go.Spot.Center,
                    itemTemplate: $(go.Panel,
                        $(go.Shape, 'LineH',
                            { 
                                strokeWidth: 1, 
                                stroke: '#8B6F47'
                            },
                            new go.Binding('width', '', () => 70)
                        )
                    )
                },
                new go.Binding('itemArray', 'height', h => {
                    const sections = Math.max(2, Math.floor(h / 20));
                    return Array(sections - 1).fill(0);
                })
            )
        )
    );
};

// MESA / TABLE (TOCADOR) - Vista desde arriba
export const createTableTemplate = ($) => {
    return $(go.Node, 'Auto',
        { 
            locationSpot: go.Spot.Center, 
            rotatable: true,
        },
        new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
        new go.Binding('angle', 'angle').makeTwoWay(),
        
        $(go.Shape, 'RoundedRectangle',
            { 
                strokeWidth: 2,
                stroke: '#8B6F47',
                fill: '#E5C29F',
                parameter1: 10
            },
            new go.Binding('width', 'width'),
            new go.Binding('height', 'height')
        )
    );
};

// LÁMPARA - Vista desde arriba
export const createLampTemplate = ($) => {
    return $(go.Node, 'Auto',
        { 
            locationSpot: go.Spot.Center, 
            rotatable: true,
        },
        new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
        new go.Binding('angle', 'angle').makeTwoWay(),
        
        $(go.Shape, 'Circle',
            { 
                strokeWidth: 2,
                stroke: '#FFB300',
                fill: '#FFF9C4'
            },
            new go.Binding('width', 'width'),
            new go.Binding('height', 'height')
        )
    );
};

// PLANTA - Vista desde arriba
export const createPlantTemplate = ($) => {
    return $(go.Node, 'Auto',
        { 
            locationSpot: go.Spot.Center, 
            rotatable: true,
        },
        new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
        new go.Binding('angle', 'angle').makeTwoWay(),
        
        $(go.Shape, 'Ellipse',
            { 
                strokeWidth: 2,
                stroke: '#2E7D32',
                fill: '#81C784'
            },
            new go.Binding('width', 'width'),
            new go.Binding('height', 'height')
        )
    );
};


// ============================================
// FUNCIÓN PARA REGISTRAR TODOS LOS TEMPLATES
// ============================================
export const registerDormitorioTemplates = (diagram, $) => {
    diagram.nodeTemplateMap.add('Bed', createBedTemplate($));
    diagram.nodeTemplateMap.add('Wardrobe', createWardrobeTemplate($));
    diagram.nodeTemplateMap.add('Desk', createDeskTemplate($));
    diagram.nodeTemplateMap.add('Chair', createChairTemplate($));
    diagram.nodeTemplateMap.add('Nightstand', createNightstandTemplate($));
    diagram.nodeTemplateMap.add('Cabinet', createCabinetTemplate($));
    diagram.nodeTemplateMap.add('Table', createTableTemplate($));
    diagram.nodeTemplateMap.add('Lamp', createLampTemplate($));
    diagram.nodeTemplateMap.add('Plant', createPlantTemplate($));
};

// ============================================
// OBJETOS DEL DORMITORIO (con escala aplicada)
// ============================================
export const dormitorioObjects = [
    // Camas
    { 
        category: 'Bed', 
        name: 'Cama Individual', 
        label: 'Cama', 
        width: BED_SINGLE_WIDTH * SCALE, 
        height: BED_SINGLE_HEIGHT * SCALE,
        preview: '🛏️'
    },
    { 
        category: 'Bed', 
        name: 'Cama Matrimonial', 
        label: 'Cama', 
        width: BED_DOUBLE_WIDTH * SCALE, 
        height: BED_DOUBLE_HEIGHT * SCALE,
        preview: '🛏️'
    },
    { 
        category: 'Bed', 
        name: 'Cama Queen', 
        label: 'Cama', 
        width: BED_QUEEN_WIDTH * SCALE, 
        height: BED_QUEEN_HEIGHT * SCALE,
        preview: '🛏️'
    },
    { 
        category: 'Bed', 
        name: 'Cama King', 
        label: 'Cama', 
        width: BED_KING_WIDTH * SCALE, 
        height: BED_KING_HEIGHT * SCALE,
        preview: '🛏️'
    },
    
    // Mesas de noche
    { 
        category: 'Nightstand', 
        name: 'Mesa de Noche', 
        label: 'Mesa', 
        width: NIGHTSTAND_SMALL_WIDTH * SCALE, 
        height: NIGHTSTAND_SMALL_HEIGHT * SCALE,
        preview: '🟫'
    },
    { 
        category: 'Nightstand', 
        name: 'Buró', 
        label: 'Buró', 
        width: NIGHTSTAND_MEDIUM_WIDTH * SCALE, 
        height: NIGHTSTAND_MEDIUM_HEIGHT * SCALE,
        preview: '📦'
    },
    
    // Armarios y cómodas
    { 
        category: 'Wardrobe', 
        name: 'Armario 2 Puertas', 
        label: 'Armario', 
        width: WARDROBE_2_WIDTH * SCALE, 
        height: WARDROBE_2_HEIGHT * SCALE,
        preview: '🚪'
    },
    { 
        category: 'Wardrobe', 
        name: 'Armario 3 Puertas', 
        label: 'Armario', 
        width: WARDROBE_3_WIDTH * SCALE, 
        height: WARDROBE_3_HEIGHT * SCALE,
        preview: '🚪'
    },
    { 
        category: 'Cabinet', 
        name: 'Cómoda', 
        label: 'Cómoda', 
        width: CABINET_WIDTH * SCALE, 
        height: CABINET_HEIGHT * SCALE,
        preview: '🗃️'
    },
    
    // Sillas
    { 
        category: 'Chair', 
        name: 'Silla de Escritorio', 
        label: 'Silla', 
        width: CHAIR_DESK_WIDTH * SCALE, 
        height: CHAIR_DESK_HEIGHT * SCALE,
        preview: '🪑'
    },
    { 
        category: 'Chair', 
        name: 'Poltrona', 
        label: 'Poltrona', 
        width: CHAIR_POLTRONA_WIDTH * SCALE, 
        height: CHAIR_POLTRONA_HEIGHT * SCALE,
        preview: '💺'
    },
    
    // Escritorios y tocadores
    { 
        category: 'Desk', 
        name: 'Escritorio Pequeño', 
        label: 'Escritorio', 
        width: DESK_SMALL_WIDTH * SCALE, 
        height: DESK_SMALL_HEIGHT * SCALE,
        preview: '🖥️'
    },
    { 
        category: 'Desk', 
        name: 'Escritorio Grande', 
        label: 'Escritorio', 
        width: DESK_LARGE_WIDTH * SCALE, 
        height: DESK_LARGE_HEIGHT * SCALE,
        preview: '🖥️'
    },
    { 
        category: 'Table', 
        name: 'Tocador', 
        label: 'Tocador', 
        width: TOCADOR_WIDTH * SCALE, 
        height: TOCADOR_HEIGHT * SCALE,
        preview: '💄'
    },
    
    // Iluminación
    { 
        category: 'Lamp', 
        name: 'Lámpara de Noche', 
        label: 'Lámpara', 
        width: LAMP_NIGHT_WIDTH * SCALE, 
        height: LAMP_NIGHT_HEIGHT * SCALE,
        preview: '💡'
    },
    
    // Decoración
    { 
        category: 'Plant', 
        name: 'Planta Decorativa', 
        label: 'Planta', 
        width: PLANT_DECOR_WIDTH * SCALE, 
        height: PLANT_DECOR_HEIGHT * SCALE,
        preview: '🪴'
    },
    
];

export const dormitorioPanelTitle = 'Dormitorio';