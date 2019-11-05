const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const http = require('http').Server(app);
const path = require('path');
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

const server = http.listen(80, () => {
  const host = server.address().address;
  const port = server.address().port;
  console.log('listening on host: ' + host + ' port no: ' + port);
});
