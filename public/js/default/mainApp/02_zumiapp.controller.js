class AppCtrl {
    constructor($scope, $window) {
        this.scope = $scope;
        this.window = $window;

    }

    $onInit() {
        this.scope = () => {
            this.window.prompt('Username: ', userCreds.name);
        }
    }
}

ZumisApp.controller('AppCtrl', AppCtrl);
