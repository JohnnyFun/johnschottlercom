var tests = [
    solveTests,
    drawTests,
    helpersTests
];

var UnitTester = {
    runTests: function () {
        tests.forEach(function (testClass) {
            var tests = testClass.tests;
            var i = 0;
            for (var test in tests) {
                if (tests.hasOwnProperty(test)) {
                    if (isFunc(testClass.beforeEach)) {
                        testClass.beforeEach();
                    }
                    var result = tests[test]();
                    var testMessage = '{0}) {1}'.format(++i, test);
                    result ? UnitTester.log('{0} Success!'.format(testMessage)) : UnitTester.log('{0} Failed!'.format(testMessage), true);
                }
            }
            UnitTester.log('');
        });
    },

    log: function(message, isError) {
        isError ? console.error(message) : console.log(message);
        //ocument.getElementById('message').innerHTML += message + '<br/>';
    }
}
UnitTester.runTests();