var UnitTester = {
    runTests: function () {
        [
            //TriangleSolverTests
        ].forEach(function(testClass) {
            var tests = testClass.tests;
            var i = 0;
            for (var test in tests) {
                if (tests.hasOwnProperty(test)) {
                    if (isFunc(testClass.init)) {
                         testClass.init();
                    }
                    tests[test]('{0}) {1}'.format(++i, test));
                }
            }
        });
    },

    assert: function (expression, testName) {
        expression ? console.log('{0} Success!'.format(testName)) : console.error('{0} Failed!'.format(testName));
    }
}

var TriangleSolverTests = {
    tests: {
        //draw_90_degree_solved_triangle: function () {
        //    var triangle = JSON.parse('{"color":"#48a7d0","sides":[3,2,2.2360679774997902],"angles":[90,41.810314895778596,48.18968510422141]}');
        //    var svgResult = getTriangleSVG(triangle);
        //    var expected = '';
        //    UnitTester.assert(svgResult === expected, arguments[0]);
        //},
        //TODO: find way to verify that this gets drawn the same exact way as the above test. May need to actually do a browser automated/animated-like test. Consider just making the biggest side fit the bounds. But ideally implement the centering/scaling thing
        draw_90_degree_solved_triangle_bigger: function() {
            var triangle = JSON.parse('{"color":"#e74f01","sides":[300,200,223.606797749979],"angles":[90,41.810314895778596,48.18968510422141]}');
            var svgResult = getTriangleSVG(triangle);
            var expected = '<g transform="translate(0,400)"><g id="plane" style="stroke:#e74f01;" transform="scale(1,-1)"><line x1="0" y1="0" x2="300" y2="0" /><g transform="rotate(131.8103148957786 300,0)"><line x1="300" y1="0" x2="500" y2="0" /><g transform="rotate(90 500,0)"><line x1="500" y1="0" x2="723.606797749979" y2="0" /></g></g></g></g>';
            UnitTester.assert(svgResult === expected, arguments[0]);
        },

        draw_90_degree_solved_triangle_rotated: function () {
            var triangle = JSON.parse('{"color":"#e74f01","sides":[200,223.606797749979,300],"angles":[41.810314895778596,48.18968510422141,90]}');
            var svgResult = getTriangleSVG(triangle);
            var expected = '<g transform="translate(0,400)"><g id="plane" style="stroke:#e74f01;" transform="scale(1,-1)"><line x1="0" y1="0" x2="200" y2="0" /><g transform="rotate(90 200,0)"><line x1="200" y1="0" x2="423.606797749979" y2="0" /><g transform="rotate(138.1896851042214 423.606797749979,0)"><line x1="423.606797749979" y1="0" x2="723.606797749979" y2="0" /></g></g></g></g>';
            UnitTester.assert(svgResult === expected, arguments[0]);
        },

        solve_90_SSA: function () {
            var delta = {
                sides: [300, 200],
                angles: [90]
            };
            var expected = {
                sides: [300, 200, 223.606797749979],
                angles: [90, 41.810314895778596, 48.18968510422141]
            }
            UnitTester.assert(JSON.stringify(expected) === solve(delta), arguments[0]);
        },

        solve_90_SSS: function () {
            var delta = {
                sides: [300, 200, 223.606797749979],
                angles: []
            };
            var expected = {
                sides: [300, 200, 223.606797749979],
                angles: [90, 41.81031489577861, 48.18968510422141]
            }
            UnitTester.assert(JSON.stringify(expected) === solve(delta), arguments[0]);
        },

        solve_90_SAS: function () {
            var delta = {
                sides: [300, 200],
                angles: [null, null, 48.18968510422141]
            };
            var expected = {
                sides: [300, 200, 223.606797749979],
                angles: [90, 41.81031489577861, 48.18968510422141]
            }
            UnitTester.assert(JSON.stringify(expected) === solve(delta), arguments[0]);
        },

        solve_90_AAS: function () {
            var delta = {
                sides: [300],
                angles: [null, 41.81031489577861, 48.18968510422141]
            };
            var expected = {
                sides: [300, 200.00000000000006, 223.606797749979],
                angles: [89.99999999999997, 41.81031489577861, 48.18968510422141]
            }
            UnitTester.assert(JSON.stringify(expected) === solve(delta), arguments[0]);
        },


    }
}

UnitTester.runTests();