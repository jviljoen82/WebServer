class ChatPanel {
    constructor($scope, $mdDialog) {
        this.scope = $scope;
        this.mdDialog = $mdDialog;
    }

    showChatPanel() {
        console.log("Chat Panel Open");
        this.mdDialog.show ({
            clickOutsideToClose: false,
            scope: this.scope,
            preserveScope: true,
            template: `<md-dialog aria-label="Download dialog">
                            <md-dialog-content>
                                <iframe class="sidePanel" sandbox="allow-scripts" src="../../../../chat.html"></iframe>
                            </md-dialog-content>
                            <md-dialog-actions>
                                <md-button ng-click="$chatCtrl.closeDialog()" class="md-button">Close</md-button>
                            </md-dialog-actions>
                        </md-dialog>`
        });
    }

    closeDialog() {
        this.mdDialog.hide();
    }
}

ZumisApp.controller('chatPanel', ChatPanel);
