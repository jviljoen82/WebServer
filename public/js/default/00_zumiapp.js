import regeneratorRuntime from '../../../node_modules/regenerator-runtime';

const ZumisApp = angular.module('ZumisWorldApp', ['ngMaterial', 'ngMessages', 'regeneratorRuntime'])
    .config(($mdThemingProvider) => {
        $mdThemingProvider.theme('default').dark();
    });
ZumisApp.value('userCreds', { name: '', password: ''});
