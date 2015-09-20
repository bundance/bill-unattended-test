(function(){
    'use strict';

    angular
        .module('billApp')
        .directive('nowtvTable', nowtvTable);

    function nowtvTable() {

        var directive = {
            restrict: 'E',
            scope: {
                nowtvTableData: '='
            },
            templateUrl: 'scripts/components/nowtv-table/nowtv-table.tpl.html',
            controller: 'NowtvTableController',
            controllerAs: 'tableCtrl',
            bindToController: true,
            link: link
        };

        return directive;

        ////////

        function link(scope, elem, attrs, controller){

        }
    }

})();