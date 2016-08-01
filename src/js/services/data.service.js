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
        function getFn() { 
            
        }
    }
})();