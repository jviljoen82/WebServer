class MenuCtrl {
    constructor($scope){
        this.scope = $scope;
    }

    LaunchDrench() {
        console.log('Drench game launch');
        document.getElementById('drenchDialogContainer').dispatchEvent(new Event('click'));
    }

    SlappyLaunch() {
        console.log('Slappy Ninja launch');
    }
}

ZumisApp.controller('menuCtrl', MenuCtrl);
