// database orm constructor
// extends Scrapper and contains mongo models
const models = require('../models');
const Scraper = require('../aux/Scraper');

module.exports = class Orm extends Scraper {
  constructor() {
    super();
    Object.keys(models).forEach((model) => {
      this[model] = models[model];
    });
    this.scrapeToDb();
  }

  getArticles(subReddit = 'popular', offset = 0) {
    const offsetStr = offset ? `${offset} off` : '';
    return new Promise(resolve => (
      this.Article.find(
        { subReddit },
        [
          'pid',
          'title',
          'link',
          'subReddit',
          'created'
        ],
        {
          limit: 25,
          skip: 0,
          sort: { created: 1 },
        }
      )
        .populate('notes')
        .then(articles => resolve(articles))
        .catch((err) => {
          // this.scraper.scrape(subReddit + !!offset ?  )
        })
    ));
  }

  storeArticles(list = []) {
    if (Array.isArray(list)) {
      list.forEach(article => 
        this/
      )
      this.Article.insertMany(list)
        .then(data => console.log(`inserted ${list.length} documents`, data));
      // .catch(err => console.log(err));
    } else {
      throw new Error('method store articles only accepts argument of type Array');
    }
  }

  scrapeToDb(subreddit = 'popular', start = null, dir = 'after') {
    this.scrape(subreddit, start, dir)
      .then(articles => (
        this.storeArticles(articles)
      ));
  }
  // TODO: scrape to db method
  // TODO: scrape more method(s)
};

