class MenuCtrl {
    constructor($scope){
        this.scope = $scope;
    }

    LaunchDrench() {
       document.getElementById('drenchDialogContainer').dispatchEvent(new Event('click'));
    }

    DownloadDialog() {
        console.log('Open download dialog');
        document.getElementById('downloadDialogContainer').dispatchEvent(new Event('click'));
    }

    SlappyLaunch() {
        console.log('Slappy Ninja launch');
    }

    showChat() {
        console.log('Chat Panel');
        document.getElementById('chatPanel').dispatchEvent(new Event('click'));
    }
}

ZumisApp.controller('menuCtrl', MenuCtrl);
