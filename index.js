function Parabola1() {

    var board = JXG.JSXGraph.initBoard('graph', {
        boundingbox: [-5, 5, 5, -5], label: true, axis: true, showClearTraces: true, showCopyright: false, autoPosition: true, strokeWidth: 5, lastArrow: true, firstArrow: true,
        zoom: { factorX: 1.25, factorY: 1.25, wheel: true, needshift: false },
        pan: {
            enabled: true,   // Allow panning
            needTwoFingers: false, // panningis done with two fingers on touch devices
            needshift: false, // mouse panning needs pressing of the shift key
        }, keepAspectRatio: true,
        defaultAxes: {
            x: { name: 'X', withLabel: true, size: 3, label: { position: 'rt', offset: [-10, 10] } },
            y: { name: 'Y', withLabel: true, size: 3, label: { position: 'rt', offset: [10, -10] } }
        }
    }),

        //New graph for data 
        b1 = JXG.JSXGraph.initBoard('graph1', { boundingbox: [0.5, 17, 7, -15], axis: false, grid: false, showNavigation: false, showCopyright: false }),
        b2 = JXG.JSXGraph.initBoard('graph2', { boundingbox: [-5, 4, 8, 0], axis: false, grid: false, showNavigation: false, showCopyright: false }),

        t = b2.create('text', [-3.7, 3, function () { return "\\[ \\mathbf {General \\ Equation}\\]" }], { fontSize: 14, useMathJax: true, fixed: true, strokeColor: '#0070C0' }),
        t = b2.create('text', [3, 3, function () { return "\\[ \\mathbf {Standard \\ Equation}\\]" }], { fontSize: 14, useMathJax: true, fixed: true, strokeColor: '#0070C0' }),

        butt = b2.create('button', [-4.5, 1, 'Opening Y-axis', function () { GeneralY() }]),
        butt1 = b2.create('button', [-2, 1, 'Opening X-axis', function () { GeneralX() }]),
        butt3 = b2.create('button', [2.5, 1, ' Opening Y-axis', function () { StandardY() }]),
        butt2 = b2.create('button', [5, 1, 'Opening X-axis', function () { StandardX() }]);

    StandardY()

    b2.renderer.container.style.backgroundColor = '#fef8dd'
    b2.addChild(b1)
}

function GeneralY() {

    var board = JXG.JSXGraph.initBoard('graph', {
        boundingbox: [-5, 5, 5, -5], label: true, axis: true, showClearTraces: true, showCopyright: false, autoPosition: true, strokeWidth: 5, lastArrow: true, firstArrow: true,
        zoom: { factorX: 1.25, factorY: 1.25, wheel: true, needshift: false },
        pan: {
            enabled: true,   // Allow panning
            needTwoFingers: false, // panningis done with two fingers on touch devices
            needshift: false, // mouse panning needs pressing of the shift key
        }, keepAspectRatio: true,
        defaultAxes: {
            x: { name: 'X', withLabel: true, size: 3, label: { position: 'rt', offset: [-10, 10] } },
            y: { name: 'Y', withLabel: true, size: 3, label: { position: 'rt', offset: [10, -10] } }
        }
    }),

        //New graph for data 
        b1 = JXG.JSXGraph.initBoard('graph1', { boundingbox: [0.5, 17, 7, -15], axis: false, grid: false, showNavigation: false, showCopyright: false, }),

        a = b1.create('slider', [[1, -10.5], [5.5, -10.5], [-10, 1, 10]], {
            name: 'a', snapWidth: 0.25,
            baseline: { strokeColor: '#afafaf' },
            highline: { strokeColor: '#094a82' },
            fillColor: '#afafaf',
            label: { fontSize: 2.5, strokeColor: 'bleck', fontUnit: 'vmin' },
        }),
        b = b1.create('slider', [[1, -12], [5.5, -12], [-10, 2, 10]], {
            name: 'b', snapWidth: 0.25, baseline: { strokeColor: '#afafaf' }, highline: { strokeColor: '#094a82' },
            fillColor: '#afafaf',
            label: { fontSize: 2.5, strokeColor: 'bleck', fontUnit: 'vmin' }
        }),
        c = b1.create('slider', [[1, -13.5], [5.5, -13.5], [-10, -1, 10]], {
            name: 'c', snapWidth: 0.25, baseline: { strokeColor: '#afafaf' },
            highline: { strokeColor: '#094a82' },
            fillColor: '#afafaf',
            label: { fontSize: 2.5, strokeColor: 'bleck', fontUnit: 'vmin' }
        }),


        //creat Input filed for a,b,c


        // creat a parabola grpah in board 
        L = board.create('functiongraph', [function (y) { return a.Value() * y * y + b.Value() * y + c.Value() }], { strokeWidth: 3, dragToTopOfLayer: true, strokeColor: '#002060' }),


        v = board.create('point', [function () { return ((-b.Value() / (2 * a.Value()))) },
        function () { return ((4 * a.Value() * c.Value() - b.Value() * b.Value()) / (4 * a.Value())); }],
            { name: 'V', Color: 'green', size: 3, label: { autoPosition: true, offset: [10, 10] } }),

        f = board.create('point', [function () { return ((-b.Value() / (2 * a.Value()))) },
        function () { return ((1 / (4 * a.Value())) * (4 * a.Value() * c.Value() - b.Value() * b.Value() + 1)) }],
            { name: 'F', Color: '#C42A56', size: 3, label: { autoPosition: true, offset: [10, 10] } }),

        AX = board.create('line', [v, f], { dash: 4, strokeWidth: 2, strokeColor: '#F67000' }),


        l1 = board.create('line', [[0, 0], [1, 0]], { fixed: true, visible: true, color: 'bluck', lastArrow: true, firstArrow: true, highlightStrokeColor: 'removes highlighting' }),
        l2 = board.create('line', [[0, 0], [0, 1]], { fixed: true, visible: true, color: 'bluck', lastArrow: true, firstArrow: true, highlightStrokeColor: 'removes highlighting' }),

        //creat intesection point 
        p1 = board.create('intersection', [l1, L, 0], { name: 'x_1', size: 3, Color: '#03A89E', label: { autoPosition: true, offset: [10, 10] } }),
        p2 = board.create('intersection', [l1, L, 1], { name: 'x_2', size: 3, Color: '#03A89E', label: { autoPosition: true, offset: [10, 10] } }),
        p3 = board.create('intersection', [l2, L, 0], { name: 'y_1', size: 3, Color: '#0000FF', label: { autoPosition: true, offset: [10, 10] } }),

        q = board.create('line', [[0, function () { return (2 * v.Y() - f.Y()) }], [1, function () { return (2 * v.Y() - f.Y()) }]], { strokeWidth: 2, dragToTopOfLayer: true, strokeColor: '#8F00FF', lastArrow: true, firstArrow: true }),
        p = board.create('point', [function () { return v.X() }, function () { return (2 * v.Y() - f.Y()) }], { size: 0, name: 'D', strokeColor: 'black', label: { autoPosition: true, offset: [10, 10] } }),
        D = board.create('point', [0, function () { return (2 * v.Y() - f.Y()) }], { size: 0, name: '', strokeColor: 'black', label: { autoPosition: true, offset: [10, 10] } }),

        //Creat a All text in graph 
        t = b1.create('text', [2.5, 15, function () { return "\\[ \\mathbf {Interpretation}\\]" }], { fontSize: 18, useMathJax: true, fixed: true, strokeColor: '#0070C0' }),
        t = b1.create('text', [1, 13, "\\[\\mathbf{The \\ general \\ equation \\ of \\  parabola\\ is}\\]"], { fontSize: 15, useMathJax: true, fixed: true }),
        t = b1.create('text', [1, 11.5, "\\[\\mathbf{y= a\\ x^{2}+ b \\ x +c \\ with \\ a,b,c \\in \\:\\mathbb{R}}\\]"], { fontSize: 15, useMathJax: true, fixed: true, strokeColor: '#002060' }),
        t = b1.create('text', [1, 10, function () {
            if (a.Value() == 0) {
                return "\\[\\mathbf{ When \\ a=0, \\ the \\ equation \\ of \\ a \\ line\\ on \\ a \\ screen \\ is}\\]"
            }
            else {
                return "\\[\\mathbf{The \\ equation \\ of \\ a \\ parabola\\ on \\ a \\ screen \\ is}\\]"
            }
        }], { fontSize: 15, useMathJax: true, fixed: true }),
        t = b1.create('text', [1, 8.5, function () { return "\\[\\mathbf{y = " + a.Value().toFixed(2) + '\\ x^2 + ' + '(' + b.Value().toFixed(2) + ')' + ' \\ x  + ' + '(' + c.Value().toFixed(2) + ')}\\]' }], { fontSize: 15, useMathJax: true, fixed: true, strokeColor: '#002060' }),
        t = b1.create('text', [1, 7, function () { return "\\[ \\mathbf {Domain:\\ \\left\\{ x \\ | \\ x \\in \\:\\mathbb{R} \\right\\}} \\]" }], { fontSize: 15, useMathJax: true, fixed: true, strokeColor: '#8B27DD' }),
        t = b1.create('text', [1, 5.5, function () {
            if (a.Value() < 0) {
                return "\\[ \\mathbf {Range:\\ \\left\\{ y\\ | \\ y \\le " + v.Y().toFixed(4) + "\\right\\}} \\]"
            }
            else if (a.Value() > 0) {
                return "\\[ \\mathbf {Range:\\ \\left\\{ y\\ | \\ y \\ge " + v.Y().toFixed(4) + "\\right\\}} \\]"
            }
            else if (a.Value() == 0 && b.Value() != 0) {
                return "\\[ \\mathbf {Range:\\ \\left\\{ y\\ | \\ y \\in \\:\\mathbb{R} \\right\\}} \\]"
            }
            else if (a.Value() == 0 && b.Value() == 0) {
                return "\\[ \\mathbf {Range:\\ \\left\\{ y\\ | \\ y = " + c.Value().toFixed(2) + "\\right\\}} \\]"
            }
        }], { fontSize: 15, useMathJax: true, fixed: true, strokeColor: '#f7b32bff' }),


        t = b1.create('text', [1, 4, function () {
            if (a.Value() == 0) {
                return '\\[ \\mathbf { Vertex \\ (V) :' + NaN + '}\\]'
            }
            else {
                return '\\[ \\mathbf { Vertex \\ (V) :  \\left(' + v.X().toFixed(4) + " , " + v.Y().toFixed(4) + '\\right ) }\\]'
            }
        }], { fontSize: 15, useMathJax: true, fixed: true, strokeColor: '#008000' }),
        t = b1.create('text', [1, 2.5, function () { return "\\[ \\mathbf {X-intercept: x_1 :( " + p1.X().toFixed(4) + " , " + p1.Y() + ' )' + "  ,x_2:  " + "( " + p2.X().toFixed(4) + " , " + p2.Y() + ' )}\\]' }], { fontSize: 15, useMathJax: true, fixed: true, strokeColor: '#03A89E' }),
        t = b1.create('text', [1, 1, function () { return "\\[ \\mathbf {Y-intercept:y_1 : ( " + p3.X() + " , " + p3.Y().toFixed(2) + ' )}\\]' }], { fontSize: 15, useMathJax: true, fixed: true, strokeColor: '#0000FF' }),
        t = b1.create('text', [1, -0.5, function () {
            if (a.Value() == 0) {
                return "\\[ \\mathbf {Axis \\ of \\ symmetry \\ : \\ " + NaN + '}\\]'
            }
            else {
                return "\\[ \\mathbf {Axis \\ of \\ symmetry \\ : \\ x \\ =  " + f.X().toFixed(4) + '}\\]'
            }
        }], { fontSize: 15, useMathJax: true, fixed: true, strokeColor: '#F67000' }),
        t = b1.create('text', [1, -2, function () {
            if (a.Value() == 0) {
                return '\\[ \\mathbf { Focus \\ (F) :' + NaN + '}\\]'
            }
            else {
                return " \\[ \\mathbf { Focus \\ (F) : \\left(" + f.X().toFixed(4) + " , " + f.Y().toFixed(4) + ' \\right)}\\]'
            }
        }], { fontSize: 15, useMathJax: true, fixed: true, strokeColor: '#C42A56' }),
        t = b1.create('text', [1, -3.5, function () {
            if (a.Value() == 0) {
                return "\\[ \\mathbf {Directrix \\ (D):\\  " + NaN + '}\\]'
            }
            return "\\[ \\mathbf {Directrix \\ (D):\\ y \\ = " + D.Y().toFixed(4) + '}\\]'
        }], { fontSize: 15, useMathJax: true, fixed: true, strokeColor: '#8F00FF' }),
        t = b1.create('text', [1, -5, function () {
            if (a.Value() == 0) {
                return "\\[ \\mathbf {Focal \\ length :" + NaN + '}\\]'
            }
            else {
                return "\\[ \\mathbf {Focal \\ length :" + Math.abs(v.Y() - f.Y()).toFixed(4) + '}\\]'
            }
        }], { fontSize: 15, useMathJax: true, fixed: true, strokeColor: '#8E6C00' }),
        t = b1.create('text', [1, -6.5, function () { return "\\[ \\mathbf {Eccentricity: Always \\ 1}\\]" }], { fontSize: 15, useMathJax: true, fixed: true, strokeColor: '#0070C0' }),
        t = b1.create('text', [3, -9, function () { return "\\[ \\mathbf {Input \\ sliders}\\]" }], { fontSize: 15, useMathJax: true, fixed: true, strokeColor: '#0070C0' }),

        //create a marking point 
        tp = b1.create('point', [0.8, 13], { name: '', face: '<>', size: 4, showInfobox: false, fixed: true, color: 'bleck' }),
        tp = b1.create('point', [0.8, 7], { name: '', face: '<>', size: 4, showInfobox: false, fixed: true, color: 'bleck' }),
        tp = b1.create('point', [0.8, 5.5], { name: '', face: '<>', size: 4, showInfobox: false, fixed: true, color: 'bleck' }),
        tp = b1.create('point', [0.8, 4], { name: '', face: '<>', size: 4, showInfobox: false, fixed: true, color: 'bleck' }),
        tp = b1.create('point', [0.8, 2.5], { name: '', face: '<>', size: 4, showInfobox: false, fixed: true, color: 'bleck' }),
        tp = b1.create('point', [0.8, 1], { name: '', face: '<>', size: 4, showInfobox: false, fixed: true, color: 'bleck' }),
        tp = b1.create('point', [0.8, -0.5], { name: '', face: '<>', size: 4, showInfobox: false, fixed: true, color: 'bleck' }),
        tp = b1.create('point', [0.8, -2], { name: '', face: '<>', size: 4, showInfobox: false, fixed: true, color: 'bleck' }),
        tp = b1.create('point', [0.8, -3.5], { name: '', face: '<>', size: 4, showInfobox: false, fixed: true, color: 'bleck' }),
        tp = b1.create('point', [0.8, -5], { name: '', face: '<>', size: 4, showInfobox: false, fixed: true, color: 'bleck' }),
        tp = b1.create('point', [0.8, -6.5], { name: '', face: '<>', size: 4, showInfobox: false, fixed: true, color: 'bleck' }),
        l1 = b1.create('line', [[0.8, -8], [0.7, -8]], { fixed: true, color: 'blue' })

    //create notification on the graph  
    p1.on('over', function (e) { document.getElementById('myOutput').innerHTML = "X- intesect point is x<sub>1</sub> : ( " + p1.X().toFixed(4) + " , " + p1.Y() + ' )'; });
    p1.on('out', function (e) { document.getElementById('myOutput').innerHTML = 'Click in other points'; });

    p2.on("over", function (e) { document.getElementById('myOutput').innerHTML = (" X-intercept point is x<sub>2</sub> :  " + "( " + p2.X().toFixed(4) + " , " + p2.Y() + ' )'); });
    p2.on('out', function (e) { document.getElementById('myOutput').innerHTML = 'Click in other points'; });

    p3.on("over", function (e) { document.getElementById('myOutput').innerHTML = (" Y-intercept point is y<sub>1</sub> : ( " + p3.X() + " , " + p3.Y().toFixed(2) + ' )'); });
    p3.on('out', function (e) { document.getElementById('myOutput').innerHTML = 'Click in other points'; });

    q.on("over", function (e) { document.getElementById('myOutput').innerHTML = (" Directrix (D) : y  = " + D.Y().toFixed(4)) });
    q.on('out', function (e) { document.getElementById('myOutput').innerHTML = 'Click in other points'; });

    v.on("over", function (e) { document.getElementById('myOutput').innerHTML = (" Vertex (V) :  (" + v.X().toFixed(4) + " , " + v.Y().toFixed(4) + ')') });
    v.on('out', function (e) { document.getElementById('myOutput').innerHTML = 'Click in other points'; });


    f.on("over", function (e) { document.getElementById('myOutput').innerHTML = (" Focus (F) : ( " + f.X().toFixed(4) + "  ,  " + f.Y().toFixed(4) + "  )") });
    f.on('out', function (e) { document.getElementById('myOutput').innerHTML = 'Click in other points'; });

    L.on("over", function (e) { document.getElementById('myOutput').innerHTML = (" The equation of parabola is : y = " + a.Value().toFixed(2) + ' x<sup>2</sup> + ' + '(' + b.Value().toFixed(2) + ')' + ' x  + ' + '(' + c.Value().toFixed(2) + '))') });
    L.on('out', function (e) { document.getElementById('myOutput').innerHTML = 'Click in other points'; });

    AX.on("over", function (e) { document.getElementById('myOutput').innerHTML = (" Axis of symmetry :  x  =  " + f.X().toFixed(4)) });
    AX.on('out', function (e) { document.getElementById('myOutput').innerHTML = 'Click in other points'; });





    //b1.renderer.container.style.backgroundColor = '#d7d7d8',
    p1.label.setProperty({ fontSize: 20, strokeColor: '#03A89E' }),
        p2.label.setProperty({ fontSize: 20, strokeColor: '#03A89E' }),
        p3.label.setProperty({ fontSize: 20, strokeColor: '#0000FF' }),
        v.label.setProperty({ fontSize: 20, strokeColor: '#008000' }),
        f.label.setProperty({ fontSize: 20, strokeColor: '#C42A56' }),
        p.label.setProperty({ fontSize: 20, strokeColor: '#8F00FF' });
    b1.addChild(board);

    board.update();


}

//General eq oping at X- axis graph 
function GeneralX() {
    var board = JXG.JSXGraph.initBoard('graph', {
        boundingbox: [-5, 5, 5, -5], label: true, axis: true, showClearTraces: true, showCopyright: false, autoPosition: true, strokeWidth: 5, lastArrow: true, firstArrow: true,
        zoom: { factorX: 1.25, factorY: 1.25, wheel: true, needshift: false },
        pan: {
            enabled: true,   // Allow panning
            needTwoFingers: false, // panningis done with two fingers on touch devices
            needshift: false, // mouse panning needs pressing of the shift key
        }, keepAspectRatio: true,
        defaultAxes: {
            x: { name: 'X', withLabel: true, size: 3, label: { position: 'rt', offset: [-10, 10] } },
            y: { name: 'Y', withLabel: true, size: 3, label: { position: 'rt', offset: [10, -10] } }
        }
    }),

        //New graph for data 
        b1 = JXG.JSXGraph.initBoard('graph1', { boundingbox: [0.5, 17, 7, -15], axis: false, grid: false, showNavigation: false, showCopyright: false, }),

        a = b1.create('slider', [[1, -10.5], [5.5, -10.5], [-10, 1, 10]], {
            name: 'a', snapWidth: 0.25,
            baseline: { strokeColor: '#afafaf' },
            highline: { strokeColor: '#094a82' },
            fillColor: '#afafaf',
            label: { fontSize: 2.5, strokeColor: 'bleck', fontUnit: 'vmin' },
        }),
        b = b1.create('slider', [[1, -12], [5.5, -12], [-10, 2, 10]], {
            name: 'b', snapWidth: 0.25, baseline: { strokeColor: '#afafaf' }, highline: { strokeColor: '#094a82' },
            fillColor: '#afafaf',
            label: { fontSize: 2.5, strokeColor: 'bleck', fontUnit: 'vmin' }
        }),
        c = b1.create('slider', [[1, -13.5], [5.5, -13.5], [-10, -1, 10]], {
            name: 'c', snapWidth: 0.25, baseline: { strokeColor: '#afafaf' },
            highline: { strokeColor: '#094a82' },
            fillColor: '#afafaf',
            label: { fontSize: 2.5, strokeColor: 'bleck', fontUnit: 'vmin' }
        }),

        // creat a parabola grpah in board 
        L = board.create('functiongraph', [function (x) {
            if (a.Value() == 0 && b.Value() !== 0) { return ((1 / b.Value()) * (x - c.Value())) }
            else if (a.Value() == 0 && b.Value() == 0) {
                return c.Value()
            }
            else {
                return [(1 / (2 * a.Value())) * (-b.Value() + Math.sqrt(b.Value() * b.Value() - 4 * a.Value() * (c.Value() - x)))]
            }
        }], { strokeWidth: 3, dragToTopOfLayer: true, strokeColor: '#002060' }),

        L1 = board.create('functiongraph', [function (x) {
            return [(1 / (2 * a.Value())) * (-b.Value() - Math.sqrt(b.Value() * b.Value() - 4 * a.Value() * (c.Value() - x)))]
        }], { strokeWidth: 3, dragToTopOfLayer: true, strokeColor: '#002060' }),


        v = board.create('point', [function () { return ((c.Value() - (b.Value() * b.Value() / (4 * a.Value())))) },
        function () { return (-b.Value() / (2 * a.Value())) }],
            { name: 'V', Color: 'green', size: 3, label: { autoPosition: true, offset: [10, 10] } }),

        f = board.create('point', [function () { return ((c.Value() - (b.Value() * b.Value() / (4 * a.Value()))) + 1 / 4 * a.Value()) },
        function () { return (-b.Value() / (2 * a.Value())) }],
            { name: 'F', Color: '#C42A56', size: 3, label: { autoPosition: true, offset: [10, 10] } }),

        AX = board.create('line', [v, f], { dash: 4, strokeWidth: 2, strokeColor: '#F67000' }),


        l1 = board.create('line', [[0, 0], [1, 0]], { fixed: true, visible: true, color: 'bluck', lastArrow: true, firstArrow: true, highlightStrokeColor: 'removes highlighting' }),
        l2 = board.create('line', [[0, 0], [0, 1]], { fixed: true, visible: true, color: 'bluck', lastArrow: true, firstArrow: true, highlightStrokeColor: 'removes highlighting' }),

        //creat intesection point 
        p1 = board.create('intersection', [l1, L, 0], { name: 'x_1', size: 3, Color: '#03A89E', label: { autoPosition: true, offset: [10, 10] } }),
        p4 = board.create('intersection', [l1, L1, 0], { name: 'x_1', size: 3, Color: '#03A89E', label: { autoPosition: true, offset: [10, 10] } }),
        p5 = board.create('point', [function () {
            if (b.Value() === 0) {
                return v.X()
            }
        }, function () {
            if (b.Value() === 0) {
                return v.Y()
            }
        }], { name: 'x_1', size: 3, Color: '#03A89E', label: { autoPosition: true, offset: [10, 10] } }),

        p2 = board.create('intersection', [l2, L, 0], { name: 'y_1', size: 3, Color: '#0000FF', label: { autoPosition: true, offset: [10, 10] } }),
        p3 = board.create('intersection', [l2, L1, 0], { name: 'y_2', size: 3, Color: '#0000FF', label: { autoPosition: true, offset: [10, 10] } }),

        q = board.create('line', [[function () { return (2 * v.X() - f.X()) }, 0], [function () { return (2 * v.X() - f.X()) }, 1]], { strokeWidth: 2, dragToTopOfLayer: true, strokeColor: '#8F00FF', lastArrow: true, firstArrow: true }),
        p = board.create('point', [function () { return (2 * v.X() - f.X()) }, function () { return v.Y() }], { size: 0, name: 'D', strokeColor: 'black', label: { autoPosition: true, offset: [10, 10] } }),
        D = board.create('point', [function () { return (2 * v.X() - f.X()) }, 0], { size: 0, name: '', strokeColor: 'black', label: { autoPosition: true, offset: [10, 10] } }),

        //Creat a All text in graph 
        t = b1.create('text', [2.5, 15, function () { return "\\[ \\mathbf {Interpretation}\\]" }], { fontSize: 18, useMathJax: true, fixed: true, strokeColor: '#0070C0' }),
        t = b1.create('text', [1, 13, "\\[\\mathbf{The \\ general \\ equation \\ of \\  parabola\\ is}\\]"], { fontSize: 15, useMathJax: true, fixed: true }),
        t = b1.create('text', [1, 11.5, "\\[\\mathbf{x= a\\ y^{2}+ b \\ y +c \\ with \\ a,b,c \\in \\:\\mathbb{R}}\\]"], { fontSize: 15, useMathJax: true, fixed: true, strokeColor: '#002060' }),
        t = b1.create('text', [1, 10, function () {
            if (a.Value() == 0) {
                return "\\[\\mathbf{ When \\ a=0, \\ the \\ equation \\ of \\ a \\ line\\ on \\ a \\ screen \\ is}\\]"
            }
            else {
                return "\\[\\mathbf{The \\ equation \\ of \\ a \\ parabola\\ on \\ a \\ screen \\ is}\\]"
            }
        }], { fontSize: 15, useMathJax: true, fixed: true }),
        t = b1.create('text', [1, 8.5, function () { return "\\[\\mathbf{x = " + a.Value().toFixed(2) + '\\ y^2 + ' + '(' + b.Value().toFixed(2) + ')' + ' \\ y  + ' + '(' + c.Value().toFixed(2) + ')}\\]' }], { fontSize: 15, useMathJax: true, fixed: true, strokeColor: '#002060' }),
        t = b1.create('text', [1, 7, function () {
            if (a.Value() < 0) {
                return "\\[ \\mathbf {Domain:\\{ x \\ | \\ x \\le " + v.X().toFixed(2) + "\\}} \\]"
            }
            else if (a.Value() > 0) {
                return "\\[ \\mathbf {Domain:\\{ x \\ | \\ x \\ge " + v.X().toFixed(2) + "\\}} \\]"
            }
            else if (a.Value() == 0 && b.Value() != 0) {
                return "\\[ \\mathbf {Domain:\\{ x \\ | \\ x \\in \\:\\mathbb{R} \\}} \\]"
            }
            else if (a.Value() == 0 && b.Value() == 0) {
                return "\\[ \\mathbf {Domain:\\{ x \\ | \\ x =" + c.Value() + "\\}} \\]"
            }
        }], { fontSize: 15, useMathJax: true, fixed: true, strokeColor: '#8B27DD' }),
        t = b1.create('text', [1, 5.5, function () {
            return "\\[ \\mathbf {Range:\\{ y \\ | \\ y \\in \\:\\mathbb{R} \\}} \\]"

        }], { fontSize: 15, useMathJax: true, fixed: true, strokeColor: '#f7b32bff' }),


        t = b1.create('text', [1, 4, function () {
            if (a.Value() == 0) {
                return '\\[ \\mathbf { Vertex \\ (V) :' + NaN + '}\\]'
            }
            else {
                return '\\[ \\mathbf { Vertex \\ (V) :  \\left(' + v.X().toFixed(4) + " , " + v.Y().toFixed(4) + '\\right ) }\\]'
            }
        }], { fontSize: 15, useMathJax: true, fixed: true, strokeColor: '#008000' }),
        t = b1.create('text', [1, 2.5, function () {
            if (isNaN(p1.X())) {
                return "\\[ \\mathbf {X-intercept: x_1 :( " + (dummy(v.X().toFixed(4))) + " , " + (dummy(v.Y().toFixed(2))) + '\\ )}\\]'
            }
            else if (b.Value() == 0) {
                return "\\[ \\mathbf {X-intercept: x_1 :( " + (dummy(p4.X().toFixed(4))) + " , " + (dummy(p4.Y().toFixed(2))) + '\\ )}\\]'
            }
            else {
                return "\\[ \\mathbf {X-intercept: x_1 :( " + (dummy(p1.X().toFixed(4))) + " , " + (dummy(p1.Y().toFixed(2))) + '\\ )}\\]'
            }
        }], { fontSize: 15, useMathJax: true, fixed: true, strokeColor: '#03A89E' }),

        t = b1.create('text', [1, 1, function () { return "\\[ \\mathbf {Y-intercept:y_1 : (" + p2.X().toFixed(1) + " , " + (dummy(p2.Y().toFixed(4))) + ' ),y_2 : (' + p3.X().toFixed(1) + ', ' + (dummy(p3.Y().toFixed(4))) + ' )}\\]' }], { fontSize: 15, useMathJax: true, fixed: true, strokeColor: '#0000FF' }),
        t = b1.create('text', [1, -0.5, function () {
            if (a.Value() == 0) {
                return "\\[ \\mathbf {Axis \\ of \\ symmetry \\ : \\   " + NaN + '}\\]'
            }
            else {
                return "\\[ \\mathbf {Axis \\ of \\ symmetry \\ : \\ y \\ =  " + f.Y().toFixed(4) + '}\\]'
            }
        }], { fontSize: 15, useMathJax: true, fixed: true, strokeColor: '#F67000' }),
        t = b1.create('text', [1, -2, function () {
            if (a.Value() == 0) {
                return '\\[ \\mathbf { Focus \\ (F) :' + NaN + '}\\]'
            }
            else {
                return " \\[ \\mathbf { Focus \\ (F) : \\left(" + f.X().toFixed(4) + " , " + f.Y().toFixed(4) + ' \\right)}\\]'
            }
        }], { fontSize: 15, useMathJax: true, fixed: true, strokeColor: '#C42A56' }),
        t = b1.create('text', [1, -3.5, function () {
            if (a.Value() == 0) {
                return "\\[ \\mathbf {Directrix \\ (D):\\  " + NaN + '}\\]'
            } return "\\[ \\mathbf {Directrix \\ (D):\\ x \\ = " + D.X().toFixed(4) + '}\\]'
        }], { fontSize: 15, useMathJax: true, fixed: true, strokeColor: '#8F00FF' }),
        t = b1.create('text', [1, -5, function () { return "\\[ \\mathbf {Focal \\ length :" + Math.abs(v.X() - f.X()).toFixed(4) + '}\\]' }], { fontSize: 15, useMathJax: true, fixed: true, strokeColor: '#8E6C00' }),
        t = b1.create('text', [1, -6.5, function () { return "\\[ \\mathbf {Eccentricity: Always \\ 1}\\]" }], { fontSize: 15, useMathJax: true, fixed: true, strokeColor: '#0070C0' }),
        t = b1.create('text', [3, -9, function () { return "\\[ \\mathbf {Input \\ sliders}\\]" }], { fontSize: 15, useMathJax: true, fixed: true, strokeColor: '#0070C0' }),

        //create a marking point 
        tp = b1.create('point', [0.8, 13], { name: '', face: '<>', size: 4, showInfobox: false, fixed: true, color: 'bleck' }),
        tp = b1.create('point', [0.8, 7], { name: '', face: '<>', size: 4, showInfobox: false, fixed: true, color: 'bleck' }),
        tp = b1.create('point', [0.8, 5.5], { name: '', face: '<>', size: 4, showInfobox: false, fixed: true, color: 'bleck' }),
        tp = b1.create('point', [0.8, 4], { name: '', face: '<>', size: 4, showInfobox: false, fixed: true, color: 'bleck' }),
        tp = b1.create('point', [0.8, 2.5], { name: '', face: '<>', size: 4, showInfobox: false, fixed: true, color: 'bleck' }),
        tp = b1.create('point', [0.8, 1], { name: '', face: '<>', size: 4, showInfobox: false, fixed: true, color: 'bleck' }),
        tp = b1.create('point', [0.8, -0.5], { name: '', face: '<>', size: 4, showInfobox: false, fixed: true, color: 'bleck' }),
        tp = b1.create('point', [0.8, -2], { name: '', face: '<>', size: 4, showInfobox: false, fixed: true, color: 'bleck' }),
        tp = b1.create('point', [0.8, -3.5], { name: '', face: '<>', size: 4, showInfobox: false, fixed: true, color: 'bleck' }),
        tp = b1.create('point', [0.8, -5], { name: '', face: '<>', size: 4, showInfobox: false, fixed: true, color: 'bleck' }),
        tp = b1.create('point', [0.8, -6.5], { name: '', face: '<>', size: 4, showInfobox: false, fixed: true, color: 'bleck' }),
        l1 = b1.create('line', [[0.8, -8], [0.7, -8]], { fixed: true, color: 'blue' })

    //create notification on the graph  
    p1.on('over', function (e) { document.getElementById('myOutput').innerHTML = "X- intesect point is x<sub>1</sub> : ( " + p1.X().toFixed(4) + " , " + p1.Y() + ' )'; });
    p1.on('out', function (e) { document.getElementById('myOutput').innerHTML = 'Click in other points'; });

    p4.on('over', function (e) { document.getElementById('myOutput').innerHTML = "X- intesect point is x<sub>1</sub> : ( " + p4.X().toFixed(4) + " , " + p4.Y() + ' )'; });
    p4.on('out', function (e) { document.getElementById('myOutput').innerHTML = 'Click in other points'; });

    p2.on("over", function (e) { document.getElementById('myOutput').innerHTML = (" Y-intercept point is Y<sub>1</sub> :  " + "( " + p2.X() + " , " + p2.Y().toFixed(4) + ' )'); });
    p2.on('out', function (e) { document.getElementById('myOutput').innerHTML = 'Click in other points'; });

    p3.on("over", function (e) { document.getElementById('myOutput').innerHTML = (" Y-intercept point is y<sub>2</sub> : ( " + p3.X() + " , " + p3.Y().toFixed(2) + ' )'); });
    p3.on('out', function (e) { document.getElementById('myOutput').innerHTML = 'Click in other points'; });

    q.on("over", function (e) { document.getElementById('myOutput').innerHTML = (" Directrix (D) : x  = " + D.X().toFixed(4)) });
    q.on('out', function (e) { document.getElementById('myOutput').innerHTML = 'Click in other points'; });

    v.on("over", function (e) { document.getElementById('myOutput').innerHTML = (" Vertex (V) :  (" + v.X().toFixed(4) + " , " + v.Y().toFixed(4) + ')') });
    v.on('out', function (e) { document.getElementById('myOutput').innerHTML = 'Click in other points'; });


    f.on("over", function (e) { document.getElementById('myOutput').innerHTML = (" Focus (F) : ( " + f.X().toFixed(4) + "  ,  " + f.Y().toFixed(4) + "  )") });
    f.on('out', function (e) { document.getElementById('myOutput').innerHTML = 'Click in other points'; });

    L.on("over", function (e) { document.getElementById('myOutput').innerHTML = (" The equation of parabola is : x = " + a.Value().toFixed(2) + ' y<sup>2</sup> + ' + '(' + b.Value().toFixed(2) + ')' + ' y  + ' + '(' + c.Value().toFixed(2) + '))') });
    L.on('out', function (e) { document.getElementById('myOutput').innerHTML = 'Click in other points'; });


    L1.on("over", function (e) { document.getElementById('myOutput').innerHTML = (" The equation of parabola is : x = " + a.Value().toFixed(2) + ' y<sup>2</sup> + ' + '(' + b.Value().toFixed(2) + ')' + ' y  + ' + '(' + c.Value().toFixed(2) + '))') });
    L1.on('out', function (e) { document.getElementById('myOutput').innerHTML = 'Click in other points'; });

    AX.on("over", function (e) { document.getElementById('myOutput').innerHTML = (" Axis of symmetry :  x  =  " + f.X().toFixed(4)) });
    AX.on('out', function (e) { document.getElementById('myOutput').innerHTML = 'Click in other points'; });





    //b1.renderer.container.style.backgroundColor = '#d7d7d8',
    p1.label.setProperty({ fontSize: 20, strokeColor: '#03A89E' }),
        p2.label.setProperty({ fontSize: 20, strokeColor: '#0000FF' }),
        p3.label.setProperty({ fontSize: 20, strokeColor: '#0000FF' }),
        p4.label.setProperty({ fontSize: 20, strokeColor: '#0000FF' }),
        p5.label.setProperty({ fontSize: 20, strokeColor: '#03A89E' }),


        v.label.setProperty({ fontSize: 20, strokeColor: '#008000' }),
        f.label.setProperty({ fontSize: 20, strokeColor: '#C42A56' }),
        p.label.setProperty({ fontSize: 20, strokeColor: '#8F00FF' });
    b1.addChild(board);

    board.update();

}
function StandardY() {
    var board = JXG.JSXGraph.initBoard('graph', {
        boundingbox: [-5, 5, 5, -5], label: true, axis: true, showClearTraces: true, showCopyright: false, autoPosition: true, strokeWidth: 5, lastArrow: true, firstArrow: true,
        zoom: { factorX: 1.25, factorY: 1.25, wheel: true, needshift: false },
        pan: {
            enabled: true,   // Allow panning
            needTwoFingers: false, // panningis done with two fingers on touch devices
            needshift: false, // mouse panning needs pressing of the shift key
        }, keepAspectRatio: true,
        defaultAxes: {
            x: { name: 'X', withLabel: true, size: 3, label: { position: 'rt', offset: [-10, 10] } },
            y: { name: 'Y', withLabel: true, size: 3, label: { position: 'rt', offset: [10, -10] } }
        }
    }),

        //New graph for data 
        b1 = JXG.JSXGraph.initBoard('graph1', { boundingbox: [0.5, 17, 7, -15], axis: false, grid: false, showNavigation: false, showCopyright: false, }),
        b1 = JXG.JSXGraph.initBoard('graph1', { boundingbox: [0.5, 17, 7, -15], axis: false, grid: false, showNavigation: false, showCopyright: false, }),

        a = b1.create('slider', [[1, -10.5], [5.5, -10.5], [-10, 0, 10]], {
            name: 'p', snapWidth: 0.25, baseline: { strokeColor: '#afafaf' }, highline: { strokeColor: '#094a82' },
            fillColor: '#afafaf',
            label: { fontSize: 2.5, strokeColor: 'bleck', fontUnit: 'vmin' },
        }),
        b = b1.create('slider', [[1, -12], [5.5, -12], [-10, 1, 10]], {
            name: 'h', snapWidth: 0.25, baseline: { strokeColor: '#afafaf' }, highline: { strokeColor: '#094a82' },
            fillColor: '#afafaf',
            label: { fontSize: 2.5, strokeColor: 'bleck', fontUnit: 'vmin' }
        }),
        c = b1.create('slider', [[1, -13.5], [5.5, -13.5], [-10, -2, 10]], {
            name: 'k', snapWidth: 0.25, baseline: { strokeColor: '#afafaf' }, highline: { strokeColor: '#094a82' },
            fillColor: '#afafaf',
            label: { fontSize: 2.5, strokeColor: 'bleck', fontUnit: 'vmin' }
        }),

        altL = board.create('line', [[function() { return b.Value() }, 0], [function() { return b.Value() },100]], {strokeWidth: 3, dragToTopOfLayer: true, strokeColor: '#002060'}),

        isLVisible = false,

        // creat a parabola grpah in board 
        L = board.create('functiongraph', [function (x) {
            if (a.Value() == 0 && b.Value() != 0) {
                //y=b.Value()
                //x=-b.Value()
                if(L !== undefined && altL !== undefined && isLVisible) {
                    L.hide()
                    altL.show()
                    isLVisible = false
                }
            }
            else if (a.Value() == 0 && b.Value() == 0) {
                return 0
            }

            else {
                if(L !== undefined && altL !== undefined && !isLVisible) {
                    L.show()
                    altL.hide()
                    isLVisible = true
                }
                return (1 / (4 * a.Value()) * (x - b.Value()) * (x - b.Value()) + c.Value())
            }
        }], { strokeWidth: 3, dragToTopOfLayer: true, strokeColor: '#002060' }),

        hidePointIfaIsZero = (point) => {
            if(a.Value() == 0 && point !== undefined) {
                point.hide()
            } else if(point !== undefined) {
                point.show()
            }
        },

        v = board.create('point', [function () {
            hidePointIfaIsZero(v)
            return b.Value()
        }, function () {
            hidePointIfaIsZero(v)
            return c.Value()
        }],
            { name: 'V', Color: 'green', size: 3, label: { autoPosition: true, offset: [10, 10] } }),

        f = board.create('point', [function () {
            hidePointIfaIsZero(f)
            return b.Value()
        },
        function () {
            hidePointIfaIsZero(f)
            return (c.Value() + a.Value())
        }],
            { name: 'F', Color: '#C42A56', size: 3, label: { autoPosition: true, offset: [10, 10] }, visible: true }),

        AX = board.create('line', [v, f], { dash: 4, strokeWidth: 2, strokeColor: '#F67000' }),


        l1 = board.create('line', [[0, 0], [1, 0]], { fixed: true, visible: true, color: 'bluck', lastArrow: true, firstArrow: true, highlightStrokeColor: 'removes highlighting' }),
        l2 = board.create('line', [[0, 0], [0, 1]], { fixed: true, visible: true, color: 'bluck', lastArrow: true, firstArrow: true, highlightStrokeColor: 'removes highlighting' }),

        //creat intesection point 
        p1 = board.create('intersection', [l1, L, 0], { name: 'x_1', size: 3, Color: '#03A89E', label: { autoPosition: true, offset: [10, 10] } }),
        p2 = board.create('intersection', [l1, L, 1], { name: 'x_2', size: 3, Color: '#03A89E', label: { autoPosition: true, offset: [10, 10] } }),
        p3 = board.create('intersection', [l2, L, 0], { name: 'y_1', size: 3, Color: '#0000FF', label: { autoPosition: true, offset: [10, 10] } }),

        q = board.create('line', [[0, function () { return (2 * v.Y() - f.Y()) }], [1, function () { return (2 * v.Y() - f.Y()) }]], { strokeWidth: 2, dragToTopOfLayer: true, strokeColor: '#8F00FF', lastArrow: true, firstArrow: true }),
        p = board.create('point', [function () { return (v.X() + 1) }, function () { return (v.Y() - a.Value()) }], { size: 0, name: 'D', strokeColor: 'black', label: { autoPosition: true, offset: [10, 10] } }),
        D = board.create('point', [0, function () { return (2 * v.Y() - f.Y()) }], { size: 0, name: '', strokeColor: 'black', label: { autoPosition: true, offset: [10, 10] } }),

        //Creat a All text in graph 
        t = b1.create('text', [2.5, 15, function () { return "\\[ \\mathbf {Interpretation}\\]" }], { fontSize: 18, useMathJax: true, fixed: true, strokeColor: '#0070C0' }),
        t = b1.create('text', [1, 13, "\\[\\mathbf{The \\ standard \\ equation \\ of \\  parabola\\ is}\\]"], { fontSize: 15, useMathJax: true, fixed: true }),
        t = b1.create('text', [1, 11.5, "\\[\\mathbf{(x-h )^{2}= 4p (y-k)  with \\ a,b,c \\in \\:\\mathbb{R}}\\]"], { fontSize: 15, useMathJax: true, fixed: true, strokeColor: '#002060' }),
        t = b1.create('text', [1, 10, function () {
            if (a.Value() == 0) {
                return "\\[\\mathbf{ When \\ p=0, \\ the \\ equation \\ of \\ a \\ line\\ on \\ a \\ screen \\ is}\\]"
            }
            else {
                return "\\[\\mathbf{The \\ equation \\ of \\ a \\ parabola\\ on \\ a \\ screen \\ is}\\]"
            }
        }], { fontSize: 15, useMathJax: true, fixed: true }),
        t = b1.create('text', [1, 8.5, function () { return "\\[\\mathbf{(x - (" + b.Value().toFixed(2) + '))^2 =' + '4(' + a.Value().toFixed(2) + ')' + '( y - (' + c.Value().toFixed(2) + '))}\\]' }], { fontSize: 15, useMathJax: true, fixed: true, strokeColor: '#002060' }),
        t = b1.create('text', [1, 7, function () {
            if (a.Value() == 0) {
                return "\\[ \\mathbf {Domain:\\{ x \\ | \\ x =" + b.Value() + "\\}} \\]"
            }
            else {
                return "\\[ \\mathbf {Domain:\\{ x \\ | \\ x \\in \\:\\mathbb{R} \\}} \\]"
            }
        }], { fontSize: 15, useMathJax: true, fixed: true, strokeColor: '#8B27DD' }),
        t = b1.create('text', [1, 5.5, function () {
            if (a.Value() < 0) {
                return "\\[ \\mathbf {Range:\\{ y\\ | \\ y \\le " + v.Y().toFixed(4) + "\\}} \\]"
            }
            else if (a.Value() > 0) {
                return "\\[ \\mathbf {Range:\\{ y\\ | \\ y \\ge " + v.Y().toFixed(4) + "\\}} \\]"
            }
            else if (a.Value() == 0) {
                return "\\[ \\mathbf {Range:\\{ y\\ | \\ y \\in \\:\\mathbb{R} \\}} \\]"
            }
        }], { fontSize: 15, useMathJax: true, fixed: true, strokeColor: '#f7b32bff' }),


        t = b1.create('text', [1, 4, function () {
            if (a.Value() == 0) {
                return '\\[ \\mathbf { Vertex \\ (V) :' + NaN + '}\\]'
            }
            else {
                return '\\[ \\mathbf { Vertex \\ (V) :  (' + v.X().toFixed(4) + " , " + v.Y().toFixed(4) + ' ) }\\]'
            }
        }], { fontSize: 15, useMathJax: true, fixed: true, strokeColor: '#008000' }),
        t = b1.create('text', [1, 2.5, function () { return "\\[ \\mathbf {X-intercept: x_1 :( " + p1.X().toFixed(4) + " , " + p1.Y() + ' )' + "  ,x_2:  " + "( " + p2.X().toFixed(4) + " , " + p2.Y() + ' )}\\]' }], { fontSize: 15, useMathJax: true, fixed: true, strokeColor: '#03A89E' }),
        t = b1.create('text', [1, 1, function () { return "\\[ \\mathbf {Y-intercept:y_1 : ( " + p3.X() + " , " + p3.Y().toFixed(2) + ' )}\\]' }], { fontSize: 15, useMathJax: true, fixed: true, strokeColor: '#0000FF' }),
        t = b1.create('text', [1, -0.5, function () {
            if (a.Value() == 0) {
                return "\\[ \\mathbf {Axis \\ of \\ symmetry \\ : \\   " + NaN + '}\\]'
            }
            else {
                return "\\[ \\mathbf {Axis \\ of \\ symmetry \\ : \\ x \\ =  " + f.X().toFixed(4) + '}\\]'
            }
        }], { fontSize: 15, useMathJax: true, fixed: true, strokeColor: '#F67000' }),
        t = b1.create('text', [1, -2, function () {
            if (a.Value() == 0) {
                return '\\[ \\mathbf { Focus \\ (F) :' + NaN + '}\\]'
            }
            else {
                return " \\[ \\mathbf { Focus \\ (F) : (" + f.X().toFixed(4) + " , " + f.Y().toFixed(4) + ' )}\\]'
            }
        }], { fontSize: 15, useMathJax: true, fixed: true, strokeColor: '#C42A56' }),
        t = b1.create('text', [1, -3.5, function () {
            if (a.Value() == 0) {
                return "\\[ \\mathbf {Directrix \\ (D):\\  " + NaN + '}\\]'
            } return "\\[ \\mathbf {Directrix \\ (D):\\ y \\ = " + D.Y().toFixed(4) + '}\\]'
        }], { fontSize: 15, useMathJax: true, fixed: true, strokeColor: '#8F00FF' }),
        t = b1.create('text', [1, -5, function () { return "\\[ \\mathbf {Focal \\ length :" + Math.abs(v.Y() - f.Y()).toFixed(4) + '}\\]' }], { fontSize: 15, useMathJax: true, fixed: true, strokeColor: '#8E6C00' }),
        t = b1.create('text', [1, -6.5, function () { return "\\[ \\mathbf {Eccentricity: Always \\ 1}\\]" }], { fontSize: 15, useMathJax: true, fixed: true, strokeColor: '#0070C0' }),
        t = b1.create('text', [3, -9, function () { return "\\[ \\mathbf {Input \\ sliders}\\]" }], { fontSize: 15, useMathJax: true, fixed: true, strokeColor: '#0070C0' }),

        //create a marking point 
        tp = b1.create('point', [0.8, 13], { name: '', face: '<>', size: 4, showInfobox: false, fixed: true, color: 'bleck' }),
        tp = b1.create('point', [0.8, 7], { name: '', face: '<>', size: 4, showInfobox: false, fixed: true, color: 'bleck' }),
        tp = b1.create('point', [0.8, 5.5], { name: '', face: '<>', size: 4, showInfobox: false, fixed: true, color: 'bleck' }),
        tp = b1.create('point', [0.8, 4], { name: '', face: '<>', size: 4, showInfobox: false, fixed: true, color: 'bleck' }),
        tp = b1.create('point', [0.8, 2.5], { name: '', face: '<>', size: 4, showInfobox: false, fixed: true, color: 'bleck' }),
        tp = b1.create('point', [0.8, 1], { name: '', face: '<>', size: 4, showInfobox: false, fixed: true, color: 'bleck' }),
        tp = b1.create('point', [0.8, -0.5], { name: '', face: '<>', size: 4, showInfobox: false, fixed: true, color: 'bleck' }),
        tp = b1.create('point', [0.8, -2], { name: '', face: '<>', size: 4, showInfobox: false, fixed: true, color: 'bleck' }),
        tp = b1.create('point', [0.8, -3.5], { name: '', face: '<>', size: 4, showInfobox: false, fixed: true, color: 'bleck' }),
        tp = b1.create('point', [0.8, -5], { name: '', face: '<>', size: 4, showInfobox: false, fixed: true, color: 'bleck' }),
        tp = b1.create('point', [0.8, -6.5], { name: '', face: '<>', size: 4, showInfobox: false, fixed: true, color: 'bleck' }),
        l1 = b1.create('line', [[0.8, -8], [0.7, -8]], { fixed: true, color: 'blue' })

    //create notification on the graph  
    p1.on('over', function (e) { document.getElementById('myOutput').innerHTML = "X- intesect point is x<sub>1</sub> : ( " + p1.X().toFixed(4) + " , " + p1.Y() + ' )'; });
    p1.on('out', function (e) { document.getElementById('myOutput').innerHTML = 'Click in other points'; });

    p2.on("over", function (e) { document.getElementById('myOutput').innerHTML = (" X-intercept point is x<sub>2</sub> :  " + "( " + p2.X().toFixed(4) + " , " + p2.Y() + ' )'); });
    p2.on('out', function (e) { document.getElementById('myOutput').innerHTML = 'Click in other points'; });

    p3.on("over", function (e) { document.getElementById('myOutput').innerHTML = (" Y-intercept point is y<sub>1</sub> : ( " + p3.X() + " , " + p3.Y().toFixed(2) + ' )'); });
    p3.on('out', function (e) { document.getElementById('myOutput').innerHTML = 'Click in other points'; });

    q.on("over", function (e) { document.getElementById('myOutput').innerHTML = (" Directrix (D) : y  = " + D.Y().toFixed(4)) });
    q.on('out', function (e) { document.getElementById('myOutput').innerHTML = 'Click in other points'; });

    v.on("over", function (e) { document.getElementById('myOutput').innerHTML = (" Vertex (V) :  (" + v.X().toFixed(4) + " , " + v.Y().toFixed(4) + ')') });
    v.on('out', function (e) { document.getElementById('myOutput').innerHTML = 'Click in other points'; });


    f.on("over", function (e) { document.getElementById('myOutput').innerHTML = (" Focus (F) : ( " + f.X().toFixed(4) + "  ,  " + f.Y().toFixed(4) + "  )") });
    f.on('out', function (e) { document.getElementById('myOutput').innerHTML = 'Click in other points'; });

    L.on("over", function (e) { document.getElementById('myOutput').innerHTML = (" The equation of parabola is : (x - (" + b.Value().toFixed(2) + '))<sup>2</sup> =' + '4(' + a.Value().toFixed(2) + ')' + '( y - (' + c.Value().toFixed(2) + ')') });
    L.on('out', function (e) { document.getElementById('myOutput').innerHTML = 'Click in other points'; });

    AX.on("over", function (e) { document.getElementById('myOutput').innerHTML = (" Axis of symmetry :  x  =  " + f.X().toFixed(4)) });
    AX.on('out', function (e) { document.getElementById('myOutput').innerHTML = 'Click in other points'; });


    p1.label.setProperty({ fontSize: 20, strokeColor: '#03A89E' }),
        p2.label.setProperty({ fontSize: 20, strokeColor: '#03A89E' }),
        p3.label.setProperty({ fontSize: 20, strokeColor: '#0000FF' }),
        v.label.setProperty({ fontSize: 20, strokeColor: '#008000' }),
        f.label.setProperty({ fontSize: 20, strokeColor: '#C42A56' }),
        p.label.setProperty({ fontSize: 20, strokeColor: '#8F00FF' });

    b1.addChild(board);
    board.update();
}


function StandardX() {
    var board = JXG.JSXGraph.initBoard('graph', {
        boundingbox: [-5, 5, 5, -5], label: true, axis: true, showClearTraces: true, showCopyright: false, autoPosition: true, strokeWidth: 5, lastArrow: true, firstArrow: true,
        zoom: { factorX: 1.25, factorY: 1.25, wheel: true, needshift: false },
        pan: {
            enabled: true,   // Allow panning
            needTwoFingers: false, // panningis done with two fingers on touch devices
            needshift: false, // mouse panning needs pressing of the shift key
        }, keepAspectRatio: true,
        defaultAxes: {
            x: { name: 'X', withLabel: true, size: 3, label: { position: 'rt', offset: [-10, 10] } },
            y: { name: 'Y', withLabel: true, size: 3, label: { position: 'rt', offset: [10, -10] } }
        }
    }),

        //New graph for data 
        b1 = JXG.JSXGraph.initBoard('graph1', { boundingbox: [0.5, 17, 7, -15], axis: false, grid: false, showNavigation: false, showCopyright: false, }),
        b1 = JXG.JSXGraph.initBoard('graph1', { boundingbox: [0.5, 17, 7, -15], axis: false, grid: false, showNavigation: false, showCopyright: false, }),

        a = b1.create('slider', [[1, -10.5], [5.5, -10.5], [-10, 0, 10]], {
            name: 'p', snapWidth: 0.25, baseline: { strokeColor: '#afafaf' }, highline: { strokeColor: '#094a82' },
            fillColor: '#afafaf',
            label: { fontSize: 2.5, strokeColor: 'bleck', fontUnit: 'vmin' },
        }),
        b = b1.create('slider', [[1, -12], [5.5, -12], [-10, 1, 10]], {
            name: 'h', snapWidth: 0.25, baseline: { strokeColor: '#afafaf' }, highline: { strokeColor: '#094a82' },
            fillColor: '#afafaf',
            label: { fontSize: 2.5, strokeColor: 'bleck', fontUnit: 'vmin' }
        }),
        c = b1.create('slider', [[1, -13.5], [5.5, -13.5], [-10, -2, 10]], {
            name: 'k', snapWidth: 0.25, baseline: { strokeColor: '#afafaf' }, highline: { strokeColor: '#094a82' },
            fillColor: '#afafaf',
            label: { fontSize: 2.5, strokeColor: 'bleck', fontUnit: 'vmin' }
        }),

        // creat a parabola grpah in board 
        L = board.create('functiongraph', [function (x) { return (c.Value() + Math.sqrt(4 * a.Value() * (x - b.Value()))) }], { strokeWidth: 3, dragToTopOfLayer: true, strokeColor: '#002060' }),

        L1 = board.create('functiongraph', [function (x) { return (c.Value() - Math.sqrt(4 * a.Value() * (x - b.Value()))) }], { strokeWidth: 3, dragToTopOfLayer: true, strokeColor: '#002060' }),


        v = board.create('point', [function () {
            if (a.Value() == 0) {
                return 1 / 0
            } else {
                return b.Value()
            }
        }, function () {
            if (a.Value() == 0) {
                return 1 / 0
            } else { return c.Value() }
        }],
            { name: 'V', Color: 'green', size: 3, label: { autoPosition: true, offset: [10, 10] } }),

        f = board.create('point', [function () {
            if (a.Value() == 0) {

                return 1 / 0
            } else { return b.Value() + a.Value() }
        },
        function () {
            if (a.Value() == 0) {
                return 1 / 0
            } else { return (c.Value()) }
        }],
            { name: 'F', Color: '#C42A56', size: 3, label: { autoPosition: true, offset: [10, 10] } }),

        AX = board.create('line', [v, f], { dash: 4, strokeWidth: 2, strokeColor: '#F67000' }),


        l1 = board.create('line', [[0, 0], [1, 0]], { fixed: true, visible: true, color: 'bluck', lastArrow: true, firstArrow: true, highlightStrokeColor: 'removes highlighting' }),
        l2 = board.create('line', [[0, 0], [0, 1]], { fixed: true, visible: true, color: 'bluck', lastArrow: true, firstArrow: true, highlightStrokeColor: 'removes highlighting' }),

        //creat intesection point 
        p1 = board.create('intersection', [l1, L, 0], { name: 'x_1', size: 3, Color: '#03A89E', label: { autoPosition: true, offset: [10, 10] } }),
        p4 = board.create('intersection', [l1, L1, 0], { name: 'x_1', size: 3, Color: '#03A89E', label: { autoPosition: true, offset: [10, 10] } }),
        p5 = board.create('point', [function () {
            if (c.Value() == 0) {
                return v.X()
            }
        }, function () {
            if (c.Value() == 0) {
                return v.Y()
            }
        }], { name: 'x_1', size: 3, Color: '#03A89E', label: { autoPosition: true, offset: [10, 10] } }),

        p2 = board.create('intersection', [l2, L, 0], { name: 'y_1', size: 3, Color: '#0000FF', label: { autoPosition: true, offset: [10, 10] } }),
        p3 = board.create('intersection', [l2, L1, 0], { name: 'y_2', size: 3, Color: '#0000FF', label: { autoPosition: true, offset: [10, 10] } }),

        q = board.create('line', [[function () { return (v.X() - a.Value()) }, 0], [function () { return (v.X() - a.Value()) }, 1]], { strokeWidth: 2, dragToTopOfLayer: true, strokeColor: '#8F00FF', lastArrow: true, firstArrow: true }),
        p = board.create('point', [function () { return (v.X() - a.Value()) }, function () { return (v.Y() + 1) }], { size: 0, name: 'D', strokeColor: 'black', label: { autoPosition: true, offset: [10, 10] } }),
        D = board.create('point', [function () { return (v.X() - a.Value()) }, 0], { size: 0, name: '', strokeColor: 'black', label: { autoPosition: true, offset: [10, 10] } }),

        //Creat a All text in graph 
        t = b1.create('text', [2.5, 15, function () { return "\\[ \\mathbf {Interpretation}\\]" }], { fontSize: 18, useMathJax: true, fixed: true, strokeColor: '#0070C0' }),
        t = b1.create('text', [1, 13, "\\[\\mathbf{The \\ standard \\ equation \\ of \\  parabola\\ is}\\]"], { fontSize: 15, useMathJax: true, fixed: true }),
        t = b1.create('text', [1, 11.5, "\\[\\mathbf{(y-k)^{2}= 4p (x-h)  with \\ a,b,c \\in \\:\\mathbb{R}}\\]"], { fontSize: 15, useMathJax: true, fixed: true, strokeColor: '#002060' }),
        t = b1.create('text', [1, 10, function () {
            if (a.Value() == 0) {
                return "\\[\\mathbf{ When \\ p=0, \\ the \\ equation \\ of \\ a \\ line\\ on \\ a \\ screen \\ is}\\]"
            }
            else {
                return "\\[\\mathbf{The \\ equation \\ of \\ a \\ parabola\\ on \\ a \\ screen \\ is}\\]"
            }
        }], { fontSize: 15, useMathJax: true, fixed: true }),
        t = b1.create('text', [1, 8.5, function () { return "\\[\\mathbf{(y - (" + c.Value().toFixed(2) + '))^2 =' + '4(' + a.Value().toFixed(2) + ')' + '( x - (' + b.Value().toFixed(2) + '))}\\]' }], { fontSize: 15, useMathJax: true, fixed: true, strokeColor: '#002060' }),
        t = b1.create('text', [1, 7, function () {
            if (a.Value() < 0) {
                return "\\[ \\mathbf {Domain:\\{ x \\ | \\ x \\le " + b.Value().toFixed(2) + "\\}} \\]"
            }
            else if (a.Value() > 0) {
                return "\\[ \\mathbf {Domain:\\{ x \\ | \\ x \\ge " + b.Value().toFixed(2) + "\\}} \\]"
            }
            else if (a.Value() == 0) {
                return "\\[ \\mathbf {Domain:\\{ x \\ | \\ x \\in \\:\\mathbb{R} \\}} \\]"
            }
        }], { fontSize: 15, useMathJax: true, fixed: true, strokeColor: '#8B27DD' }),
        t = b1.create('text', [1, 5.5, function () {
            if (a.Value() == 0) { return "\\[ \\mathbf {Range:\\{ y \\ | \\ y \\ = " + c.Value().toFixed(2) + "\\}} \\]" }
            return "\\[ \\mathbf {Range:\\{ y \\ | \\ y \\in \\:\\mathbb{R} \\}} \\]"

        }], { fontSize: 15, useMathJax: true, fixed: true, strokeColor: '#f7b32bff' }),


        t = b1.create('text', [1, 4, function () {
            if (a.Value() == 0) {
                return '\\[ \\mathbf { Vertex \\ (V) :' + NaN + '}\\]'
            }
            else {
                return '\\[ \\mathbf { Vertex \\ (V) :  (' + v.X().toFixed(4) + " , " + v.Y().toFixed(4) + ' ) }\\]'
            }
        }], { fontSize: 15, useMathJax: true, fixed: true, strokeColor: '#008000' }),

        t = b1.create('text', [1, 2.5, function () {
            if (c.Value() == 0) {
                return "\\[ \\mathbf {X-intercept: x_1 :( " + (dummy(v.X().toFixed(4))) + " , " + dummy(v.Y()) + ' \\ )}\\]'
            }
            else if (isNaN(p1.X())) {
                return "\\[ \\mathbf {X-intercept: x_1 :( " + (dummy(p4.X().toFixed(4))) + " , " + dummy(p1.Y()) + ' \\ )}\\]'
            }

            else {
                return "\\[ \\mathbf {X-intercept: x_1 :( " + (dummy(p1.X().toFixed(4))) + " , " + dummy(p1.Y().toFixed(1)) + ' \\ )}\\]'
            }
        }], { fontSize: 15, useMathJax: true, fixed: true, strokeColor: '#03A89E' }),

        t = b1.create('text', [1, 1, function () {
            if (b.Value() == 0) {
                return "\\[ \\mathbf {Y-intercept:y_1 : (" + v.X().toFixed(1) + " , " + (dummy(v.Y().toFixed(4))) + ')}\\]'
            }
            else {
                return "\\[ \\mathbf {Y-intercept:y_1 : (" + p2.X().toFixed(1) + " , " + (dummy(p2.Y().toFixed(4))) + ' ),y_2 : (' + p3.X().toFixed(1) + ', ' + (dummy(p3.Y().toFixed(4))) + ' )}\\]'
            }
        }], { fontSize: 15, useMathJax: true, fixed: true, strokeColor: '#0000FF' }),
        t = b1.create('text', [1, -0.5, function () {
            if (a.Value() == 0) {
                return "\\[ \\mathbf {Axis \\ of \\ symmetry \\ : \\   " + NaN + '}\\]'
            }
            else {
                return "\\[ \\mathbf {Axis \\ of \\ symmetry \\ : \\ y \\ =  " + f.Y().toFixed(4) + '}\\]'
            }
        }], { fontSize: 15, useMathJax: true, fixed: true, strokeColor: '#F67000' }),
        t = b1.create('text', [1, -2, function () {
            if (a.Value() == 0) {
                return '\\[ \\mathbf { Focus \\ (F) :' + NaN + '}\\]'
            }
            else {
                return " \\[ \\mathbf { Focus \\ (F) : (" + f.X().toFixed(4) + " , " + f.Y().toFixed(4) + ' )}\\]'
            }
        }], { fontSize: 15, useMathJax: true, fixed: true, strokeColor: '#C42A56' }),
        t = b1.create('text', [1, -3.5, function () {
            if (a.Value() == 0) {
                return "\\[ \\mathbf {Directrix \\ (D):\\  " + NaN + '}\\]'
            } return "\\[ \\mathbf {Directrix \\ (D):\\ x \\ = " + D.X().toFixed(4) + '}\\]'
        }], { fontSize: 15, useMathJax: true, fixed: true, strokeColor: '#8F00FF' }),
        t = b1.create('text', [1, -5, function () { return "\\[ \\mathbf {Focal \\ length :" + Math.abs(v.X() - f.X()).toFixed(4) + '}\\]' }], { fontSize: 15, useMathJax: true, fixed: true, strokeColor: '#8E6C00' }),
        t = b1.create('text', [1, -6.5, function () { return "\\[ \\mathbf {Eccentricity: Always \\ 1}\\]" }], { fontSize: 15, useMathJax: true, fixed: true, strokeColor: '#0070C0' }),
        t = b1.create('text', [3, -9, function () { return "\\[ \\mathbf {Input \\ sliders}\\]" }], { fontSize: 15, useMathJax: true, fixed: true, strokeColor: '#0070C0' }),

        //create a marking point 
        tp = b1.create('point', [0.8, 13], { name: '', face: '<>', size: 4, showInfobox: false, fixed: true, color: 'bleck' }),
        tp = b1.create('point', [0.8, 7], { name: '', face: '<>', size: 4, showInfobox: false, fixed: true, color: 'bleck' }),
        tp = b1.create('point', [0.8, 5.5], { name: '', face: '<>', size: 4, showInfobox: false, fixed: true, color: 'bleck' }),
        tp = b1.create('point', [0.8, 4], { name: '', face: '<>', size: 4, showInfobox: false, fixed: true, color: 'bleck' }),
        tp = b1.create('point', [0.8, 2.5], { name: '', face: '<>', size: 4, showInfobox: false, fixed: true, color: 'bleck' }),
        tp = b1.create('point', [0.8, 1], { name: '', face: '<>', size: 4, showInfobox: false, fixed: true, color: 'bleck' }),
        tp = b1.create('point', [0.8, -0.5], { name: '', face: '<>', size: 4, showInfobox: false, fixed: true, color: 'bleck' }),
        tp = b1.create('point', [0.8, -2], { name: '', face: '<>', size: 4, showInfobox: false, fixed: true, color: 'bleck' }),
        tp = b1.create('point', [0.8, -3.5], { name: '', face: '<>', size: 4, showInfobox: false, fixed: true, color: 'bleck' }),
        tp = b1.create('point', [0.8, -5], { name: '', face: '<>', size: 4, showInfobox: false, fixed: true, color: 'bleck' }),
        tp = b1.create('point', [0.8, -6.5], { name: '', face: '<>', size: 4, showInfobox: false, fixed: true, color: 'bleck' }),
        l1 = b1.create('line', [[0.8, -8], [0.7, -8]], { fixed: true, color: 'blue' })

    //create notification on the graph  
    p1.on('over', function (e) { document.getElementById('myOutput').innerHTML = "X- intesect point is x<sub>1</sub> : ( " + p1.X().toFixed(4) + ' , 0 )'; });
    p1.on('out', function (e) { document.getElementById('myOutput').innerHTML = 'Click in other points'; });

    p4.on('over', function (e) { document.getElementById('myOutput').innerHTML = "X- intesect point is x<sub>1</sub> : ( " + p4.X().toFixed(4) + ' , 0 )'; });
    p4.on('out', function (e) { document.getElementById('myOutput').innerHTML = 'Click in other points'; });

    p2.on("over", function (e) { document.getElementById('myOutput').innerHTML = (" Y-intercept point is Y<sub>1</sub> :  ( 0 , " + p2.Y().toFixed(4) + ' )'); });
    p2.on('out', function (e) { document.getElementById('myOutput').innerHTML = 'Click in other points'; });

    p3.on("over", function (e) { document.getElementById('myOutput').innerHTML = (" Y-intercept point is y<sub>2</sub> : (  0 , " + p3.Y().toFixed(4) + ' )'); });
    p3.on('out', function (e) { document.getElementById('myOutput').innerHTML = 'Click in other points'; });

    q.on("over", function (e) { document.getElementById('myOutput').innerHTML = (" Directrix (D) : x  = " + D.Y().toFixed(4)) });
    q.on('out', function (e) { document.getElementById('myOutput').innerHTML = 'Click in other points'; });

    v.on("over", function (e) { document.getElementById('myOutput').innerHTML = (" Vertex (V) :  (" + v.X().toFixed(4) + " , " + v.Y().toFixed(4) + ')') });
    v.on('out', function (e) { document.getElementById('myOutput').innerHTML = 'Click in other points'; });


    f.on("over", function (e) { document.getElementById('myOutput').innerHTML = (" Focus (F) : ( " + f.X().toFixed(4) + "  ,  " + f.Y().toFixed(4) + "  )") });
    f.on('out', function (e) { document.getElementById('myOutput').innerHTML = 'Click in other points'; });

    L.on("over", function (e) { document.getElementById('myOutput').innerHTML = (" The equation of parabola is : (y - (" + c.Value().toFixed(2) + '))<sup>2</sup> =' + '4(' + a.Value().toFixed(2) + ')' + '( x - (' + b.Value().toFixed(2) + '))') });
    L.on('out', function (e) { document.getElementById('myOutput').innerHTML = 'Click in other points'; });

    L1.on("over", function (e) { document.getElementById('myOutput').innerHTML = (" The equation of parabola is : (y - (" + c.Value().toFixed(2) + '))<sup>2</sup> =' + '4(' + a.Value().toFixed(2) + ')' + '( x - (' + b.Value().toFixed(2) + '))') });
    L1.on('out', function (e) { document.getElementById('myOutput').innerHTML = 'Click in other points'; });

    AX.on("over", function (e) { document.getElementById('myOutput').innerHTML = (" Axis of symmetry :  y  =  " + f.Y().toFixed(4)) });
    AX.on('out', function (e) { document.getElementById('myOutput').innerHTML = 'Click in other points'; });

    p1.label.setProperty({ fontSize: 20, strokeColor: '#03A89E' }),
        p2.label.setProperty({ fontSize: 20, strokeColor: '#0000FF' }),
        p3.label.setProperty({ fontSize: 20, strokeColor: '#0000FF' }),
        p4.label.setProperty({ fontSize: 20, strokeColor: '#0000FF' }),
        p5.label.setProperty({ fontSize: 20, strokeColor: '#03A89E' }),

        v.label.setProperty({ fontSize: 20, strokeColor: '#008000' }),
        f.label.setProperty({ fontSize: 20, strokeColor: '#C42A56' }),
        p.label.setProperty({ fontSize: 20, strokeColor: '#8F00FF' });

    b1.addChild(board);
    board.update();
}
function dummy(number) {
    const isEqualTo0 = (number == 0)
    if (isEqualTo0) {
        return 0
    }
    return number
}
Parabola1();
