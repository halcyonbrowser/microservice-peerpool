var express = require('express');
var bodyParser = require('body-parser');

var app = express();

const port = 3000;

var aidws;

var WebSocketServer = require('ws').Server
  , wss = new WebSocketServer({ port: 4000 });
 
wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    //console.log('received: %s', message);
    //console.log(typeof message)
    aid = JSON.parse(message)
  });
  aidws = ws;
});


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

var aid;
var usr;

app.post('/aid', (req, res) => {
  aid = req.body.aid;
  res.send('ok')
})

app.post('/usr', (req, res) => {
  usr = req.body.usr;
  aidws.send(JSON.stringify(usr))
  res.send('ok')
})

app.post('/getUsr', (req, res) => {
  res.json(usr)
})

app.post('/getAid', (req, res) => {
  res.json(aid)
})

app.listen(port)

