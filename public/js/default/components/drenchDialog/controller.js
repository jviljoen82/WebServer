class DrenchCtrl {
    constructor($scope, $mdDialog){
        this.scope = $scope;
        this.mdDialog = $mdDialog;
    }

    showDrenchGame() {
        console.log("Hello Dranch Game");
        this.mdDialog.show ({
            clickOutsideToClose: false,
            scope: this.scope,
            preserveScope: true,
            template: `<md-dialog aria-label="Drench dialog">
                            <md-dialog-content>
                               <iframe class="drenchGameDialog" src="../../../../drench.html"></iframe>
                            </md-dialog-content>
                            <md-dialog-actions>
                                <md-button ng-click="$drenchCtrl.closeDialog()" class="md-button">Close</md-button>
                            </md-dialog-actions>
                        </md-dialog>`
        });
    }

    closeDialog() {
        this.mdDialog.hide();
    }
}

ZumisApp.controller('drenchCtrl', DrenchCtrl);