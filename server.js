const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const http = require('http').Server(app);
const path = require('path');
const executor = require('child_process').exec
require('https').globalAgent.options.ca = require('ssl-root-cas/latest').create();

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

app.get('/', (req, res) => {
  const pathToIndex = path.join(__dirname, '/public/', 'index.html');
  res.sendFile(pathToIndex);
});

app.post('/webUpdate', (req, res) => {
  try {
    if (req) {
      const gitPull = executor('git pull');

      gitPull.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
      })

      gitPull.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
      });

      gitPull.on('close', (code) => {
        console.log(`child process exited with code ${code}`);
      });
    }
  } catch (ex) {
    console.log(ex.toString());
  }
});

const server = http.listen(80, () => {
  const host = server.address().address;
  const port = server.address().port;
  console.log('listening on host: ' + host + ' port no: ' + port);
});
