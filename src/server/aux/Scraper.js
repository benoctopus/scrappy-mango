const axios = require('axios');
const cherio = require('cherio');

module.exports = class Scraper {
  constructor() {
    this.oldReddit = 'https://old.reddit.com/r';
    this.newReddit = 'https://reddit.com';
    this.subRedditUrl = 'https://old.reddit.com/subreddits/?limit=100';
  }

  async scrape(subReddit = 'popular', start = null, dir = 'after') {
    let url = `${this.oldReddit}/${subReddit}/?limit=100`;
    if (start) {
      url = `${url}&${dir}=${start}`;
      console.log(url);
    }
    const dom = await this.getDOM(url);
    const articles = await this.parseDOM(cherio.load(dom), subReddit);
    return articles;
  }

  getDOM(url) {
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

  parseDOM($, subReddit, getSubs = false) {
    return new Promise((resolve) => {
      const results = [];
      $('.thing').each((i, element) => {
        const result = {};
        if (getSubs) {
          const rid = $(element).attr('id');
          result.name = $(`#${rid} .title`).text().split(':')[0].replace(/r\//g, '');
          result.rid = rid.replace(/thing_/g, '');
        } else {
          const pid = $(element).attr('id');
          result.subReddit = subReddit;
          result.pid = pid.replace(/thing_/g, '');
          result.timestamp = $(element).attr('data-timestamp');
          result.title = $(`#${pid} .title > a`).text();
          result.link = $(`#${pid} .title > a`).attr('href');
          if (result.link.includes('/r/')) {
            result.link = this.newReddit + result.link;
          }
        }
        results.push(result);
      });
      resolve(results);
    });
  }

  async scrapeSubReddits() {
    let lastSub = '';
    let url = this.subRedditUrl
    console.log('scraping the subs');
    url += lastSub ? `&after${lastSub}` : '';
    console.log('sub url', url);
    const dom = await this.getDOM(url);
    const subReddits = await this.parseDOM(cherio.load(dom), null, true);
    lastSub = subReddits[subReddits.length - 1].rid;
    return subReddits;
  }
};

