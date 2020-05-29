class AppCtrl {
    constructor($scope, $mdDialog) {
        this.scope = $scope;
        this.mdDialog = $mdDialog;
    }

    $onInit() {

    }

    closeDialog() {
        this.mdDialog.hide();
    }
}

ZumisApp.controller('AppCtrl', AppCtrl);
