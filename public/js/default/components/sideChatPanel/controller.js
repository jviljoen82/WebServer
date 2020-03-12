class ChatPanel {
    constructor($scope, $mdDialog, userCreds) {
        this.scope = $scope;
        this.mdDialog = $mdDialog;
        this.user = userCreds;
        this.msgDiv = document.getElementById('messages');
        this.socket = io.connect('http://zumisworld.ga:8080');
        this.chatServerUrl = 'http://zumisworld.ga:8070';
        this.waitValue = 500;

    }

    $onInit() {
        this.socket.on('message', this.scope.bind(this.updateMsgs()));
    }

    showChatPanel() {
        this.mdDialog.show ({
            clickOutsideToClose: false,
            scope: this.scope,
            preserveScope: true,
            template: `<md-dialog aria-label="Download dialog">
                            <md-dialog-content>
                                <div class="container">
                                  <br>
                                  <div id="messages" class="chatwindow row">
                                  </div>
                                  <div class="jumbotron row">
                                    <h4>Send Message</h4>
                                    <br>
                                    <input id = "name" class="form-control" placeholder="Name" readonly >
                                    <br>
                                    <textarea id = "message" class="form-control" placeholder="Your Message Here"></textarea>
                                    <br>
                                    <button class="btn btn-success" ng-click="$chatCtrl.sendAndClear()">Send</button>
                                  </div>
                                </div>
                            </md-dialog-content>
                            <md-dialog-actions>
                                <md-button ng-click="$chatCtrl.closeDialog()" class="md-button">Close</md-button>
                            </md-dialog-actions>
                        </md-dialog>`
        });
        this.getMessages().then();
        this.constructor.setName(this.user.name);
    }

    closeDialog() {
        this.mdDialog.hide();
    }

    static setName(username) {
        console.log("Setting username: " + username);
        document.getElementById('name').value = username;
    }

    autoScroll() {
        this.msgDiv.scrollTop = this.msgDiv.scrollHeight;
    }

    sendAndClear() {
        this.sendMessage({
            id: 999,
            name: document.getElementById('name').value,
            message: document.getElementById('message').value
        });
        document.getElementById('message').value = '';
    }

    updateMsgs() {
        this.latestMsg().then();
    }

    static addMessages(message) {
        document.getElementById('messages').innerHTML += `
        <div class="col-md-12">    
          <h4> ${message.name} </h4>
          <p>  ${message.message} </p>
        </div>
      `;
    }

    getMessages() {
        let waiter = async() => {await sleep(this.waitValue)};
        document.getElementById('messages').innerHTML = '';
        $.ajax({
            type: 'GET',
            url: this.chatServerUrl+'/call',
            headers: {
                'Access-Control-Allow-Origin': '*'
            },
            data: { id: 999 },
            success: (data) => {
                data.forEach(addMessages);
                this.autoScroll();
            },
            error: (error) => {
                console.log('server error: ', error);
                console.log('using local db');
                $.ajax({
                    type: 'GET',
                    url: 'http://localhost:8070/call',
                    headers: {
                        'Access-Control-Allow-Origin': '*'
                    },
                    data: {id: 999},
                    success: (data) => {
                        data.forEach(addMessages);
                        this.autoScroll();
                    }
                })
            }
        });
    }

    latestMsg() {
        let waiter = async() => {await this.sleep(this.waitValue)};
        $.ajax({
            type: 'GET',
            url: this.chatServerUrl+'/call',
            headers: {
                'Access-Control-Allow-Origin': '*'
            },
            data: { id: 999 },
            success: (data) => {
                const lastMsg = data[data.length - 1];
                this.constructor.addMessages(lastMsg);
                this.autoScroll();
            },
            error: (error) => {
                console.log('server error: ', error);
                console.log('using local db');
                $.ajax({
                    type: 'GET',
                    url: 'http://localhost:8070/call',
                    headers: {
                        'Access-Control-Allow-Origin': '*'
                    },
                    data: { id: 999 },
                    success: (data) => {
                        const lastMsg = data[data.length - 1];
                        this.constructor.addMessages(lastMsg);
                        this.autoScroll();
                    }
                })
            }
        });
    }

    sendMessage(message) {
        $.ajax({
            type: 'POST',
            url: this.chatServerUrl+'/msg',
            headers: {
                'Access-Control-Allow-Origin': '*'
            },
            data: message,
            success: () => {},
            error: (error) => {
                console.log('server error: ', error);
                console.log('using local db');
                $.ajax({
                    type: 'POST',
                    url: 'http://localhost:8070/msg',
                    headers: {
                        'Access-Control-Allow-Origin': '*'
                    },
                    data: message,
                    success: () => {}
                })
            }
        });
    }

    sleep(ms){
        return new Promise(resolve => {
            setTimeout(resolve,ms)
        })
    }
}

ZumisApp.controller('chatPanel', ChatPanel);
