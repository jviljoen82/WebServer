const ZumisApp = angular.module('ZumisWorldApp', []);

ZumisApp.controller('AppCtrl', ($scope) => {

});

ZumisApp.directive('main_body', () => {
    return {
        template: "<img src='../images/Kazumi.jpeg' alt='' />"
    };
});
