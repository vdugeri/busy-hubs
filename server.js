
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const cors = require('cors');
const routes = require('./server/routes');

let app = express();
let port = process.env.PORT;

app.use(bodyParser.urlencoded({ extended: true }));
routes(app);

app.listen(port, () => {
  console.log(`server listening at ${port}`);
});