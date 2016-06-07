const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const routes = require('./routes');
const mongoose = require('mongoose');
const path = require('path');
const history = require('connect-history-api-fallback');

const mongoURI = process.env.mongoURI || 'mongodb://flick:justin@ds027155.mlab.com:27155/flickr';
mongoose.connect(mongoURI)

const app = express();
app.set('port', (process.env.PORT || 8787));

app.use(morgan('combined'));
app.use(history());
app.use(cors());
app.use(bodyParser.json());


const server = app.listen(app.get('port'), () => {
  console.log('Server started..: http://localhost:' + app.get('port') + '/');
});

app.use('/', express.static(__dirname + '/../dist'));
app.use('/api', routes);

module.exports = app;