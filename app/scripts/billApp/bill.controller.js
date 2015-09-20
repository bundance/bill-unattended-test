(function() {
    'use strict';

    angular
        .module('billApp')
        .controller('billController', billController);

    billController.$inject = ['billData'];

    function billController(billData) {

        var vm = this;

        var columnSortDirection = {
            called: 'asc',
            duration: 'unsorted',
            cost: 'unsorted'
        };

        vm.getTableName = billData.getTableName;
        vm.getValue = billData.getValue;
        vm.getTotal = billData.getTotal;
        vm.capitalizeFirstLetter = billData.capitalizeFirstLetter;


        // Initialisation
        activate();

        ////////////////////

        function activate(){
            // Get the bill data
            billData.getData()
                .then(function(){
                    vm.billData = billData.billData;
                    vm.tableData = billData.tableData;

                    console.log('bill.controller.billData=');
                    console.dir(vm.billData);
            });
        }

    }
})();

