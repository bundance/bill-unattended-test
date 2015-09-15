(function() {
    'use strict';

    angular
        .module('billApp')
        .controller('billController', billController);

    billController.$inject = ['$scope', 'billsJsonData'];

    function billController($scope, billsJsonData) {

        var vm = this;

        var columnSortDirection = {
            called: 'asc',
            duration: 'unsorted',
            cost: 'unsorted'
        };

        vm.getTableName = billsJsonData.getTableName;
        vm.getValue = billsJsonData.getValue;
        vm.getTotal = billsJsonData.getTotal;
        vm.capitalizeFirstLetter = billsJsonData.capitalizeFirstLetter;


        // Initialisation
        activate();

        ////////////////////

        function activate(){
            // Get the bill data
            billsJsonData.getData()
                .then(function(){
                    vm.billData = billsJsonData.billData;
                    vm.tableData = billsJsonData.tableData;
            });
        }

    }
})();

