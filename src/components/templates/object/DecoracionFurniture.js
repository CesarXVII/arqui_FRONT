import * as go from 'gojs';

const ESCALA = 0.5;

const createEspejoRedondoTemplate = ($) => {
    return $(go.Node, 'Spot',
        {
            locationSpot: go.Spot.Center,
            selectionAdorned: true,
            resizable: true,
            rotatable: true
        },
        new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
        new go.Binding('angle').makeTwoWay(),
        $(go.Shape, 'Circle',
            {
                name: 'SHAPE',
                fill: 'white',
                stroke: '#B0BEC5',
                strokeWidth: 3 * ESCALA,
                width: 60 * ESCALA,
                height: 60 * ESCALA
            }
        ),
        $(go.Shape, 'Circle',
            {
                fill: null,
                stroke: '#90A4AE',
                strokeWidth: 1 * ESCALA,
                width: 50 * ESCALA,
                height: 50 * ESCALA
            }
        )
    );
};

const createEspejoRectangularTemplate = ($) => {
    return $(go.Node, 'Spot',
        {
            locationSpot: go.Spot.Center,
            selectionAdorned: true,
            resizable: true,
            rotatable: true
        },
        new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
        new go.Binding('angle').makeTwoWay(),
        $(go.Shape, 'Rectangle',
            {
                name: 'SHAPE',
                fill: 'white',
                stroke: '#90A4AE',
                strokeWidth: 3 * ESCALA,
                width: 20 * ESCALA,
                height: 100 * ESCALA
            }
        ),
        $(go.Shape, 'Rectangle',
            {
                fill: null,
                stroke: '#B0BEC5',
                strokeWidth: 1 * ESCALA,
                width: 20 * ESCALA,
                height: 90 * ESCALA
            }
        )
    );
};

const createEspejoGrandeTemplate = ($) => {
    return $(go.Node, 'Spot',
        {
            locationSpot: go.Spot.Center,
            selectionAdorned: true,
            resizable: true,
            rotatable: true
        },
        new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
        new go.Binding('angle').makeTwoWay(),
        $(go.Shape, 'Rectangle',
            {
                name: 'SHAPE',
                fill: 'white',
                stroke: '#78909C',
                strokeWidth: 4 * ESCALA,
                width: 20 * ESCALA,
                height: 150 * ESCALA
            }
        ),
        $(go.Shape, 'Rectangle',
            {
                fill: null,
                stroke: '#B0BEC5',
                strokeWidth: 1 * ESCALA,
                width: 20 * ESCALA,
                height: 140 * ESCALA
            }
        )
    );
};

const createEspejoCuerpoEnteroTemplate = ($) => {
    return $(go.Node, 'Spot',
        {
            locationSpot: go.Spot.Center,
            selectionAdorned: true,
            resizable: true,
            rotatable: true
        },
        new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
        new go.Binding('angle').makeTwoWay(),
        $(go.Shape, 'Rectangle',
            {
                name: 'SHAPE',
                fill: 'white',
                stroke: '#CFD8DC',
                strokeWidth: 3 * ESCALA,
                width: 20 * ESCALA,
                height: 180 * ESCALA
            }
        ),
        $(go.Shape, 'Rectangle',
            {
                fill: null,
                stroke: '#90A4AE',
                strokeWidth: 1 * ESCALA,
                width: 20 * ESCALA,
                height: 170 * ESCALA
            }
        )
    );
};

const createCuadroPequenoTemplate = ($) => {
    return $(go.Node, 'Spot',
        {
            locationSpot: go.Spot.Center,
            selectionAdorned: true,
            resizable: true,
            rotatable: true
        },
        new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
        new go.Binding('angle').makeTwoWay(),
        $(go.Shape, 'Rectangle',
            {
                name: 'SHAPE',
                fill: '#BCAAA4',
                stroke: '#8D6E63',
                strokeWidth: 2 * ESCALA,
                width: 20 * ESCALA,
                height: 50 * ESCALA
            }
        ),
        $(go.Shape, 'Rectangle',
            {
                fill: '#D7CCC8',
                stroke: null,
                width: 20 * ESCALA,
                height: 40 * ESCALA
            }
        )
    );
};

const createCuadroMedianoTemplate = ($) => {
    return $(go.Node, 'Spot',
        {
            locationSpot: go.Spot.Center,
            selectionAdorned: true,
            resizable: true,
            rotatable: true
        },
        new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
        new go.Binding('angle').makeTwoWay(),
        $(go.Shape, 'Rectangle',
            {
                name: 'SHAPE',
                fill: '#A1887F',
                stroke: '#6D4C41',
                strokeWidth: 3 * ESCALA,
                width: 20 * ESCALA,
                height: 80 * ESCALA
            }
        ),
        $(go.Shape, 'Rectangle',
            {
                fill: '#D7CCC8',
                stroke: null,
                width: 20 * ESCALA,
                height: 70 * ESCALA
            }
        )
    );
};

const createCuadroGrandeTemplate = ($) => {
    return $(go.Node, 'Spot',
        {
            locationSpot: go.Spot.Center,
            selectionAdorned: true,
            resizable: true,
            rotatable: true
        },
        new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
        new go.Binding('angle').makeTwoWay(),
        $(go.Shape, 'Rectangle',
            {
                name: 'SHAPE',
                fill: '#8D6E63',
                stroke: '#6D4C41',
                strokeWidth: 4 * ESCALA,
                width: 20 * ESCALA,
                height: 120 * ESCALA
            }
        ),
        $(go.Shape, 'Rectangle',
            {
                fill: '#BCAAA4',
                stroke: null,
                width: 20 * ESCALA,
                height: 110 * ESCALA
            }
        )
    );
};

const createTripticoTemplate = ($) => {
    return $(go.Node, 'Horizontal',
        {
            locationSpot: go.Spot.Center,
            selectionAdorned: true,
            resizable: true,
            rotatable: true
        },
        new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
        new go.Binding('angle').makeTwoWay(),
        $(go.Panel, 'Spot',
            $(go.Shape, 'Rectangle',
                {
                    fill: '#8D6E63',
                    stroke: '#5D4037',
                    strokeWidth: 2 * ESCALA,
                    width: 20 * ESCALA,
                    height: 40 * ESCALA
                }
            ),
            $(go.Shape, 'Rectangle',
                {
                    fill: '#A1887F',
                    stroke: null,
                    width: 20 * ESCALA,
                    height: 45 * ESCALA
                }
            )
        ),
        $(go.Panel, 'Spot',
            {
                margin: new go.Margin(0, 5 * ESCALA, 0, 5 * ESCALA)
            },
            $(go.Shape, 'Rectangle',
                {
                    name: 'SHAPE',
                    fill: '#8D6E63',
                    stroke: '#5D4037',
                    strokeWidth: 2 * ESCALA,
                    width: 50 * ESCALA,
                    height: 40 * ESCALA
                }
            ),
            $(go.Shape, 'Rectangle',
                {
                    fill: '#A1887F',
                    stroke: null,
                    width: 20 * ESCALA,
                    height: 45 * ESCALA
                }
            )
        ),
        $(go.Panel, 'Spot',
            $(go.Shape, 'Rectangle',
                {
                    fill: '#8D6E63',
                    stroke: '#5D4037',
                    strokeWidth: 2 * ESCALA,
                    width: 20 * ESCALA,
                    height: 40 * ESCALA
                }
            ),
            $(go.Shape, 'Rectangle',
                {
                    fill: '#A1887F',
                    stroke: null,
                    width: 20 * ESCALA,
                    height: 45 * ESCALA
                }
            )
        )
    );
};

const createFotografiaEnmarcadaTemplate = ($) => {
    return $(go.Node, 'Spot',
        {
            locationSpot: go.Spot.Center,
            selectionAdorned: true,
            resizable: true,
            rotatable: true
        },
        new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
        new go.Binding('angle').makeTwoWay(),
        $(go.Shape, 'Rectangle',
            {
                name: 'SHAPE',
                fill: '#A1887F',
                stroke: '#8D6E63',
                strokeWidth: 2 * ESCALA,
                width: 30 * ESCALA,
                height: 40 * ESCALA
            }
        ),
        $(go.Shape, 'Rectangle',
            {
                fill: '#E0E0E0',
                stroke: null,
                width: 24 * ESCALA,
                height: 34 * ESCALA
            }
        )
    );
};

const createAlfombraRectangularPequeñaTemplate = ($) => {
    return $(go.Node, 'Spot',
        {
            locationSpot: go.Spot.Center,
            selectionAdorned: true,
            resizable: true,
            rotatable: true
        },
        new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
        new go.Binding('angle').makeTwoWay(),
        $(go.Shape, 'Rectangle',
            {
                name: 'SHAPE',
                fill: '#5f5b5dff',
                stroke: '#5c5358ff',
                strokeWidth: 2 * ESCALA,
                width: 100 * ESCALA,
                height: 60 * ESCALA
            }
        ),
        $(go.Shape, 'Rectangle',
            {
                fill: '#746f71ff',
                stroke: null,
                width: 90 * ESCALA,
                height: 50 * ESCALA
            }
        )
    );
};

const createAlfombraRectangularGrandeTemplate = ($) => {
    return $(go.Node, 'Spot',
        {
            locationSpot: go.Spot.Center,
            selectionAdorned: true,
            resizable: true,
            rotatable: true
        },
        new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
        new go.Binding('angle').makeTwoWay(),
        $(go.Shape, 'Rectangle',
            {
                name: 'SHAPE',
                fill: '#797474ff',
                stroke: '#7a7575ff',
                strokeWidth: 3 * ESCALA,
                width: 170 * ESCALA,
                height: 120 * ESCALA
            }
        ),
        $(go.Shape, 'Rectangle',
            {
                fill: '#797474ff',
                stroke: null,
                width: 160 * ESCALA,
                height: 110 * ESCALA
            }
        )
    );
};

const createAlfombraRedondaPequeñaTemplate = ($) => {
    return $(go.Node, 'Spot',
        {
            locationSpot: go.Spot.Center,
            selectionAdorned: true,
            resizable: true,
            rotatable: true
        },
        new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
        new go.Binding('angle').makeTwoWay(),
        $(go.Shape, 'Circle',
            {
                name: 'SHAPE',
                fill: '#8d8689ff',
                stroke: '#70696cff',
                strokeWidth: 2 * ESCALA,
                width: 80 * ESCALA,
                height: 80 * ESCALA
            }
        ),
        $(go.Shape, 'Circle',
            {
                fill: '#706a6cff',
                stroke: null,
                width: 70 * ESCALA,
                height: 70 * ESCALA
            }
        )
    );
};

const createAlfombraRedondaGrandeTemplate = ($) => {
    return $(go.Node, 'Spot',
        {
            locationSpot: go.Spot.Center,
            selectionAdorned: true,
            resizable: true,
            rotatable: true
        },
        new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
        new go.Binding('angle').makeTwoWay(),
        $(go.Shape, 'Circle',
            {
                name: 'SHAPE',
                fill: '#867e81ff',
                stroke: '#756f71ff',
                strokeWidth: 3 * ESCALA,
                width: 150 * ESCALA,
                height: 150 * ESCALA
            }
        ),
        $(go.Shape, 'Circle',
            {
                fill: '#756e71ff',
                stroke: null,
                width: 140 * ESCALA,
                height: 140 * ESCALA
            }
        )
    );
};

const createTapeteEntradaTemplate = ($) => {
    return $(go.Node, 'Spot',
        {
            locationSpot: go.Spot.Center,
            selectionAdorned: true,
            resizable: true,
            rotatable: true
        },
        new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
        new go.Binding('angle').makeTwoWay(),
        $(go.Shape, 'Rectangle',
            {
                name: 'SHAPE',
                fill: '#777174ff',
                stroke: '#880E4F',
                strokeWidth: 2 * ESCALA,
                width: 80 * ESCALA,
                height: 40 * ESCALA
            }
        ),
        $(go.Shape, 'Rectangle',
            {
                fill: '#777174ff',
                stroke: null,
                width: 74 * ESCALA,
                height: 34 * ESCALA
            }
        )
    );
};

const createJarronGrandeTemplate = ($) => {
    return $(go.Node, 'Vertical',
        {
            locationSpot: go.Spot.Center,
            selectionAdorned: true,
            resizable: true,
            rotatable: true
        },
        new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
        new go.Binding('angle').makeTwoWay(),
        $(go.Shape, 'Circle',
            {
                fill: '#7e7b79ff',
                stroke: '#837e7cff',
                strokeWidth: 2 * ESCALA,
                width: 15 * ESCALA,
                height: 15 * ESCALA
            }
        ),
        $(go.Shape, 'Ellipse',
            {
                name: 'SHAPE',
                fill: '#7a7773ff',
                stroke: '#756f6bff',
                strokeWidth: 2 * ESCALA,
                width: 25 * ESCALA,
                height: 40 * ESCALA
            }
        ),
        $(go.Shape, 'Ellipse',
            {
                fill: '#817d7aff',
                stroke: '#94908eff',
                strokeWidth: 1 * ESCALA,
                width: 20 * ESCALA,
                height: 5 * ESCALA
            }
        )
    );
};

const createJarronMedianoTemplate = ($) => {
    return $(go.Node, 'Vertical',
        {
            locationSpot: go.Spot.Center,
            selectionAdorned: true,
            resizable: true,
            rotatable: true
        },
        new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
        new go.Binding('angle').makeTwoWay(),
        $(go.Shape, 'Circle',
            {
                fill: '#7c7a77ff',
                stroke: '#79726eff',
                strokeWidth: 1 * ESCALA,
                width: 12 * ESCALA,
                height: 12 * ESCALA
            }
        ),
        $(go.Shape, 'Ellipse',
            {
                name: 'SHAPE',
                fill: '#92908dff',
                stroke: '#817b78ff',
                strokeWidth: 2 * ESCALA,
                width: 20 * ESCALA,
                height: 30 * ESCALA
            }
        ),
        $(go.Shape, 'Ellipse',
            {
                fill: '#797775ff',
                stroke: '#726f6eff',
                strokeWidth: 1 * ESCALA,
                width: 16 * ESCALA,
                height: 4 * ESCALA
            }
        )
    );
};

const createEsculturaTemplate = ($) => {
    return $(go.Node, 'Spot',
        {
            locationSpot: go.Spot.Center,
            selectionAdorned: true,
            resizable: true,
            rotatable: true
        },
        new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
        new go.Binding('angle').makeTwoWay(),
        $(go.Shape, 'Rectangle',
            {
                fill: '#9E9E9E',
                stroke: '#616161',
                strokeWidth: 1 * ESCALA,
                width: 30 * ESCALA,
                height: 10 * ESCALA
            }
        ),
        $(go.Shape, 'Rectangle',
            {
                name: 'SHAPE',
                fill: '#757575',
                stroke: '#424242',
                strokeWidth: 2 * ESCALA,
                width: 20 * ESCALA,
                height: 60 * ESCALA,
                segmentOffset: new go.Point(0, -25 * ESCALA)
            }
        ),
        $(go.Shape, 'Circle',
            {
                fill: '#616161',
                stroke: '#424242',
                strokeWidth: 1 * ESCALA,
                width: 18 * ESCALA,
                height: 18 * ESCALA,
                segmentOffset: new go.Point(0, -45 * ESCALA)
            }
        )
    );
};

const createPercheroPieTemplate = ($) => {
    return $(go.Node, 'Spot',
        {
            locationSpot: go.Spot.Center,
            selectionAdorned: true,
            resizable: true,
            rotatable: true
        },
        new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
        new go.Binding('angle').makeTwoWay(),
        $(go.Shape, 'Circle',
            {
                name: 'SHAPE',
                fill: '#6D4C41',
                stroke: '#5D4037',
                strokeWidth: 2 * ESCALA,
                width: 40 * ESCALA,
                height: 40 * ESCALA
            }
        ),
        $(go.Shape, 'Circle',
            {
                fill: '#8D6E63',
                stroke: null,
                width: 8 * ESCALA,
                height: 8 * ESCALA
            }
        ),
        $(go.Shape, 'Circle',
            {
                fill: null,
                stroke: '#5D4037',
                strokeWidth: 2 * ESCALA,
                width: 25 * ESCALA,
                height: 25 * ESCALA
            }
        )
    );
};

const createParagüeroTemplate = ($) => {
    return $(go.Node, 'Spot',
        {
            locationSpot: go.Spot.Center,
            selectionAdorned: true,
            resizable: true,
            rotatable: true
        },
        new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
        new go.Binding('angle').makeTwoWay(),
        $(go.Shape, 'Rectangle',
            {
                name: 'SHAPE',
                fill: '#78909C',
                stroke: '#546E7A',
                strokeWidth: 2 * ESCALA,
                width: 25 * ESCALA,
                height: 50 * ESCALA
            }
        ),
        $(go.Shape, 'Rectangle',
            {
                fill: '#90A4AE',
                stroke: null,
                width: 20 * ESCALA,
                height: 45 * ESCALA
            }
        )
    );
};

const createZapateroTemplate = ($) => {
    return $(go.Node, 'Spot',
        {
            locationSpot: go.Spot.Center,
            selectionAdorned: true,
            resizable: true,
            rotatable: true
        },
        new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
        new go.Binding('angle').makeTwoWay(),
        $(go.Shape, 'Rectangle',
            {
                name: 'SHAPE',
                fill: '#6D4C41',
                stroke: '#5D4037',
                strokeWidth: 2 * ESCALA,
                width: 80 * ESCALA,
                height: 35 * ESCALA
            }
        ),
        $(go.Shape, 'Rectangle',
            {
                fill: '#8D6E63',
                stroke: '#5D4037',
                strokeWidth: 1 * ESCALA,
                width: 75 * ESCALA,
                height: 12 * ESCALA,
                segmentOffset: new go.Point(0, -8 * ESCALA)
            }
        ),
        $(go.Shape, 'Rectangle',
            {
                fill: '#8D6E63',
                stroke: '#5D4037',
                strokeWidth: 1 * ESCALA,
                width: 75 * ESCALA,
                height: 12 * ESCALA,
                segmentOffset: new go.Point(0, 8 * ESCALA)
            }
        )
    );
};
const createBaulDecorativoTemplate = ($) => {
    return $(go.Node, 'Spot',
        {
            locationSpot: go.Spot.Center,
            selectionAdorned: true,
            resizable: true,
            rotatable: true
        },
        new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
        new go.Binding('angle').makeTwoWay(),
        $(go.Shape, 'Rectangle',
            {
                name: 'SHAPE',
                fill: '#5D4037',
                stroke: '#3E2723',
                strokeWidth: 2 * ESCALA,
                width: 80 * ESCALA,
                height: 50 * ESCALA
            }
        ),
        $(go.Shape, 'Rectangle',
            {
                fill: null,
                stroke: '#8D6E63',
                strokeWidth: 2 * ESCALA,
                width: 70 * ESCALA,
                height: 40 * ESCALA
            }
        ),
        $(go.Shape, 'Rectangle',
            {
                fill: '#8D6E63',
                stroke: null,
                width: 10 * ESCALA,
                height: 10 * ESCALA
            }
        )
    );
};

const createBiomboTemplate = ($) => {
    return $(go.Node, 'Horizontal',
        {
            locationSpot: go.Spot.Center,
            selectionAdorned: true,
            resizable: true,
            rotatable: true
        },
        new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
        new go.Binding('angle').makeTwoWay(),
        $(go.Shape, 'Rectangle',
            {
                fill: '#8D6E63',
                stroke: '#6D4C41',
                strokeWidth: 2 * ESCALA,
                width: 2 * ESCALA,
                height: 40 * ESCALA
            }
        ),
        $(go.Shape, 'Rectangle',
            {
                name: 'SHAPE',
                fill: '#A1887F',
                stroke: '#6D4C41',
                strokeWidth: 2 * ESCALA,
                width: 20 * ESCALA,
                height: 40 * ESCALA,
                margin: new go.Margin(0, 2 * ESCALA, 0, 2 * ESCALA)
            }
        ),
        $(go.Shape, 'Rectangle',
            {
                fill: '#8D6E63',
                stroke: '#6D4C41',
                strokeWidth: 2 * ESCALA,
                width: 2 * ESCALA,
                height: 40 * ESCALA
            }
        ),
        $(go.Shape, 'Rectangle',
            {
                fill: '#A1887F',
                stroke: '#6D4C41',
                strokeWidth: 2 * ESCALA,
                width: 20 * ESCALA,
                height: 40 * ESCALA,
                margin: new go.Margin(0, 2 * ESCALA, 0, 2 * ESCALA)
            }
        ),
        $(go.Shape, 'Rectangle',
            {
                fill: '#8D6E63',
                stroke: '#6D4C41',
                strokeWidth: 2 * ESCALA,
                width: 2 * ESCALA,
                height: 40 * ESCALA
            }
        ),
        $(go.Shape, 'Rectangle',
            {
                fill: '#A1887F',
                stroke: '#6D4C41',
                strokeWidth: 2 * ESCALA,
                width: 20 * ESCALA,
                height: 40 * ESCALA,
                margin: new go.Margin(0, 0, 0, 2 * ESCALA)
            }
        ),
        $(go.Shape, 'Rectangle',
            {
                fill: '#8D6E63',
                stroke: '#6D4C41',
                strokeWidth: 2 * ESCALA,
                width: 2 * ESCALA,
                height: 40 * ESCALA
            }
        )
    );
};

const createCortinaTemplate = ($) => {
    return $(go.Node, 'Spot',
        {
            locationSpot: go.Spot.Center,
            selectionAdorned: true,
            resizable: true,
            rotatable: true
        },
        new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
        new go.Binding('angle').makeTwoWay(),
        $(go.Shape, 'Rectangle',
            {
                name: 'SHAPE',
                fill: '#E3F2FD',
                stroke: '#90CAF9',
                strokeWidth: 1 * ESCALA,
                width: 100 * ESCALA,
                height: 5 * ESCALA
            }
        ),
        $(go.Shape, 'Rectangle',
            {
                fill: '#BBDEFB',
                stroke: null,
                width: 95 * ESCALA,
                height: 3 * ESCALA
            }
        )
    );
};

const createCestaDecorativaTemplate = ($) => {
    return $(go.Node, 'Spot',
        {
            locationSpot: go.Spot.Center,
            selectionAdorned: true,
            resizable: true,
            rotatable: true
        },
        new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
        new go.Binding('angle').makeTwoWay(),
        $(go.Shape, 'Ellipse',
            {
                name: 'SHAPE',
                fill: '#D7CCC8',
                stroke: '#A1887F',
                strokeWidth: 2 * ESCALA,
                width: 30 * ESCALA,
                height: 35 * ESCALA
            }
        ),
        $(go.Shape, 'Ellipse',
            {
                fill: '#EFEBE9',
                stroke: null,
                width: 24 * ESCALA,
                height: 28 * ESCALA
            }
        )
    );
};

const createLibrosDecorativosTemplate = ($) => {
    return $(go.Node, 'Horizontal',
        {
            locationSpot: go.Spot.Center,
            selectionAdorned: true,
            resizable: true,
            rotatable: true
        },
        new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
        new go.Binding('angle').makeTwoWay(),
        $(go.Shape, 'Rectangle',
            {
                fill: '#8D6E63',
                stroke: '#5D4037',
                strokeWidth: 1 * ESCALA,
                width: 8 * ESCALA,
                height: 25 * ESCALA
            }
        ),
        $(go.Shape, 'Rectangle',
            {
                name: 'SHAPE',
                fill: '#A1887F',
                stroke: '#6D4C41',
                strokeWidth: 1 * ESCALA,
                width: 10 * ESCALA,
                height: 25 * ESCALA,
                margin: new go.Margin(0, 1 * ESCALA, 0, 1 * ESCALA)
            }
        ),
        $(go.Shape, 'Rectangle',
            {
                fill: '#6D4C41',
                stroke: '#5D4037',
                strokeWidth: 1 * ESCALA,
                width: 7 * ESCALA,
                height: 25 * ESCALA,
                margin: new go.Margin(0, 1 * ESCALA, 0, 0)
            }
        ),
        $(go.Shape, 'Rectangle',
            {
                fill: '#BCAAA4',
                stroke: '#8D6E63',
                strokeWidth: 1 * ESCALA,
                width: 9 * ESCALA,
                height: 25 * ESCALA,
                margin: new go.Margin(0, 0, 0, 1 * ESCALA)
            }
        )
    );
};

const createCojinesDecorativosTemplate = ($) => {
    return $(go.Node, 'Spot',
        {
            locationSpot: go.Spot.Center,
            selectionAdorned: true,
            resizable: true,
            rotatable: true
        },
        new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
        new go.Binding('angle').makeTwoWay(),
        $(go.Shape, 'RoundedRectangle',
            {
                name: 'SHAPE',
                fill: '#a39c9fff',
                stroke: '#8d8588ff',
                strokeWidth: 2 * ESCALA,
                width: 40 * ESCALA,
                height: 40 * ESCALA,
                parameter1: 5 * ESCALA
            }
        ),
        $(go.Shape, 'RoundedRectangle',
            {
                fill: '#76747aff',
                stroke: '#7f7c85ff',
                width: 35 * ESCALA,
                height: 35 * ESCALA,
                parameter1: 4 * ESCALA
            }
        )
    );
};

export const registerDecoracionTemplates = (diagram, $) => {
    diagram.nodeTemplateMap.add('EspejoRedondo', createEspejoRedondoTemplate($));
    diagram.nodeTemplateMap.add('EspejoRectangular', createEspejoRectangularTemplate($));
    diagram.nodeTemplateMap.add('EspejoGrande', createEspejoGrandeTemplate($));
    diagram.nodeTemplateMap.add('EspejoCuerpoEntero', createEspejoCuerpoEnteroTemplate($));
    diagram.nodeTemplateMap.add('CuadroPequeño', createCuadroPequenoTemplate($));
    diagram.nodeTemplateMap.add('CuadroMediano', createCuadroMedianoTemplate($));
    diagram.nodeTemplateMap.add('CuadroGrande', createCuadroGrandeTemplate($));
    diagram.nodeTemplateMap.add('Triptico', createTripticoTemplate($));
    diagram.nodeTemplateMap.add('FotografiaEnmarcada', createFotografiaEnmarcadaTemplate($));
    diagram.nodeTemplateMap.add('AlfombraRectangularPequeña', createAlfombraRectangularPequeñaTemplate($));
    diagram.nodeTemplateMap.add('AlfombraRectangularGrande', createAlfombraRectangularGrandeTemplate($));
    diagram.nodeTemplateMap.add('AlfombraRedondaPequeña', createAlfombraRedondaPequeñaTemplate($));
    diagram.nodeTemplateMap.add('AlfombraRedondaGrande', createAlfombraRedondaGrandeTemplate($));
    diagram.nodeTemplateMap.add('TapeteEntrada', createTapeteEntradaTemplate($));
    diagram.nodeTemplateMap.add('JarronGrande', createJarronGrandeTemplate($));
    diagram.nodeTemplateMap.add('JarronMediano', createJarronMedianoTemplate($));
    diagram.nodeTemplateMap.add('Escultura', createEsculturaTemplate($));
    diagram.nodeTemplateMap.add('PercheroPie', createPercheroPieTemplate($));
    diagram.nodeTemplateMap.add('Paragüero', createParagüeroTemplate($));
    diagram.nodeTemplateMap.add('Zapatero', createZapateroTemplate($));
    diagram.nodeTemplateMap.add('BaulDecorativo', createBaulDecorativoTemplate($));
    diagram.nodeTemplateMap.add('Biombo', createBiomboTemplate($));
    diagram.nodeTemplateMap.add('Cortina', createCortinaTemplate($));
    diagram.nodeTemplateMap.add('CestaDecorativa', createCestaDecorativaTemplate($));
    diagram.nodeTemplateMap.add('LibrosDecorativos', createLibrosDecorativosTemplate($));
    diagram.nodeTemplateMap.add('CojinesDecorativos', createCojinesDecorativosTemplate($));
};

export const decoracionObjects = [
    { category: 'EspejoRedondo', name: 'Espejo Redondo', label: 'Espejo Redondo', preview: '🪞' },
    { category: 'EspejoRectangular', name: 'Espejo Rectangular', label: 'Espejo Rectangular', preview: '🪞' },
    { category: 'EspejoGrande', name: 'Espejo Grande', label: 'Espejo Grande', preview: '🪞' },
    { category: 'EspejoCuerpoEntero', name: 'Espejo de Cuerpo Entero', label: 'Espejo Cuerpo', preview: '🪞' },
    { category: 'CuadroPequeño', name: 'Cuadro Pequeño', label: 'Cuadro Pequeño', preview: '🖼️' },
    { category: 'CuadroMediano', name: 'Cuadro Mediano', label: 'Cuadro Mediano', preview: '🖼️' },
    { category: 'CuadroGrande', name: 'Cuadro Grande', label: 'Cuadro Grande', preview: '🖼️' },
    { category: 'Triptico', name: 'Tríptico', label: 'Tríptico', preview: '🖼️' },
    { category: 'FotografiaEnmarcada', name: 'Fotografía Enmarcada', label: 'Fotografía', preview: '📷' },
    { category: 'AlfombraRectangularPequeña', name: 'Alfombra Rectangular Pequeña', label: 'Alfombra Rect. Peq.', preview: '🟥' },
    { category: 'AlfombraRectangularGrande', name: 'Alfombra Rectangular Grande', label: 'Alfombra Rect. Grande', preview: '🟥' },
    { category: 'AlfombraRedondaPequeña', name: 'Alfombra Redonda Pequeña', label: 'Alfombra Red. Peq.', preview: '🔴' },
    { category: 'AlfombraRedondaGrande', name: 'Alfombra Redonda Grande', label: 'Alfombra Red. Grande', preview: '🔴' },
    { category: 'TapeteEntrada', name: 'Tapete de Entrada', label: 'Tapete', preview: '▬' },
    { category: 'JarronGrande', name: 'Jarrón Grande', label: 'Jarrón Grande', preview: '🏺' },
    { category: 'JarronMediano', name: 'Jarrón Mediano', label: 'Jarrón Mediano', preview: '🏺' },
    { category: 'Escultura', name: 'Escultura', label: 'Escultura', preview: '🗿' },
    { category: 'PercheroPie', name: 'Perchero de Pie', label: 'Perchero', preview: '🧥' },
    { category: 'Paragüero', name: 'Paragüero', label: 'Paragüero', preview: '☂️' },
    { category: 'Zapatero', name: 'Zapatero', label: 'Zapatero', preview: '👞' },
    { category: 'BaulDecorativo', name: 'Baúl Decorativo', label: 'Baúl', preview: '🧳' },
    { category: 'Biombo', name: 'Biombo', label: 'Biombo', preview: '🚪' },
    { category: 'Cortina', name: 'Cortina', label: 'Cortina', preview: '🪟' },
    { category: 'CestaDecorativa', name: 'Cesta Decorativa', label: 'Cesta', preview: '🧺' },
    { category: 'LibrosDecorativos', name: 'Libros Decorativos', label: 'Libros', preview: '📚' },
    { category: 'CojinesDecorativos', name: 'Cojines Decorativos', label: 'Cojines', preview: '⬜' }
];

export const decoracionPanelTitle = 'Decoración';