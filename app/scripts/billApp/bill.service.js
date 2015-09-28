(function() {
    'use strict';

    angular
        .module('rest.billsJsonApi')
        .factory('billData', billData);

    billData.$inject = ['billsJsonREST', 'billTable'];

    function billData(billsJsonREST, billTable){

        var excludeColumns = ['statement', 'total'];

        var service = {
            billData: {},
            tableData: {},
            getData: getData,
            getTotal: getTotal,
            getTableName: getTableName
        };

        return service;

        ///////////////////

        function getData() {
            return billsJsonREST.getData()
                .then(function(data){
                    service.billData = _formatData(data);
                    service.tableData = _getTableData(data);
                return service.billData;
            });


            //////// Helper functions ////////
            function _formatData(data){
                var formattedData = _.omit(data, 'total');
                formattedData.statement.total = data.total;

                return formattedData;
            }

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

        function getTableName(table){
            return billTable.capitalizeFirstLetter(Object.keys(table)[0]);
        }

    }

})();
