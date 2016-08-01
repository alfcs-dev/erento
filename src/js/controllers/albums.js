(function() {
    'use strict';

    angular
        .module('app')
        .controller('AlbumsCtrl', AlbumsCtrl);

    AlbumsCtrl.$inject = ['dataService', '$q'];

    function AlbumsCtrl(dataService, $q) {
        var vm = this;
        vm.title = "Available Albums";
        vm.albums = [];
        vm.users = [];
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
            }

            function CatchError(reason) {
                vm.errorLog = reason;
                console.log(vm.errorLog);
            }
        }
    }
})();