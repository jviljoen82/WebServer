class ChatPanel {
    constructor($scope, $mdDialog, userCreds) {
        this.scope = $scope;
        this.mdDialog = $mdDialog;
        this.user = userCreds;
    }

    showChatPanel() {
        this.mdDialog.show({
            clickOutsideToClose: false,
            scope: this.scope,
            preserveScope: true,
            template: `<md-dialog aria-label="Download dialog">
                            <md-dialog-content>
                                <iframe id="chatFrame" class="sidePanel" src="../../../../chat.html"></iframe>
                            </md-dialog-content>
                            <md-dialog-actions>
                                <md-button ng-click="$chatCtrl.closeDialog()" class="md-button">Close</md-button>
                                <md-button ng-click="$chatCtrl.setupData()">Login</md-button>
                            </md-dialog-actions>
                        </md-dialog>`
        });
    }

    setupData() {
        let iframeChat = document.getElementById('chatFrame');
        let iframeDoc = iframeChat.contentDocument;
        let userNameControl = iframeDoc.getElementById('name');
        userNameControl.value = this.user.name;
    }

    closeDialog() {
        this.mdDialog.hide();
    }
}

ZumisApp.controller('chatPanel', ChatPanel);
