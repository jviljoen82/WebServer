const express = require('express');
const web = express();
const backendApp = express();
const backendRoute = require('http').Server(backendApp);
const bodyParser = require('body-parser');
const http = require('http').Server(web);
const path = require('path');
const executor = require('child_process').exec;
require('https').globalAgent.options.ca = require('ssl-root-cas/latest').create();

/**************************************************
 * Backend server Running on port 8070 for app functions...
 * also to be used on windows based IIS server
 */

backendApp.use(express.static('public'));
backendApp.use(bodyParser.json());
backendApp.use(bodyParser.urlencoded({
    extended: false
}));

backendApp.get('/', (req, res) => {
    const pathToIndex = path.join(__dirname, '/public/', 'index.html');
    res.sendFile(pathToIndex);
});

backendApp.post('/webUpdate', (req, res) => {
    try {
        sleep(5000);

        const gitPull = executor('git pull');
        gitPull.stderr.on('data', (data) => {
            console.error(`stderr: ${data}`);
        });

        const gulper = executor('npm run gulp');


    } catch (ex) {
        console.log(ex.toString());
    }
});

const backendServer = backendRoute.listen(8070, () => {
    const host = backendServer.address().address;
    const port = backendServer.address().port;
    console.log('backend listening on host: ' + host + ' port no: ' + port);
});


/*********************************************
 *  Other internal functions
 */
function sleep(ms){
    return new Promise(resolve=>{
        setTimeout(resolve,ms)
    })
}
