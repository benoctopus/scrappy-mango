const axios = require('axios');
const cherio = require('cherio');

module.exports = class Scraper {
  constructor() {
    this.oldReddit = 'https://old.reddit.com/r/';
    this.newReddit = 'https://reddit.com';
  }
  async scrape(subReddit = 'popular') {
    try {
      const dom = await this.getDom(subReddit);
      await this.parseDOM(cherio.load(dom), subReddit);
    } catch (err) {
      throw new Error(`${err}\nScrape failed, Exiting with code 1`);
    }
  }
  getDom(subReddit) {
    const url = this.oldReddit + subReddit;
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
  parseDOM($, subReddit) {
    return new Promise((resolve) => {
      $('.thing').each((i, element) => {
        const result = {};
        const pid = $(element).attr('id');
        result.pid = pid.replace(/thing_/g, '');
        result.timestamp = $(element).attr('data-timestamp');
        result.title = $(`#${pid} .title > a`)
          .text();
        result.link = $(`#${pid} .title > a`)
          .attr('href');
        if (result.link.includes('/r/')) {
          result.link = this.newReddit + result.link;
        }
        result.subReddit = subReddit;
        this.Article.create(result)
          .then((dbArticle) => {
            console.log(dbArticle);
          })
          .catch((err) => {
            // if (err) throw new Error(err);
            console.log(`dubplicate key: ${result.pid}`);
          });
      });
      resolve();
    });
  }
};

