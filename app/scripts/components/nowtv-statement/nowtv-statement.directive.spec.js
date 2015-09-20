describe('nowtv-statement directive', function(){

    var $httpBackend,
        $compile,
        $rootScope,
        mockBill,
        mockScope;

    beforeEach(module(
        'billApp',
        'mockData'
    ));

    beforeEach(inject(function(_$compile_, _$rootScope_, _$httpBackend_, _mockBillData_){

        $httpBackend = _$httpBackend_;
        $compile = _$compile_;
        $rootScope = _$rootScope_;
        mockBillData = _mockBillData_;

    }));

    describe('Directive initialisation', function(){

        beforeEach(function(){
            var template = '<div class="statement">' +
                           '    <span class="statement__date">{{ statementData.period.from}}</span>' +
                           '    <span class="statement__date">{{ statementData.period.to}}</span>' +
                           '    <span class="statement__total--currency">{{ statementData.total}}</span>' +
                           '    <span class="statement__date">{{ statementData.due}}</span>' +
                           '</div>';


            $httpBackend.whenGET('scripts/components/nowtv-statement/nowtv-statement.tpl.html')
                .respond(template);
        });

        it("Should set statement data on initialisation", function(){

            var html = '<nowtv-statement statement-data="statementData"></nowtv-statement>';
            mockScope = $rootScope.$new();

            mockScope.statementData = {
                'period': {
                    'from': '2015-01-26',
                    'to': '2015-02-25'
                },
                'due': '2015-01-25',
                'total': 136.03
            }

            var elem = getCompiledDirectiveElement(html, mockScope);
            var compiledElementScope = elem.isolateScope();

            expect(compiledElementScope.statementData.period.from).toEqual('2015-01-26');
            expect(compiledElementScope.statementData.period.to).toEqual('2015-02-25');
            expect(compiledElementScope.statementData.total).toEqual(136.03);
            expect(compiledElementScope.statementData.due).toEqual('2015-01-25');
        });
    });

    function getCompiledDirectiveElement(template, scope){
        var elem = $compile(template)(mockScope);

        scope.$digest();
        $httpBackend.flush();

        return elem;
    }
});

