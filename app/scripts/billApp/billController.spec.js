describe("billController", function(){

    describe("billController initialisation", function(){

        beforeEach(module(
            'ngResource',
            'ngSanitize',
            'ngRoute',
            'rest.billsJsonApi',
            'billApp'));

        var scope = {},
            billsJsonData,
            billController;

        beforeEach(inject(function(_billsJsonData_, $controller){
            billsJsonData = _billsJsonData_;

            billController = $controller('billController', {
                'billsJsonData': billsJsonData
            });

        }));

        it("Should be defined", function(){
            expect(billController).toBeDefined();
        });


    });

});