(function(){
    'use strict';
    angular.module('app')
    .config(statesConf);

    function statesConf($stateProvider, $locationProvider){
        $stateProvider
        .state('album', {
            url: "/album/:id",
            templateUrl: "dist/albums.html",
            controller: 'albumsCtrl',
            controllerAs: 'vm'
        });
    }
})();