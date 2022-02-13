var $message = $('#message');
var $triangleForm = $('#triangleForm');
var $sides = $('.sides input');
var $angles = $('.angles input');
var $svg = $('#svg');
var width = svg.clientWidth;
var height = svg.clientHeight;
var groupTemplate = '<g {0}>{1}</g>';
var rotateTemplate = 'transform="rotate({0} {1},0)"';
var lineTemplate = '<line x1="{0}" y1="0" x2="{1}" y2="0" />';

//init
$triangleForm.on('submit', onFormSubmit);
$('input[type="text"]', $triangleForm).on('change', onTriangleChange); //TODO: make keyup once we code the new Solve method

function onFormSubmit(e) {
    e.preventDefault();
    solve(getCurrentTriangle(), true); 
}

function onTriangleChange() {
    cases();
    solve(getCurrentTriangle());
}

/**
 * updates the current triangle to use the values that are currently in the form
 */
var currentTriangle = null;
function getCurrentTriangle() {
    var creatingNew = currentTriangle == null;
    if (creatingNew) {
        currentTriangle = {
            color: randomColor()
        }
    }
    currentTriangle.sides = [];
    extractTriangleValues($sides, currentTriangle.sides);
    currentTriangle.angles = [];
    extractTriangleValues($angles, currentTriangle.angles);
}

function extractTriangleValues($inputs, collection) {
    $inputs.each(function () {
        var value = parseTriangleVal($(this).val());
        collection.push(isNaN(value) ? null : value); //we include place holders, since order does matter for solving.
    });
}

function parseTriangleVal(val) {
    return parseFloat(val.replace(/[^\d\.]/g, '')); //clear out non-digit values
}

/**
 * Use SVG to draw the triangle to the page
 * for now just make the 
 * 
 * TODO TEST: plug in values in order, then not in order. THis method is COMPLETELY separate from solve. This simply draws a triangle, given the filled in values--doesn't matter if there's only 1 or 4 or 3 or whatever. We should be able to draw it out at any stage to show progress
 * TODO: test drawing short 1st line, short second line, LOOOOOng 3rd line to the left side sticks past 0,0 into negative space--verify entire triangle can be seen
 * @param {object} triangle: fully or partially-solved triangle ready to be drawn
 */
function drawTriangle(triangle) {
    //triangle = JSON.parse('{"color":"#e74f01","sides":[200,223.606797749979,300],"angles":[41.810314895778596,48.18968510422141,90]}');
    $svg.html(getTriangleSVG(triangle));
}

function getTriangleSVG(triangle) {
    //heirarchical structure to facilitate relative rotation
    var triangleSVG = '';
    if (triangle.sides[0] != null) {
        triangleSVG = lineTemplate.format(0, triangle.sides[0]); //first side starts at 0,0 and has no rotation

        var defaultAngle = 0;
        var side3Group = '';
        var side2X = triangle.sides[0] + triangle.sides[1];
        if (triangle.sides[2] != null) {
            var side3Angle = (180 - triangle.angles[0] || defaultAngle);
            var side3Rotate = rotateTemplate.format(side3Angle, side2X);
            var side3Line = lineTemplate.format(side2X, side2X + triangle.sides[2]);
            side3Group = groupTemplate.format(side3Rotate, side3Line);
        }

        if (triangle.sides[1] != null) {
            var side2Angle = (180 - triangle.angles[2] || defaultAngle);
            var side2Rotate = rotateTemplate.format(side2Angle, triangle.sides[0]);
            var side2Line = lineTemplate.format(triangle.sides[0], side2X);
            var side2Group = groupTemplate.format(side2Rotate, side2Line + side3Group);
            triangleSVG += side2Group; //remember this includes side3 if anything
        }
    }
   
    var svgTemplate = '<g transform="translate(0,{0})"><g id="plane" style="stroke:{1};" transform="scale(1,-1)">{2}</g></g>'; // '<g transform="translate(0,{0})"><g id="plane" style="stroke:{1};" transform="scale(1,-1)"><svg preserveAspectRatio="xMidYMid meet" viewBox="0 0 30 40" width="100%" height="100%">{2}</svg></g></g>';
    return svgTemplate.format(height, triangle.color, triangleSVG); //center svg: http://stackoverflow.com/questions/16891277/programmatically-centering-svg-path?rq=1
}

/**
 * Solve the given triangle.
 *
 * @param {object} deltaTriangle: object that contains 3 side lengths and 3 angles, with at least 3 of the 6 properties filled in
 * @param {bool}   displayErrors: indicates whether we should fail silently or let the user know why the triangle couldn't be solved
 * @returns solved triangle
 */
function solve(deltaTriangle, displayErrors) {
    /*
    AAS -- Any two angles, and one side (Law of Sines)
	SAS -- Side, included Angle, and Side (Law of Cosines)
	SSA -- Two sides, and a non-included Angle (Law of Sines) — this might have two solutions!
	SSS -- All three sides (Law of Cosines)
    */
    //math angles and sides by index. need to do this in draw too!!!!
    //TODO: update draw to draw correct sides/angles as the info is plugged in.
    //REMEMBER, as soon as we have 3 pieces of info, we can solve--unless only angles are filled in. In which case, only use first 2 angles to solve and overwrite the last angle
    //var AAS = deltaTriangle.angles.length >= 2 && deltaTriangle.sides.length >= 1;
    //var SAS = 

    drawTriangle(deltaTriangle);
}

/**
 * Displays an error message to the user
 */
function displayError(message) {
    $message.show().html(message);
}

function clearErrors() {
    $message.hide();
}



//OLD CODE...

function $$(id) {
    return document.getElementById(id);
}

function cases() {
    clearErrors();
    $('input[type="text"]', $triangleForm).each(function() {
        var value = $(this).val();
        $(this).val(value.replace(/[^\d\.]/g, ''));
    }); //clean box values for now. but do better in improved function...

    var s1 = $$('side1').value;
    var s2 = $$('side2').value;
    var s3 = $$('side3').value;
    var a1 = $$('angle1').value;
    var a2 = $$('angle2').value;
    var a3 = $$('angle3').value;

    //		var Alta1 = Math.PI - a1; //ambigous cases ssa
    //		var Alta2 = Math.PI - a2;
    //		var Alta3 = Math.PI - a3;
    //		var Alts1 = Math.sqrt(Math.pow(s2,2) + Math.pow(s3,2) - 2*s2*s3*Math.cos((Math.PI/180) * Alta1));
    //		var Alts2 = Math.sqrt(Math.pow(s1,2) + Math.pow(s3,2) - 2*s1*s3*Math.cos((Math.PI/180) * Alta2));
    //		var Alts3 = Math.sqrt(Math.pow(s2,2) + Math.pow(s1,2) - 2*s2*s1*Math.cos((Math.PI/180) * Alta3));
    //		if (Alta1 < 0 || Alta2 < 0 || Alta3 < 0)
    //		{


    if (s1 == "" && s2 == "" && s3 == "") //aaa
    {
        displayError('Must have at least one side length');
    } else if (a1 == "" && a2 == "" && a3 == "") //sss
    {
        a1 = (180 / Math.PI) * Math.acos((Math.pow(s2, 2) + Math.pow(s3, 2) - Math.pow(s1, 2)) / (2 * s2 * s3));
        a2 = (180 / Math.PI) * Math.acos((Math.pow(s1, 2) + Math.pow(s3, 2) - Math.pow(s2, 2)) / (2 * s3 * s1));
        a3 = (180 / Math.PI) * Math.acos((Math.pow(s2, 2) + Math.pow(s1, 2) - Math.pow(s3, 2)) / (2 * s2 * s1));
        $$('angle1').value = a1;
        $$('angle2').value = a2;
        $$('angle3').value = a3;
    } else if (a1 == "" && a2 == "" && s3 == "") //sas
    {
        s3 = Math.sqrt(Math.pow(s2, 2) + Math.pow(s1, 2) - 2 * s2 * s1 * Math.cos((Math.PI / 180) * a3));
        a1 = (180 / Math.PI) * Math.acos((Math.pow(s2, 2) + Math.pow(s3, 2) - Math.pow(s1, 2)) / (2 * s2 * s3));
        a2 = (180 / Math.PI) * Math.acos((Math.pow(s1, 2) + Math.pow(s3, 2) - Math.pow(s2, 2)) / (2 * s3 * s1));
        $$('angle1').value = a1;
        $$('angle2').value = a2;
        $$('side3').value = s3;
    } else if (s1 == "" && a2 == "" && a3 == "") //BROKEN
    {
        s1 = Math.sqrt(Math.pow(s2, 2) + Math.pow(s3, 2) - 2 * s2 * s3 * Math.cos((Math.PI / 180) * a1));
        a2 = (180 / Math.PI) * Math.acos((Math.pow(s1, 2) + Math.pow(s3, 2) - Math.pow(s2, 2)) / (2 * s3 * s1));
        a3 = (180 / Math.PI) * Math.acos((Math.pow(s2, 2) + Math.pow(s1, 2) - Math.pow(s3, 2)) / (2 * s2 * s1));
        $$('side1').value = s1;
        $$('angle2').value = a2;
        $$('angle3').value = a3;
    } else if (s2 == "" && a1 == "" && a3 == "") {
        s2 = Math.sqrt(Math.pow(s1, 2) + Math.pow(s3, 2) - 2 * s1 * s3 * Math.cos((Math.PI / 180) * a2));
        a1 = (180 / Math.PI) * Math.acos((Math.pow(s2, 2) + Math.pow(s3, 2) - Math.pow(s1, 2)) / (2 * s2 * s3));
        a3 = (180 / Math.PI) * Math.acos((Math.pow(s2, 2) + Math.pow(s1, 2) - Math.pow(s3, 2)) / (2 * s2 * s1));
        $$('side2').value = s2;
        $$('angle1').value = a1;
        $$('angle3').value = a3;
    } else if (s1 == "" && s2 == "" && a1 == "") //saa
    {
        a1 = 180 - a2 - a3;
        s1 = (s3 * Math.sin((Math.PI / 180) * a1)) / Math.sin((Math.PI / 180) * a3);
        s2 = (s3 * Math.sin((Math.PI / 180) * a2)) / Math.sin((Math.PI / 180) * a3)
        $$('side1').value = s1;
        $$('side2').value = s2;
        $$('angle1').value = a1;
    } else if (s2 == "" && s3 == "" && a2 == "") {
        a2 = 180 - a1 - a3;
        s2 = (s1 * Math.sin((Math.PI / 180) * a2)) / Math.sin((Math.PI / 180) * a1);
        s3 = (s1 * Math.sin((Math.PI / 180) * a3)) / Math.sin((Math.PI / 180) * a1);
        $$('side2').value = s2;
        $$('side3').value = s3;
        $$('angle2').value = a2;
    } else if (s3 == "" && s1 == "" && a3 == "") {
        a3 = 180 - a1 - a2;
        s3 = (s2 * Math.sin((Math.PI / 180) * a3)) / Math.sin((Math.PI / 180) * a2);
        s1 = (s2 * Math.sin((Math.PI / 180) * a1)) / Math.sin((Math.PI / 180) * a2);
        $$('side3').value = s3;
        $$('side1').value = s1;
        $$('angle3').value = a3;
    } else if (s1 == "" && s3 == "" && a1 == "") {
        a1 = 180 - a2 - a3;
        s1 = (s2 * Math.sin((Math.PI / 180) * a1)) / Math.sin((Math.PI / 180) * a2);
        s3 = (s2 * Math.sin((Math.PI / 180) * a3)) / Math.sin((Math.PI / 180) * a2);
        $$('side1').value = s1;
        $$('side3').value = s3;
        $$('angle1').value = a1;
    } else if (s2 == "" && s3 == "" && a3 == "") {
        a3 = 180 - a1 - a2;
        s2 = (s1 * Math.sin((Math.PI / 180) * a2)) / Math.sin((Math.PI / 180) * a1);
        s3 = (s1 * Math.sin((Math.PI / 180) * a3)) / Math.sin((Math.PI / 180) * a1);
        $$('side2').value = s2;
        $$('side3').value = s3;
        $$('angle3').value = a3;
    } else if (s2 == "" && s1 == "" && a2 == "") {
        a2 = 180 - a1 - a3;
        s2 = (s3 * Math.sin((Math.PI / 180) * a2)) / Math.sin((Math.PI / 180) * a3);
        s1 = (s3 * Math.sin((Math.PI / 180) * a1)) / Math.sin((Math.PI / 180) * a3);
        $$('side2').value = s2;
        $$('side1').value = s1;
        $$('angle2').value = a2;
    } else if (s1 == "" && a3 == "" && a1 == "") //ssa -- + " or " + Alts1;, etc. 
    {
        a3 = (180 / Math.PI) * Math.asin((s3 * Math.sin((Math.PI / 180) * a2)) / s2);
        a1 = 180 - a3 - a2;
        s1 = Math.sqrt(Math.pow(s2, 2) + Math.pow(s3, 2) - 2 * s2 * s3 * Math.cos((Math.PI / 180) * a1));
        $$('side1').value = s1;
        $$('angle3').value = a3;
        $$('angle1').value = a1;
    } else if (s2 == "" && a1 == "" && a2 == "") {
        a1 = (180 / Math.PI) * Math.asin((s1 * Math.sin((Math.PI / 180) * a3)) / s3);
        a2 = 180 - a1 - a3;
        s2 = Math.sqrt(Math.pow(s1, 2) + Math.pow(s3, 2) - 2 * s1 * s3 * Math.cos((Math.PI / 180) * a2));
        $$('side2').value = s2;
        $$('angle1').value = a1;
        $$('angle2').value = a2;
    } else if (s3 == "" && a2 == "" && a3 == "") {
        a2 = (180 / Math.PI) * Math.asin((s2 * Math.sin((Math.PI / 180) * a1)) / s1);
        a3 = 180 - a2 - a1;
        s3 = Math.sqrt(Math.pow(s2, 2) + Math.pow(s1, 2) - 2 * s2 * s1 * Math.cos((Math.PI / 180) * a3));
        $$('side3').value = s3;
        $$('angle2').value = a2;
        $$('angle3').value = a3;
    } else if (s1 == "" && a2 == "" && a1 == "") {
        a2 = (180 / Math.PI) * Math.asin((s2 * Math.sin((Math.PI / 180) * a3)) / s3);
        a1 = 180 - a2 - a3;
        s1 = Math.sqrt(Math.pow(s2, 2) + Math.pow(s3, 2) - 2 * s2 * s3 * Math.cos((Math.PI / 180) * a1));
        $$('side1').value = s1;
        $$('angle2').value = a2;
        $$('angle1').value = a1;
    } else if (s2 == "" && a3 == "" && a2 == "") {
        a3 = (180 / Math.PI) * Math.asin((s3 * Math.sin((Math.PI / 180) * a1)) / s1);
        a2 = 180 - a1 - a3;
        s2 = Math.sqrt(Math.pow(s1, 2) + Math.pow(s3, 2) - 2 * s1 * s3 * Math.cos((Math.PI / 180) * a2));
        $$('side2').value = s2;
        $$('angle3').value = a3;
        $$('angle2').value = a2;
    } else if (s3 == "" && a1 == "" && a3 == "") {
        a1 = (180 / Math.PI) * Math.asin((s1 * Math.sin((Math.PI / 180) * a2)) / s2);
        a3 = 180 - a1 - a2;
        s3 = Math.sqrt(Math.pow(s2, 2) + Math.pow(s1, 2) - 2 * s2 * s1 * Math.cos((Math.PI / 180) * a3));
        $$('side3').value = s3;
        $$('angle1').value = a1;
        $$('angle3').value = a3;
    } else if (s1 == "" && s2 == "" && a3 == "") //asa   
    {
        a3 = 180 - a1 - a2;
        s1 = (s3 * Math.sin((Math.PI / 180) * a1)) / Math.sin((Math.PI / 180) * a3);
        s2 = (s3 * Math.sin((Math.PI / 180) * a2)) / Math.sin((Math.PI / 180) * a3);
        $$('side1').value = s1;
        $$('side2').value = s2;
        $$('angle3').value = a3;
    } else if (s1 == "" && s3 == "" && a2 == "") {
        a2 = 180 - a1 - a3;
        s3 = (s2 * Math.sin((Math.PI / 180) * a3)) / Math.sin((Math.PI / 180) * a2);
        s1 = (s2 * Math.sin((Math.PI / 180) * a1)) / Math.sin((Math.PI / 180) * a2);
        $$('side3').value = s3;
        $$('side1').value = s1;
        $$('angle2').value = a2;
    } else if (s3 == "" && s2 == "" && a1 == "") {
        a1 = 180 - a3 - a2;
        s3 = (s1 * Math.sin((Math.PI / 180) * a3)) / Math.sin((Math.PI / 180) * a1);
        s2 = (s1 * Math.sin((Math.PI / 180) * a2)) / Math.sin((Math.PI / 180) * a1);
        $$('side3').value = s3;
        $$('side2').value = s2;
        $$('angle1').value = a1;
    }

    $('input[type="text"]', $triangleForm).each(function () {
        var value = $(this).val();
        $(this).val(value.replace(/[^\d\.]/g, ''));
    }); //clean box values for now. but do better in improved function...
}
