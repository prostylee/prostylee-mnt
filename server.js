const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
app.use(express.static(path.join(__dirname, 'dist')));

app.get('/ping', function (req, res) {
  return res.send('pong');
});

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

const targetPort = process.env.PIC_FRONTEND_PORT || 8060;
console.log('Service will be started at port ' + targetPort)

app.listen(targetPort);
