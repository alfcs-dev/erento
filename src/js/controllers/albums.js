(function() {
    'use strict';

    angular
        .module('app')
        .controller('AlbumsCtrl', AlbumsCtrl);

    AlbumsCtrl.$inject = ['dataService', '$q', '$state', '$timeout', '$mdSidenav', '$mdMedia'];

    function AlbumsCtrl(dataService, $q, $state, $timeout, $mdSidenav, $mdMedia) {
        var vm = this;
        vm.title = "Available Albums";
        vm.toggleLeft = buildDelayedToggler('left');
        vm.albums = [];
        vm.users = [];
        vm.close = close;
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

                angular.forEach(vm.albums, function(value, key) {
                    value.userInfo = vm.users.filter(function(user) {
                        return user.id === value.userId;
                    })[0];
                });
            }

            function CatchError(reason) {
                vm.errorLog = reason;
                console.log(vm.errorLog);
            }
        }

        function loadAlbum(albumId, albumName) {
            $state.go('album', { albumId: albumId, albumName: albumName });
            if ($mdMedia('max-width: 1279px')) {
                vm.close();
            }
        }

        function debounce(func, wait, context) {
            var timer;
            return function debounced() {
                var context = vm,
                    args = Array.prototype.slice.call(arguments);
                $timeout.cancel(timer);
                timer = $timeout(function() {
                    timer = undefined;
                    func.apply(context, args);
                }, wait || 10);
            };
        }

        function buildDelayedToggler(navID) {
            return debounce(function() {
                $mdSidenav(navID)
                    .toggle()
                    .then(function() {});
            }, 200);
        }

        function close() {
            $mdSidenav('left').close()
                .then(function() { 
                    //Insert here an action to do after the nav closes
                });
        }
    }
})();