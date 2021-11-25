const express = require('express');
const bodyParser = require('body-parser');
const formTypeRoutes = require('./routes/formType');
const formRoutes = require('./routes/form');

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }
  next();
});

app.use('/form-types', formTypeRoutes);
app.use('/forms', formRoutes);

app.listen(port, (error) => {
  if (error) throw error;
  console.log('Server is running on port ' + port);
});
