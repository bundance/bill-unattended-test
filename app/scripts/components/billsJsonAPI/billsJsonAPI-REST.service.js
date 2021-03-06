/**
 *
 * The billsJsonREST service would normally be an interface to a server-side REST API. However, as this is just
 * a demo, the usual data sorting and filtering commands have been replicated here on the client-side instead.
 * This inevitably impacts performance on devices with limited resources, but there's no noticeable performance
 * impact on any of the devices it's been tested on.
 *
 * For an example of how an equivalent service normally interacts with a server-based API, see gitHub-REST.service.js
 * in scripts/components/gitHubAPI
 *
 */
(function() {
    'use strict';

    angular
        .module('rest.billsJsonApi')
        .factory('billsJsonREST', billsJsonREST);

    billsJsonREST.$inject = ['$http'];

    function billsJsonREST($http) {

        var service = {
            getData: getData,
        };

        return service;

        ///////////


        function getData(){
            return $http
                .get('https://still-scrubland-9880.herokuapp.com/bill.json')
                .then(function(response){
                    console.log("Data retirve:");
                    console.dir(response);
                    return response.data;
                });
        }
    }

})();

