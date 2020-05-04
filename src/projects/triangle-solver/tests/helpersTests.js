var helpersTests = {
    beforeEach: function() {
        helpersTests.testArray = [{ Super: 34, Duper: 'Aa' }, { Super: 3, Duper: 'Zz' }, { Super: 349, Duper: 'aab' }];
    },
    tests: {
        sort_works: function() {
            var result = sort(helpersTests.testArray, 'Super');
            return result[0].Super === 3 &&
                result[1].Super === 34 &&
                result[2].Super === 349;
        },

        sort_descending_works: function() {
            var result = sort(helpersTests.testArray, 'Super', true);
            return result[2].Super === 3 &&
                result[1].Super === 34 &&
                result[0].Super === 349;
        },

        sort_descending_works_strings_caseInsensitive: function () {
            var result = sort(helpersTests.testArray, 'Duper', true);
            return result[0].Duper === 'Zz' &&
                result[1].Duper === 'aab' &&
                result[2].Duper === 'Aa';
        },

        roundNumberHandles_e_crap: function() {
            var result = roundNumber(2.5444437451708134e-14, 4);
            return result === 2.5444;
        }
    }
};