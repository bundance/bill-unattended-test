describe("billController", function(){

    describe("billController initialisation", function(){

        beforeEach(module(
            'ngResource',
            'ngSanitize',
            'ngRoute',
            'rest.billsJsonApi',
            'billApp'));

        var scope = {},
            billData,
            billController;

        beforeEach(inject(function(_billData_, $controller){
            billData = _billData_;

            billController = $controller('billController', {
                'billData': billData
            });

        }));

        it("Should be defined", function(){
            expect(billController).toBeDefined();
        });


    });

});