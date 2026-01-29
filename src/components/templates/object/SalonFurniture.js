// SalonFurniture.js
// Muebles para el salón en vista de planta (desde arriba)
import * as go from 'gojs';

// ============================================
// CONFIGURACIÓN GLOBAL DE TAMAÑO
// Modifica este valor para escalar todos los muebles.
// 1.0 = Tamaño original (ej: Sofá 160x80)
// 0.5 = Mitad de tamaño (ej: Sofá 80x40)
// ============================================
const DEFAULT_SCALE = 0.34;

// ============================================
// TEMPLATES ESPECÍFICOS PARA SALÓN
// ============================================

// SOFÁ 2 PLAZAS - Rectangular con respaldo y cojines
export const createSofa2PlazasTemplate = ($) => {
    return $(go.Node, 'Auto',
        {
            locationSpot: go.Spot.Center,
            rotatable: true,
            selectionAdorned: true
        },
        new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
        new go.Binding('angle', 'angle').makeTwoWay(),

        $(go.Panel, 'Spot',
            // Asiento principal
            $(go.Shape, 'Rectangle',
                {
                    strokeWidth: 2 * DEFAULT_SCALE,
                    stroke: '#8B6F47',
                    fill: '#D4A574',
                    width: 160 * DEFAULT_SCALE,
                    height: 80 * DEFAULT_SCALE
                }
            ),

            // Respaldo
            $(go.Shape, 'Rectangle',
                {
                    strokeWidth: 0,
                    fill: '#6B4423',
                    width: 150 * DEFAULT_SCALE,
                    height: 10 * DEFAULT_SCALE,
                    alignment: new go.Spot(0.5, 0, 0, 5 * DEFAULT_SCALE) // Ajuste de posición basado en escala
                }
            ),

            // Línea divisoria de cojines
            $(go.Shape, 'LineV',
                {
                    strokeWidth: 1.5 * DEFAULT_SCALE,
                    stroke: '#6B4423',
                    height: 70 * DEFAULT_SCALE
                }
            )
        )
    );
};

// SOFÁ 3 PLAZAS - Más largo con 2 divisiones
export const createSofa3PlazasTemplate = ($) => {
    return $(go.Node, 'Auto',
        {
            locationSpot: go.Spot.Center,
            rotatable: true,
            selectionAdorned: true
        },
        new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
        new go.Binding('angle', 'angle').makeTwoWay(),

        $(go.Panel, 'Spot',
            // Asiento principal
            $(go.Shape, 'Rectangle',
                {
                    strokeWidth: 2 * DEFAULT_SCALE,
                    stroke: '#8B6F47',
                    fill: '#D4A574',
                    width: 200 * DEFAULT_SCALE,
                    height: 80 * DEFAULT_SCALE
                }
            ),

            // Respaldo
            $(go.Shape, 'Rectangle',
                {
                    strokeWidth: 0,
                    fill: '#6B4423',
                    width: 190 * DEFAULT_SCALE,
                    height: 10 * DEFAULT_SCALE,
                    alignment: new go.Spot(0.5, 0, 0, 5 * DEFAULT_SCALE)
                }
            ),

            // Primera línea divisoria
            $(go.Shape, 'LineV',
                {
                    strokeWidth: 1.5 * DEFAULT_SCALE,
                    stroke: '#6B4423',
                    height: 70 * DEFAULT_SCALE,
                    alignment: new go.Spot(0.33, 0.5)
                }
            ),

            // Segunda línea divisoria
            $(go.Shape, 'LineV',
                {
                    strokeWidth: 1.5 * DEFAULT_SCALE,
                    stroke: '#6B4423',
                    height: 70 * DEFAULT_SCALE,
                    alignment: new go.Spot(0.67, 0.5)
                }
            )
        )
    );
};

// SOFÁ ESQUINERO L - Forma de L
export const createSofaEsquineroTemplate = ($) => {
    // Nota: El tamaño y las posiciones de alineación se ajustan proporcionalmente para la forma en L.
    return $(go.Node, 'Spot',
        {
            locationSpot: go.Spot.Center,
            rotatable: true,
            selectionAdorned: true
        },
        new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
        new go.Binding('angle', 'angle').makeTwoWay(),

        // Parte horizontal de la L (asiento)
        $(go.Shape, 'Rectangle',
            {
                strokeWidth: 2 * DEFAULT_SCALE,
                stroke: '#8B6F47',
                fill: '#D4A574',
                width: 180 * DEFAULT_SCALE,
                height: 80 * DEFAULT_SCALE,
                alignment: new go.Spot(0.5, 1, 0, -40 * DEFAULT_SCALE)
            }
        ),

        // Parte vertical de la L (asiento)
        $(go.Shape, 'Rectangle',
            {
                strokeWidth: 2 * DEFAULT_SCALE,
                stroke: '#8B6F47',
                fill: '#D4A574',
                width: 80 * DEFAULT_SCALE,
                height: 120 * DEFAULT_SCALE,
                alignment: new go.Spot(1, 0.5, -40 * DEFAULT_SCALE, 0)
            }
        ),

        // Respaldo horizontal
        $(go.Shape, 'Rectangle',
            {
                strokeWidth: 0,
                fill: '#6B4423',
                width: 170 * DEFAULT_SCALE,
                height: 10 * DEFAULT_SCALE,
                alignment: new go.Spot(0.5, 1, 0, -75 * DEFAULT_SCALE)
            }
        ),

        // Respaldo vertical
        $(go.Shape, 'Rectangle',
            {
                strokeWidth: 0,
                fill: '#6B4423',
                width: 10 * DEFAULT_SCALE,
                height: 110 * DEFAULT_SCALE,
                alignment: new go.Spot(1, 0.5, -75 * DEFAULT_SCALE, 0)
            }
        )
    );
};

// MESA DE CENTRO REDONDA - Círculo con borde
export const createMesaCentroRedondaTemplate = ($) => {
    return $(go.Node, 'Auto',
        {
            locationSpot: go.Spot.Center,
            rotatable: true
        },
        new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
        new go.Binding('angle', 'angle').makeTwoWay(),

        $(go.Panel, 'Spot',
            // Mesa
            $(go.Shape, 'Circle',
                {
                    strokeWidth: 2 * DEFAULT_SCALE,
                    stroke: '#8B6F47',
                    fill: '#E5C29F',
                    width: 80 * DEFAULT_SCALE,
                    height: 80 * DEFAULT_SCALE
                }
            ),

            // Detalle central
            $(go.Shape, 'Circle',
                {
                    strokeWidth: 1 * DEFAULT_SCALE,
                    stroke: '#8B6F47',
                    fill: 'transparent',
                    width: 50 * DEFAULT_SCALE,
                    height: 50 * DEFAULT_SCALE
                }
            )
        )
    );
};

// MESA DE CENTRO RECTANGULAR
export const createMesaCentroRectangularTemplate = ($) => {
    return $(go.Node, 'Auto',
        {
            locationSpot: go.Spot.Center,
            rotatable: true
        },
        new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
        new go.Binding('angle', 'angle').makeTwoWay(),

        $(go.Panel, 'Spot',
            $(go.Shape, 'RoundedRectangle',
                {
                    strokeWidth: 2 * DEFAULT_SCALE,
                    stroke: '#8B6F47',
                    fill: '#E5C29F',
                    parameter1: 8 * DEFAULT_SCALE,
                    width: 100 * DEFAULT_SCALE,
                    height: 60 * DEFAULT_SCALE
                }
            ),

            // Marco interior
            $(go.Shape, 'RoundedRectangle',
                {
                    strokeWidth: 1 * DEFAULT_SCALE,
                    stroke: '#8B6F47',
                    fill: 'transparent',
                    parameter1: 5 * DEFAULT_SCALE,
                    width: 85 * DEFAULT_SCALE,
                    height: 45 * DEFAULT_SCALE
                }
            )
        )
    );
};

// MESA DE CENTRO CUADRADA
export const createMesaCentroCuadradaTemplate = ($) => {
    return $(go.Node, 'Auto',
        {
            locationSpot: go.Spot.Center,
            rotatable: true
        },
        new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
        new go.Binding('angle', 'angle').makeTwoWay(),

        $(go.Panel, 'Spot',
            $(go.Shape, 'RoundedRectangle',
                {
                    strokeWidth: 2 * DEFAULT_SCALE,
                    stroke: '#8B6F47',
                    fill: '#E5C29F',
                    parameter1: 8 * DEFAULT_SCALE,
                    width: 80 * DEFAULT_SCALE,
                    height: 80 * DEFAULT_SCALE
                }
            ),

            // Líneas decorativas cruzadas
            $(go.Shape, 'LineH',
                {
                    strokeWidth: 1 * DEFAULT_SCALE,
                    stroke: '#8B6F47',
                    width: 60 * DEFAULT_SCALE
                }
            ),
            $(go.Shape, 'LineV',
                {
                    strokeWidth: 1 * DEFAULT_SCALE,
                    stroke: '#8B6F47',
                    height: 60 * DEFAULT_SCALE
                }
            )
        )
    );
};

// SILLÓN INDIVIDUAL - Forma de butaca
export const createSillonIndividualTemplate = ($) => {
    return $(go.Node, 'Auto',
        {
            locationSpot: go.Spot.Center,
            rotatable: true
        },
        new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
        new go.Binding('angle', 'angle').makeTwoWay(),

        $(go.Panel, 'Spot',
            // Asiento
            $(go.Shape, 'RoundedRectangle',
                {
                    strokeWidth: 2 * DEFAULT_SCALE,
                    stroke: '#8B6F47',
                    fill: '#D4A574',
                    parameter1: 5 * DEFAULT_SCALE,
                    width: 80 * DEFAULT_SCALE,
                    height: 80 * DEFAULT_SCALE
                }
            ),

            // Respaldo
            $(go.Shape, 'Rectangle',
                {
                    strokeWidth: 0,
                    fill: '#6B4423',
                    width: 82 * DEFAULT_SCALE,
                    height: 12 * DEFAULT_SCALE,
                    alignment: new go.Spot(0.5, 0, 0, 4 * DEFAULT_SCALE)
                }
            ),

            // Reposabrazos izquierdo
            $(go.Shape, 'Rectangle',
                {
                    strokeWidth: 0,
                    fill: '#6B4423',
                    width: 12 * DEFAULT_SCALE,
                    height: 55 * DEFAULT_SCALE,
                    alignment: new go.Spot(0, 0.35, 4 * DEFAULT_SCALE, 0)
                }
            ),

            // Reposabrazos derecho
            $(go.Shape, 'Rectangle',
                {
                    strokeWidth: 0,
                    fill: '#6B4423',
                    width: 12 * DEFAULT_SCALE,
                    height: 55 * DEFAULT_SCALE,
                    alignment: new go.Spot(1, 0.35, -4 * DEFAULT_SCALE, 0)
                }
            )
        )
    );
};

// SILLA SIMPLE
export const createSillaSimpleTemplate = ($) => {
    return $(go.Node, 'Spot',
        {
            locationSpot: go.Spot.Center,
            rotatable: true
        },
        new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
        new go.Binding('angle', 'angle').makeTwoWay(),

        // Asiento
        $(go.Shape, 'RoundedRectangle',
            {
                strokeWidth: 2 * DEFAULT_SCALE,
                stroke: '#8B6F47',
                fill: '#D4A574',
                parameter1: 5 * DEFAULT_SCALE,
                width: 60 * DEFAULT_SCALE,
                height: 60 * DEFAULT_SCALE
            }
        ),

        // Respaldo
        $(go.Shape, 'Rectangle',
            {
                strokeWidth: 0,
                fill: '#6B4423',
                width: 40 * DEFAULT_SCALE,
                height: 15 * DEFAULT_SCALE,
                alignment: new go.Spot(0.5, 0, 0, 3 * DEFAULT_SCALE)
            }
        )
    );
};

// TV 32"
export const createTV32Template = ($) => {
    return $(go.Node, 'Auto',
        {
            locationSpot: go.Spot.Center,
            rotatable: true
        },
        new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
        new go.Binding('angle', 'angle').makeTwoWay(),

        $(go.Panel, 'Spot',
            // Marco del TV
            $(go.Shape, 'Rectangle',
                {
                    strokeWidth: 3 * DEFAULT_SCALE,
                    stroke: '#5f5b5bff',
                    fill: '#5f5b5bff',
                    width: 23 * DEFAULT_SCALE,
                    height: 24 * DEFAULT_SCALE
                }
            ),

            // Pantalla
            $(go.Shape, 'Rectangle',
                {
                    strokeWidth: 0,
                    fill: '#000000ff',
                    width: 70 * DEFAULT_SCALE,
                    height: 15 * DEFAULT_SCALE
                }
            )
        )
    );
};

// TV 50"
export const createTV50Template = ($) => {
    return $(go.Node, 'Auto',
        {
            locationSpot: go.Spot.Center,
            rotatable: true
        },
        new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
        new go.Binding('angle', 'angle').makeTwoWay(),

        $(go.Panel, 'Spot',
            // Marco del TV
            $(go.Shape, 'Rectangle',
                {
                    strokeWidth: 3 * DEFAULT_SCALE,
                    stroke: '#5f5b5bff',
                    fill: '#5f5b5bff',
                    width: 30 * DEFAULT_SCALE,
                    height: 26 * DEFAULT_SCALE
                }
            ),

            // Pantalla
            $(go.Shape, 'Rectangle',
                {
                    strokeWidth: 0,
                    fill: '#000000ff',
                    width: 120 * DEFAULT_SCALE,
                    height: 15 * DEFAULT_SCALE
                }
            )
        )
    );
};

// MUEBLE TV
export const createMuebleTVTemplate = ($) => {
    return $(go.Node, 'Auto',
        {
            locationSpot: go.Spot.Center,
            rotatable: true
        },
        new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
        new go.Binding('angle', 'angle').makeTwoWay(),

        $(go.Panel, 'Spot',
            $(go.Shape, 'Rectangle',
                {
                    strokeWidth: 2 * DEFAULT_SCALE,
                    stroke: '#6B4423',
                    fill: '#8B6F47',
                    width: 150 * DEFAULT_SCALE,
                    height: 45 * DEFAULT_SCALE
                }
            ),

            // Divisiones de cajones/compartimentos
            $(go.Shape, 'LineV',
                {
                    strokeWidth: 1 * DEFAULT_SCALE,
                    stroke: '#6B4423',
                    height: 35 * DEFAULT_SCALE,
                    alignment: new go.Spot(0.33, 0.5)
                }
            ),
            $(go.Shape, 'LineV',
                {
                    strokeWidth: 1 * DEFAULT_SCALE,
                    stroke: '#6B4423',
                    height: 35 * DEFAULT_SCALE,
                    alignment: new go.Spot(0.67, 0.5)
                }
            )
        )
    );
};

// ESTANTERÍA
export const createEstanteriaTemplate = ($) => {
    return $(go.Node, 'Auto',
        {
            locationSpot: go.Spot.Center,
            rotatable: true
        },
        new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
        new go.Binding('angle', 'angle').makeTwoWay(),

        $(go.Panel, 'Spot',
            $(go.Shape, 'Rectangle',
                {
                    strokeWidth: 2 * DEFAULT_SCALE,
                    stroke: '#6B4423',
                    fill: '#A0826D',
                    width: 100 * DEFAULT_SCALE,
                    height: 35 * DEFAULT_SCALE
                }
            ),

            // Repisas horizontales
            $(go.Shape, 'LineH',
                {
                    strokeWidth: 1 * DEFAULT_SCALE,
                    stroke: '#6B4423',
                    width: 90 * DEFAULT_SCALE,
                    alignment: new go.Spot(0.5, 0.33)
                }
            ),
            $(go.Shape, 'LineH',
                {
                    strokeWidth: 1 * DEFAULT_SCALE,
                    stroke: '#6B4423',
                    width: 90 * DEFAULT_SCALE,
                    alignment: new go.Spot(0.5, 0.67)
                }
            )
        )
    );
};

// LIBRERO
export const createLibreroTemplate = ($) => {
    const bookHeight = 20 * DEFAULT_SCALE;
    const bookWidth = 3 * DEFAULT_SCALE;
    const margin = 1 * DEFAULT_SCALE;

    return $(go.Node, 'Auto',
        {
            locationSpot: go.Spot.Center,
            rotatable: true
        },
        new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
        new go.Binding('angle', 'angle').makeTwoWay(),

        $(go.Panel, 'Spot',
            // Fondo del librero
            $(go.Shape, 'Rectangle',
                {
                    strokeWidth: 2 * DEFAULT_SCALE,
                    stroke: '#6B4423',
                    fill: '#A0826D',
                    width: 80 * DEFAULT_SCALE,
                    height: 30 * DEFAULT_SCALE
                }
            ),

            // Panel horizontal con libros simulados
            $(go.Panel, 'Horizontal',
                {
                    alignment: go.Spot.Center
                },
                // Crear 8 "libros" manualmente (escalados)
                $(go.Shape, 'Rectangle', { width: bookWidth, height: bookHeight, fill: '#6B4423', margin: margin }),
                $(go.Shape, 'Rectangle', { width: bookWidth, height: bookHeight, fill: '#6B4423', margin: margin }),
                $(go.Shape, 'Rectangle', { width: bookWidth, height: bookHeight, fill: '#6B4423', margin: margin }),
                $(go.Shape, 'Rectangle', { width: bookWidth, height: bookHeight, fill: '#6B4423', margin: margin }),
                $(go.Shape, 'Rectangle', { width: bookWidth, height: bookHeight, fill: '#6B4423', margin: margin }),
                $(go.Shape, 'Rectangle', { width: bookWidth, height: bookHeight, fill: '#6B4423', margin: margin }),
                $(go.Shape, 'Rectangle', { width: bookWidth, height: bookHeight, fill: '#6B4423', margin: margin }),
                $(go.Shape, 'Rectangle', { width: bookWidth, height: bookHeight, fill: '#6B4423', margin: margin })
            )
        )
    );
};

// LÁMPARA DE PIE
export const createLamparaPieTemplate = ($) => {
    return $(go.Node, 'Auto',
        {
            locationSpot: go.Spot.Center,
            rotatable: true
        },
        new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
        new go.Binding('angle', 'angle').makeTwoWay(),

        $(go.Panel, 'Spot',
            // Base circular
            $(go.Shape, 'Circle',
                {
                    strokeWidth: 2 * DEFAULT_SCALE,
                    stroke: '#FFB300',
                    fill: '#FFF9C4',
                    width: 30 * DEFAULT_SCALE,
                    height: 30 * DEFAULT_SCALE
                }
            ),

            // Luz central
            $(go.Shape, 'Circle',
                {
                    strokeWidth: 0,
                    fill: '#FFEB3B',
                    width: 15 * DEFAULT_SCALE,
                    height: 15 * DEFAULT_SCALE
                }
            )
        )
    );
};

// PLANTA GRANDE
export const createPlantaGrandeTemplate = ($) => {
    return $(go.Node, 'Auto',
        {
            locationSpot: go.Spot.Center,
            rotatable: true
        },
        new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
        new go.Binding('angle', 'angle').makeTwoWay(),

        $(go.Panel, 'Spot',
            // Maceta
            $(go.Shape, 'Circle',
                {
                    strokeWidth: 2 * DEFAULT_SCALE,
                    stroke: '#6B4423',
                    fill: '#8B6F47',
                    width: 40 * DEFAULT_SCALE,
                    height: 40 * DEFAULT_SCALE
                }
            ),

            // Planta (círculo verde)
            $(go.Shape, 'Circle',
                {
                    strokeWidth: 2 * DEFAULT_SCALE,
                    stroke: '#2E7D32',
                    fill: '#81C784',
                    width: 30 * DEFAULT_SCALE,
                    height: 30 * DEFAULT_SCALE
                }
            )
        )
    );
};

// PLANTA PEQUEÑA
export const createPlantaPequenaTemplate = ($) => {
    return $(go.Node, 'Auto',
        {
            locationSpot: go.Spot.Center,
            rotatable: true
        },
        new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
        new go.Binding('angle', 'angle').makeTwoWay(),

        $(go.Panel, 'Spot',
            // Maceta pequeña
            $(go.Shape, 'Circle',
                {
                    strokeWidth: 1.5 * DEFAULT_SCALE,
                    stroke: '#6B4423',
                    fill: '#8B6F47',
                    width: 25 * DEFAULT_SCALE,
                    height: 25 * DEFAULT_SCALE
                }
            ),

            // Planta pequeña
            $(go.Shape, 'Circle',
                {
                    strokeWidth: 1 * DEFAULT_SCALE,
                    stroke: '#2E7D32',
                    fill: '#81C784',
                    width: 18 * DEFAULT_SCALE,
                    height: 18 * DEFAULT_SCALE
                }
            )
        )
    );
};

// ============================================
// FUNCIÓN DE REGISTRO
// ============================================
export const registerSalonTemplates = (diagram, $) => {
    diagram.nodeTemplateMap.add('Sofa2Plazas', createSofa2PlazasTemplate($));
    diagram.nodeTemplateMap.add('Sofa3Plazas', createSofa3PlazasTemplate($));
    diagram.nodeTemplateMap.add('SofaEsquinero', createSofaEsquineroTemplate($));
    diagram.nodeTemplateMap.add('MesaCentroRedonda', createMesaCentroRedondaTemplate($));
    diagram.nodeTemplateMap.add('MesaCentroRectangular', createMesaCentroRectangularTemplate($));
    diagram.nodeTemplateMap.add('MesaCentroCuadrada', createMesaCentroCuadradaTemplate($));
    diagram.nodeTemplateMap.add('SillonIndividual', createSillonIndividualTemplate($));
    diagram.nodeTemplateMap.add('SillaSimple', createSillaSimpleTemplate($));
    diagram.nodeTemplateMap.add('TV32', createTV32Template($));
    diagram.nodeTemplateMap.add('TV50', createTV50Template($));
    diagram.nodeTemplateMap.add('MuebleTV', createMuebleTVTemplate($));
    diagram.nodeTemplateMap.add('Estanteria', createEstanteriaTemplate($));
    diagram.nodeTemplateMap.add('Librero', createLibreroTemplate($));
    diagram.nodeTemplateMap.add('LamparaPie', createLamparaPieTemplate($));
    diagram.nodeTemplateMap.add('PlantaGrande', createPlantaGrandeTemplate($));
    diagram.nodeTemplateMap.add('PlantaPequena', createPlantaPequenaTemplate($));
};

// ============================================
// OBJETOS PARA EL PANEL
// (Estos no necesitan cambios de escala aquí, ya que la escala se maneja en los templates)
// ============================================
export const salonObjects = [
    // Sofás
    {
        category: 'Sofa2Plazas',
        name: 'Sofá 2 Plazas',
        label: 'Sofá 2P',
        preview: '🛋️'
    },
    {
        category: 'Sofa3Plazas',
        name: 'Sofá 3 Plazas',
        label: 'Sofá 3P',
        preview: '🛋️'
    },
    {
        category: 'SofaEsquinero',
        name: 'Sofá Esquinero L',
        label: 'Sofá L',
        preview: '🛋️'
    },

    // Mesas de Centro
    {
        category: 'MesaCentroRedonda',
        name: 'Mesa de Centro Redonda',
        label: 'Mesa',
        preview: '⭕'
    },
    {
        category: 'MesaCentroRectangular',
        name: 'Mesa de Centro Rectangular',
        label: 'Mesa',
        preview: '▭'
    },
    {
        category: 'MesaCentroCuadrada',
        name: 'Mesa de Centro Cuadrada',
        label: 'Mesa',
        preview: '◻️'
    },

    // Sillas y Sillones
    {
        category: 'SillonIndividual',
        name: 'Sillón Individual',
        label: 'Sillón',
        preview: '💺'
    },
    {
        category: 'SillaSimple',
        name: 'Silla Simple',
        label: 'Silla',
        preview: '🪑'
    },

    // TV y Muebles de TV
    {
        category: 'TV32',
        name: 'TV 32"',
        label: 'TV',
        preview: '📺'
    },
    {
        category: 'TV50',
        name: 'TV 50"',
        label: 'TV',
        label: 'TV 50"',
        preview: '📺'
    },
    {
        category: 'MuebleTV',
        name: 'Mueble TV',
        label: 'Mueble TV',
        preview: '📦'
    },

    // Almacenamiento
    {
        category: 'Estanteria',
        name: 'Estantería',
        label: 'Estante',
        preview: '📚'
    },
    {
        category: 'Librero',
        name: 'Librero',
        label: 'Librero',
        preview: '📚'
    },

    // Iluminación
    {
        category: 'LamparaPie',
        name: 'Lámpara de Pie',
        label: 'Lámpara',
        preview: '💡'
    },

    // Decoración
    {
        category: 'PlantaGrande',
        name: 'Planta Grande',
        label: 'Planta',
        preview: '🪴'
    },
    {
        category: 'PlantaPequena',
        name: 'Planta Pequeña',
        label: 'Planta',
        preview: '🌱'
    },
];

export const salonPanelTitle = 'Salón / Sala de Estar';