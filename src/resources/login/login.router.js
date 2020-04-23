const router = require('express').Router();
const loginService = require('./login.service');
const { ErrorHandler } = require('../../errors/error');

router.route('/').post(async (req, res, next) => {
  try {
    const token = await loginService.authenticate(req.body);
    if (token) {
      console.log(token);
      res.status(200).json(token);
    } else {
      throw new ErrorHandler(403, 'Incorrect login or password');
    }
  } catch (err) {
    next(err);
    return;
  }
});

module.exports = router;
