const ZumisApp = angular.module('ZumisWorldApp', []);

ZumisApp.controller('AppCtrl', ($scope) => {

});

ZumisApp.directive('mainBody', () => {
    return {
        template: "<img src='../images/Kazumi.jpeg' alt='' />"
    };
});
