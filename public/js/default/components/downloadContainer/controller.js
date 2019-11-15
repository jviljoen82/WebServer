class DownloadCtrl {
    constructor($scope, $mdDialog) {
        this.scope =$scope;
        this.mdDialog = $mdDialog;
    }

    showDownloadDialog() {
        console.log("download Container Open");
        this.mdDialog.show ({
            clickOutsideToClose: false,
            scope: this.scope,
            preserveScope: true,
            template: `<md-dialog aria-label="Download dialog">
                            <md-dialog-content>
                               <H3>Download World of Warcraft - Wrath of the Lich King - v3.3.5a</H3>
                                <div class="whiteBackground">
                                    <a href="../../../../../WoW335aMac.zip">World of Warcraft - Wrath of the Lich King v3.3.5a  (MAC)</a>
                                    <br>
                                    <a href="../../../../../WoW335aWin.zip">World of Warcraft - Wrath of the Lich King v3.3.5a  (Win)</a>
                                </div>
                            </md-dialog-content>
                            <md-dialog-actions>
                                <md-button ng-click="$dlCtrl.closeDialog()" class="md-button">Close</md-button>
                            </md-dialog-actions>
                        </md-dialog>`
        });
    }

    closeDialog() {
        this.mdDialog.hide();
    }
}

ZumisApp.controller('downloadCtrl', DownloadCtrl);
