const ZumisApp = angular.module('ZumisWorldApp', ['ngMaterial', 'ngMessages', 'babel-polyfill'])
    .config(($mdThemingProvider) => {
        $mdThemingProvider.theme('default').dark();
    });
ZumisApp.value('userCreds', { name: '', password: ''});
