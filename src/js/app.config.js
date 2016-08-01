(function(){
    'use strict';
    angular.module('app')
    .config(themeConf);

    function themeConf($mdThemingProvider){
        $mdThemingProvider.theme('default')
        .primaryPalette('teal')
        .accentPalette('grey');
        
    }
})();