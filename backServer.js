const express = require('express');
const backendApp = express();
const backendRoute = require('http').Server(backendApp);
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const http = require('http').Server(backendApp);
const io = require('socket.io')(http);
const path = require('path');
require('https').globalAgent.options.ca = require('ssl-root-cas/latest').create();
const cors = require('cors');

/**************************************************
 * Backend server Running on port 8070 for app functions...
 * also to be used on windows based IIS server
 */
let corsOptions = {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    optionsSuccessStatus: 200
};

backendApp.use(express.static('public'));
backendApp.use(bodyParser.json());
backendApp.use(bodyParser.urlencoded({
    extended: false
}));
backendApp.use(cors());

const Message = mongoose.model('Message', {
    id: Number,
    name: String,
    message: String
});

const dbUrl = 'mongodb://localhost/dirtychat'; // setup mongo db

mongoose.connect(dbUrl, { useNewUrlParser: false }, (err) => {
    io.emit('mongodbconnected');
    console.log('MongoDB Error: ', err);
});

io.on('connection', () => {
    io.emit('userconnected');
});

backendApp.post('/msg', cors(corsOptions), (req, res) => {
    try {
        const message = new Message(req.body);
        console.log('Msg: ' + message);
        const savedMessage = message.save((err) => {
            res.sendStatus(200);
            console.log(err);
        });
        console.log(savedMessage);
    } catch (error) {
        res.sendStatus(500);
        return console.log('post error:' + error);
    } finally {
        console.log('Message Posted');
        io.emit('message');
    }
});

backendApp.get('/messages/:user', cors(corsOptions), (req, res) => {
    const user = req.params.user;
    Message.find({ name: user }, (err, messages) => {
        res.send(messages);
        console.log(err);
    });
});

backendApp.get('/call', cors(corsOptions), (req, res) => {
    const msgID = req.query.id;
    Message.find({ id: msgID }, (err, messages) => {
        res.send(messages);
        console.log(err);
    });
});

backendApp.get('/ping', cors(corsOptions), (req, res) => {
    res.sendStatus(200);
});

backendApp.get('/', cors(corsOptions), (req, res) => {
    const pathToIndex = path.join(__dirname, '/public/', 'index.html');
    res.sendFile(pathToIndex);
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
