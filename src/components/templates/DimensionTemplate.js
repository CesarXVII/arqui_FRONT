// DimensionTemplate.js - Sistema completo de Dimensionar
import * as go from 'gojs';
import { CORTES_GLOBAL_SCALE } from './dimensionarData'; // ✅ Importar escala global

// =============================================
// SECCIÓN 1: CORTES
// =============================================

// Línea de corte con flechas (sin texto, solo redimensionable horizontalmente)
export const createCutLineTemplate = ($) => {
    return $(go.Node, 'Horizontal',
        {
            locationSpot: go.Spot.Center,
            selectionAdorned: true,
            resizable: true,
            resizeObjectName: 'CENTERLINE',
            rotatable: true,
            // Solo permite redimensionar horizontalmente
            resizeAdornmentTemplate:
                $(go.Adornment, 'Spot',
                    $(go.Placeholder),
                    $(go.Shape, { alignment: go.Spot.Left, cursor: 'w-resize', desiredSize: new go.Size(8, 8), fill: 'lightblue', stroke: 'dodgerblue' }),
                    $(go.Shape, { alignment: go.Spot.Right, cursor: 'e-resize', desiredSize: new go.Size(8, 8), fill: 'lightblue', stroke: 'dodgerblue' })
                )
        },
        new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
        new go.Binding('angle').makeTwoWay(),
        
        // Flecha izquierda
        $(go.Shape, 'TriangleLeft',
            {
                fill: 'black',
                stroke: 'black',
                width: 20 * CORTES_GLOBAL_SCALE,
                height: 20 * CORTES_GLOBAL_SCALE
            },
            new go.Binding('fill', 'color'),
            new go.Binding('stroke', 'strokeColor')
        ),
        
        // Línea central (la que se redimensiona)
        $(go.Shape, 'LineH',
            {
                name: 'CENTERLINE',
                stroke: 'black',
                strokeWidth: 4 * CORTES_GLOBAL_SCALE,
                strokeDashArray: [15 * CORTES_GLOBAL_SCALE, 8 * CORTES_GLOBAL_SCALE],
                width: 200
            },
            new go.Binding('width').makeTwoWay(),
            new go.Binding('stroke', 'color')
        ),
        
        // Flecha derecha
        $(go.Shape, 'TriangleRight',
            {
                fill: 'black',
                stroke: 'black',
                width: 20 * CORTES_GLOBAL_SCALE,
                height: 20 * CORTES_GLOBAL_SCALE
            },
            new go.Binding('fill', 'color'),
            new go.Binding('stroke', 'strokeColor')
        )
    );
};

// Símbolo de dirección de corte (solo triángulo, sin texto)
export const createCutDirectionSymbolTemplate = ($) => {
    return $(go.Node, 'Spot',
        {
            locationSpot: go.Spot.Center,
            selectionAdorned: true,
            rotatable: true
        },
        new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
        new go.Binding('angle').makeTwoWay(),
        
        // Solo el triángulo, sin texto
        $(go.Shape, 'TriangleUp',
            {
                fill: 'black',
                stroke: 'black',
                strokeWidth: 2 * CORTES_GLOBAL_SCALE,
                width: 40 * CORTES_GLOBAL_SCALE,
                height: 40 * CORTES_GLOBAL_SCALE
            },
            new go.Binding('fill', 'color'),
            new go.Binding('stroke', 'strokeColor')
        )
    );
};

// Plano de corte con zona sombreada (color negro y escala global)
export const createCutPlaneTemplate = ($) => {
    return $(go.Node, 'Spot',
        {
            locationSpot: go.Spot.Center,
            selectionAdorned: true,
            resizable: true,
            resizeObjectName: 'PLANE',
            rotatable: true
        },
        new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
        new go.Binding('angle').makeTwoWay(),
        
        // Rectángulo del plano de corte
        $(go.Shape, 'Rectangle',
            {
                name: 'PLANE',
                fill: 'rgba(0, 0, 0, 0.1)',
                stroke: 'black',
                strokeWidth: 3 * CORTES_GLOBAL_SCALE,
                strokeDashArray: [8 * CORTES_GLOBAL_SCALE, 5 * CORTES_GLOBAL_SCALE],
                width: 250,
                height: 350
            },
            new go.Binding('width').makeTwoWay(),
            new go.Binding('height').makeTwoWay()
        ),
        
        // Etiqueta en la parte superior
        $(go.Panel, 'Auto',
            { 
                alignment: go.Spot.TopLeft, 
                alignmentFocus: go.Spot.BottomLeft,
                margin: new go.Margin(0, 0, 5, 0)
            },
            
            $(go.Shape, 'RoundedRectangle',
                {
                    fill: 'rgba(0, 0, 0, 0.8)',
                    stroke: 'black',
                    strokeWidth: 2 * CORTES_GLOBAL_SCALE
                }
            ),
            
            $(go.TextBlock,
                {
                    margin: 5,
                    stroke: 'white',
                    font: `bold ${14 * CORTES_GLOBAL_SCALE}px sans-serif`,
                    editable: true
                },
                new go.Binding('text', 'label').makeTwoWay()
            )
        )
    );
};

// =============================================
// SECCIÓN 2: MEDIDAS (Con flechas dinámicas)
// =============================================

// Constante de conversión: pixeles a metros (debe coincidir con WallTemplate.js)
const PIXELS_PER_METER = 40; // 40 pixeles = 1 metro

// Función helper para calcular la medida basada en el tamaño
const calculateMeasurement = (width) => {
    const meters = (width / PIXELS_PER_METER).toFixed(2);
    return `${meters} m`;
};

// Medida Horizontal con flechas (dinámica)
export const createHorizontalMeasurementTemplate = ($) => {
    const ARROW_WIDTH = 12; // Ancho de cada flecha
    
    return $(go.Node, 'Vertical',
        {
            locationSpot: go.Spot.Center,
            selectionAdorned: true,
            resizable: true,
            resizeObjectName: 'CENTERLINE',
            rotatable: true,
            // Solo permite redimensionar horizontalmente
            resizeAdornmentTemplate:
                $(go.Adornment, 'Spot',
                    $(go.Placeholder),
                    $(go.Shape, { alignment: go.Spot.Left, cursor: 'w-resize', desiredSize: new go.Size(8, 8), fill: 'lightblue', stroke: 'dodgerblue' }),
                    $(go.Shape, { alignment: go.Spot.Right, cursor: 'e-resize', desiredSize: new go.Size(8, 8), fill: 'lightblue', stroke: 'dodgerblue' })
                )
        },
        new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
        new go.Binding('angle').makeTwoWay(),
        
        // Panel horizontal con flechas y línea
        $(go.Panel, 'Horizontal',
            // Flecha izquierda
            $(go.Shape, 'TriangleLeft',
                {
                    fill: 'black',
                    stroke: 'black',
                    width: ARROW_WIDTH,
                    height: 12
                },
                new go.Binding('fill', 'color'),
                new go.Binding('stroke', 'strokeColor')
            ),
            
            // Línea central (se redimensiona)
            $(go.Shape, 'LineH',
                {
                    name: 'CENTERLINE',
                    stroke: 'black',
                    strokeWidth: 2,
                    width: 150
                },
                new go.Binding('width').makeTwoWay(),
                new go.Binding('stroke', 'color')
            ),
            
            // Flecha derecha
            $(go.Shape, 'TriangleRight',
                {
                    fill: 'black',
                    stroke: 'black',
                    width: ARROW_WIDTH,
                    height: 12
                },
                new go.Binding('fill', 'color'),
                new go.Binding('stroke', 'strokeColor')
            )
        ),
        
        // Texto de medida (incluye el ancho de ambas flechas)
        $(go.TextBlock,
            {
                margin: new go.Margin(5, 0, 0, 0),
                stroke: 'black',
                font: 'bold 11px sans-serif',
                editable: false,
                background: 'transparent'
            },
            new go.Binding('text', 'width', (w) => calculateMeasurement(w + (ARROW_WIDTH * 2))),
            new go.Binding('stroke', 'textColor')
        )
    );
};

// Medida Vertical con flechas (dinámica)
export const createVerticalMeasurementTemplate = ($) => {
    const ARROW_HEIGHT = 12; // Alto de cada flecha
    
    return $(go.Node, 'Horizontal',
        {
            locationSpot: go.Spot.Center,
            selectionAdorned: true,
            resizable: true,
            resizeObjectName: 'CENTERLINE',
            rotatable: true,
            // Solo permite redimensionar verticalmente
            resizeAdornmentTemplate:
                $(go.Adornment, 'Spot',
                    $(go.Placeholder),
                    $(go.Shape, { alignment: go.Spot.Top, cursor: 'n-resize', desiredSize: new go.Size(8, 8), fill: 'lightblue', stroke: 'dodgerblue' }),
                    $(go.Shape, { alignment: go.Spot.Bottom, cursor: 's-resize', desiredSize: new go.Size(8, 8), fill: 'lightblue', stroke: 'dodgerblue' })
                )
        },
        new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
        new go.Binding('angle').makeTwoWay(),
        
        // Panel vertical con flechas y línea
        $(go.Panel, 'Vertical',
            // Flecha arriba
            $(go.Shape, 'TriangleUp',
                {
                    fill: 'black',
                    stroke: 'black',
                    width: 12,
                    height: ARROW_HEIGHT
                },
                new go.Binding('fill', 'color'),
                new go.Binding('stroke', 'strokeColor')
            ),
            
            // Línea central (se redimensiona)
            $(go.Shape, 'LineV',
                {
                    name: 'CENTERLINE',
                    stroke: 'black',
                    strokeWidth: 2,
                    height: 150
                },
                new go.Binding('height').makeTwoWay(),
                new go.Binding('stroke', 'color')
            ),
            
            // Flecha abajo
            $(go.Shape, 'TriangleDown',
                {
                    fill: 'black',
                    stroke: 'black',
                    width: 12,
                    height: ARROW_HEIGHT
                },
                new go.Binding('fill', 'color'),
                new go.Binding('stroke', 'strokeColor')
            )
        ),
        
        // Texto de medida (incluye el alto de ambas flechas)
        $(go.TextBlock,
            {
                margin: new go.Margin(0, 0, 0, 5),
                stroke: 'black',
                font: 'bold 11px sans-serif',
                editable: false,
                angle: 0,
                background: 'transparent'
            },
            new go.Binding('text', 'height', (h) => calculateMeasurement(h + (ARROW_HEIGHT * 2))),
            new go.Binding('stroke', 'textColor')
        )
    );
};

// Medida con líneas de cota (estilo arquitectónico)
export const createDimensionLineTemplate = ($) => {
    return $(go.Node, 'Auto',
        {
            locationSpot: go.Spot.Center,
            selectionAdorned: true,
            resizable: true,
            resizeObjectName: 'SHAPE',
            rotatable: true
        },
        new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
        new go.Binding('angle').makeTwoWay(),
        
        $(go.Panel, 'Vertical',
            { name: 'SHAPE' },
            
            // Línea principal
            $(go.Shape, 'LineH',
                {
                    stroke: 'black',
                    strokeWidth: 1.5,
                    width: 150
                },
                new go.Binding('width').makeTwoWay(),
                new go.Binding('stroke', 'color')
            ),
            
            // Texto de medida
            $(go.Panel, 'Auto',
                { alignment: go.Spot.Center },
                
                $(go.Shape, 'Rectangle',
                    {
                        fill: 'white',
                        stroke: null
                    }
                ),
                
                $(go.TextBlock,
                    {
                        margin: 2,
                        stroke: 'black',
                        font: 'bold 11px sans-serif',
                        editable: false
                    },
                    new go.Binding('text', 'width', (w) => calculateMeasurement(w)),
                    new go.Binding('stroke', 'textColor')
                )
            )
        ),
        
        // Líneas de extensión
        $(go.Panel, 'Spot',
            $(go.Shape, 'LineV',
                {
                    stroke: 'black',
                    strokeWidth: 1,
                    height: 20,
                    alignment: new go.Spot(0, 0.5, -75, 0)
                }
            ),
            $(go.Shape, 'LineV',
                {
                    stroke: 'black',
                    strokeWidth: 1,
                    height: 20,
                    alignment: new go.Spot(0, 0.5, 75, 0)
                }
            )
        )
    );
};

// =============================================
// SECCIÓN 3: LÍNEAS
// =============================================

// Línea simple continua
export const createSolidLineTemplate = ($) => {
    return $(go.Node, 'Auto',
        {
            locationSpot: go.Spot.Center,
            selectionAdorned: true,
            resizable: true,
            resizeObjectName: 'LINE',
            rotatable: true
        },
        new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
        new go.Binding('angle').makeTwoWay(),
        
        $(go.Shape, 'LineH',
            {
                name: 'LINE',
                stroke: 'black',
                strokeWidth: 2,
                width: 200
            },
            new go.Binding('width').makeTwoWay(),
            new go.Binding('stroke', 'color'),
            new go.Binding('strokeWidth', 'thickness')
        )
    );
};

// Línea segmentada (dashed)
export const createDashedLineTemplate = ($) => {
    return $(go.Node, 'Auto',
        {
            locationSpot: go.Spot.Center,
            selectionAdorned: true,
            resizable: true,
            resizeObjectName: 'LINE',
            rotatable: true
        },
        new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
        new go.Binding('angle').makeTwoWay(),
        
        $(go.Shape, 'LineH',
            {
                name: 'LINE',
                stroke: 'black',
                strokeWidth: 2,
                strokeDashArray: [10, 5],
                width: 200
            },
            new go.Binding('width').makeTwoWay(),
            new go.Binding('stroke', 'color')
        )
    );
};

// Línea segmentada punteada
export const createDottedLineTemplate = ($) => {
    return $(go.Node, 'Auto',
        {
            locationSpot: go.Spot.Center,
            selectionAdorned: true,
            resizable: true,
            resizeObjectName: 'LINE',
            rotatable: true
        },
        new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
        new go.Binding('angle').makeTwoWay(),
        
        $(go.Shape, 'LineH',
            {
                name: 'LINE',
                stroke: 'black',
                strokeWidth: 2,
                strokeDashArray: [2, 5],
                width: 200
            },
            new go.Binding('width').makeTwoWay(),
            new go.Binding('stroke', 'color')
        )
    );
};

// Cuadrado
export const createSquareTemplate = ($) => {
    return $(go.Node, 'Auto',
        {
            locationSpot: go.Spot.Center,
            selectionAdorned: true,
            resizable: true,
            resizeObjectName: 'SHAPE',
            rotatable: true
        },
        new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
        new go.Binding('angle').makeTwoWay(),
        
        $(go.Shape, 'Rectangle',
            {
                name: 'SHAPE',
                fill: 'transparent',
                stroke: 'black',
                strokeWidth: 2,
                width: 100,
                height: 100
            },
            new go.Binding('width').makeTwoWay(),
            new go.Binding('height').makeTwoWay(),
            new go.Binding('stroke', 'color'),
            new go.Binding('strokeWidth', 'thickness')
        )
    );
};

// Rectángulo
export const createRectangleTemplate = ($) => {
    return $(go.Node, 'Auto',
        {
            locationSpot: go.Spot.Center,
            selectionAdorned: true,
            resizable: true,
            resizeObjectName: 'SHAPE',
            rotatable: true
        },
        new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
        new go.Binding('angle').makeTwoWay(),
        
        $(go.Shape, 'Rectangle',
            {
                name: 'SHAPE',
                fill: 'transparent',
                stroke: 'black',
                strokeWidth: 2,
                width: 150,
                height: 80
            },
            new go.Binding('width').makeTwoWay(),
            new go.Binding('height').makeTwoWay(),
            new go.Binding('stroke', 'color'),
            new go.Binding('strokeWidth', 'thickness')
        )
    );
};

// Círculo
export const createCircleTemplate = ($) => {
    return $(go.Node, 'Auto',
        {
            locationSpot: go.Spot.Center,
            selectionAdorned: true,
            resizable: true,
            resizeObjectName: 'SHAPE',
            rotatable: true
        },
        new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
        new go.Binding('angle').makeTwoWay(),
        
        $(go.Shape, 'Circle',
            {
                name: 'SHAPE',
                fill: 'transparent',
                stroke: 'black',
                strokeWidth: 2,
                width: 100,
                height: 100
            },
            new go.Binding('width').makeTwoWay(),
            new go.Binding('height').makeTwoWay(),
            new go.Binding('stroke', 'color'),
            new go.Binding('strokeWidth', 'thickness')
        )
    );
};

// =============================================
// FUNCIÓN DE REGISTRO
// =============================================

export const registerDimensionTemplates = (diagram, $) => {
    // CORTES
    diagram.nodeTemplateMap.add('CutLine', createCutLineTemplate($));
    diagram.nodeTemplateMap.add('CutDirectionSymbol', createCutDirectionSymbolTemplate($));
    diagram.nodeTemplateMap.add('CutPlane', createCutPlaneTemplate($));
    
    // MEDIDAS
    diagram.nodeTemplateMap.add('HorizontalMeasurement', createHorizontalMeasurementTemplate($));
    diagram.nodeTemplateMap.add('VerticalMeasurement', createVerticalMeasurementTemplate($));
    diagram.nodeTemplateMap.add('DimensionLine', createDimensionLineTemplate($));
    
    // LÍNEAS
    diagram.nodeTemplateMap.add('SolidLine', createSolidLineTemplate($));
    diagram.nodeTemplateMap.add('DashedLine', createDashedLineTemplate($));
    diagram.nodeTemplateMap.add('DottedLine', createDottedLineTemplate($));
    diagram.nodeTemplateMap.add('Square', createSquareTemplate($));
    diagram.nodeTemplateMap.add('Rectangle', createRectangleTemplate($));
    diagram.nodeTemplateMap.add('Circle', createCircleTemplate($));
};