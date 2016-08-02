(function() {
    'use strict';
    angular.module('app')
        .config(statesConf);

    function statesConf($stateProvider, $locationProvider) {
        $stateProvider
            .state('album', {
                url: "/album/:albumId",
                templateUrl: "dist/views/albumPhotos.html",
                controller: 'photosCtrl as vm',
                params: {
                    albumId: null,
                    albumName: null
                },
                resolve: {
                    //In case you access de album directly from the url, whe obtain the info of the specific album
                    albumName: function(dataService, $stateParams) {
                        if ($stateParams.albumName === null && $stateParams.albumId !== null) {
                            var album = dataService.getFn('http://jsonplaceholder.typicode.com/albums/' + $stateParams.albumId);
                            return album;
                        }
                    }
                }
            });
    }
})();