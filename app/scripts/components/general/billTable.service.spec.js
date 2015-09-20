describe("billTable.service", function() {

    'use strict';

    var billTable;

    beforeEach(module('billApp'));

    beforeEach(inject(function (_billTable_) {
        billTable = _billTable_;
    }));

    describe("getValue() function", function () {

        it("Should return the value supplied decorated with the £ symbol, when the key is 'cost'", function () {
            expect(billTable.getValue('cost', 12.56)).toEqual('£12.56');
        });

        it("Should return the value supplied unchanged when the key is NOT 'cost'", function () {
            expect(billTable.getValue('notcost', 12.56)).toEqual(12.56);
        });
    });

    describe("capitalizeFirstLetter() function", function () {
        it("Should return the value supplied with the first letter in upper case", function () {
            expect(billTable.capitalizeFirstLetter('value')).toEqual('Value');
        });
    });
});