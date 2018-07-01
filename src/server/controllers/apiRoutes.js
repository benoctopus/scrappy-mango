const router = require('express').Router();

function routes(db) {
  // article and note initial get
  router.get('/', (req, res) => {
    console.log('hit /');
    db.getArticles()
      .then(data => res.json(data));
  });
  // new note route
  // router.post('/note/:aid', (req, res) => {
  //   db.Note.create(req.body)
  //     .then((note) => {
  //       db.Article.findOneAndUpdate(
  //         { _id: req.params.aid },
  //         { note: note._id },
  //         { new: true }
  //       )
  //         .then(() => {
  //           res.json(note);
  //         });
  //     });
  // });
  return router;
}

module.exports = routes;
