(function() {
    'use strict';

    angular
        .module('rest.billsJsonApi')
        .factory('billData', billData);

    billData.$inject = ['billsJsonREST'];

    function billData(billsJsonREST){

        var excludeColumns = ['statement', 'total'];

        var service = {
            billData: {},
            tableData: {},
            getData: getData,
            getTotal: getTotal,
            getValue: getValue,
            capitalizeFirstLetter: capitalizeFirstLetter,
            getTableName: getTableName
        };

        return service;

        ///////////////////

        function getData() {
            return billsJsonREST.getData()
                .then(function(data){
                    service.billData = data;
                    service.tableData = _getTableData(data);
                return service.billData;
            });


            //////// Helper function ////////
            function _getTableData(data){
                var tableData = [],
                    tableItem = {};

                _.each(data, function(value, key){
                    if(!_.contains(excludeColumns, key)){
                        tableItem[key] = value;
                        tableData.push(tableItem[key]);
                        tableItem = {};
                    }
                });

                return tableData;
            }
        }

        function getTotal(table) {
            var total = 0;

            _.each(table, function(value){
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

        function getTableName(table){
            return capitalizeFirstLetter(Object.keys(table)[0]);
        }

        function capitalizeFirstLetter(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        }

    }

})();
