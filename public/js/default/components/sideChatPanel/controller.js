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
                                <iframe id="chatFrame" class="sidePanel" sandbox="allow-same-origin allow-scripts" src="../../../../chat.html"></iframe>
                            </md-dialog-content>
                            <md-dialog-actions>
                                <md-button ng-click="$chatCtrl.closeDialog()" class="md-button">Close</md-button>
                                <md-button id="updateData" ng-click="$chatCtrl.setupData()"></md-button>
                            </md-dialog-actions>
                        </md-dialog>
                        <script>
                            $("document").ready(() => {
                                $("updateData").trigger("click");
                            })
                        </script>`
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
