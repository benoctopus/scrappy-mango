const axios = require('axios');
const cherio = require('cherio');

module.exports = class Scraper {
  constructor(db, url = 'http://www.echojs.com') {
    this.url = url;
    this.db = db;
  }
  async scrape(url = this.url) {
    try {
      const dom = await this.getDom(url);
      await this.parseDOM(cherio.load(dom));
    } catch (err) {
      throw new Error(`${err}\nScrape failed, Exiting with code 1`);
    }
  }
  getDom(url) {
    return new Promise((resolve) => {
      axios.get(url)
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          throw new Error(err);
        });
    });
  }
  parseDOM($) {
    return new Promise((resolve) => {
      $('article h2').each((i, element) => {
        const result = {};
        result.title = $(element)
          .children('a')
          .text();
        result.link = $(element)
          .children('a')
          .attr('href');
        this.db.Article.create(result)
          .then((dbArticle) => {
            console.log(dbArticle);
          })
          .catch((err) => {
            if (err) throw new Error(err);
          });
      });
      resolve('Scrape Successful');
    });
  }
};

