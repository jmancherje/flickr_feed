const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const routes = require('./routes');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:auth/auth')

const app = express();
app.set('port', (process.env.PORT || 8787));

app.use(bodyParser.json());
app.use(cors());
app.use(morgan('combined'));

app.use('/api', routes);

const server = app.listen(app.get('port'), () => {
  console.log('Server started: http://localhost:' + app.get('port') + '/');
});

module.exports = app;