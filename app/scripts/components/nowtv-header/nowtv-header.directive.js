(function(){
    'use strict';

    angular
        .module('billApp')
        .directive('nowtvHeader', nowtvHeader);

    function nowtvHeader(){
        var directive = {
            restrict: 'E',
            scope: {
                statementDate: '='
            },
            templateUrl: 'scripts/components/nowtv-header/nowtv-header.tpl.html'
        };

        return directive;
    }

})();