const router = require('express').Router();

function routes(db) {
  router.get('/articles', (req, res) => {
    db.getArticles(req.query.sub, req.query.offset)
      .then(data => res.json(data));
  });

  router.get('/subreddits', (req, res) => {
    db.getSubReddits(req.params.offset)
      .then(subReddits => res.json(subReddits));
  });

  // Todo: add new note route
  return router;
}

module.exports = routes;
