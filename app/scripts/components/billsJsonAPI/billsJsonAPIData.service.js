(function() {
    'use strict';

    angular
        .module('rest.billsJsonApi')
        .factory('billsJsonData', billsJsonData);

    billsJsonData.$inject = ['billsJsonREST'];

    function billsJsonData(billsJsonREST){


        var excludeColumns = ['statement', 'total'];

        var service = {
            calls: [],
            callCost: 0,
            subscriptions: [],
            subscriptionCost: 0,
            billData: {},
            tableData: {},
            getData: getData,
            getCalls: getCalls,
            getSubscriptions: getSubscriptions,
            sortData: sortData,
            getTotalCallsCount: getTotalCallsCount
        };

        return service;

        ///////////////////

        function getData() {
            return billsJsonREST.getData()
                .then(function(data){
                    service.billData = data;
                    service.tableData = _getTableData(data);

                    if (data) {

                        if(data.callCharges){
                            service.calls = data.callCharges.calls;
                            service.callCost = _calculateCosts(service.calls, 'cost');
                        }
                        if(data.package){
                            service.subscriptions = data.package.subscriptions;
                            service.subscriptionCost = _calculateCosts(service.subscriptions, 'cost');
                        }
                    }

                return service.billData;
            });
        }

        function _getTableData(data){
            var tableData = [],
                tableItem = {};

            _.each(data, function(value, key, list){
                if(!_.contains(excludeColumns, key)){
                    tableItem[key] = value;
                    tableData.push(tableItem[key]);
                    tableItem = {};
                }
            });

            return tableData;
        }

        function getCalls() {
            return service.calls;
        }

        function getSubscriptions() {
            return service.subscriptions;
        }


        function _calculateCosts(data, key){
            var cost = 0;

            _.each(data, function(item){
                cost = cost + item[key];
            });

            return cost;
        }


        function getTotalCallsCount() {
            return (_.isEmpty(service.calls) ) ? 0 : service.calls.length;

        }

        function sortData(sortColumn, sortOrder, data){
            return (sortOrder === 'desc')
                ? _.sortBy(data, sortColumn).reverse()
                : _.sortBy(data, sortColumn);
        }

    }

})();
