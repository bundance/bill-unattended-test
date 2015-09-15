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

        vm.calls = [];
        vm.subscriptions = [];
        vm.subscriptionCost = 0;
        vm.sortData = billsJsonData.sortData;
        vm.toggleSort = toggleSort;
        vm.getTableName = getTableName;
        vm.getValue = getValue;
        vm.getTotal = getTotal;
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

                    vm.calls = billsJsonData.getCalls();
                    vm.callCost = billsJsonData.callCost;
                    vm.subscriptions = billsJsonData.getSubscriptions();
                    vm.subscriptionCost = billsJsonData.subscriptionCost;
                    sortCalls('called', 'asc');
                    return vm.calls;
            });
        }

        function toggleSort(columnName){
            columnSortDirection[columnName] = (columnSortDirection[columnName] === 'asc')  ? 'desc' : 'asc';
            return sortCalls(columnName, columnSortDirection[columnName]);
        }

        function sortCalls(columnName, sortOrder){
            vm.calls = billsJsonData.sortData(columnName, sortOrder, vm.calls);
        }

        function getTableName(table){
            return billsJsonData.capitalizeFirstLetter(Object.keys(table)[0]);
        }

        function getTotal(table) {
            var total = 0;

            _.each(table, function(value, item){
                _.each(value, function(value){
                    _.each(value, function(value, key){
                        if(key === 'cost'){
                            total = total + value;
                        }
                    })
                });
            });
            return total;
        }

        function getValue(key, value){
            return (key === 'cost') ? '£' + parseFloat(value).toFixed(2) : value;
        }

    }
})();

