import regeneratorRuntime from 'babel-polyfill';

const ZumisApp = angular.module('ZumisWorldApp', ['ngMaterial', 'ngMessages', 'regeneratorRuntime'])
    .config(($mdThemingProvider) => {
        $mdThemingProvider.theme('default').dark();
    });
ZumisApp.value('userCreds', { name: '', password: ''});
