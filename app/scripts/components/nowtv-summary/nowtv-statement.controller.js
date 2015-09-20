(function(){
    'use strict';

    angular
        .module('billApp')
        .controller('StatementController', StatementController);

    StatementController.$inject = ['$scope'];

    function StatementController($scope){

        var vm = this;

        console.log('directive controller, $scope.statementData=');
        console.dir($scope.statementData);

        console.log('directive controller, vm.statementData=');
        console.dir(vm.statementData);
    }

})();