(function() {
'use strict';

    angular
        .module('app')
        .controller('photosCtrl', PhotosCtrl);

    PhotosCtrl.$inject = ['$stateParams', '$state'];
    function PhotosCtrl($stateParams, $state) {
        var vm = this;
        vm.title = ($stateParams.albumName !== null) ?  $stateParams.albumName : "";

        activate();

        ////////////////

        function activate() { }
    }
})();