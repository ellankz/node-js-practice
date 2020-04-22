const router = require('express').Router();
const loginService = require('./login.service');
const { ErrorHandler } = require('../../errors/error');

router.route('/').post(async (req, res, next) => {
  try {
    const user = await loginService.authenticate(req.body);
    if (user.token) {
      res.status(200).send(user.token);
    } else {
      throw new ErrorHandler(403, 'Incorrect login or password');
    }
  } catch (err) {
    next(err);
    return;
  }
});

module.exports = router;
