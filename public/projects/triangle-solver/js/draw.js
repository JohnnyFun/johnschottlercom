/**
 * Solves and draws the given delta triangle
 * TODO: make a demo function that basically runs draw tests, but duals as a demo for the user--have param to say how fast to go through. animate typing into box, by using Ractive.animate...
 * @param {object} triangle  
 */
var ractive = null;
function draw(triangle) {
    if (!triangle.solved) {
        solve(triangle);
    }
    _setDrawData(triangle);
    _applyTriangle(triangle);
    return triangle;
}

/**
 * Extracts the plugged-in data for the new triangle to be solved
 * @returns {object} delta triangle 
 */
function _getTriangle() {
    var currentTriangle = ractive.get();
    var newTriangle = {};
    allProps.forEach(function(prop) {
        newTriangle[prop] = currentTriangle[prop];
    });
    return newTriangle;
}

function _setDrawData(triangle) {
    triangle.drawData = {
        screenW: window.innerWidth,
        screenH: window.innerHeight - 40
    };

    if (triangle.solved) {
        triangle.drawData.vertical = triangle.drawData.screenH > triangle.drawData.screenW; //indicates to draw the base on the right hand side, since the screen is taller than it is wide
        var smallestScreenDim = triangle.drawData.vertical ? triangle.drawData.screenW : triangle.drawData.screenH;
        var largestTriangleSide = Math.max.apply(Math, triangle.sides);
        var largestPixelSide = smallestScreenDim;
        triangle.drawData.sidePixelRatio = largestPixelSide / largestTriangleSide;
        triangle.drawData.lines = triangle.sides.map(function (side) {
            return { sideLength: side };
        });

        //base side needs to be first
        sort(triangle.drawData.lines, 'sideLength', true);

        //base side gets largest angle
        triangle.drawData.lines[0].angle = Math.max.apply(Math, triangle.angles);

        //smallest angle goes to second largest side
        triangle.drawData.lines[1].angle = Math.min.apply(Math, triangle.angles);

        //remaining angle goes to last side
        triangle.drawData.lines[2].angle = triangle.angles.filter(function (angle) {
            return angle !== triangle.drawData.lines[0].angle && angle !== triangle.drawData.lines[1].angle;
        })[0];

        //if equilateral triangle, just use the first angle and move on
        if (triangle.drawData.lines[2].angle == null) {
            triangle.drawData.lines[2].angle = triangle.angles[0];
        }

        //make side lengths as long as possible without the triangle going off window
        var isSide = /^s/;
        triangle.drawData.lines.forEach(function (line) {
            //index = the first line that matches this line's length whose index is not already being used (equilateral triangles will have matching side lengths)
            line.index = _getIndex(allProps.filter(function (prop) {
                return isSide.test(prop) && triangle[prop] === line.sideLength && !triangle.drawData.lines.some(function (l) {
                    return l.index === _getIndex(prop);
                });
            })[0]);
            line.realSideLength = roundNumber(line.sideLength, 4);
            line.angle = roundNumber(line.angle, 4);
            line.sideLength *= triangle.drawData.sidePixelRatio;
        });

        //set up to be able to toggle alternateSolution
        if (triangle.alternateSolution) {
            triangle.alternateSolution.alternateSolution = triangle;
        }

        triangle.allProps = window.allProps;
    }
}

function _applyTriangle(triangle) {
    //_getTemplate().then(function(triangleTemplate) {
        ractive = new Ractive({
            el: '#triangleTemplate',
            template: '#triangleTemplateRactive',
            data: triangle
        });

        ractive.on({
            clear: _clear,
            solve: function (e) {
                e.original.preventDefault();
                var triangle = _getTriangle();
                draw(triangle);
            },
            toggleAltSolution: function () {
                draw(triangle.alternateSolution);
            },
            collapseToggle: function(e) {
                e.original.preventDefault();
                this.set('collapsed', !this.get('collapsed'));
            }
        });

        _setUpHandlers(triangle);
    //});
}

/**
 * Lazily load the triangle template
 * @returns {string} 
 */
var _triangleTemplate = '';
function _getTemplate() {
    if (_triangleTemplate === '') {
        return $.get('triangle.html').then(function (template) {
            _triangleTemplate = template;
            return _triangleTemplate;
        });
    }
    return $.Deferred().resolve(_triangleTemplate);
}

function _setUpHandlers(triangle) {
    //when window resizes, redraw the triangle with the new window size
    $(window).off('resize').on('resize', function () {
        if (triangle.solved) {
            draw(triangle);
        }
    });

    //when the form has focus, opacity 100, else opacity 30
    var $form = $('.inputs');
    var $inputs = $('input, button', $form);
    function _setFormOpacity(e) {
        var hasFocus = $inputs.is(":focus");
        $form.css('opacity', hasFocus ? 1 : .3);
    }
    $inputs.off('focus blur').on('focus blur', _setFormOpacity);
}

function _clear() {
    _applyTriangle({});
    $('#s1').focus();
}


//draw({ s1: 300, s2: 200, a1: 90 });
//draw({ s1: 300, s2: 100, a1: 90 });
//draw({ s1: 5, s2: 11, a1: 25 });
_clear();