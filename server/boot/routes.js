const bodyParser = require('body-parser');

module.exports = app => {
  app.use(bodyParser.json({ limit: '2048kb' }));

  app.use(bodyParser.urlencoded({ extended: false }));

  // install a "/ping" route that returns "pong"
  app.get('/ping', (req, res) => {
    res.send('pong');
  });

  const handleError = (error, res) => {
    return res.render('error', {
      message: error.message,
      statusCode: error.statusCode,
      stack: error.stack
    });
  };

  app.get('/views/my-user/list', async (req, res, next) => {
    const { MyUser } = app.models;

    let users;
    try {
      users = await MyUser.find({ order: 'id DESC' });
    } catch (error) {
      return handleError(error, res);
    }

    return res.render('my-user/list', {
      title: 'List of users',
      users: users
    });
  });

  app.get('/views/my-user/create', (req, res) => {
    res.render('my-user/create', {
      title: 'User creation'
    });
  });

  app.post('/views/my-user/create', async (req, res) => {
    const { body } = req;
    const { MyUser } = app.models;

    try {
      await MyUser.create(body);
    } catch (error) {
      return handleError(error, res);
    }

    return res.redirect('/views/my-user/list');
  });

  app.get('/views/my-user/update/:userId', async (req, res) => {
    const { userId } = req.params;
    const { MyUser } = app.models;

    let myUserInstance;
    try {
      myUserInstance = await MyUser.findById(userId);
    } catch (error) {
      return handleError(error, res);
    }

    return res.render('my-user/update', {
      title: `User ${myUserInstance.fullName} - update`,
      user: myUserInstance
    });
  });

  app.post('/views/my-user/update', async (req, res) => {
    const { body } = req;
    const { MyUser } = app.models;

    let myUserInstance;
    try {
      myUserInstance = await MyUser.findById(body.id);
    } catch (error) {
      return handleError(error, res);
    }

    try {
      await myUserInstance.updateAttributes(body);
    } catch (error) {
      return handleError(error, res);
    }

    return res.redirect('/views/my-user/list');
  });

  app.get('/views/my-user/delete/:userId', async (req, res) => {
    const { userId } = req.params;
    const { MyUser } = app.models;

    let myUserInstance;
    try {
      myUserInstance = await MyUser.findById(userId);
    } catch (error) {
      return handleError(error, res);
    }

    return res.render('my-user/delete', {
      title: `User ${myUserInstance.fullName} - delete`,
      user: myUserInstance
    });
  });

  app.post('/views/my-user/delete', async (req, res) => {
    const { body } = req;
    const { MyUser } = app.models;

    let myUserInstance;
    try {
      myUserInstance = await MyUser.findById(body.id);
    } catch (error) {
      return handleError(error, res);
    }

    try {
      await myUserInstance.destroy();
    } catch (error) {
      return handleError(error, res);
    }

    return res.redirect('/views/my-user/list');
  });
};
