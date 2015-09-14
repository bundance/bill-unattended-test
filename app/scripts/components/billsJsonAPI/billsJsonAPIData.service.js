(function() {
    'use strict';

    angular
        .module('rest.billsJsonApi')
        .factory('billsJsonData', billsJsonData);

    billsJsonData.$inject = ['billsJsonREST'];

    function billsJsonData(billsJsonREST){

        var service = {
            calls: [],
            callCost: 0,
            subscriptions: [],
            subscriptionCost: 0,
            billData: {},
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

        ////////////////////




        function _formatData(data, params){
            return (params)
                ? _slice(
                sortData(
                    params.sort,
                    params.order,
                    _filter(data, params.filters)
                ),
                params.page,
                params.per_page
            )
                : data;

        }

        function _slice(data, pageNum, itemsPerPage){
            return data.slice((pageNum * itemsPerPage) - itemsPerPage, (pageNum * itemsPerPage));
        }

        function sortData(sortColumn, sortOrder, data){
            return (sortOrder === 'desc')
                ? _.sortBy(data, sortColumn).reverse()
                : _.sortBy(data, sortColumn);
        }

        function _filter(data, filters){
            return (filters)
                ? _.filter(data, function(hotel){
                // ToDo: refactor _filter to curry the function so it accepts the filters as an extensible
                // list of arguments
                return _withinPriceRange(hotel.MinCost, filters.priceMin, filters.priceMax)
                && _atLeast(hotel.Stars, filters.stars)
                && _atLeast(hotel.UserRating, filters.userRating)
                && _checkFilters(hotel, filters);
            })
                : data;

            function _withinPriceRange(price, priceMin, priceMax){
                priceMin = priceMin || price;
                priceMax = priceMax || price;

                return (price >= priceMin && price <= priceMax);
            }

            function _atLeast(value, requiredValue){
                return (requiredValue)
                    ? value >= requiredValue
                    : true;
            }

            // Matches filters to property names in a hotel object. If a filter name doesn't match a hotel
            // object property name, it won't be checked here
            function _checkFilters(hotel, filters){
                return _.every(_.map(_.keys(hotel), function(key){
                    return (filters[key]) ? hotel[key] === filters[key] : true;
                }));
            }
        }




        /////// helper Functions ///////

        function _formatParams(itemsPerPage, pageNum, sortColumn, sortAscending, filters) {
            return (_.every(arguments, function(arg){
                return typeof arg === 'undefined';
            }))
                ? undefined
                : {
                        per_page: itemsPerPage || DEFAULT_ITEMS_PER_PAGE,
                        page: pageNum || 1,
                        sort: sortColumn,
                        order: (sortAscending === true) ? 'asc' : 'desc',
                        filters: filters
                  };
        }




        function _handleError() {
            return 0;
        }
    }

})();
