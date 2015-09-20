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
            link: link,
            templateUrl: 'scripts/components/nowtv-header/nowtv-header.tpl.html'
        };

        return directive;

        function link(scope, elem, attrs, controller){

        }
    }

})();