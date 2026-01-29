// FurnitureTemplate.js
import * as go from 'gojs';

// ============================================
// TEMPLATES ARQUITECTÓNICOS 2D SIMPLIFICADOS
// Vista de planta profesional
// ============================================

// SOFÁ - Vista desde arriba simplificada
export const createSofaTemplate = ($) => {
    return $(go.Node, 'Auto',
        { 
            locationSpot: go.Spot.Center, 
            rotatable: true,
            selectionAdorned: true
        },
        new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
        new go.Binding('angle', 'angle').makeTwoWay(),
        
        // Panel principal
        $(go.Panel, 'Spot',
            // Fondo/asiento principal
            $(go.Shape, 'Rectangle',
                { 
                    strokeWidth: 2,
                    stroke: '#8B6F47',
                    fill: '#D4A574'
                },
                new go.Binding('width', 'width'),
                new go.Binding('height', 'height')
            ),
            
            // Respaldo (rectángulo más oscuro arriba)
            $(go.Shape, 'Rectangle',
                { 
                    strokeWidth: 0,
                    fill: '#8B6F47',
                    alignment: new go.Spot(0.5, 0, 0, 8)
                },
                new go.Binding('width', 'width', w => w - 10),
                new go.Binding('height', '', () => 12)
            ),
            
            // Líneas divisorias de cojines
            $(go.Panel, 'Horizontal',
                { 
                    alignment: go.Spot.Center,
                    itemTemplate: $(go.Panel,
                        $(go.Shape, 'LineV',
                            { 
                                strokeWidth: 1, 
                                stroke: '#8B6F47'
                            },
                            new go.Binding('height', '', () => 40)
                        )
                    )
                },
                new go.Binding('itemArray', 'width', w => {
                    const sections = Math.max(1, Math.floor(w / 60));
                    return Array(sections - 1).fill(0);
                })
            )
        )
    );
};

// MESA - Vista desde arriba
export const createTableTemplate = ($) => {
    return $(go.Node, 'Auto',
        { 
            locationSpot: go.Spot.Center, 
            rotatable: true,
        },
        new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
        new go.Binding('angle', 'angle').makeTwoWay(),
        
        // Determinar forma según dimensiones
        $(go.Shape,
            { 
                strokeWidth: 2,
                stroke: '#8B6F47',
                fill: '#E5C29F'
            },
            new go.Binding('figure', '', data => {
                // Si es cuadrada o casi cuadrada, usar círculo
                if (data.width && data.height) {
                    const ratio = data.width / data.height;
                    return (ratio > 0.9 && ratio < 1.1) ? 'Ellipse' : 'RoundedRectangle';
                }
                return 'RoundedRectangle';
            }),
            new go.Binding('width', 'width'),
            new go.Binding('height', 'height'),
            new go.Binding('parameter1', '', () => 10)
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

// INODORO (TOILET) - Vista desde arriba
export const createToiletTemplate = ($) => {
    return $(go.Node, 'Spot',
        { 
            locationSpot: go.Spot.Center, 
            rotatable: true,
        },
        new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
        new go.Binding('angle', 'angle').makeTwoWay(),
        
        // Base ovalada
        $(go.Shape, 'Ellipse',
            { 
                strokeWidth: 2,
                stroke: '#666',
                fill: '#FFF'
            },
            new go.Binding('width', 'width'),
            new go.Binding('height', 'height')
        ),
        
        // Tapa interior
        $(go.Shape, 'Ellipse',
            { 
                strokeWidth: 1,
                stroke: '#999',
                fill: '#F5F5F5'
            },
            new go.Binding('width', 'width', w => w * 0.5),
            new go.Binding('height', 'height', h => h * 0.5)
        )
    );
};

// LAVABO/SINK - Vista desde arriba
export const createSinkTemplate = ($) => {
    return $(go.Node, 'Spot',
        { 
            locationSpot: go.Spot.Center, 
            rotatable: true,
        },
        new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
        new go.Binding('angle', 'angle').makeTwoWay(),
        
        // Encimera
        $(go.Shape, 'RoundedRectangle',
            { 
                strokeWidth: 2,
                stroke: '#666',
                fill: '#D4A574',
                parameter1: 5
            },
            new go.Binding('width', 'width'),
            new go.Binding('height', 'height')
        ),
        
        // Lavabo (óvalo blanco)
        $(go.Shape, 'Ellipse',
            { 
                strokeWidth: 2,
                stroke: '#999',
                fill: '#FFF'
            },
            new go.Binding('width', 'width', w => w * 0.6),
            new go.Binding('height', 'height', h => h * 0.6)
        )
    );
};

// BAÑERA (BATHTUB) - Vista desde arriba
export const createBathtubTemplate = ($) => {
    return $(go.Node, 'Auto',
        { 
            locationSpot: go.Spot.Center, 
            rotatable: true,
        },
        new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
        new go.Binding('angle', 'angle').makeTwoWay(),
        
        $(go.Shape, 'RoundedRectangle',
            { 
                strokeWidth: 3,
                stroke: '#666',
                fill: '#FFF',
                parameter1: 10
            },
            new go.Binding('width', 'width'),
            new go.Binding('height', 'height')
        )
    );
};

// REFRIGERADOR - Vista desde arriba
export const createFridgeTemplate = ($) => {
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
                    stroke: '#666',
                    fill: '#E8E8E8'
                },
                new go.Binding('width', 'width'),
                new go.Binding('height', 'height')
            ),
            
            // Línea divisoria
            $(go.Shape, 'LineH',
                { 
                    strokeWidth: 2,
                    stroke: '#999',
                    alignment: new go.Spot(0.5, 0.35)
                },
                new go.Binding('width', 'width', w => w - 10)
            )
        )
    );
};

// ESTUFA/STOVE - Vista desde arriba
export const createStoveTemplate = ($) => {
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
                    stroke: '#333',
                    fill: '#555'
                },
                new go.Binding('width', 'width'),
                new go.Binding('height', 'height')
            ),
            
            // Hornillas (4 círculos)
            $(go.Panel, 'Table',
                {
                    defaultRowSeparatorStrokeWidth: 0,
                    defaultColumnSeparatorStrokeWidth: 0
                },
                $(go.Shape, 'Circle', 
                    { row: 0, column: 0, width: 15, height: 15, fill: '#333', stroke: '#666', strokeWidth: 2, margin: 8 }
                ),
                $(go.Shape, 'Circle', 
                    { row: 0, column: 1, width: 15, height: 15, fill: '#333', stroke: '#666', strokeWidth: 2, margin: 8 }
                ),
                $(go.Shape, 'Circle', 
                    { row: 1, column: 0, width: 15, height: 15, fill: '#333', stroke: '#666', strokeWidth: 2, margin: 8 }
                ),
                $(go.Shape, 'Circle', 
                    { row: 1, column: 1, width: 15, height: 15, fill: '#333', stroke: '#666', strokeWidth: 2, margin: 8 }
                )
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

// TV - Vista desde arriba
export const createTVTemplate = ($) => {
    return $(go.Node, 'Auto',
        { 
            locationSpot: go.Spot.Center, 
            rotatable: true,
        },
        new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
        new go.Binding('angle', 'angle').makeTwoWay(),
        
        $(go.Shape, 'Rectangle',
            { 
                strokeWidth: 2,
                stroke: '#000',
                fill: '#333'
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

// Template GENÉRICO para muebles sin diseño específico
export const createFurnitureTemplate = ($) => {
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
                fill: '#D4A574',
                parameter1: 5
            },
            new go.Binding('width', 'width'),
            new go.Binding('height', 'height')
        )
    );
};