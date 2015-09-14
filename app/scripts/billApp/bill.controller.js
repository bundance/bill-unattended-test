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

        // Initialisation
        activate();

        ////////////////////

        function activate(){
            // Get the bill data
            billsJsonData.getData()
                .then(function(){
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



    }
})();

