(function() {
    'use strict';

    angular
        .module('billApp', [
            'ngResource',
            'ngSanitize',
            'ngRoute',
            'rest.billsJsonApi',
            'underscore'

        ])
        .config(function ($routeProvider) {
            $routeProvider
                .when('/', {
                    templateUrl: 'static/views/main.html',
                    controllerAs: 'bill',
                    controller: 'billController'
                })
                .when('/about', {
                    templateUrl: 'static/views/about.html'
                })
                .otherwise({
                    redirectTo: '/'
                });
        });
})();
