class MenuCtrl {
    constructor($scope){
        this.scope = $scope;
    }

    LaunchDrench() {
        console.log('Drench game launch');
        let passwordCheck = prompt('Enter the password: ','');
        if (passwordCheck === 'testIcle')
            document.getElementById('drenchDialogContainer').dispatchEvent(new Event('click'));
        else console.log('WRONG');
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
