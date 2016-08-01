(function(){
    'use strict';
    angular.module('app')
    .config(statesConf);

    function statesConf($stateProvider, $locationProvider){
      $stateProvider
        .state('album', {
            url: "/album/:id",
            templateUrl: "dist/views/albumPhotos.html",
            controller: 'albumsCtrl as vm'
        }).state('album.photo', {
            url: "photo/:id",
            templateUrl: 'dist/views/photo.html',
            controller: 'photoCtrl as vm'
        });
    }
})();