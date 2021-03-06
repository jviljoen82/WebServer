const express = require('express');
const web = express();
const bodyParser = require('body-parser');
const http = require('http').Server(web);
const path = require('path');
const executor = require('child_process').exec;
require('https').globalAgent.options.ca = require('ssl-root-cas').create();

/***************************************************
 * Web server on port 80 for linux host......
 */
web.use(express.static('public'));
web.use(express.static('data'));
web.use(express.static('wordpress'));
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
;
      if (req) {
          if (doUpdate()) res.status(200).send();
      } else {
          res.status(400).send('No payload, server not updated!');
      }


  } catch (ex) {
    console.log(ex.toString());
    res.status(500).send('Server not updated!');
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

async function doUpdate() {
    await sleep(5000);
    console.log('Pulling updated Data');
    const gitPull = executor('git pull');
    await sleep(5000);
    console.log('Rebuilding Front-end');
    const gulper = executor('npm run gulp');
    await sleep(5000);
    console.log('Rebuild Done!');
}
