(function() {
'use strict';

    angular
        .module('app')
        .controller('AlbumsCtrl', AlbumsCtrl);

    AlbumsCtrl.$inject = ['dataService'];
    function AlbumsCtrl(dataService) {
        var vm = this;
        vm.title = "Availables Albums";
        vm.albums = [];
        activate();

        ////////////////

        function activate() { }
    }
})();