class AppCtrl {
    constructor($scope, $window) {
        this.scope = $scope;
        this.window = $window;

    }

    $onInit() {
        this.window.prompt('Username: ', userCreds.name);
    }
}

ZumisApp.controller('AppCtrl', AppCtrl);
