class AppCtrl {
    constructor($scope, $mdDialog, userCreds) {
        this.scope = $scope;
        this.mdDialog = $mdDialog;
        this.user = userCreds;
    }

    $onInit() {
        this.mdDialog.show ({
            clickOutsideToClose: false,
            scope: this.scope,
            preserveScope: true,
            template: `<md-dialog aria-label="Login">
                            <h2 class="md-title ng-binding">Let's Login</h2>
                            <md-dialog-content>
                                <md-input-container>
                                      <label>NAME</label>
                                      <input type="text" ng-model="inputName" required="" md-maxlength="10">
                                </md-input-container>
                            </md-dialog-content>
                            <md-dialog-actions>
                                <md-button ng-click="$appCtrl.closeDialog()" class="md-button">OK</md-button>
                            </md-dialog-actions>
                        </md-dialog>`
        });
    }

    closeDialog() {
        this.mdDialog.hide();
        this.user.name = this.scope.inputName;
    }
}

ZumisApp.controller('AppCtrl', AppCtrl);
