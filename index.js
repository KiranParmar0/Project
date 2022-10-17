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
    b1 = JXG.JSXGraph.initBoard('graph1', { boundingbox: [0.5, 20, 7, -16], axis: false, grid: false, showNavigation: false, showCopyright: false }),
    b2 = JXG.JSXGraph.initBoard('graph2', { boundingbox: [-5, 4, 8, 0], axis: false, grid: false, showNavigation: false, showCopyright: false }),


    butt = b2.create('button', [-4.5, 1, 'Opening X-axis', function () { OpeningX() },{fontSize: 15, cssStyle: 'width:100px'}]),
    butt1 = b2.create('button', [-2, 1, 'Opening Y-axis', function () { OpeningY() },{fontSize: 15, cssStyle: 'width:100px'}]);

OpeningX()

b2.renderer.container.style.backgroundColor = '#fef8dd'
b2.addChild(b1)

function OpeningX() {

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
        b1 = JXG.JSXGraph.initBoard('graph1', { boundingbox: [0.5, 20, 7, -16], axis: false, grid: false, showNavigation: false, showCopyright: false }),


        //creat a line 
        l1 = board.create('line', [[0, 0], [1, 0]], { fixed: true, visible: true, color: 'bluck', lastArrow: true, firstArrow: true, highlightStrokeColor: 'removes highlighting' }),
        l2 = board.create('line', [[0, 0], [0, 1]], { fixed: true, visible: true, color: 'bluck', lastArrow: true, firstArrow: true, highlightStrokeColor: 'removes highlighting' }),
        l3 = b1.create('line', [[0.8, -8], [0.7, -8]], { fixed: true, color: 'blue' }),




        hidePointIfaIsZero = (point) => {
            if (point == undefined) {
                point.hide()
            } else {
                point.show()
            }
        },
        isLVisible = false,

        a = b1.create('slider', [[1, -10.5], [5.5, -10.5], [-10, 1, 10]], {
            name: 'a', snapWidth: 0.25,
            baseline: { strokeColor: '#afafaf' },
            highline: { strokeColor: '#094a82' },
            fillColor: '#afafaf',
            label: { fontSize: 2.5, strokeColor: 'bleck', fontUnit: 'vmin' },
        }),
        b = b1.create('slider', [[1, -12], [5.5, -12], [-10, -2, 10]], {
            name: 'b', snapWidth: 0.25, baseline: { strokeColor: '#afafaf' }, highline: { strokeColor: '#094a82' },
            fillColor: '#afafaf',
            label: { fontSize: 2.5, strokeColor: 'bleck', fontUnit: 'vmin' }
        }),
        h = b1.create('slider', [[1, -13.5], [5.5, -13.5], [-10, 1, 10]], {
            name: 'h', snapWidth: 0.25, baseline: { strokeColor: '#afafaf' },
            highline: { strokeColor: '#094a82' },
            fillColor: '#afafaf',
            label: { fontSize: 2.5, strokeColor: 'bleck', fontUnit: 'vmin' }
        }),
        k = b1.create('slider', [[1, -15], [5.5, -15], [-10, 1, 10]], {
            name: 'k', snapWidth: 0.25, baseline: { strokeColor: '#afafaf' },
            highline: { strokeColor: '#094a82' },
            fillColor: '#afafaf',
            label: { fontSize: 2.5, strokeColor: 'bleck', fontUnit: 'vmin' }
        }),
        c = board.create('point', [function () {
            return (h.Value())
        }, function () {
            return (k.Value())
        }],
            { name: 'O', Color: 'green', size: 3, label: { autoPosition: true, offset: [10, 10], } }),

        f1 = board.create('point', [function () {
            return (h.Value() - Math.sqrt(a.Value() * a.Value() + b.Value() * b.Value()))
        }, function () {
            return k.Value()
        }],
            { name: 'F <sub>1</sub>', Color: '#F67000', size: 3, label: { autoPosition: true, offset: [10, 10], } }),
        f2 = board.create('point', [function () {
            return (h.Value() + Math.sqrt(a.Value() * a.Value() + b.Value() * b.Value()))
        }, function () {
            return k.Value()
        }],
            { name: 'F<sub> 2</sub>', Color: '#F67000', size: 3, label: { autoPosition: true, offset: [10, 10], } }),

        v1 = board.create('point', [function () {
            return (h.Value() + a.Value())
        }, function () {
            return k.Value()
        }],
            { name: 'V<sub> 1</sub>', Color: '#03A89E', size: 3, label: { autoPosition: true, offset: [10, 10], } }),
        v2 = board.create('point', [function () {
            return (h.Value() - a.Value())
        }, function () {
            return k.Value()
        }],
            { name: 'V<sub> 2</sub>', Color: '#03A89E', size: 3, label: { autoPosition: true, offset: [10, 10], } }),


        g = board.create('hyperbola', [f1, f2, v1], { strokeWidth: 2, strokeColor: 'black' }),

        A1 = board.create('functiongraph', [function (x) { return [k.Value() - (b.Value() / a.Value()) * (x - h.Value())] }], { Color: "#8F00FF",  dash: 4 }),
        A2 = board.create('functiongraph', [function (x) { return [k.Value() + (b.Value() / a.Value()) * (x - h.Value())] }], { Color: "#8F00FF",  dash: 4 }),

        p1 = board.create('intersection', [l1, g, 0], { name: 'x_2', size: 3, Color: '#00CD00', label: { autoPosition: true, offset: [10, 10] } }),
        p2 = board.create('intersection', [l1, g, 1], { name: 'x_1', size: 3, Color: '#00CD00', label: { autoPosition: true, offset: [10, 10] } }),

        p3 = board.create('intersection', [l2, g, 0], { name: 'y_1', size: 3, Color: '#6D8280', label: { autoPosition: true, offset: [10, 10] } }),
        p4 = board.create('intersection', [l2, g, 1], { name: 'y_2', size: 3, Color: '#6D8280', label: { autoPosition: true, offset: [10, 10] } }),


        tp = b1.create('point', [0.8, 17.5], { name: '', face: '<>', size: 4, showInfobox: false, fixed: true, color: 'bleck' }),
        tp = b1.create('point', [function () { if (a.Value() == 0 || b.Value() == 0) { return ' ' } return 0.8 }, 8], { name: '', face: '<>', size: 4, showInfobox: false, fixed: true, color: 'bleck' }),
        tp = b1.create('point', [function () { if (a.Value() == 0 || b.Value() == 0) { return ' ' } return 0.8 }, 6], { name: '', face: '<>', size: 4, showInfobox: false, fixed: true, color: 'bleck' }),
        tp = b1.create('point', [function () { if (a.Value() == 0 || b.Value() == 0) { return ' ' } return 0.8 }, 4], { name: '', face: '<>', size: 4, showInfobox: false, fixed: true, color: 'bleck' }),
        tp = b1.create('point', [function () { if (a.Value() == 0 || b.Value() == 0) { return ' ' } return 0.8 }, 2], { name: '', face: '<>', size: 4, showInfobox: false, fixed: true, color: 'bleck' }),
        tp = b1.create('point', [function () { if (a.Value() == 0 || b.Value() == 0) { return ' ' } return 0.8 }, 0], { name: '', face: '<>', size: 4, showInfobox: false, fixed: true, color: 'bleck' }),
        tp = b1.create('point', [function () { if (a.Value() == 0 || b.Value() == 0) { return ' ' } return 0.8 }, -2], { name: '', face: '<>', size: 4, showInfobox: false, fixed: true, color: 'bleck' }),
        tp = b1.create('point', [function () { if (a.Value() == 0 || b.Value() == 0) { return ' ' } return 0.8 }, -3.5], { name: '', face: '<>', size: 4, showInfobox: false, fixed: true, color: 'bleck' }),
        tp = b1.create('point', [function () { if (a.Value() == 0 || b.Value() == 0) { return ' ' } return 0.8 }, -5], { name: '', face: '<>', size: 4, showInfobox: false, fixed: true, color: 'bleck' }),
        tp = b1.create('point', [function () { if (a.Value() == 0 || b.Value() == 0) { return ' ' } return 0.8 }, -6.5], { name: '', face: '<>', size: 4, showInfobox: false, fixed: true, color: 'bleck' }),


        t = b1.create('text', [2.5, 19, function () { return "\\[ \\mathbf {Interpretation}\\]" }], { fontSize: 18, useMathJax: true, fixed: true, strokeColor: '#0070C0' }),
        t = b1.create('text', [1, 17.5, "\\[\\mathbf{The \\ standard \\ form \\ equation \\ of \\  hyperbola\\ is}\\]"], { fontSize: 15, useMathJax: true, fixed: true }),
        t = b1.create('text', [1, 15.5, "\\[\\mathbf{ \\ \\frac{\\left(x-h\\right)^2}{a^2} - \\frac{\\left(y-k\\right)^2}{b^2}=1    \\ with \\ a,b,h,k \\in \\:\\mathbb{R}}\\]"], { fontSize: 15, useMathJax: true, fixed: true, strokeColor: '#002060' }),
        t = b1.create('text', [1, 13, function () {

            if (a.Value() == 0 || b.Value() == 0) {
                g.hide()
                f1.hide()
                f2.hide()
                v1.hide()
                v2.hide()
                A1.hide()
                A2.hide()
                c.hide()
                p1.hide()
                p2.hide()
                p3.hide()
                p4.hide()
                return "\\[\\mathbf{ Hyperbola \\ can't \\ generate \\ if \\ a \\ or \\ b = 0 }\\]"
            }
            else {
                g.show()
                f1.show()
                f2.show()
                v1.show()
                v2.show()
                A1.show()
                A2.show()
                c.show()
                p1.show()
                p2.show()
                p3.show()
                p4.show()
                return "\\[\\mathbf{The \\ equation \\ of \\ a \\ hyperbola \\ on \\ a \\ screen \\ is}\\]"
            }
        }], { fontSize: 15, useMathJax: true, fixed: true }),
        t = b1.create('text', [1, 11, function () {
            if (a.Value() == 0 || b.Value() == 0) {
                return ' '
            }
            return '\\[\\mathbf{ \\frac{\\left(x- (' + h.Value() + ')\\right)^2}{(' + a.Value() + ')^2} -\\frac{\\left(y-(' + k.Value() + ')\\right)^2}{(' + b.Value() + ')^2}=1   }\\]'
        }], { fontSize: 15, useMathJax: true, fixed: true, strokeColor: '#002060' }),


        t = b1.create('text', [1, 8, function () {
            if (a.Value() == 0 || b.Value() == 0) {
                return ''
            }
            else if (a.Value() < 0) {
                return "\\[ \\mathbf {Domain: ( - \\infty" + ' , ' + (h.Value() + a.Value()) + "] \\cup [" + (h.Value() - a.Value()) + " , \\infty)} \\]"
            }
            return "\\[ \\mathbf {Domain: ( - \\infty" + ' , ' + (h.Value() - a.Value()) + "] \\cup [" + (h.Value() + a.Value()) + " , \\infty)} \\]"
        }], { fontSize: 15, useMathJax: true, fixed: true, strokeColor: '#C42A56' }),

        t = b1.create('text', [1, 6, function () {
            if (a.Value() == 0 || b.Value() == 0) {
                return ''
            }
            return "\\[ \\mathbf {Range:( - \\infty , \\infty)} \\]"
        }], { fontSize: 15, useMathJax: true, fixed: true, strokeColor: '#f7b32bff' }),

        t = b1.create('text', [1, 4, function () {
            if (a.Value() == 0 || b.Value() == 0) {
                return ''
            }
            return '\\[ \\mathbf { Center \\ (O) :  \\left(' + c.X().toFixed(2) + " , " + c.Y().toFixed(2) + '\\right ) }\\]'
        }], { fontSize: 15, useMathJax: true, fixed: true, strokeColor: '#008000' })

    t = b1.create('text', [1, 2, function () {
        if (a.Value() == 0 || b.Value() == 0) {
            return ''
        }
        return '\\[ \\mathbf { X-intercept \\ x_1 :  \\left(' + p2.X().toFixed(2) + " , " + p2.Y().toFixed(2) + '\\right ) \\ and \\ x_2 :  \\left(' + p1.X().toFixed(2) + " , " + p1.Y().toFixed(2) + '\\right ) }\\]'
    }], { fontSize: 15, useMathJax: true, fixed: true, strokeColor: '#00CD00	' }),

        t = b1.create('text', [1, 0, function () {
            if (a.Value() == 0 || b.Value() == 0) {
                return ''
            }
            return '\\[ \\mathbf { Y-intercept \\ y_1 :  \\left(' + p3.X().toFixed(2) + " , " + p3.Y().toFixed(2) + '\\right ) \\ and \\ y_2 :  \\left(' + p4.X().toFixed(2) + " , " + p4.Y().toFixed(2) + '\\right ) }\\]'
        }], { fontSize: 15, useMathJax: true, fixed: true, strokeColor: '#6D8280' }),


        t = b1.create('text', [1, -2, function () {
            if (a.Value() == 0 || b.Value() == 0) {
                return ''
            }
            return "\\[ \\mathbf {Vertex : V_1 \\ :( " + v1.X().toFixed(2) + " , " + v1.Y() + ' )' + " \\ and \\ V_2 \\ :( " + v2.X().toFixed(2) + " , " + v2.Y() + ' )}\\]'

        }], { fontSize: 15, useMathJax: true, fixed: true, strokeColor: '#03A89E' }),

        t = b1.create('text', [1, -3.5, function () {
            if (a.Value() == 0 || b.Value() == 0) {
                return ''
            }
            return "\\[ \\mathbf {Focus: \\ f_1: (" + (f1.X()).toFixed(2) + ', ' + (f1.Y()).toFixed(2) + ') \\ and  \\ f_2: (' + (f2.X()).toFixed(2) + ', ' + (f2.Y()).toFixed(2) + ') }\\]'

        }], { fontSize: 15, useMathJax: true, fixed: true, strokeColor: '#F67000' }),

        t = b1.create('text', [1, -5, function () {
            if (a.Value() == 0 || b.Value() == 0) {
                return ''
            }
            return '\\[ \\mathbf {Asymptote \\ is \\ y \\ = \\mp (' + (b.Value() / a.Value()).toFixed(4) + 'x -' + (b.Value() * h.Value() / a.Value()).toFixed(4) + ')+ (' + k.Value() + ')}\\]'

        }], { fontSize: 15, useMathJax: true, fixed: true, strokeColor: '#8F00FF' }),




        t = b1.create('text', [1, -6.5, function () {
            if (a.Value() == 0 || b.Value() == 0) {
                return ''
            }
            return "\\[ \\mathbf {Eccentricity:" + (Math.sqrt(a.Value() * a.Value() + b.Value() * b.Value()) / Math.abs(a.Value())).toFixed(4) + "}\\]"
        }], { fontSize: 15, useMathJax: true, fixed: true, strokeColor: '#0070C0' }),

        t = b1.create('text', [3, -9, function () { return "\\[ \\mathbf {Input \\ sliders}\\]" }], { fontSize: 15, useMathJax: true, fixed: true, strokeColor: '#0070C0' })

    c.label.setProperty({ fontSize: 20, strokeColor: 'green' });
    f1.label.setProperty({ fontSize: 20, strokeColor: '#F67000' });
    f2.label.setProperty({ fontSize: 20, strokeColor: '#F67000' });
    v1.label.setProperty({ fontSize: 20, strokeColor: '#03A89E' });
    v2.label.setProperty({ fontSize: 20, strokeColor: '#03A89E' });
    p1.label.setProperty({ fontSize: 15, strokeColor: '#00CD00' });
    p2.label.setProperty({ fontSize: 15, strokeColor: '#00CD00' });
    p3.label.setProperty({ fontSize: 15, strokeColor: '#6D8280' });
    p4.label.setProperty({ fontSize: 15, strokeColor: '#6D8280' });

    g.on("over", function (e) { document.getElementById('myOutput').innerHTML = (' The equation of hyperbola is : (x - (' + h.Value() + '))<sup>2</sup> / (' + a.Value() + ')<sup>2</sup> + (y - (' + k.Value() + '))<sup>2</sup> / (' + b.Value() + ')<sup>2</sup>  =  1') });
    c.on('over', function (e) { document.getElementById('myOutput').innerHTML = "Center O: ( " + c.X().toFixed(2) + " , " + c.Y() + ' )'; });
    f1.on('over', function (e) { document.getElementById('myOutput').innerHTML = 'Focus  F <sub>1</sub> : (' + (f1.X()).toFixed(2) + ', ' + (f1.Y()).toFixed(2) + ')' });
    f2.on('over', function (e) { document.getElementById('myOutput').innerHTML = 'Focus  F <sub>2</sub> : (' + (f2.X()).toFixed(2) + ', ' + (f2.Y()).toFixed(2) + ')' });
    v1.on('over', function (e) { document.getElementById('myOutput').innerHTML = 'Vertex : V <sub>1</sub> : (' + (v1.X()).toFixed(2) + ', ' + (v1.Y()).toFixed(2) + ')' });
    v2.on('over', function (e) { document.getElementById('myOutput').innerHTML = 'Vertex : V <sub>2</sub> : (' + (v2.X()).toFixed(2) + ', ' + (v2.Y()).toFixed(2) + ')' });
    p1.on('over', function (e) { document.getElementById('myOutput').innerHTML = 'X-intercept x<sub>1</sub> : (' + (p1.X()).toFixed(2) + ', ' + (p1.Y()).toFixed(2) + ')' });
    p2.on('over', function (e) { document.getElementById('myOutput').innerHTML = 'X-intercept x<sub>2</sub> : (' + (p2.X()).toFixed(2) + ', ' + (p2.Y()).toFixed(2) + ')' });
    p3.on('over', function (e) { document.getElementById('myOutput').innerHTML = 'X-intercept y<sub>1</sub> : (' + (p3.X()).toFixed(2) + ', ' + (p3.Y()).toFixed(2) + ')' });
    p4.on('over', function (e) { document.getElementById('myOutput').innerHTML = 'X-intercept y<sub>2</sub> : (' + (p4.X()).toFixed(2) + ', ' + (p4.Y()).toFixed(2) + ')' });


    g.on('out', function (e) { document.getElementById('myOutput').innerHTML = 'Click in other points'; });
    c.on('out', function (e) { document.getElementById('myOutput').innerHTML = 'Click in other points'; });
    f1.on('out', function (e) { document.getElementById('myOutput').innerHTML = 'Click in other points'; });
    f2.on('out', function (e) { document.getElementById('myOutput').innerHTML = 'Click in other points'; });
    v1.on('out', function (e) { document.getElementById('myOutput').innerHTML = 'Click in other points'; });
    v2.on('out', function (e) { document.getElementById('myOutput').innerHTML = 'Click in other points'; });
    p1.on('out', function (e) { document.getElementById('myOutput').innerHTML = 'Click in other points'; });
    p2.on('out', function (e) { document.getElementById('myOutput').innerHTML = 'Click in other points'; });
    p3.on('out', function (e) { document.getElementById('myOutput').innerHTML = 'Click in other points'; });
    p4.on('out', function (e) { document.getElementById('myOutput').innerHTML = 'Click in other points'; });

    b1.addChild(board)
    board.update();
    b1.update();
    
}
function OpeningY() {
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
        b1 = JXG.JSXGraph.initBoard('graph1', { boundingbox: [0.5, 20, 7, -16], axis: false, grid: false, showNavigation: false, showCopyright: false }),
        
        //creat a line 
        l1 = board.create('line', [[0, 0], [1, 0]], { fixed: true, visible: true, color: 'bluck', lastArrow: true, firstArrow: true, highlightStrokeColor: 'removes highlighting' }),
        l2 = board.create('line', [[0, 0], [0, 1]], { fixed: true, visible: true, color: 'bluck', lastArrow: true, firstArrow: true, highlightStrokeColor: 'removes highlighting' }),
        l3 = b1.create('line', [[0.8, -8], [0.7, -8]], { fixed: true, color: 'blue' }),




        hidePointIfaIsZero = (point) => {
            if (point == undefined) {
                point.hide()
            } else {
                point.show()
            }
        },
        isLVisible = false,

        a = b1.create('slider', [[1, -10.5], [5.5, -10.5], [-10, -3, 10]], {
            name: 'a', snapWidth: 0.25,
            baseline: { strokeColor: '#afafaf' },
            highline: { strokeColor: '#094a82' },
            fillColor: '#afafaf',
            label: { fontSize: 2.5, strokeColor: 'bleck', fontUnit: 'vmin' },
        }),
        b = b1.create('slider', [[1, -12], [5.5, -12], [-10, -2, 10]], {
            name: 'b', snapWidth: 0.25, baseline: { strokeColor: '#afafaf' }, highline: { strokeColor: '#094a82' },
            fillColor: '#afafaf',
            label: { fontSize: 2.5, strokeColor: 'bleck', fontUnit: 'vmin' }
        }),
        h = b1.create('slider', [[1, -13.5], [5.5, -13.5], [-10, 1, 10]], {
            name: 'h', snapWidth: 0.25, baseline: { strokeColor: '#afafaf' },
            highline: { strokeColor: '#094a82' },
            fillColor: '#afafaf',
            label: { fontSize: 2.5, strokeColor: 'bleck', fontUnit: 'vmin' }
        }),
        k = b1.create('slider', [[1, -15], [5.5, -15], [-10, 1, 10]], {
            name: 'k', snapWidth: 0.25, baseline: { strokeColor: '#afafaf' },
            highline: { strokeColor: '#094a82' },
            fillColor: '#afafaf',
            label: { fontSize: 2.5, strokeColor: 'bleck', fontUnit: 'vmin' }
        }),
        c = board.create('point', [function () {
            return (h.Value())
        }, function () {
            return (k.Value())
        }],
            { name: 'O', Color: 'green', size: 3, label: { autoPosition: true, offset: [10, 10], } }),

        f1 = board.create('point', [function () {
            return h.Value()
        }, function () {
            return (k.Value() - Math.sqrt(a.Value() * a.Value() + b.Value() * b.Value()))
        }],
            { name: 'F <sub>1</sub>', Color: '#F67000', size: 3, label: { autoPosition: true, offset: [10, 10], } }),
        f2 = board.create('point', [function () {
            return h.Value()
        }, function () {
            return (k.Value() + Math.sqrt(a.Value() * a.Value() + b.Value() * b.Value()))
        }],
            { name: 'F<sub> 2</sub>', Color: '#F67000', size: 3, label: { autoPosition: true, offset: [10, 10], } }),

        v1 = board.create('point', [function () {
            return h.Value()
        }, function () {
            return (k.Value() + a.Value())
        }],
            { name: 'V<sub> 1</sub>', Color: '#03A89E', size: 3, label: { autoPosition: true, offset: [10, 10], } }),
        v2 = board.create('point', [function () {
            return h.Value()
        }, function () {
            return (k.Value() - a.Value())
        }],
            { name: 'V<sub> 2</sub>', Color: '#03A89E', size: 3, label: { autoPosition: true, offset: [10, 10], } }),


        g = board.create('hyperbola', [f1, f2, v1], { strokeWidth: 2, strokeColor: 'black' }),

        A1 = board.create('functiongraph', [function (x) { return [k.Value() - (a.Value() / b.Value()) * (x - h.Value())] }], { Color: "#8F00FF", straightFirst: false, straightLast: false, strokeWidth: 2, dash: 4 }),
        A2 = board.create('functiongraph', [function (x) { return [k.Value() + (a.Value() / b.Value()) * (x - h.Value())] }], { Color: "#8F00FF", straightFirst: false, straightLast: false, strokeWidth: 2, dash: 4 }),

        p1 = board.create('intersection', [l1, g, 0], { name: 'x_2', size: 3, Color: '#00CD00', label: { autoPosition: true, offset: [10, 10] } }),
        p2 = board.create('intersection', [l1, g, 1], { name: 'x_1', size: 3, Color: '#00CD00', label: { autoPosition: true, offset: [10, 10] } }),

        p3 = board.create('intersection', [l2, g, 0], { name: 'y_1', size: 3, Color: '#6D8280', label: { autoPosition: true, offset: [10, 10] } }),
        p4 = board.create('intersection', [l2, g, 1], { name: 'y_2', size: 3, Color: '#6D8280', label: { autoPosition: true, offset: [10, 10] } }),
        tp = b1.create('point', [0.8, 17.5], { name: '', face: '<>', size: 4, showInfobox: false, fixed: true, color: 'bleck' }),
        tp = b1.create('point', [function () { if (a.Value() == 0 || b.Value() == 0) { return ' ' } return 0.8 }, 8], { name: '', face: '<>', size: 4, showInfobox: false, fixed: true, color: 'bleck' }),
        tp = b1.create('point', [function () { if (a.Value() == 0 || b.Value() == 0) { return ' ' } return 0.8 }, 6], { name: '', face: '<>', size: 4, showInfobox: false, fixed: true, color: 'bleck' }),
        tp = b1.create('point', [function () { if (a.Value() == 0 || b.Value() == 0) { return ' ' } return 0.8 }, 4], { name: '', face: '<>', size: 4, showInfobox: false, fixed: true, color: 'bleck' }),
        tp = b1.create('point', [function () { if (a.Value() == 0 || b.Value() == 0) { return ' ' } return 0.8 }, 2], { name: '', face: '<>', size: 4, showInfobox: false, fixed: true, color: 'bleck' }),
        tp = b1.create('point', [function () { if (a.Value() == 0 || b.Value() == 0) { return ' ' } return 0.8 }, 0], { name: '', face: '<>', size: 4, showInfobox: false, fixed: true, color: 'bleck' }),
        tp = b1.create('point', [function () { if (a.Value() == 0 || b.Value() == 0) { return ' ' } return 0.8 }, -2], { name: '', face: '<>', size: 4, showInfobox: false, fixed: true, color: 'bleck' }),
        tp = b1.create('point', [function () { if (a.Value() == 0 || b.Value() == 0) { return ' ' } return 0.8 }, -3.5], { name: '', face: '<>', size: 4, showInfobox: false, fixed: true, color: 'bleck' }),
        tp = b1.create('point', [function () { if (a.Value() == 0 || b.Value() == 0) { return ' ' } return 0.8 }, -5], { name: '', face: '<>', size: 4, showInfobox: false, fixed: true, color: 'bleck' }),
        tp = b1.create('point', [function () { if (a.Value() == 0 || b.Value() == 0) { return ' ' } return 0.8 }, -6.5], { name: '', face: '<>', size: 4, showInfobox: false, fixed: true, color: 'bleck' }),


        t = b1.create('text', [2.5, 19, function () { return "\\[ \\mathbf {Interpretation}\\]" }], { fontSize: 18, useMathJax: true, fixed: true, strokeColor: '#0070C0' }),
        t = b1.create('text', [1, 17.5, "\\[\\mathbf{The \\ standard \\ form \\ equation \\ of \\  hyperbola\\ is}\\]"], { fontSize: 15, useMathJax: true, fixed: true }),
        t = b1.create('text', [1, 15.5, "\\[\\mathbf{ \\ \\frac{\\left(y-k\\right)^2}{a^2} - \\frac{\\left(x-h\\right)^2}{b^2}=1    \\ with \\ a,b,h,k \\in \\:\\mathbb{R}}\\]"], { fontSize: 15, useMathJax: true, fixed: true, strokeColor: '#002060' }),
        t = b1.create('text', [1, 13, function () {

            if (a.Value() == 0 || b.Value() == 0) {
                g.hide()
                f1.hide()
                f2.hide()
                v1.hide()
                v2.hide()
                A1.hide()
                A2.hide()
                c.hide()
                p1.hide()
                p2.hide()
                p3.hide()
                p4.hide()
                return "\\[\\mathbf{ Hyperbola \\ can't \\ generate \\ if \\ a \\ or \\ b = 0 }\\]"
            }
            else {
                g.show()
                f1.show()
                f2.show()
                v1.show()
                v2.show()
                A1.show()
                A2.show()
                c.show()
                p1.show()
                p2.show()
                p3.show()
                p4.show()
                return "\\[\\mathbf{The \\ equation \\ of \\ a \\ hyperbola \\ on \\ a \\ screen \\ is}\\]"
            }
        }], { fontSize: 15, useMathJax: true, fixed: true }),
        t = b1.create('text', [1, 11, function () {
            if (a.Value() == 0 || b.Value() == 0) {
                return ' '
            }
            return '\\[\\mathbf{ \\frac{\\left(y- (' + k.Value() + ')\\right)^2}{(' + a.Value() + ')^2} -\\frac{\\left(x-(' + h.Value() + ')\\right)^2}{(' + b.Value() + ')^2}=1   }\\]'
        }], { fontSize: 15, useMathJax: true, fixed: true, strokeColor: '#002060' }),


        t = b1.create('text', [1, 8, function () {
            if (a.Value() == 0 || b.Value() == 0) {
                return ''
            }
            return "\\[Domain \\mathbf {:( - \\infty , \\infty)} \\]"
        }], { fontSize: 15, useMathJax: true, fixed: true, strokeColor: '#C42A56' }),

        t = b1.create('text', [1, 6, function () {
            if (a.Value() == 0 || b.Value() == 0) {
                return ''
            }
            else if (a.Value() < 0) {
                return "\\[ \\mathbf {Range: ( - \\infty" + ' , ' + (h.Value() + a.Value()) + "] \\cup [" + (h.Value() - a.Value()) + " , \\infty)} \\]"
            }
            return "\\[ \\mathbf {Range: ( - \\infty" + ' , ' + (h.Value() - a.Value()) + "] \\cup [" + (h.Value() + a.Value()) + " , \\infty)} \\]"




        }], { fontSize: 15, useMathJax: true, fixed: true, strokeColor: '#f7b32bff' }),

        t = b1.create('text', [1, 4, function () {
            if (a.Value() == 0 || b.Value() == 0) {
                return ''
            }
            return '\\[ \\mathbf { Center \\ (O) :  \\left(' + c.X().toFixed(2) + " , " + c.Y().toFixed(2) + '\\right ) }\\]'
        }], { fontSize: 15, useMathJax: true, fixed: true, strokeColor: '#008000' })

    t = b1.create('text', [1, 2, function () {
        if (a.Value() == 0 || b.Value() == 0) {
            return ''
        }
        return '\\[ \\mathbf { X-intercept \\ x_1 :  \\left(' + p2.X().toFixed(2) + " , " + p2.Y().toFixed(2) + '\\right ) \\ and \\ x_2 :  \\left(' + p1.X().toFixed(2) + " , " + p1.Y().toFixed(2) + '\\right ) }\\]'
    }], { fontSize: 15, useMathJax: true, fixed: true, strokeColor: '#00CD00	' }),

        t = b1.create('text', [1, 0, function () {
            if (a.Value() == 0 || b.Value() == 0) {
                return ''
            }
            return '\\[ \\mathbf { Y-intercept \\ y_1 :  \\left(' + p3.X().toFixed(2) + " , " + p3.Y().toFixed(2) + '\\right ) \\ and \\ y_2 :  \\left(' + p4.X().toFixed(2) + " , " + p4.Y().toFixed(2) + '\\right ) }\\]'
        }], { fontSize: 15, useMathJax: true, fixed: true, strokeColor: '#6D8280' }),


        t = b1.create('text', [1, -2, function () {
            if (a.Value() == 0 || b.Value() == 0) {
                return ''
            }
            return "\\[ \\mathbf {Vertex : V_1 \\ :( " + v1.X().toFixed(2) + " , " + v1.Y() + ' )' + " \\ and \\ V_2 \\ :( " + v2.X().toFixed(2) + " , " + v2.Y() + ' )}\\]'

        }], { fontSize: 15, useMathJax: true, fixed: true, strokeColor: '#03A89E' }),

        t = b1.create('text', [1, -3.5, function () {
            if (a.Value() == 0 || b.Value() == 0) {
                return ''
            }
            return "\\[ \\mathbf {Focus: \\ f_1: (" + (f1.X()).toFixed(2) + ', ' + (f1.Y()).toFixed(2) + ') \\ and  \\ f_2: (' + (f2.X()).toFixed(2) + ', ' + (f2.Y()).toFixed(2) + ') }\\]'

        }], { fontSize: 15, useMathJax: true, fixed: true, strokeColor: '#F67000' }),

        t = b1.create('text', [1, -5, function () {
            if (a.Value() == 0 || b.Value() == 0) {
                return ''
            }
            return '\\[ \\mathbf {Asymptote \\ is \\ y \\ = \\mp (' + (b.Value() / a.Value()).toFixed(4) + 'x -' + (b.Value() * h.Value() / a.Value()).toFixed(4) + ')+ (' + k.Value() + ')}\\]'

        }], { fontSize: 15, useMathJax: true, fixed: true, strokeColor: '#8F00FF' }),




        t = b1.create('text', [1, -6.5, function () {
            if (a.Value() == 0 || b.Value() == 0) {
                return ''
            }
            return "\\[ \\mathbf {Eccentricity:" + (Math.sqrt(a.Value() * a.Value() + b.Value() * b.Value()) / Math.abs(b.Value())).toFixed(4) + "}\\]"
        }], { fontSize: 15, useMathJax: true, fixed: true, strokeColor: '#0070C0' }),

        t = b1.create('text', [3, -9, function () { return "\\[ \\mathbf {Input \\ sliders}\\]" }], { fontSize: 15, useMathJax: true, fixed: true, strokeColor: '#0070C0' })

    c.label.setProperty({ fontSize: 20, strokeColor: 'green' });
    f1.label.setProperty({ fontSize: 20, strokeColor: '#F67000' });
    f2.label.setProperty({ fontSize: 20, strokeColor: '#F67000' });
    v1.label.setProperty({ fontSize: 20, strokeColor: '#03A89E' });
    v2.label.setProperty({ fontSize: 20, strokeColor: '#03A89E' });
    p1.label.setProperty({ fontSize: 15, strokeColor: '#00CD00' });
    p2.label.setProperty({ fontSize: 15, strokeColor: '#00CD00' });
    p3.label.setProperty({ fontSize: 15, strokeColor: '#6D8280' });
    p4.label.setProperty({ fontSize: 15, strokeColor: '#6D8280' });

    g.on("over", function (e) { document.getElementById('myOutput').innerHTML = (' The equation of hyperbola is : (y - (' + k.Value() + '))<sup>2</sup> / (' + a.Value() + ')<sup>2</sup> + (x - (' + h.Value() + '))<sup>2</sup> / (' + b.Value() + ')<sup>2</sup>  =  1') });
    c.on('over', function (e) { document.getElementById('myOutput').innerHTML = "Center O: ( " + c.X().toFixed(2) + " , " + c.Y() + ' )'; });
    f1.on('over', function (e) { document.getElementById('myOutput').innerHTML = 'Focus  F <sub>1</sub> : (' + (f1.X()).toFixed(2) + ', ' + (f1.Y()).toFixed(2) + ')' });
    f2.on('over', function (e) { document.getElementById('myOutput').innerHTML = 'Focus  F <sub>2</sub> : (' + (f2.X()).toFixed(2) + ', ' + (f2.Y()).toFixed(2) + ')' });
    v1.on('over', function (e) { document.getElementById('myOutput').innerHTML = 'Vertex : V <sub>1</sub> : (' + (v1.X()).toFixed(2) + ', ' + (v1.Y()).toFixed(2) + ')' });
    v2.on('over', function (e) { document.getElementById('myOutput').innerHTML = 'Vertex : V <sub>2</sub> : (' + (v2.X()).toFixed(2) + ', ' + (v2.Y()).toFixed(2) + ')' });
    p1.on('over', function (e) { document.getElementById('myOutput').innerHTML = 'X-intercept x<sub>1</sub> : (' + (p1.X()).toFixed(2) + ', ' + (p1.Y()).toFixed(2) + ')' });
    p2.on('over', function (e) { document.getElementById('myOutput').innerHTML = 'X-intercept x<sub>2</sub> : (' + (p2.X()).toFixed(2) + ', ' + (p2.Y()).toFixed(2) + ')' });
    p3.on('over', function (e) { document.getElementById('myOutput').innerHTML = 'Y-intercept y<sub>1</sub> : (' + (p3.X()).toFixed(2) + ', ' + (p3.Y()).toFixed(2) + ')' });
    p4.on('over', function (e) { document.getElementById('myOutput').innerHTML = 'Y-intercept y<sub>2</sub> : (' + (p4.X()).toFixed(2) + ', ' + (p4.Y()).toFixed(2) + ')' });


    g.on('out', function (e) { document.getElementById('myOutput').innerHTML = 'Click in other points'; });
    c.on('out', function (e) { document.getElementById('myOutput').innerHTML = 'Click in other points'; });
    f1.on('out', function (e) { document.getElementById('myOutput').innerHTML = 'Click in other points'; });
    f2.on('out', function (e) { document.getElementById('myOutput').innerHTML = 'Click in other points'; });
    v1.on('out', function (e) { document.getElementById('myOutput').innerHTML = 'Click in other points'; });
    v2.on('out', function (e) { document.getElementById('myOutput').innerHTML = 'Click in other points'; });
    p1.on('out', function (e) { document.getElementById('myOutput').innerHTML = 'Click in other points'; });
    p2.on('out', function (e) { document.getElementById('myOutput').innerHTML = 'Click in other points'; });
    p3.on('out', function (e) { document.getElementById('myOutput').innerHTML = 'Click in other points'; });
    p4.on('out', function (e) { document.getElementById('myOutput').innerHTML = 'Click in other points'; });

    b1.addChild(board)
    board.update();
    b1.update();
}


