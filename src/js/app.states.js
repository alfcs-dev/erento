(function(){
    'use strict';
    angular.module('app')
    .config(statesConf);

    function statesConf($stateProvider, $locationProvider){
      $stateProvider
        .state('album', {
            url: "/album/:albumId",
            templateUrl: "dist/views/albumPhotos.html",
            controller: 'photosCtrl as vm',
            params:{
                albumId: null,
                albumName: null
            }
        }).state('album.photo', {
            url: "photo/:id",
            templateUrl: 'dist/views/photo.html',
            controller: 'photoCtrl as vm'
        });
    }
})();