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
            controllerAs: 'statement',
            controller: 'StatementController',
            bindToController: true,
            templateUrl: 'scripts/components/nowtv-summary/nowtv-statement.tpl.html',
            link: link
        };

        return directive;

        function link(scope, elem, attrs, controller){
            controller.statementData = scope.statementData;
        }
    }
})();