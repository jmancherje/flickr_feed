const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const routes = require('./routes');
const mongoose = require('mongoose');

// mongoose.connect('mongodb://localhost:auth/auth')
mongoose.connect('mongodb://flick:justin@ds027155.mlab.com:27155/flickr')

const app = express();
app.set('port', (process.env.PORT || 8787));

// app.use(morgan('combined'));
app.use(cors());
app.use(bodyParser.json());

app.use('/api', routes);

const server = app.listen(app.get('port'), () => {
  console.log('Server started..: http://localhost:' + app.get('port') + '/');
});

module.exports = app;