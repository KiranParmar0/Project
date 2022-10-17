
var board = JXG.JSXGraph.initBoard('graph', {
    boundingbox: [-5, 2, 5, -2], label: true, grid: false, axis: false, showClearTraces: true, showCopyright: false, autoPosition: true, strokeWidth: 5, showNavigation: false,
    pan: {
        enabled: false,   // Allow panning
        needTwoFingers: false, // panningis done with two fingers on touch devices
        needshift: false, // mouse panning needs pressing of the shift key
    }, keepAspectRatio: true,

}),
    //New graph for data 
    b1 = JXG.JSXGraph.initBoard('graph1', { boundingbox: [0.5, 20, 7, -16], axis: false, grid: false, showNavigation: false, showCopyright: false }),

    a = board.create('point', [-1, -1], { name: 'B', Color: '#8F00FF', size: 3, autoPosition: true, offset: [10, 10] }),
    b = board.create('point', [3, -1], { name: 'A', Color: '#8F00FF', size: 3, autoPosition: true, offset: [10, 10] }),
    c = board.create('point', [2, 1], { name: 'C', Color: '#8F00FF', size: 3, autoPosition: true, offset: [10, 10] }),

    l1 = board.create('line', [a, b], { straightFirst: false, straightLast: false, lastArrow: true, grid: false }),
    l2 = board.create('line', [a, c], { straightFirst: false, straightLast: false, lastArrow: true, grid: false }),
    angle1 = board.create('angle', ["A", "B", "C"], {
        radius: 0.5, color: function () {
            if (JXG.Math.Geometry.trueAngle(b, a, c).toFixed(1) == 90) {
                return '#C42A56'
            }
            else if (JXG.Math.Geometry.trueAngle(b, a, c).toFixed(1) < 90 && JXG.Math.Geometry.trueAngle(b, a, c).toFixed(1) != 0) {
                return '#8B27DD'
            }
            else if (JXG.Math.Geometry.trueAngle(b, a, c).toFixed(1) == 180) {
                return '#0070C0'
            }
            else if (JXG.Math.Geometry.trueAngle(b, a, c).toFixed(1) > 180 && JXG.Math.Geometry.trueAngle(b, a, c).toFixed(1) < 360) {
                return '#8E6C00'
            }
            else if ((JXG.Math.Geometry.trueAngle(b, a, c).toFixed(1) == 0) || (JXG.Math.Geometry.trueAngle(b, a, c).toFixed(1) == 360)) {
                return '#8F00FF'
            }
            return '#f7b32bff'
        }, autoPosition: true, offset: [10, 10],
        name: function () {
            return JXG.Math.Geometry.trueAngle(b, a, c).toFixed(1) + '°'
        }
    }),

    t = b1.create('text', [2.5, 19, function () { return "\\[ \\mathbf {Interpretation}\\]" }], { fontSize: 18, useMathJax: true, fixed: true, strokeColor: '#0070C0' }),

    t = b1.create('text', [1, 17.5, "\\[\\mathbf{Classify \\ Angles}\\]"], { fontSize: 15, useMathJax: true, fixed: true, strokeColor: 'blue' }),
    t = b1.create('text', [1.2, 15.5, " An angle is a geometric figure formed by joining two rays at a common point"], { fontSize: 16, fixed: true, strokeColor: '#002060' }),

    t = b1.create('text', [1, 13, function () {
        return "Angles are classified on their measures."
    }], { fontSize: 15, useMathJax: true, fixed: true }),

    t = b1.create('text', [0.8, 11, "\\[\\mathbf{1) \\ Acute \\ Angle:}\\]"], { fontSize: 15, useMathJax: true, fixed: true, strokeColor: '#8B27DD' }),

    t = b1.create('text', [1.2, 9, " An acute angle is an angle whose measure is less than 90^0 "], { fontSize: 16, fixed: true, strokeColor: '#002060' }),

    t = b1.create('text', [0.8, 6, "\\[\\mathbf{2) \\ Obtuse \\ Angle:}\\]"], { fontSize: 15, useMathJax: true, fixed: true, strokeColor: '#f7b32bff' }),

    t = b1.create('text', [1.2, 4, " An obtuse angle is an angle whose measure is greater  than 90^0 "], { fontSize: 16, fixed: true, strokeColor: '#002060' }),

    t = b1.create('text', [0.8, 1, "\\[\\mathbf{3) \\ Right \\ Angle:}\\]"], { fontSize: 15, useMathJax: true, fixed: true, strokeColor: '#C42A56' }),
    t = b1.create('text', [1.2, -1, " The right angle is an angle whose measure is exactly 90^0"], { fontSize: 16, fixed: true, strokeColor: '#002060' }),

    t = b1.create('text', [1, -4, "\\[\\mathbf{ Straight \\ Angle:}\\]"], { fontSize: 15, useMathJax: true, fixed: true, strokeColor: '#0070C0' }),
    t = b1.create('text', [1.2, -6, " A straight angle is 180^0"], { fontSize: 16, fixed: true, strokeColor: '#002060' }),
    t = b1.create('text', [1, -8, "\\[\\mathbf{Zero \\ Angle:}\\]"], { fontSize: 15, useMathJax: true, fixed: true, strokeColor: '#8F00FF' }),
    t = b1.create('text', [1.2, -10, " A zero angle is an angle whose measure is 0^0 or 360^0"], { fontSize: 16, fixed: true, strokeColor: '#002060' }),

    t = b1.create('text', [1, -12, "\\[\\mathbf{Reflex \\ Angle:}\\]"], { fontSize: 15, useMathJax: true, fixed: true, strokeColor: '#8E6C00' }),
    t = b1.create('text', [1.2, -14, "A reflex angle is an angle whose measure is more than 180°and less than 360^0"], { fontSize: 16, fixed: true, strokeColor: '#002060' }),

    t = board.create('text', [-4.5, 2.5, function () {

        return "\\[\\mathbf{The \\ measure \\ of \\ an \\ angle \\ \\angle ABC  \\ \\ is \\ \\ }\\]"
    }], { fontSize: 15, useMathJax: true, fixed: true }),

    t = board.create('text', [-4, 2.1, function () {
        return "\\[\\mathbf{The \\ given \\ angle \\ is \\ a  }\\]"
    }], { fontSize: 15, useMathJax: true, fixed: true }),

    t = board.create('text', [-1, 2.5, function () {

        return "\\[\\mathbf{" + JXG.Math.Geometry.trueAngle(b, a, c).toFixed(1) + '\\ ^o' + "}\\]"
    }], {
        fontSize: 18, useMathJax: true, fixed: true,
        strokeColor: function () {
            if (JXG.Math.Geometry.trueAngle(b, a, c).toFixed(1) == 90) {
                return '#C42A56'
            }
            else if (JXG.Math.Geometry.trueAngle(b, a, c).toFixed(1) < 90 && JXG.Math.Geometry.trueAngle(b, a, c).toFixed(1) != 0) {
                return '#8B27DD'
            }
            else if (JXG.Math.Geometry.trueAngle(b, a, c).toFixed(1) == 180) {
                return '#0070C0'
            }
            else if (JXG.Math.Geometry.trueAngle(b, a, c).toFixed(1) > 180 && JXG.Math.Geometry.trueAngle(b, a, c).toFixed(1) < 360) {
                return '#8E6C00'
            }
            else if ((JXG.Math.Geometry.trueAngle(b, a, c).toFixed(1) == 0) || (JXG.Math.Geometry.trueAngle(b, a, c).toFixed(1) == 360)) {
                return '#8F00FF'
            }
            return '#f7b32bff'
        }
    }),


    t = board.create('text', [-1.5, 2.1, function () {
        if (JXG.Math.Geometry.trueAngle(b, a, c).toFixed(1) == 90) {
            return "\\[\\mathbf{ Right \\ Angle }\\]"
        }
        else if (JXG.Math.Geometry.trueAngle(b, a, c).toFixed(1) < 90 && JXG.Math.Geometry.trueAngle(b, a, c).toFixed(1) != 0) {
            return "\\[\\mathbf{ Acute \\ Angle }\\]"
        }
        else if (JXG.Math.Geometry.trueAngle(b, a, c).toFixed(1) == 180) {
            return "\\[\\mathbf{ Straight \\ Angle }\\]"
        }
        else if (JXG.Math.Geometry.trueAngle(b, a, c).toFixed(1) > 180 && JXG.Math.Geometry.trueAngle(b, a, c).toFixed(1) < 360) {
            return "\\[\\mathbf{ Reflex \\ Angle }\\]"
        }
        else if ((JXG.Math.Geometry.trueAngle(b, a, c).toFixed(1) == 0) || (JXG.Math.Geometry.trueAngle(b, a, c).toFixed(1) == 360)) {
            return "\\[\\mathbf{Zero \\ Angle }\\]"
        }

        return "\\[\\mathbf{Obtuse  \\ Angle }\\]"

    }], {
        fontSize: 18, useMathJax: true, fixed: true,
        strokeColor: function () {
            if (JXG.Math.Geometry.trueAngle(b, a, c).toFixed(1) == 90) {
                return '#C42A56'
            }
            else if (JXG.Math.Geometry.trueAngle(b, a, c).toFixed(1) < 90 && JXG.Math.Geometry.trueAngle(b, a, c).toFixed(1) != 0) {
                return '#8B27DD'
            }
            else if (JXG.Math.Geometry.trueAngle(b, a, c).toFixed(1) == 180) {
                return '#0070C0'
            }
            else if (JXG.Math.Geometry.trueAngle(b, a, c).toFixed(1) > 180 && JXG.Math.Geometry.trueAngle(b, a, c).toFixed(1) < 360) {
                return '#8E6C00'
            }
            else if ((JXG.Math.Geometry.trueAngle(b, a, c).toFixed(1) == 0) || (JXG.Math.Geometry.trueAngle(b, a, c).toFixed(1) == 360)) {
                return '#8F00FF'
            }
            return '#f7b32bff'
        }
    }),

    tp = b1.create('point', [0.8, 17.5], { name: '', face: '<>', size: 4, showInfobox: false, fixed: true, color: 'bleck' }),
    tp = b1.create('point', [0.8, -4], { name: '', face: '<>', size: 4, showInfobox: false, fixed: true, color: 'bleck' }),
    tp = b1.create('point', [0.8, -12], { name: '', face: '<>', size: 4, showInfobox: false, fixed: true, color: 'bleck' }),
    tp = b1.create('point', [0.8, -8], { name: '', face: '<>', size: 4, showInfobox: false, fixed: true, color: 'bleck' })







angle1.label.setProperty({ fontSize: 20, strokeColor: function () {
    if (JXG.Math.Geometry.trueAngle(b, a, c).toFixed(1) == 90) {
        return '#C42A56'
    }
    else if (JXG.Math.Geometry.trueAngle(b, a, c).toFixed(1) < 90 && JXG.Math.Geometry.trueAngle(b, a, c).toFixed(1) != 0) {
        return '#8B27DD'
    }
    else if (JXG.Math.Geometry.trueAngle(b, a, c).toFixed(1) == 180) {
        return '#0070C0'
    }
    else if (JXG.Math.Geometry.trueAngle(b, a, c).toFixed(1) > 180 && JXG.Math.Geometry.trueAngle(b, a, c).toFixed(1) < 360) {
        return '#8E6C00'
    }
    else if ((JXG.Math.Geometry.trueAngle(b, a, c).toFixed(1) == 0) || (JXG.Math.Geometry.trueAngle(b, a, c).toFixed(1) == 360)) {
        return '#8F00FF'
    }
    return '#f7b32bff'
} });
a.label.setProperty({ fontSize: 20, strokeColor: '#0000FF' });
b.label.setProperty({ fontSize: 20, strokeColor: '#0000FF' });
c.label.setProperty({ fontSize: 20, strokeColor: '#0000FF' });

// var board5 = JXG.JSXGraph.initBoard('graph3', { boundingbox: [-5, 2, 5, -2], keepAspectRatio: true, showCopyright: false, showNavigation: false });


board.update();