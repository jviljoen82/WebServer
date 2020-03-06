class AppCtrl {
    constructor($scope, $mdDialog) {
        this.scope = $scope;
        this.mdDialog = $mdDialog;
    }

    $onInit() {
        this.mdDialog.show ({
            clickOutsideToClose: false,
            scope: this.scope,
            preserveScope: true,
            template: `<md-dialog aria-label="Login">
                            <md-dialog-content>
                                <md-input-container>
                                      <label>NAME</label>
                                      <input type="text" ng-model="{{::userCreds.name}}" required="" md-maxlength="10">
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
    }
}

ZumisApp.controller('AppCtrl', AppCtrl);
