describe("billsJSonAPIData.service", function(){

    'use strict';

    var $scope,
        $httpBackend,
        billsJsonREST,
        mockBillData,
        spies = {};

    beforeEach(function(){
        addJsonEqualMatcher(this);
    });

    beforeEach(module(
        'ngResource',
        'ngSanitize',
        'ngRoute',
        'rest.billsJsonApi',
        'billApp',
        'mockData',
        'underscore'
    ));

    beforeEach(inject(function(_$rootScope_, _$httpBackend_, _billsJsonREST_, _mockBillData_){
        $scope = _$rootScope_.$new();
        $httpBackend = _$httpBackend_;
        billsJsonREST = _billsJsonREST_;
        mockBillData = _mockBillData_;
    }));

    describe("getData function", function() {

        // Setup spies
        beforeEach(function () {
            spies.success = jasmine.createSpy();
            spies.error = jasmine.createSpy();
        });

        // Setup fake AJAX request
        beforeEach(function () {
            $httpBackend.when('GET', 'https://still-scrubland-9880.herokuapp.com/bill.json')
                .respond(mockBillData.billData[0]);
            $httpBackend.expectGET("https://still-scrubland-9880.herokuapp.com/bill.json");
        });

        // Ensure all expected requests have been made after function completes
        afterEach(function () {
            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();
        });

        it("should retrieve the mock bill data", function () {

            billsJsonREST.getData()
                .then(function (response) {
                    expect(response).toBeJsonEqual(mockBillData.billData[0]);
                    spies.success();
                })
                .catch(spies.error);

            $httpBackend.flush();
            $scope.$apply();

            expect(spies.success.callCount).toBe(1);
            expect(spies.error.callCount).toBe(0);

        });
    });
});