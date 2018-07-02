const axios = require('axios');
const cherio = require('cherio');

module.exports = class Scraper {
  constructor() {
    this.oldReddit = 'https://old.reddit.com/r/';
    this.newReddit = 'https://reddit.com';
  }
  async scrape(subReddit = 'popular', start = null, dir = 'after') {
    const dom = await this.getDOM(subReddit);
    const articles = await this.parseDOM(cherio.load(dom), subReddit);
    return articles;
  }

  getDOM(subReddit) {
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
      const articles = [];
      $('.thing').each((i, element) => {
        const result = {};
        const pid = $(element).attr('id');

        result.subReddit = subReddit;
        result.pid = pid.replace(/thing_/g, '');
        result.timestamp = $(element).attr('data-timestamp');
        result.title = $(`#${pid} .title > a`).text();
        result.link = $(`#${pid} .title > a`).attr('href');
        if (result.link.includes('/r/')) {
          result.link = this.newReddit + result.link;
        }
        articles.push(result);
      });
      resolve(articles);
    });
  }
};

