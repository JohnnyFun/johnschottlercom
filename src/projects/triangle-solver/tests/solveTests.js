var solveTests = {
    expected: {
        right: {
            s1: 300,
            s2: 200,
            s3: 223.6068,
            a1: 90,
            a2: 41.8103,
            a3: 48.1897
        }
    },
    /**
     * verify the numbers rounded to 4 decimal places match
     * @returns {bool} 
     */
    verifyTriangle: function (result, expected) {
        if (result == null || expected == null) {
            return false;
        }
        if (result.alternateSolution != null || expected.alternateSolution != null) {
            var altsMatch = solveTests.verifyTriangle(result.alternateSolution, expected.alternateSolution);
            if (!altsMatch) {
                console.error('Ambiguous case didn\'t pass');
                return false;
            }
        }
        return !allProps.some(function(prop) {
            var notMatch = roundNumber(result[prop], 4) !== roundNumber(expected[prop], 4);
            if (notMatch) {
                console.error('{0} does not match. Expected: {1} Received: {2}'.format(prop, roundNumber(expected[prop], 4), roundNumber(result[prop], 4)));
            }
            return notMatch;
        });
    },
    tests: {
        solve_90_SSA: function () {
            var delta = { s1: 300, s2: 200, a1: 90 };
            return solveTests.verifyTriangle(solve(delta), solveTests.expected.right);
        },

        solve_90_SSS: function () {
            var delta = { s1: 300, s2: 200, s3: 223.606797749979 };
            return solveTests.verifyTriangle(solve(delta), solveTests.expected.right);
        },

        solve_90_SAS: function () {
            var delta = { s1: 300, a3: 48.18968510422141, s2: 200 };
            return solveTests.verifyTriangle(solve(delta), solveTests.expected.right);
        },

        solve_90_AAS: function () {
            var delta = { a2: 41.810314895778596, a3: 48.18968510422141, s2: 200 };
            return solveTests.verifyTriangle(solve(delta), solveTests.expected.right);
        },

        //https://www.mathsisfun.com/algebra/trig-solving-ssa-triangles.html
        solve_SSA_NonAmbiguous: function() {
            var result = solve({ a1: 125, s1: 12.4, s3: 7.6 });
            var expected = {
                a1: 125,
                s1: 12.4,
                s3: 7.6,
                s2: 6.3647,
                a2: 24.8636,
                a3: 30.1364
            };
            return solveTests.verifyTriangle(result, expected);
        },

        //https://www.mathsisfun.com/algebra/trig-solving-ssa-triangles.html
        solve_SSA_Ambiguous: function() {
            var result = solve({ a3: 31, s3: 8, s1: 13 });
            var expected = {
                a3: 31,
                s3: 8,
                s1: 13,
                s2: 15.5216,
                a1: 56.8181,
                a2: 92.1819,
                alternateSolution: {
                    a3: 31,
                    s3: 8,
                    s1: 13,
                    s2: 6.7648,
                    a1: 123.1819,
                    a2: 25.8181
                }
            };
            return solveTests.verifyTriangle(result, expected);
        },

        solve_AAS: function() {
            var result = solve({ s1:11,a1:110,a2:20 });
            var expected = { s1: 11, a1: 110, a2: 20, a3: 50, s2: 4.0037, s3: 8.9673 };
            return solveTests.verifyTriangle(result, expected);
        },
        solve_SAS: function () {
            var result = solve({s1:58, s2:120, a3:45});
            var expected = { s1: 58, s2: 120, a3: 45, s3: 89.0004, a1: 27.4393, a2: 107.5607 };
            return solveTests.verifyTriangle(result, expected);
        },
        solve_SSA_Ambiguous2: function () {
            var result = solve({s1:5, s2:11, a1:25});
            var expected = {
                s1: 5,
                s2: 11,
                a1: 25,
                s3: 11.81021438002664,
                a3: 86.60253839424813,
                a2: 68.39746160575187,
                alternateSolution: {
                    a1: 25,
                    a2: 111.60253839424813,
                    a3: 43.39746160575188,
                    s1: 5,
                    s2: 11,
                    s3: 8.12855693477966
                }
            };
            return solveTests.verifyTriangle(result, expected);
        },
        solve_SSS: function () {
            var result = solve({s1:56,s2:97,s3:112});
            var expected = { s1: 56, s2: 97, s3: 112, a1:30, a2:60.0053, a3:89.9947};
            return solveTests.verifyTriangle(result, expected);
        },

        solve_should_not_have_ambiguous_due_to_rounding: function() {
            var result = solve({ s1: 3, s2: 3, a1: 60 });
            return result.alternateSolution == null;
        }
    }
};