const express = require('express');
const web = express();
const bodyParser = require('body-parser');
const http = require('http').Server(web);
const path = require('path');
const executor = require('child_process').exec;
require('https').globalAgent.options.ca = require('ssl-root-cas/latest').create();


/***************************************************
 * Web server on port 80 for linux host......
 */
web.use(express.static('public'));
web.use(bodyParser.json());
web.use(bodyParser.urlencoded({
  extended: false
}));

web.get('/', (req, res) => {
  const pathToIndex = path.join(__dirname, '/public/', 'index.html');
  res.sendFile(pathToIndex);
});

web.post('/webUpdate', (req, res) => {
  try {
      sleep(5000);
      if (req) {
          const gitPull = executor('git pull');
          gitPull.stderr.on('data', (data) => {
              console.error(`stderr: ${data}`);
          });
          const gulper = executor('npm run gulp');
      }

      res.status(200).send();

  } catch (ex) {
    console.log(ex.toString());
    res.status(500).send("Server not updated!");
  }
});

const WebServer = http.listen(80, () => {
  const host = WebServer.address().address;
  const port = WebServer.address().port;
  console.log(' web listening on host: ' + host + ' port no: ' + port);
});

/*********************************************
 *  Other internal functions
 */
function sleep(ms){
  return new Promise(resolve=>{
    setTimeout(resolve,ms)
  })
}
