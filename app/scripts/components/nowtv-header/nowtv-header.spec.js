describe('nowtv-header directive', function(){

    var $httpBackend,
        $compile,
        $rootScope,
        mockScope;

    beforeEach(module('billApp'));

    beforeEach(inject(function(_$compile_, _$rootScope_, _$httpBackend_){

        $httpBackend = _$httpBackend_;
        $compile = _$compile_;
        $rootScope = _$rootScope_;

    }));

    describe('Directive initialisation', function(){

        beforeEach(function(){
            $httpBackend.whenGET('scripts/components/nowtv-header/nowtv-header.tpl.html')
                .respond('<span>{{ statementDate }}</span>');
        });

        it("Should set statement date on initialisation", function(){

            var template = '<nowtv-header statement-date="\'2015-01-11\'"></nowtv-header>';
            mockScope = $rootScope.$new();

            var elem = getCompiledDirectiveElement(template, mockScope);
            var compiledElementScope = elem.isolateScope();

            expect(compiledElementScope.statementDate).toEqual('2015-01-11');
        });
    });

    function getCompiledDirectiveElement(template, scope){
        var elem = $compile(template)(mockScope);

        scope.$digest();
        $httpBackend.flush();

        return elem;
    }
});

