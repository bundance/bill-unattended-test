describe("billController", function(){

    describe("billController initialisation", function(){

        beforeEach(module(
            'ngResource',
            'ngSanitize',
            'ngRoute',
            'rest.billsJsonApi',   // change this to whatever ReST service you're using
            'momUI.momPaginator',
            'momUI',
            'ui.bootstrap-slider',
            'billApp'));

        var scope = {},
            momPaginator,
            billsJsonData,
            travelRepublicController;

        beforeEach(inject(function($rootScope, _momPaginator_, _billsJsonData_, $controller){
            scope = $rootScope.$new();
            momPaginator = _momPaginator_;
            billsJsonData = _billsJsonData_;

            travelRepublicController = $controller(scope, momPaginator, billsJsonData);

        }))

        it("Should be defined", function(){
            expect(travelRepublicController).toBeDefined();
        });


    });

});