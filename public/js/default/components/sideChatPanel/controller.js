class ChatPanel {
    constructor($scope, $mdDialog) {
        this.scope = $scope;
        this.mdDialog = $mdDialog;
    }

    showChatPanel() {
        this.mdDialog.show({
            clickOutsideToClose: false,
            scope: this.scope,
            preserveScope: true,
            stack: true,
            template: `<md-dialog aria-label="Chat Dialog">
                            <h2 class="md-title ng-binding centerText">Let's chat</h2>
                            <br>
                            <md-dialog-content>
                                <iframe id="chatFrame" sandbox="allow-same-origin allow-scripts allow-popups" class="sidePanel" src="../../../../chat.html"></iframe>
                            </md-dialog-content>
                            <br>
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
