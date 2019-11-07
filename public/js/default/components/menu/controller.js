class MenuCtrl {
    constructor($scope){
        this.scope = $scope;
    }

    LaunchDrench() {
        console.log('Drench game launch');
    }

    SlappyLaunch() {
        console.log('Slappy Ninja launch');
    }
}

ZumisApp.controller('menuCtrl', MenuCtrl);
