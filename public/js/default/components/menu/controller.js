class MenuCtrl {
    constructor($scope){
        this.scope = $scope;
    }

    LaunchDrench() {
       document.getElementById('drenchDialogContainer').dispatchEvent(new Event('click'));
    }

    DownloadDialog() {
        document.getElementById('downloadDialogContainer').dispatchEvent(new Event('click'));
    }

    SlappyLaunch() {
        document.getElementById('slappyDialogContainer').dispatchEvent(new Event('click'));
    }

    showChat() {
        document.getElementById('chatPanel').dispatchEvent(new Event('click'));
    }
}

ZumisApp.controller('menuCtrl', MenuCtrl);
