/**
 * Solves any triangle using Law of Cosines and Law of Sines
 * Throws error if not enough information is known or if the triangle is unsolvable
 * Adds warning if too much information is passed in. Note that we ONLY solve properties
 * that are unsolved and do NOT overwrite anything the user passes in.
 * brute force strategy--iterate through unsolved properties, trying to solve them until all are solved or can't solve any of them
 * AAS -- Any two angles, and one side (Law of Sines)
 * SAS -- Side, included Angle, and Side (Law of Cosines)
 * SSA -- Two sides, and a non-included Angle (Law of Sines) — this might have two solutions!
 * SSS -- All three sides (Law of Cosines)
 * @param {object} triangle 
 * @returns {object} solved triangle 
 */
function solve(triangle, inRadians) {
    try {
        _setTriangleMeta(triangle);
        _validateTriangle(triangle);
        if (!inRadians) {
            _convertAngles(triangle, _toRadians);
        }
        _brute(triangle);
        _solveHeightAndArea(triangle);
        _convertAngles(triangle, _toDegrees);
    } catch (err) {
        triangle.error = err.message;
        if (!triangle.isDegrees) {
            _convertAngles(triangle, _toDegrees);
        }
    }
    return triangle;
}

/**
 * Sets handy calculated values for the triangle
 * @param {object} triangle 
 */
var isAnglePropRegex = /^a/;
var isSidePropRegex = /^s/;
var isAngleProp = isAnglePropRegex.test.bind(isAnglePropRegex);
var isSideProp = isSidePropRegex.test.bind(isSidePropRegex);
var allProps = 's1,s2,s3,a1,a2,a3'.split(',');
function _setTriangleMeta(triangle) {
    triangle.sides = [triangle.s1, triangle.s2, triangle.s3];
    triangle.angles = [triangle.a1, triangle.a2, triangle.a3];
    triangle.unsolvedProps = _getUnsolvedProperties(triangle, allProps);
    triangle.unsolvedAngles = triangle.unsolvedProps.filter(isAngleProp);
    triangle.unsolvedSides = triangle.unsolvedProps.filter(isSideProp);
    triangle.solvedProps = _getSolvedProperties(triangle, allProps);
    triangle.solved = triangle.solvedProps.length === 6;
    triangle.solvedAngles = triangle.solvedProps.filter(isAngleProp);
    triangle.solvedSides = triangle.solvedProps.filter(isSideProp);
    triangle.warnings = Array.isArray(triangle.warnings) ? triangle.warnings : []; //don't overwrite warnings...
}

/**
 * Determine if we have enough info to attempt to solve the triangle
 * @param {object} triangle  
 */
function _validateTriangle(triangle) {
    if (triangle.solvedSides.length === 0) {
        throw new Error('Must have at least one side length');
    }
    var infoCount = triangle.solvedSides.length + triangle.solvedAngles.length;
    if (infoCount < 3) {
        throw new Error('Must have at least 3 pieces of information about a triangle to solve it');
    }
    if (infoCount > 3) {
        triangle.warnings.push([
            'There was more than enough information to solve the triangle. ',
            'I recommended you only put in your 3 most accurate pieces of information',
            ', so the solver can solve your triangle as accurately as possible.',
            ' Note that plugged-in values will NOT be overwritten--only unsolved',
            ' properties will be solved using any information you\'ve provided.'
        ].join(''));
    }
}

/**
 * Recursively solve the triangle until it is completely solved
 * @param {object} triangle
 * @returns {object} solved triangle 
 */
function _brute(triangle) {
    var totalSolved = triangle.solvedProps.length;
    triangle.unsolvedAngles.forEach(function (angle) {
        if (!_solveAngleIf2AreSolved(triangle, angle)) {
            if (!_solveAngleLawOfCosines(triangle, angle)) {
                _solveAngleLawOfSines(triangle, angle);
            }
        }
    });
    triangle.unsolvedSides.forEach(function (side) {
        if (!_solveSideLawOfCosines(triangle, side)) {
            _solveSideLawOfSines(triangle, side);
        }
    });
    _setTriangleMeta(triangle);
    var solvedAnything = totalSolved < triangle.solvedProps.length;
    if (!solvedAnything && !triangle.solved) {
        throw new Error('Unable to solve the triangle with the given input.');
    }
    if (!triangle.solved) {
        _brute(triangle); //keep on solving 'til the solving's done
    }
    return triangle;
}

/**
 * If we have 2 angles, simply use diff to find the last one, since angles of a triangle add to 180
 * @param {object} triangle 
 * @param {string} angleProp 
 * @returns {bool} 
 */
function _solveAngleIf2AreSolved(triangle, angleProp) {
    var index = _getIndex(angleProp);
    var otherAngles = _getOtherAngles(index);
    triangle[angleProp] = Math.PI - triangle[otherAngles[0]] - triangle[otherAngles[1]];
    return _propertySolved(triangle[angleProp]);
}

/**
 * When solving an angle using the law of cosines, we need all 3 sides
 * http://mathworld.wolfram.com/LawofCosines.html
 * @param {object} triangle 
 * @param {string} sideProp 
 * @returns {bool} 
 */
function _solveAngleLawOfCosines(triangle, angleProp) {
    var index = _getIndex(angleProp);
    var otherSides = _getOtherSides(index);
    triangle[angleProp] = Math.acos(
        (
            -Math.pow(triangle[_getSide(index)], 2) +
             Math.pow(triangle[otherSides[0]], 2) +
             Math.pow(triangle[otherSides[1]], 2)
        ) /
        (2 * triangle[otherSides[0]] * triangle[otherSides[1]])
    );
    return _propertySolved(triangle[angleProp]);
}

/**
 * When solving a side using the law of cosines, we need the side's angle and the other 2 sides
 * http://mathworld.wolfram.com/LawofCosines.html
 * @param {object} triangle 
 * @param {string} sideProp 
 * @returns {bool} 
 */
function _solveSideLawOfCosines(triangle, sideProp) {
    var index = _getIndex(sideProp);
    var otherSides = _getOtherSides(index);
    triangle[sideProp] = Math.sqrt(
        Math.pow(triangle[otherSides[0]], 2) +
        Math.pow(triangle[otherSides[1]], 2) -
        2 * triangle[otherSides[0]] *
        triangle[otherSides[1]] *
        Math.cos(triangle[_getAngle(index)])
    );
    return _propertySolved(triangle[sideProp]);
}

/**
 * When solving an angle using the law of sines, we need the angle's side and a solved angle/side combo
 * http://mathworld.wolfram.com/LawofSines.html
 * @param {object} triangle 
 * @param {string} angleProp 
 * @returns {bool} 
 */
function _solveAngleLawOfSines(triangle, angleProp) {
    var index = _getIndex(angleProp);
    var otherIndex = _getOtherIndexForLawofSines(triangle);
    triangle[angleProp] = Math.asin((Math.sin(triangle.angles[otherIndex]) * triangle[_getSide(index)]) / triangle.sides[otherIndex]);
    var solved = _propertySolved(triangle[angleProp]);
    if (solved) {
        _checkForAmbiguousCase(triangle, angleProp);
    }
    return solved;
}

/**
 * When solving a side using the law of sines, we need the side's angle and a solved angle/side combo
 * http://mathworld.wolfram.com/LawofSines.html
 * @param {object} triangle 
 * @param {string} angleProp 
 * @returns {bool} 
 */
function _solveSideLawOfSines(triangle, sideProp) {
    var index = _getIndex(sideProp);
    var otherIndex = _getOtherIndexForLawofSines(triangle);
    triangle[sideProp] = (Math.sin(triangle[_getAngle(index)]) * triangle.sides[otherIndex]) / Math.sin(triangle.angles[otherIndex]);
    return _propertySolved(triangle[sideProp]);
}

/**
 * Get the side/angle combo that is solved already to be used by the Law of Sines.
 * Note that callers of this rely on triangle.angles being in order.
 * @param {object} triangle 
 * @returns {integer} zero-based side/angle combo index (0-2) 
 */
function _getOtherIndexForLawofSines(triangle) {
    var solvedSideIndices = triangle.solvedSides.map(_getIndex);
    var solvedAngleIndices = triangle.solvedAngles.map(_getIndex);
    var otherIndex = solvedSideIndices.filter(function (si) { return solvedAngleIndices.some(function (ai) { return ai === si; }); })[0];
    return otherIndex == null ? null : otherIndex - 1;
}

/**
 * If we only have 3 pieces of info solved (not counting this angle), try it out with the alternate possible angle. If it comes back invalid, set to null
 * Note that this currently doesn't work if we're passed more than 3 pieces of info...
 * @param {object} triangle 
 * @param {string} angleProp  
 */
function _checkForAmbiguousCase(triangle, angleProp) {
    triangle.alternateSolution = null;
    if (triangle.solvedProps.length === 3) {
        var altAngleValue = Math.PI - triangle[angleProp];
        var alt = {};
        alt[angleProp] = altAngleValue;
        triangle.solvedProps.forEach(function(prop) { alt[prop] = triangle[prop]; });
        alt = solve(alt, true);
        var precision = 4;
        if (alt.solved && roundNumber(roundNumber(alt.a1, precision) + roundNumber(alt.a2, precision) + roundNumber(alt.a3, precision), 0) === 180) {
            alt.warnings = [];
            triangle.alternateSolution = alt;
        }
    }
}

var indexRegex = /\d/;
function _getIndex(triangleProp) {
    return parseInt(indexRegex.exec(triangleProp)[0]);
}
function _getSide(index) {
    return 's{0}'.format(index);
}
function _getAngle(index) {
    return 'a{0}'.format(index);
}

/**
 * gets the indices that aren't the given index
 * @param {integer} index 
 * @returns {Array<integer>} 
 */
function _getOtherIndices(index) {
    return [1, 2, 3].filter(function (i) { return index !== i; });
}
function _getOtherSides(index) {
    return _getOtherIndices(index).map(function (i) { return 's{0}'.format(i); });
}
function _getOtherAngles(index) {
    return _getOtherIndices(index).map(function (i) { return 'a{0}'.format(i); });
}

/**
 * if the value is a positive number, it's solved
 * @param {*} value 
 * @returns {bool} 
 */
function _propertySolved(value) {
    return parseFloat(value) > 0;
}

/**
 * if the given props on the triangle are all solved, return true
 * @param {object} triangle 
 * @param {string} propsCSV 
 * @returns {bool} 
 */
function _solved(triangle, propsCSV) {
    var props = propsCSV.split(',');
    return _getSolvedProperties(triangle, props).length === props.length;
}

/**
 * Returns the unsolved properties for the given props
 * @param {object} triangle 
 * @param {string} propsCSV
 * @returns {Array<string>} the unsolved properties 
 */
function _getUnsolvedProperties(triangle, props) {
    return props.filter(function(prop) { return !_propertySolved(triangle[prop]); });
}
function _getSolvedProperties(triangle, props) {
    return props.filter(function(prop) { return _propertySolved(triangle[prop]); });
}

/**
 * Convert the triangle angle values to degrees or radians depending on the method passed in. 
 * Note that this doesn't check to see if the angles are already converted, so don't call it twice.
 * @param {object} triangle  
 */
function _convertAngles(triangle, method) {
    if (Array.isArray(triangle.angles)) { triangle.angles = triangle.angles.map(method);}
    triangle.a1 = method(triangle.a1);
    triangle.a2 = method(triangle.a2);
    triangle.a3 = method(triangle.a3);
    triangle.isDegrees = method === _toDegrees;
}

/**
 * Converts the given radian value to degrees
 * @param {decimal} radians 
 * @returns {decimal} 
 */
function _toDegrees(radians) {
    return radians * (180 / Math.PI);
}

/**
 * Converts the given degree value to radians
 * @param {decimal} degrees 
 * @returns {decimal} 
 */
function _toRadians(degrees) {
    return degrees * (Math.PI / 180);
}

/**
 * Adds height/area to solution
 * @param {object} triangle 
 */
function _solveHeightAndArea(triangle) {
    //var base = Math.max.apply(Math, triangle.sides);
    //var isSide = /^s/;
    //var baseProp = allProps.filter(function(prop) {
    //    return isSide.test(prop) && triangle[prop] === base;
    //})[0]; //if it's equilateral, doesn't matter--just grab the first one where the side length is the length of the longest side
    
    /////TODO: finish
    //triangle.height = null;
}