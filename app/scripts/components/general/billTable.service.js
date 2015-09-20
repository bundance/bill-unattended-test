(function(){
    'use strict';

    angular
        .module('billApp')
        .factory('billTable', billTable);

    function billTable(){

        var service = {
            capitalizeFirstLetter: capitalizeFirstLetter,
            getValue: getValue
        };

        return service;

        //////

        function capitalizeFirstLetter(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        }

        function getValue(key, value){
            return (key === 'cost') ? '£' + parseFloat(value).toFixed(2) : value;
        }

    }

})();