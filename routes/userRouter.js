const express = require('express');

function routes(User) {
  const userRouter = express.Router();
  userRouter.route('/users')
    .get((req, res) => {
      // Filter
      const query = {};
      if (req.query.name) {
        query.name = req.query.name;
      }
      // Try find user data (with query)
      User.find(query, (err, users) => {
        if (err) {
          return res.status(500).json({
            success: false,
            message: err,
            data: null,
          });
        }
        return res.status(200).json({
          success: true,
          message: 'request for users received successfully',
          data: users,
        });
      });
    })
    .post((req, res) => {
      const user = new User(req.body);

      user.save();
      return res.status(201).json({
        success: true,
        message: 'request for users received successfully',
        data: user,
      });
    });

  userRouter.use('/users/:userId', (req, res, next) => {
    User.findById(req.params.userId, (err, user) => {
      if (err) {
        return res.status(400).json({
          success: false,
          message: err,
          data: null,
        });
      }
      if (user) {
        req.user = user;
        return next();
      }

      return res.status(404).json({
        success: false,
        message: 'user not found',
        data: user,
      });
    });
  });

  userRouter.route('/users/:userId')
    .get((req, res) => {res.status(200).json({
      success: true,
      message: 'request for user received successfully',
      data: req.user,
    });
    })
    .put((req, res) => {
      const { user } = req;
      user.username = req.body.username;
      user.name = req.body.name;
      user.age = req.body.age;
      req.user.save((err) => {
        if (err) {
          return res.status(500).json({
            success: false,
            message: err,
            data: null,
          });
        }
        return res.status(200).json({
          success: false,
          message: 'user updated successfully',
          data: req.user,
        })
      });
    })
    .patch((req, res) => {
      const { user } = req;
      if (req.body._id) {
        delete req.body._id;
      }
      Object.entries(req.body).forEach((item) => {
        const key = item[0];
        const value = item[1];
        user[key] = value;
      });
      user.save((err) => {
        if (err) {
          return res.status(500).json({
            success: false,
            message: err,
            data: null,
          });
        }
        return res.status(200).json({
          success: true,
          message: 'user updated successfully',
          data: user,
        })
      });
    });

  return userRouter;
}
module.exports = routes;
