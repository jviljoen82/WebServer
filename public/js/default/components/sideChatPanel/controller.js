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
            stack: true,
            template: `<md-dialog aria-label="Chat Dialog">
                            <md-dialog-content>
                                <iframe id="chatFrame" sandbox="allow-same-origin allow-scripts" class="sidePanel" src="../../../../chat.html"></iframe>
                            </md-dialog-content>
                            <md-dialog-actions>
                                <md-button ng-click="$chatCtrl.closeDialog()" class="md-button">Close</md-button>
                                <md-button aria-label="setupBtn" id="setupBtn" ng-click="$chatCtrl.setupData()">Login</md-button>
                            </md-dialog-actions>
                        </md-dialog>`
        });
    }

    setupData() {
        if (this.user.name != null && this.user.name !== '' && this.user.name !== 'undefined') {
            let iframeChat = document.getElementById('chatFrame');
            let iframeDoc = iframeChat.contentDocument;
            let userNameControl = iframeDoc.getElementById('name');
            userNameControl.value = this.user.name;
            iframeDoc.getElementById('send').disabled = false;
            document.getElementById('setupBtn').disabled = true;
        } else {
            /*
            this.mdDialog.show ({
                clickOutsideToClose: false,
                scope: this.scope,
                preserveScope: true,
                template: `<md-dialog aria-label="Login">
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
            */
        }
    }

    closeDialog() {
        this.mdDialog.hide();
    }
}

ZumisApp.controller('chatPanel', ChatPanel);
