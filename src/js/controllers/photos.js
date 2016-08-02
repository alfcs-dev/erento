(function() {
    'use strict';

    angular
        .module('app')
        .controller('photosCtrl', PhotosCtrl);

    PhotosCtrl.$inject = ['$stateParams', '$state', 'albumName', 'dataService', '$mdDialog'];

    function PhotosCtrl($stateParams, $state, albumName, dataService, $mdDialog) {
        var vm = this;
        //We asgin the title of the view depending on if we come from the url or from the state;
        vm.title = ($stateParams.albumName !== null) ? $stateParams.albumName : albumName.title;
        vm.albumId = $stateParams.albumId;
        vm.photos = [];
        vm.showPhoto = showPhoto;
        activate();

        ////////////////

        function activate() {
            var photos = dataService.getFn('http://jsonplaceholder.typicode.com/albums/' + vm.albumId + '/photos');
            photos.then(function(data) {
                vm.photos = data;
            }, function(error) {
                vm.errorLog = error;
            });
        }

        function showPhoto(ev, photo) {
            $mdDialog.show({
                controller: 'DialogController',
                controllerAs: 'vm',
                templateUrl: 'dist/views/fullsizePhoto.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true,
                fullscreen: true,
                locals: {
                    photo: photo
                },
                bindToController: true
            });
        }
    }
})();