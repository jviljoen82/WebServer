class SlappyCtrl {
    constructor($scope, $mdDialog){
        this.scope = $scope;
        this.mdDialog = $mdDialog;
    }

    showSlappyGame() {
        this.mdDialog.show ({
            clickOutsideToClose: false,
            scope: this.scope,
            preserveScope: true,
            template: `<md-dialog aria-label="Slappy dialog">
                            <md-dialog-content>
                               <iframe class="slappyGameDialog" sandbox="allow-scripts allow-modals allow-same-origin" src="../../../../slappy.html"></iframe>
                            </md-dialog-content>
                            <md-dialog-actions>
                                <md-button ng-click="$slappyCtrl.closeDialog()" class="md-button">Close</md-button>
                            </md-dialog-actions>
                        </md-dialog>`
        });
    }

    closeDialog() {
        this.mdDialog.hide();
    }
}

ZumisApp.controller('slappyCtrl', SlappyCtrl);
