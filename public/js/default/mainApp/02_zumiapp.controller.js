class AppCtrl {
    constructor($scope, $window) {
        this.scope = $scope;
        this.window = $window;
        this.scope = (getName) => {
            this.window.prompt('Username: ', getName);
            userCreds.name = getName;
        }
    }

    $onInit() {

    }
}

ZumisApp.controller('AppCtrl', AppCtrl);
