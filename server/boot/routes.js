const bodyParser = require('body-parser');

module.exports = app => {
  app.use(
    bodyParser.json({
      limit: '2048kb'
    })
  );

  // install a "/ping" route that returns "pong"
  app.get('/ping', (req, res) => {
    res.send('pong');
  });

  app.get('/views/my-user/list', (req, res) => {
    res.render('my-user/list', {
      publicKey: process.env.PLAID_PUBLIC_KEY
    });
  });
};
