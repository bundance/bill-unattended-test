(function() {
    'use strict';

    angular
        .module('billApp')
        .controller('billController', billController);

    billController.$inject = ['billData'];

    function billController(billData) {

        var vm = this;

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
            });
        }

    }
})();

