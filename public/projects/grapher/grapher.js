//TODO: graph imaginary numbers. graph fractals
//TODO: plot out 4 quadrants, use offset to position each point (x + (width/2), y + (height/2)) -- i.e. instead of bottom left corner being 0,0, center of screen is 0,0

/**
 * On ready:
 *       -hook up form submission to apply the expression. 
 *       -set up autocomplete formulas
 *       -set currently stored lines in graph area
 */
$(function () {
    var svg = $('#svg');
    var width = svg.outerWidth();
    var height = svg.outerHeight();
    svg.html('<g transform="translate(0,{0})"><g id="plane" transform="scale(1,-1)"></g></g>'.format(height));
    var plane = $('#plane');
    var formula = $('#formula');
    var graphedLines = $('#graphedLines');
    var SCHEMA = {
        FORMULAS: 'formulas',
        GRAPHED_LINES: 'graphed_lines'
    };
    $('form').on('submit', function (e) {
        e.preventDefault();
        applyFormula();
    });
    $('#resetButton').on('click', resetSettings);
    refreshStoredFormulas();
    refreshDisplayedGraphs();

    //if loading for first time, set up with defaults
    if (db.get(SCHEMA.FORMULAS).length === 0) {
        resetSettings();
    }

    /**
     * incrememt x to svg width by 1, getting y value by using eval. Consider ways to avoid eval (but also consider the risks...why exactly is eval evil?)
     * Note that if y becomes greater than svg height, we simply stop iterating
     */
    function applyFormula() {
        var formulaExpression = formula.val().trim();
        if (formulaExpression === '') {
            return;
        }
        if (/dick/gi.test(formulaExpression)) {
            graphDick(formulaExpression);
            return;
        }
        graphExpression(formulaExpression);
    }

    var numberRegex = /^[\d\.]+$/; //can only contain digits and '.'
    function graphExpression(formulaExpression) {
        var points = [];
        var y = 0;
        try {
            for (var x = 0; x < width; x++) {
                y = eval(formulaExpression.replace('x', x));
                //console.log('{0}, {1}'.format(x, y));
                if (numberRegex.test(x.toString() + y.toString())) { //y !== Infinity && y !== -Infinity && !window.isNaN(y) && x !== Infinity && x !== -Infinity && !window.isNaN(x)) {
                    points.push([x, y]);
                }
            }
            //update graph
            var pointsString = points.map(function (p) { return p.join(','); }).join(' ');
            var polyLine = '<polyline points="{0}" />'.format(pointsString);
            addGraph(formulaExpression, polyLine);
        } catch (ex) {
            console.error(ex);
        }
    }

    /**
     * Graph a dick for the user because hey, it's his life; he wants a dick, give him a dick. Don't make a it a big deal. Just give him a dick and move on.
     */
    function graphDick(formulaExpression) {
        var dickCount = 1;
        if (/dicks/gi.test(formulaExpression)) {
            dickCount = 8;
        }
        var dicks = [];
        for (var i = 0; i < dickCount; i++) {
            var randY = Math.round(Math.random() * height);
            var randX = Math.round(Math.random() * width);
            dicks.push('<image x="{2}" y="{3}" width="{0}" height="{1}" xlink:href="dick.svg" transform="rotate({4} {2} {3})" />'.format(randX / 2, randY / 2, randY, randX, randX));
        }
        addGraph(formulaExpression, dicks.join(''));
    }

    /**
     * Add some svg to be shown
     */
    function addGraph(graphKey, svg) {
        db.add(SCHEMA.GRAPHED_LINES, { lineExpression: graphKey, line: svg });
        refreshDisplayedGraphs();

        //update autocomplete
        db.add(SCHEMA.FORMULAS, graphKey);
        refreshStoredFormulas();

        //clear box, so we can enter another
        window.setTimeout(function () {
            formula.val('');
        });
    }


    /**
     * Refreshes the autocomplete for displaying previously-used formulas
     */
    function refreshStoredFormulas() {
        formula.autocomplete({
            source: db.get(SCHEMA.FORMULAS),
            select: applyFormula
        });
    }

    /**
     * Refresh current list of graphs that are being displayed and also the graph area
     */
    function refreshDisplayedGraphs() {
        var currentLines = db.get(SCHEMA.GRAPHED_LINES);

        //update equations that are currently graphed
        if (currentLines.length > 0) {
            var graphTemplate = '<div><button title="Remove this line from the graph" data-id="{1}">x</button>&nbsp;{0}</div>';
            var currentFormulas = currentLines.map(function (l) {
                return graphTemplate.format(l.lineExpression, l.id);
            });
            graphedLines.html(currentFormulas).show();
            $('[data-id]', graphedLines).off('click').on('click', onDeleteGraphClick);
        } else {
            graphedLines.html('').hide();
        }

        //update graph
        var graphLines = currentLines.map(function (l) { return l.line; }).join('');
        plane.html(graphLines);
    }

    /**
     * Deletes the graph that this delete button points to
     */
    function onDeleteGraphClick() {
        var id = $(this).attr('data-id');
        db.remove(SCHEMA.GRAPHED_LINES, id);
        refreshDisplayedGraphs();
        formula.focus();
    }

    /**
     * Clears the graph and also resets the autocomplete to defaults
     */
    function resetSettings() {
        var halfHeight = Math.round(height / 2);
        var halfWidth = Math.round(width / 2);
        var circle = 'Math.sqrt(Math.pow({0}, 2) - Math.pow((x - {1}), 2)) + {2}'.format(halfWidth / 3, halfWidth, halfHeight);
        var defaultAutoComplete = [
            //trigonometric waves
            'Math.sin(x / 30) * 100 + 300',
            'Math.cos(x / 30) * 100 + 300',
            'Math.tan(x / 30) + 300',

            //quadratic (centered in window)
            'Math.pow((x - {0}) / 20, 2) - x / 200 + 30'.format(halfWidth),

            //'Math.sqrt(x / 30) * 100',

            //logarithmic
            'Math.log(x / 30) * 100 + 300',

            //circle (2 lines) -- radius^2 = x^2 + y^2 -- note that this one has a radius of 200px and is raised up the y axis so we can see it...
            circle,
            '-' + circle
        ];
        db.set(SCHEMA.FORMULAS, defaultAutoComplete);
        db.set(SCHEMA.GRAPHED_LINES, []);
        refreshDisplayedGraphs();
        refreshStoredFormulas();
        formula.focus();
    }
});