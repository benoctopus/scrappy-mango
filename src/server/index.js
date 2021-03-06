const express = require('express');
const parser = require('body-parser');
const path = require('path');
const logger = require('morgan');
const apiRoutes = require('./controllers/apiRoutes');
const Orm = require('./db/Orm');

const PORT = process.env.PORT || 8080;
const app = express();
const db = new Orm();

app.use(parser.urlencoded({ extended: true }));
app.use(parser.json());
app.use(parser.text());
app.use(logger('dev'));

app.use(express.static(path.join(__dirname, '../../dist')));
app.use('/api', apiRoutes(db));

app.listen(PORT, () => {
  console.log(`listening on PORT ${PORT}`);
  console.log(`localhost:${PORT}`);
});
