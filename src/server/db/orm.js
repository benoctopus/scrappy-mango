// database orm constructor
// extends Scrapper and contains mongo models
const models = require('../models');
const Scraper = require('../scripts/Scraper');

class Orm extends Scraper {
  constructor() {
    super();
    Object.keys(models).forEach((model) => {
      this[model] = models[model];
    });
    this.scrape();
  }
  getArticles(subReddit = 'popular', offset = 0) {
    const offsetStr = offset ? `${offset} off` : '';
    return new Promise(resolve => (
      this.Article.find(
        { subReddit },
        [
          'title',
          'link',
          'created'
        ],
        {
          limit: 25,
          skip: 0,
          sort: { created: -1 },
        }
      )
        .populate('notes')
        .then(articles => resolve(articles))
        .catch((err) => {
          // this.scraper.scrape(subReddit + !!offset ?  )
        })
    ));
  }
}

const orm = new Orm();
orm.getArticles();

