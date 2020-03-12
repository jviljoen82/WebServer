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
        let iframeChat = document.getElementById('chatFrame');
        let iframeDoc = iframeChat.contentDocument;
        let userNameControl = iframeDoc.getElementById('name');
        userNameControl.value = this.user.name;
        if (this.user.name != null && this.user.name !== '' && this.user.name !== 'undefined') {
            iframeDoc.getElementById('send').disabled = false;
            document.getElementById('setupBtn').disabled = true;
        }
    }

    closeDialog() {
        this.mdDialog.hide();
    }
}

ZumisApp.controller('chatPanel', ChatPanel);
