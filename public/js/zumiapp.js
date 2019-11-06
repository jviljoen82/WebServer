const ZumisApp = angular.module('ZumisWorldApp', []);

ZumisApp.controller('AppCtrl', ($scope) => {

});

ZumisApp.directive('mainBody', () => {
    return {
        template: `<div>
                        <img src='../images/Kazumi.jpeg' alt='' />
                   </div>`
    };
});
