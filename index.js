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
        b2 = JXG.JSXGraph.initBoard('graph2', {boundingbox: [-5, 5, 5, -5], axis: false, grid: false, showNavigation: false, showCopyright: false}),
        butt = b2.create('button', [-5,1, 'General Equation', function () {
            var txt;
            butt.value = !butt.value;
            if (butt.value) {
                txt = 'General Equation';
                P1();
            }
            else {
                txt = 'Standard Equations';
                P2();
            }
            butt.rendNodeButton.innerHTML = txt;
            //if (!JXG.exists(butt.value)) {butt.value = false;}

           
        }]),
        butt1 = b2.create('button', [0,1, 'Opening Y-axis', function () {
            var txt;
            butt1.value = !butt1.value;
            if (butt1.value) {
                txt = 'Opening Y-axis';
                //P1();
            }
            else {
                txt = 'Opening X-axis';
                //P2();
            }
            butt1.rendNodeButton.innerHTML = txt;
            //if (!JXG.exists(butt.value)) {butt.value = false;}

        }]);
     
        
         
        b2.addChild(b1)

    /* Set initial value for the button
    if (!JXG.exists(butt.value)) {
        butt.value = false;
    }
    /* tRot = board.create('transform', [3*Math.PI/2], { type: 'rotate' });
                tRot.bindTo(L);
                board.update();
*/
}

function P1() {
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

        a = b1.create('slider', [[1, -10.5], [6, -10.5], [-5, 1, 5]], {
            name: 'a', snapWidth: 0.25,
            baseline: { strokeColor: 'blue' },
            highline: { strokeColor: 'red' },
            fillColor: 'yellow',
            label: { fontSize: 15, strokeColor: 'orange' },
/*name: 'xyz', // Not shown, if suffixLabel is set
suffixLabel: 'x = ',
postLabel: ' u'*/ }),
        b = b1.create('slider', [[1, -12], [6, -12], [-5, 1, 5]], { name: 'b', snapWidth: 0.25 }),
        c = b1.create('slider', [[1, -13.5], [6, -13.5], [-5, 1, 5]], { name: 'c', snapWidth: 0.25 }),

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

        q = board.create('line', [[0, function () { return (v.Y() - a.Value()) }], [1, function () { return (v.Y() - a.Value()) }]], { strokeWidth: 2, dragToTopOfLayer: true, strokeColor: '#8F00FF', lastArrow: true, firstArrow: true }),
        p = board.create('point', [function () { return (v.X() + 1) }, function () { return (v.Y() - a.Value()) }], { size: 0, name: 'D', strokeColor: 'black', label: { autoPosition: true, offset: [10, 10] } }),

        //Creat a All text in graph 
        t = b1.create('text', [2.5, 15, function () { return "\\[ \\mathbf {Interpretation}\\]" }], { fontSize: 18, useMathJax: true, fixed: true, strokeColor: '#0070C0' }),
        t = b1.create('text', [1, 13, "\\[\\mathbf{The \\ general \\ equation \\ of \\  parabola\\ is}\\]"], { fontSize: 15, useMathJax: true, fixed: true }),
        t = b1.create('text', [1, 11.5, "\\[\\mathbf{y= a\\ x^{2}+ b \\ x +c \\ with \\ a,b,c \\in \\:\\mathbb{R}}\\]"], { fontSize: 15, useMathJax: true, fixed: true, strokeColor: '#002060' }),
        t = b1.create('text', [1, 10, "\\[\\mathbf{The \\ equation \\ of \\ a \\ parabola\\ on \\ a \\ screen \\ is}\\]"], { fontSize: 15, useMathJax: true, fixed: true }),
        t = b1.create('text', [1, 8.5, function () { return "\\[\\mathbf{y = " + a.Value().toFixed(2) + '\\ x^2 + ' + '(' + b.Value().toFixed(2) + ')' + ' \\ x  + ' + '(' + c.Value().toFixed(2) + ')}\\]' }], { fontSize: 15, useMathJax: true, fixed: true, strokeColor: '#002060' }),
        t = b1.create('text', [1, 7, function () { return "\\[ \\mathbf {Domain:\\ \\left\\{ x \\ | \\ x \\in \\:\\mathbb{R} \\right\\}} \\]" }], { fontSize: 15, useMathJax: true, fixed: true, strokeColor: '#8B27DD' }),
        t = b1.create('text', [1, 5.5, function () {
            if (a.Value() < 0) {
                return "\\[ \\mathbf {Range:\\ \\left\\{ y\\ | \\ y \\le " + c.Value().toFixed(2) + "\\right\\}} \\]"
            }
            else if (a.Value() > 0) {
                return "\\[ \\mathbf {Range:\\ \\left\\{ y\\ | \\ y \\ge " + c.Value().toFixed(2) + "\\right\\}} \\]"
            }
            else if (a.Value() == 0) {
                return "\\[ \\mathbf {Range:\\ \\left\\{ y\\ | \\ y = " + c.Value().toFixed(2) + "\\right\\}} \\]"
            }
        }], { fontSize: 15, useMathJax: true, fixed: true, strokeColor: '#f7b32bff' }),


        t = b1.create('text', [1, 4, function () { return '\\[ \\mathbf { Vertex \\ (V) :  \\left(' + v.X().toFixed(4) + " , " + v.Y().toFixed(4) + '\\right ) }\\]' }], { fontSize: 15, useMathJax: true, fixed: true, strokeColor: '#008000' }),
        t = b1.create('text', [1, 2.5, function () { return "\\[ \\mathbf {X-intercept: x_1 :( " + p1.X().toFixed(4) + " , " + p1.Y() + ' )' + "  ,x_2:  " + "( " + p2.X().toFixed(4) + " , " + p2.Y() + ' )}\\]' }], { fontSize: 15, useMathJax: true, fixed: true, strokeColor: '#03A89E' }),
        t = b1.create('text', [1, 1, function () { return "\\[ \\mathbf {Y-intercept:y_1 : ( " + p3.X() + " , " + p3.Y().toFixed(2) + ' )}\\]' }], { fontSize: 15, useMathJax: true, fixed: true, strokeColor: '#0000FF' }),
        t = b1.create('text', [1, -0.5, function () { return "\\[ \\mathbf {Axis \\ of \\ symmetry \\ : \\ x \\ =  " + f.X().toFixed(4) + '}\\]' }], { fontSize: 15, useMathJax: true, fixed: true, strokeColor: '#F67000' }),
        t = b1.create('text', [1, -2, function () { return " \\[ \\mathbf { Focus \\ (F) : \\left(" + f.X().toFixed(4) + " , " + f.Y().toFixed(4) + ' \\right)}\\]' }], { fontSize: 15, useMathJax: true, fixed: true, strokeColor: '#C42A56' }),
        t = b1.create('text', [1, -3.5, function () { return "\\[ \\mathbf {Directrix \\ (D):\\ y \\ = " + p.Y().toFixed(4) + '}\\]' }], { fontSize: 15, useMathJax: true, fixed: true, strokeColor: '#8F00FF' }),
        t = b1.create('text', [1, -5, function () { return "\\[ \\mathbf {Focal \\ length :" + 1 / 4 * a.Value().toFixed(4) + '}\\]' }], { fontSize: 15, useMathJax: true, fixed: true, strokeColor: '#8E6C00' }),
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
        l1 = b1.create('line', [[0.8, -8], [0.7, -8]], { fixed: true, color: 'red' })

    //create notification on the graph  
    p1.on('over', function (e) { document.getElementById('myOutput').innerHTML = "X- intesect point is x<sub>1</sub> : ( " + p1.X().toFixed(4) + " , " + p1.Y() + ' )'; });
    p1.on('out', function (e) { document.getElementById('myOutput').innerHTML = 'Click in other points'; });

    p2.on("over", function (e) { document.getElementById('myOutput').innerHTML = (" X-intercept point is x<sub>2</sub> :  " + "( " + p2.X().toFixed(4) + " , " + p2.Y() + ' )'); });
    p2.on('out', function (e) { document.getElementById('myOutput').innerHTML = 'Click in other points'; });

    p3.on("over", function (e) { document.getElementById('myOutput').innerHTML = (" Y-intercept point is y<sub>1</sub> : ( " + p3.X() + " , " + p3.Y().toFixed(2) + ' )'); });
    p3.on('out', function (e) { document.getElementById('myOutput').innerHTML = 'Click in other points'; });

    q.on("over", function (e) { document.getElementById('myOutput').innerHTML = (" Directrix (D) : y  = " + p.Y().toFixed(4)) });
    q.on('out', function (e) { document.getElementById('myOutput').innerHTML = 'Click in other points'; });

    v.on("over", function (e) { document.getElementById('myOutput').innerHTML = (" Vertex (V) :  (" + v.X().toFixed(4) + " , " + v.Y().toFixed(4) + ')') });
    v.on('out', function (e) { document.getElementById('myOutput').innerHTML = 'Click in other points'; });


    f.on("over", function (e) { document.getElementById('myOutput').innerHTML = (" Focus (F) : ( " + f.X().toFixed(4) + "  ,  " + f.Y().toFixed(4) + "  )") });
    f.on('out', function (e) { document.getElementById('myOutput').innerHTML = 'Click in other points'; });

    L.on("over", function (e) { document.getElementById('myOutput').innerHTML = (" The equation of parabola is : y = " + a.Value().toFixed(2) + ' x<sup>2</sup> + ' + '(' + b.Value().toFixed(2) + ')' + ' x  + ' + '(' + c.Value().toFixed(2) + ')') });
    L.on('out', function (e) { document.getElementById('myOutput').innerHTML = 'Click in other points'; });

    /*
    AX.on("over", function (e) { document.getElementById('myOutput').innerHTML = (" Axis of symmetry :  x  =  " + f.X().toFixed(4)) });
    AX.on('out', function (e) { document.getElementById('myOutput').innerHTML = 'Click in other points'; });
    
    
    p3.on("over", function() {alert(" X-intercept: x_2:  " + "( " + p2.X().toFixed(4) + " , " + p2.Y() + ' )');});
    */



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
function P2() {
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

        a = b1.create('slider', [[1, -10.5], [6, -10.5], [-5, 1, 5]], { name: 'a', snapWidth: 0.25, baseline: { strokeColor: 'blue' }, highline: { strokeColor: 'red' }, fillColor: 'yellow', label: { fontSize: 15, strokeColor: 'orange' }, }),
        b = b1.create('slider', [[1, -12], [6, -12], [-5, 1, 5]], { name: 'h', snapWidth: 0.25 }),
        c = b1.create('slider', [[1, -13.5], [6, -13.5], [-5, 1, 5]], { name: 'k', snapWidth: 0.25 }),

        // creat a parabola grpah in board 
        L = board.create('functiongraph', [function (x) { return 1 / (4 * a.Value()) * (x - b.Value()) * (x - b.Value()) + c.Value() }], { strokeWidth: 3, dragToTopOfLayer: true, strokeColor: '#002060' }),



        v = board.create('point', [function () { return b.Value() }, function () { return c.Value() }],
            { name: 'V', Color: 'green', size: 3, label: { autoPosition: true, offset: [10, 10] } }),

        f = board.create('point', [function () { return b.Value() },
        function () { return (c.Value() + a.Value()) }],
            { name: 'F', Color: '#C42A56', size: 3, label: { autoPosition: true, offset: [10, 10] } }),

        AX = board.create('line', [v, f], { dash: 4, strokeWidth: 2, strokeColor: '#F67000' }),


        l1 = board.create('line', [[0, 0], [1, 0]], { fixed: true, visible: true, color: 'bluck', lastArrow: true, firstArrow: true, highlightStrokeColor: 'removes highlighting' }),
        l2 = board.create('line', [[0, 0], [0, 1]], { fixed: true, visible: true, color: 'bluck', lastArrow: true, firstArrow: true, highlightStrokeColor: 'removes highlighting' }),

        //creat intesection point 
        p1 = board.create('intersection', [l1, L, 0], { name: 'x_1', size: 3, Color: '#03A89E', label: { autoPosition: true, offset: [10, 10] } }),
        p2 = board.create('intersection', [l1, L, 1], { name: 'x_2', size: 3, Color: '#03A89E', label: { autoPosition: true, offset: [10, 10] } }),
        p3 = board.create('intersection', [l2, L, 0], { name: 'y_1', size: 3, Color: '#0000FF', label: { autoPosition: true, offset: [10, 10] } }),

        q = board.create('line', [[0, function () { return (v.Y() - a.Value()) }], [1, function () { return (v.Y() - a.Value()) }]], { strokeWidth: 2, dragToTopOfLayer: true, strokeColor: '#8F00FF', lastArrow: true, firstArrow: true }),
        p = board.create('point', [function () { return (v.X() + 1) }, function () { return (v.Y() - a.Value()) }], { size: 0, name: 'D', strokeColor: 'black', label: { autoPosition: true, offset: [10, 10] } }),

        //Creat a All text in graph 
        t = b1.create('text', [2.5, 15, function () { return "\\[ \\mathbf {Interpretation}\\]" }], { fontSize: 18, useMathJax: true, fixed: true, strokeColor: '#0070C0' }),
        t = b1.create('text', [1, 13, "\\[\\mathbf{The \\ standard \\ equation \\ of \\  parabola\\ is}\\]"], { fontSize: 15, useMathJax: true, fixed: true }),
        t = b1.create('text', [1, 11.5, "\\[\\mathbf{(x-h )^{2}= 4a (y-k)  with \\ a,b,c \\in \\:\\mathbb{R}}\\]"], { fontSize: 15, useMathJax: true, fixed: true, strokeColor: '#002060' }),
        t = b1.create('text', [1, 10, "\\[\\mathbf{The \\ equation \\ of \\ a \\ parabola\\ on \\ a \\ screen \\ is}\\]"], { fontSize: 15, useMathJax: true, fixed: true }),
        t = b1.create('text', [1, 8.5, function () { return "\\[\\mathbf{(x - (" + b.Value().toFixed(2) + '))^2 =' + '4(' + a.Value().toFixed(2) + ')' + '( y - (' + c.Value().toFixed(2) + '))}\\]' }], { fontSize: 15, useMathJax: true, fixed: true, strokeColor: '#002060' }),
        t = b1.create('text', [1, 7, function () { return "\\[ \\mathbf {Domain:\\{ x \\ | \\ x \\in \\:\\mathbb{R} \\}} \\]" }], { fontSize: 15, useMathJax: true, fixed: true, strokeColor: '#8B27DD' }),
        t = b1.create('text', [1, 5.5, function () {
            if (a.Value() < 0) {
                return "\\[ \\mathbf {Range:\\ { y\\ | \\ y \\le " + c.Value().toFixed(2) + "\\}} \\]"
            }
            else if (a.Value() > 0) {
                return "\\[ \\mathbf {Range:\\{ y\\ | \\ y \\ge " + c.Value().toFixed(2) + "\\}} \\]"
            }
            else if (a.Value() == 0) {
                return "\\[ \\mathbf {Range:\\{ y\\ | \\ y = " + c.Value().toFixed(2) + "\\}} \\]"
            }
        }], { fontSize: 15, useMathJax: true, fixed: true, strokeColor: '#f7b32bff' }),


        t = b1.create('text', [1, 4, function () { return '\\[ \\mathbf { Vertex \\ (V) :  (' + v.X().toFixed(4) + " , " + v.Y().toFixed(4) + ' ) }\\]' }], { fontSize: 15, useMathJax: true, fixed: true, strokeColor: '#008000' }),
        t = b1.create('text', [1, 2.5, function () { return "\\[ \\mathbf {X-intercept: x_1 :( " + p1.X().toFixed(4) + " , " + p1.Y() + ' )' + "  ,x_2:  " + "( " + p2.X().toFixed(4) + " , " + p2.Y() + ' )}\\]' }], { fontSize: 15, useMathJax: true, fixed: true, strokeColor: '#03A89E' }),
        t = b1.create('text', [1, 1, function () { return "\\[ \\mathbf {Y-intercept:y_1 : ( " + p3.X() + " , " + p3.Y().toFixed(2) + ' )}\\]' }], { fontSize: 15, useMathJax: true, fixed: true, strokeColor: '#0000FF' }),
        t = b1.create('text', [1, -0.5, function () { return "\\[ \\mathbf {Axis \\ of \\ symmetry \\ : \\ x \\ =  " + f.X().toFixed(4) + '}\\]' }], { fontSize: 15, useMathJax: true, fixed: true, strokeColor: '#F67000' }),
        t = b1.create('text', [1, -2, function () { return " \\[ \\mathbf { Focus \\ (F) : (" + f.X().toFixed(4) + " , " + f.Y().toFixed(4) + ' )}\\]' }], { fontSize: 15, useMathJax: true, fixed: true, strokeColor: '#C42A56' }),
        t = b1.create('text', [1, -3.5, function () { return "\\[ \\mathbf {Directrix \\ (D):\\ y \\ = " + p.Y().toFixed(4) + '}\\]' }], { fontSize: 15, useMathJax: true, fixed: true, strokeColor: '#8F00FF' }),
        t = b1.create('text', [1, -5, function () { return "\\[ \\mathbf {Focal \\ length :" + 1 / 4 * a.Value().toFixed(4) + '}\\]' }], { fontSize: 15, useMathJax: true, fixed: true, strokeColor: '#8E6C00' }),
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
        l1 = b1.create('line', [[0.8, -8], [0.7, -8]], { fixed: true, color: 'red' })

    //create notification on the graph  
    p1.on('over', function (e) { document.getElementById('myOutput').innerHTML = "X- intesect point is x<sub>1</sub> : ( " + p1.X().toFixed(4) + " , " + p1.Y() + ' )'; });
    p1.on('out', function (e) { document.getElementById('myOutput').innerHTML = 'Click in other points'; });

    p2.on("over", function (e) { document.getElementById('myOutput').innerHTML = (" X-intercept point is x<sub>2</sub> :  " + "( " + p2.X().toFixed(4) + " , " + p2.Y() + ' )'); });
    p2.on('out', function (e) { document.getElementById('myOutput').innerHTML = 'Click in other points'; });

    p3.on("over", function (e) { document.getElementById('myOutput').innerHTML = (" Y-intercept point is y<sub>1</sub> : ( " + p3.X() + " , " + p3.Y().toFixed(2) + ' )'); });
    p3.on('out', function (e) { document.getElementById('myOutput').innerHTML = 'Click in other points'; });

    q.on("over", function (e) { document.getElementById('myOutput').innerHTML = (" Directrix (D) : y  = " + p.Y().toFixed(4)) });
    q.on('out', function (e) { document.getElementById('myOutput').innerHTML = 'Click in other points'; });

    v.on("over", function (e) { document.getElementById('myOutput').innerHTML = (" Vertex (V) :  (" + v.X().toFixed(4) + " , " + v.Y().toFixed(4) + ')') });
    v.on('out', function (e) { document.getElementById('myOutput').innerHTML = 'Click in other points'; });


    f.on("over", function (e) { document.getElementById('myOutput').innerHTML = (" Focus (F) : ( " + f.X().toFixed(4) + "  ,  " + f.Y().toFixed(4) + "  )") });
    f.on('out', function (e) { document.getElementById('myOutput').innerHTML = 'Click in other points'; });

    L.on("over", function (e) { document.getElementById('myOutput').innerHTML = (" The equation of parabola is : (x - (" + b.Value().toFixed(2) + '))<sup>2</sup> =' + '4(' + a.Value().toFixed(2) + ')' + '( y - (' + c.Value().toFixed(2) + ')') });
    L.on('out', function (e) { document.getElementById('myOutput').innerHTML = 'Click in other points'; });

    /*
    AX.on("over", function (e) { document.getElementById('myOutput').innerHTML = (" Axis of symmetry :  x  =  " + f.X().toFixed(4)) });
    AX.on('out', function (e) { document.getElementById('myOutput').innerHTML = 'Click in other points'; });
     
     
    p3.on("over", function() {alert(" X-intercept: x_2:  " + "( " + p2.X().toFixed(4) + " , " + p2.Y() + ' )');});
    */

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
Parabola1();
