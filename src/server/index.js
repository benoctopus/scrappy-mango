const express = require('express');
const parser = require('body-parser');
const path = require('path');
const logger = require('morgan');
const dataRoutes = require('./controllers/dataController');
const db = require('./models');
const Scraper = require('./scripts/Scraper');

const port = process.env.PORT || 8080;
const app = express();
const scraper = new Scraper(db);

app.use(parser.urlencoded({ extended: true }));
app.use(parser.json());
app.use(parser.text());
app.use(logger('dev'));

app.use(express.static(path.join(__dirname, '../../dist')));
app.use('/api', dataRoutes(db));

function listen() {
  app.listen(port, () => {
    console.log(`listening on port ${port}`);
    console.log(`https://localhost:${port}`);
  });
}

scraper.scrape()
  .then(() => listen());

