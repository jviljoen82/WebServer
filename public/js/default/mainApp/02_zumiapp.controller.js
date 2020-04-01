class AppCtrl {
    constructor($scope, $mdDialog, userCreds) {
        this.scope = $scope;
        this.mdDialog = $mdDialog;
        this.user = userCreds;
    }

    $onInit() {

    }

    closeDialog() {
        this.mdDialog.hide();
        this.user.name = this.scope.inputName;
    }
}

ZumisApp.controller('AppCtrl', AppCtrl);
