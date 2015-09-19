describe("billsJSonAPIData.service", function(){

    var $scope,
        $httpBackend,
        billsJsonData,
        mockBillData,
        mockTableData,
        _,
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

    beforeEach(inject(function(_$rootScope_, _$httpBackend_, _billsJsonData_, _mockBillData_, _mockTableData_, ___){
        $scope = _$rootScope_.$new();
        $httpBackend = _$httpBackend_;
        billsJsonData = _billsJsonData_;
        mockBillData = _mockBillData_;
        mockTableData = _mockTableData_;
        _ = ___;

    }));

    describe("getData function", function(){

        // Setup spies
        beforeEach(function(){
            spies.success = jasmine.createSpy();
            spies.error = jasmine.createSpy();
        });

        // Setup fake AJAX request
        beforeEach(function(){
            $httpBackend.when('GET', 'https://still-scrubland-9880.herokuapp.com/bill.json')
                .respond(mockBillData.billData[0]);
            $httpBackend.expectGET("https://still-scrubland-9880.herokuapp.com/bill.json");
        });

        // Ensure all expected requests have been made after function completes
        afterEach(function() {
            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();
        });

        it("should retrieve the mock bill data", function(){

            billsJsonData.getData()
                .then(function(response){
                    expect(response).toBeJsonEqual(mockBillData.billData[0]);
                    spies.success();
                })
                .catch(spies.error);

            $httpBackend.flush();
            $scope.$apply();

            expect(spies.success.callCount).toBe(1);
            expect(spies.error.callCount).toBe(0);

        });

        it("should set service.billData to the retrieved data", function(){

            billsJsonData.getData()
                .then(function(response){
                    expect(billsJsonData.billData).toBeJsonEqual(mockBillData.billData[0]);
                    spies.success();
                })
                .catch(spies.error);

            $httpBackend.flush();
            $scope.$apply();

            expect(spies.success.callCount).toBe(1);
            expect(spies.error.callCount).toBe(0);

        });

        it("should set service.tableData to the data that needs to be displayed in tables", function(){

            billsJsonData.getData()
                .then(function(response){
                    expect(billsJsonData.tableData).toBeJsonEqual(mockTableData);
                    spies.success();
                })
                .catch(spies.error);

            $httpBackend.flush();
            $scope.$apply();

            expect(spies.success.callCount).toBe(1);
            expect(spies.error.callCount).toBe(0);

        });
    });

    describe('getTotal() function', function(){

        it("Should return the total value of all properties called 'cost' in the supplied table object ", function(){
            var testTable = {
                "subscriptions": [
                    {
                        "type": "tv",
                        "cost": 50
                    },
                    {
                        "type": "talk",
                        "name": "Sky Talk Anytime",
                        "cost": 5
                    }
                ]
            };

            expect(billsJsonData.getTotal(testTable)).toBe(55);
        });

        it("Should return the zero when no properties called 'cost' are found", function(){
            var testTable = {
                "subscriptions": [
                    {
                        "type": "tv"
                    },
                    {
                        "type": "talk",
                        "name": "Sky Talk Anytime"
                    }
                ]
            };

            expect(billsJsonData.getTotal(testTable)).toBe(0);
        });
    });

    describe("getValue() function", function(){

        it("Should return the value supplied decorated with the £ symbol, when the key is 'cost'", function(){
            expect(billsJsonData.getValue('cost', 12.56)).toEqual('£12.56');
        });

        it("Should return the value supplied unchanged when the key is NOT 'cost'", function(){
            expect(billsJsonData.getValue('notcost', 12.56)).toEqual(12.56);
        });
    });

    describe ("capitalizeFirstLetter() function", function(){
        it("Should return the value supplied with the first letter in upper case", function(){
            expect(billsJsonData.capitalizeFirstLetter('value')).toEqual('Value');
        });
    });

});