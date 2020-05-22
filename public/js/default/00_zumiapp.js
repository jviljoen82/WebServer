const ZumisApp = angular.module('ZumisWorldApp', ['ngMaterial', 'ngMessages'])
    .config(($mdThemingProvider) => {
        $mdThemingProvider.theme('default').dark();
    });
