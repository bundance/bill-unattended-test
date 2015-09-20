(function(){
    'use strict';

    angular
        .module('billApp')
        .directive('nowtvStatement', nowtvStatement);

    function nowtvStatement(){

        var directive = {
            restrict: 'E',
            scope: {
                statementData: '='
            },
            templateUrl: 'scripts/components/nowtv-statement/nowtv-statement.tpl.html',
        };

        return directive;

    }
})();