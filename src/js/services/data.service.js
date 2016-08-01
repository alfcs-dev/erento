(function() {
    'use strict';

    angular
        .module('app')
        .factory('dataService', dataService);

    dataService.$inject = ['$http', '$q'];

    function dataService($http, $q) {
        var service = {
            getFn: getFn
        };

        return service;

        ////////////////
        /* Creating a common endpoint to all the asyncronous GET operations */
        function getFn(url, data) {
            var def, config = {};
            data = (data === undefined) ? '' : data;
            config.params = data;
            config.cache = true;
            def = $q.defer(); //Using $q service to return a promise to our controllers
            $http.get(url, config).success(function(data) {
                def.resolve(data);
            }).error(function(error) {
                def.reject('There Was an error on the request');
            });
            return def.promise;
        }
    }
})();