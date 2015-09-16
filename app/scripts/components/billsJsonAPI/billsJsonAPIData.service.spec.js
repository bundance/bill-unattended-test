describe("billsJSonAPIData.service", function(){

    beforeEach(module(
        'ngResource',
        'ngSanitize',
        'ngRoute',
        'rest.billsJsonApi',
        'billApp',
        'mockBillData'
    ));

    describe("getData function", function(){

        var $httpBackend,
            billsJsonData,
            mockBillData;

        beforeEach(inject(function(_billsJsonData_, _$httpBackend_, _mockBillData_){
            $httpBackend = _$httpBackend_;
            billsJsonData = _billsJsonData_;
            mockBillData = _mockBillData_;

        }));

        it("should retrieve the mock data", function(){

            $httpBackend.when('GET', 'https://still-scrubland-9880.herokuapp.com/bill.json')
                .respond(mockBillData.fakeData);
            $httpBackend.expectGET("https://still-scrubland-9880.herokuapp.com/bill.json");

            billsJsonData.getData();
            $httpBackend.flush();

        });

    });

});