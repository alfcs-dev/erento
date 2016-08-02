(function() {
    'use strict';

    angular
        .module('app')
        .controller('AlbumsCtrl', AlbumsCtrl);

    AlbumsCtrl.$inject = ['dataService', '$q', '$state'];

    function AlbumsCtrl(dataService, $q, $state) {
        var vm = this;
        vm.title = "Available Albums";
        vm.albums = [];
        vm.users = [];
        vm.loadAlbum = loadAlbum;
        activate();

        ////////////////
        /* During the creation of the controller I get the users and albums info */
        function activate() {
            var usersPromise = dataService.getFn('http://jsonplaceholder.typicode.com/users/');
            var albumsPromise = dataService.getFn('http://jsonplaceholder.typicode.com/albums/');
            /* I create two promise objects so the application waits until 
               both are finished before displaying anything */
            $q.all([usersPromise, albumsPromise])
                .then(ProcessData)
                .catch(CatchError);

            function ProcessData(data) {
                vm.users = data[0];
                vm.albums = data[1];

                angular.forEach(vm.albums, function(value, key){
                    value.userInfo = vm.users.filter(function(user){return user.id === value.userId; })[0];
                });
            }

            function CatchError(reason) {
                vm.errorLog = reason;
                console.log(vm.errorLog);
            }
        }

        function loadAlbum(albumId, albumName){
            $state.go('album', {albumId: albumId, albumName: albumName});
        }
    }
})();