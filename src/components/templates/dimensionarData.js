// dimensionarData.js - Datos de objetos para el panel Dimensionar

// =============================================
// VARIABLE GLOBAL DE ESCALA PARA CORTES
// =============================================
export const CORTES_GLOBAL_SCALE = 0.5; // ✅ Escala global para todos los cortes (1.0 = 100%)

// =============================================
// CORTES - Todo lo necesario para hacer cortes arquitectónicos
// =============================================
export const cortesObjects = [
    {
        category: 'CutLine',
        name: 'Línea de Corte',
        label: '',                // ❌ Sin texto arriba
        preview: '←→',            // ❌ Sin letras A o B — solo la línea
        width: 120,               // 🔽 Tamaño reducido
        color: 'black',
        strokeColor: 'black',
        textColor: 'black'
    },
    {
        category: 'CutDirectionSymbol',
        name: 'Símbolo Dirección',
        label: '',                // ❌ Sin letra A/B
        preview: '▲',             // ✔️ Solo el triángulo
        color: 'black',
        strokeColor: 'black',
        textColor: 'black'
    },
    {
        category: 'CutPlane',
        name: 'Plano de Corte A',
        label: 'Corte A-A',       // ✅ Con texto para identificación
        preview: '▭',             // ✔️ Solo el símbolo
        width: 120,               // 🔽 Reducido
        height: 190,              // 🔽 Reducido
        color: 'black'
    },
    {
        category: 'CutPlane',
        name: 'Plano de Corte B',
        label: 'Corte B-B',       // ✅ Con texto para identificación
        preview: '▭',
        width: 120,
        height: 190,
        color: 'black'
    },
    {
        category: 'TextLabel',
        name: 'Texto Corte A-A',
        text: 'Corte A-A',
        preview: 'A-A',
        fontSize: 14,
        color: 'black',
        textColor: 'black'
    },
    {
        category: 'TextLabel',
        name: 'Texto Corte B-B',
        text: 'Corte B-B',
        preview: 'B-B',
        fontSize: 14,
        color: 'black',
        textColor: 'black'
    }
];

// =============================================
// MEDIDAS - Flechas dinámicas que cambian la medida según el tamaño
// =============================================
export const medidasObjects = [
    {
        category: 'HorizontalMeasurement',
        name: 'Medida Horizontal Pequeña',
        label: 'H. Pequeña',
        preview: '←1m→',
        width: 80,
        color: 'black',
        textColor: 'black',
        strokeColor: 'black'
    },
    {
        category: 'HorizontalMeasurement',
        name: 'Medida Horizontal Media',
        label: 'H. Media',
        preview: '←2m→',
        width: 150,
        color: 'black',
        textColor: 'black',
        strokeColor: 'black'
    },
    {
        category: 'HorizontalMeasurement',
        name: 'Medida Horizontal Grande',
        label: 'H. Grande',
        preview: '←5m→',
        width: 300,
        color: 'black',
        textColor: 'black',
        strokeColor: 'black'
    },
    {
        category: 'VerticalMeasurement',
        name: 'Medida Vertical Pequeña',
        label: 'V. Pequeña',
        preview: '↑1m↓',
        height: 80,
        color: 'black',
        textColor: 'black',
        strokeColor: 'black'
    },
    {
        category: 'VerticalMeasurement',
        name: 'Medida Vertical Media',
        label: 'V. Media',
        preview: '↑2m↓',
        height: 150,
        color: 'black',
        textColor: 'black',
        strokeColor: 'black'
    },
    {
        category: 'VerticalMeasurement',
        name: 'Medida Vertical Grande',
        label: 'V. Grande',
        preview: '↑3m↓',
        height: 200,
        color: 'black',
        textColor: 'black',
        strokeColor: 'black'
    }
];

// =============================================
// LÍNEAS - Líneas segmentadas, no segmentadas, cuadrados, rectángulos, etc.
// =============================================
export const lineasObjects = [
    {
        category: 'SolidLine',
        name: 'Línea Continua',
        label: 'Continua',
        preview: '━━━',
        width: 200,
        color: 'black',
        strokeColor: 'black',
        thickness: 2
    },
    {
        category: 'SolidLine',
        name: 'Línea Continua Gruesa',
        label: 'Gruesa',
        preview: '━━━',
        width: 200,
        color: 'black',
        strokeColor: 'black',
        thickness: 4
    },
    {
        category: 'SolidLine',
        name: 'Línea Continua Fina',
        label: 'Fina',
        preview: '──',
        width: 200,
        color: 'black',
        strokeColor: 'black',
        thickness: 1
    },
    {
        category: 'DashedLine',
        name: 'Línea Segmentada',
        label: 'Segmentada',
        preview: '┉┉┉',
        width: 200,
        color: 'black',
        strokeColor: 'black'
    },
    {
        category: 'DashedLine',
        name: 'Línea Segmentada Larga',
        label: 'Seg. Larga',
        preview: '━ ━',
        width: 250,
        color: 'black',
        strokeColor: 'black'
    },
    {
        category: 'DottedLine',
        name: 'Línea Punteada',
        label: 'Punteada',
        preview: '······',
        width: 200,
        color: 'black',
        strokeColor: 'black'
    },
    {
        category: 'DottedLine',
        name: 'Línea Punteada Corta',
        label: 'Punt. Corta',
        preview: '····',
        width: 120,
        color: 'black',
        strokeColor: 'black'
    },
    {
        category: 'Square',
        name: 'Cuadrado Pequeño',
        label: 'Cuadrado P',
        preview: '□',
        width: 80,
        height: 80,
        color: 'black',
        strokeColor: 'black'
    },
    {
        category: 'Square',
        name: 'Cuadrado Grande',
        label: 'Cuadrado G',
        preview: '□',
        width: 180,
        height: 180,
        color: 'black',
        strokeColor: 'black'
    },
    {
        category: 'Circle',
        name: 'Círculo Pequeño',
        label: 'Círculo P',
        preview: '○',
        width: 80,
        height: 80,
        color: 'black',
        strokeColor: 'black'
    },
    {
        category: 'Circle',
        name: 'Círculo Grande',
        label: 'Círculo G',
        preview: '○',
        width: 180,
        height: 180,
        color: 'black',
        strokeColor: 'black'
    }
];

// =============================================
// TÍTULOS DE LOS PANELES
// =============================================
export const dimensionarPanelTitles = {
    'cortes': 'Herramientas de Cortes',
    'medidas': 'Herramientas de Medidas',
    'areas': 'Herramientas de Áreas',
    'lineas': 'Herramientas de Líneas'
};

// =============================================
// OBJETO CONSOLIDADO PARA EXPORTAR
// =============================================
export const dimensionarData = {
    cortes: cortesObjects,
    medidas: medidasObjects,
    lineas: lineasObjects
};