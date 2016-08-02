(function() {
    'use strict';
    angular
        .module('app')
        .controller('DialogController', DialogController);

    DialogController.$inject = ['$scope', '$mdDialog'];

    function DialogController($scope, $mdDialog) {
        $scope.hide = function() {
            $mdDialog.hide();
        };
        $scope.cancel = function() {
            $mdDialog.cancel();
        };
    }
})();