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
    this.getSubReddits();
    this.scrapeToDb();
  }

  getArticles(subReddit = 'popular', offset = 0) {
    return new Promise((resolve) => {
      const get = () => this.countArticles(subReddit)
        .then((count) => {
          console.log(count);
          if (count >= (offset + 1) * 25) {
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
                skip: offset * 25,
                sort: { created: -1 },
              }
            )
              .populate('notes')
              .then((articles) => {
                resolve(articles);
                console.log(JSON.stringify(articles, null, 2));
              });
          } else {
            console.log('not found, scraping');
            this.scrapeToDb(subReddit)
              .then(() => get());
          }
        });
      get();
    });
  }

  store(list = [], model = this.Article) {
    return new Promise((resolve) => {
      if (Array.isArray(list)) {
        list.forEach((article, index) => {
          const i = index;
          model.create(article)
            .then(() => {
              if (i === list.length - 1) {
                console.log('storing scraped items complete');
                resolve();
              }
            })
            .catch((err) => {
              // console.log(`article ${article.pid} ${article.subReddit} already stored`);
              // throw (err);
              if (i === list.length - 1) {
                console.log('storing scraped items complete');
                resolve();
              }
            });
        });
      } else {
        throw new Error('method store only accepts argument of type Array');
      }
    });
  }

  countArticles(subReddit) {
    return this.Article.count({ subReddit });
  }

  findTrailingArticle(subReddit = 'popular', backwards = false) {
    return new Promise(resolve =>
      this.Article.findOne({ subReddit })
        .sort({ created: -1 })
        .then(article => resolve(article.pid))
        .catch(() => resolve(null)));
  }

  async scrapeToDb(subReddit = 'popular', backwards = false) {
    const start = await this.findTrailingArticle(subReddit, backwards);
    console.log('start', start);
    console.log(subReddit);
    let dir = null;
    if (start) {
      dir = backwards ? 'before' : 'after';
    }
    await this.scrape(subReddit, start, dir)
      .then(articles => (
        this.store(articles)
      ));
  }

  getSubReddits() {
    let subReddits = [];
    let { scrapeSubReddits } = this;
    scrapeSubReddits = scrapeSubReddits.bind(this);

    async function asyncHelper(reso, count = 10, lastSub = null) {
      console.log(count);
      if (count < 1) {
        console.log('subreddit scrape complete');
        reso(subReddits);
        return;
      }

      const subs = await scrapeSubReddits(lastSub);
      subReddits = [...subReddits, ...subs];
      const newCount = count - 1;
      const newLastSub = subs[subs.length - 1].rid;
      asyncHelper(reso, newCount, newLastSub);
    }

    new Promise(resolve => (
      asyncHelper(resolve)
    )).then(finalSubs => this.store(finalSubs, this.SubReddit));
  }
};

