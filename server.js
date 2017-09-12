'use strict';

require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./server/routes');
const models = require('./server/models');

let app = express();
let port = process.env.PORT;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

routes(app);

let migrateDB = () => {
  models.sequelize.sync().then(() => {
    console.log('Database tables migrated');
  });
}

app.listen(port, () => {
  migrateDB();
  console.log(`server listening at ${port}`);
});

