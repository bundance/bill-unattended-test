(function(){
    'use strict';

    angular
        .module('billApp')
        .controller('NowtvTableController', NowtvTableController);

    angular.$inject = ['billTable'];

    function NowtvTableController(billTable){

        var vm = this;

        vm.capitalizeFirstLetter = billTable.capitalizeFirstLetter;
        vm.getValue = billTable.getValue;

    }

})();