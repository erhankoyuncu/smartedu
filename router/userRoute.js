const express = require("express")
const userController = require('../controllers/authController')
const authMiddleware = require('../middlewares/authMiddlewares');
const {body} = require('express-validator');
const User = require("../models/User");
const router = express.Router();

router.route('/signup').post(
  [

  body('name').not().isEmpty().withMessage('Please Enter Your name'),
  body('email').isEmail().withMessage('Please Enter Valid Email')
  .custom((userEmail) => {
   return User.findOne({email : userEmail}).then(user => {
      if(user) {
        return Promise.reject('Bu Email kullanılmaktadır')
      }
    })
  }),

  body('password').not().isEmpty().withMessage('Please Enter Your password'),

],
userController.createUser);

router.route('/login').post(userController.loginUser);
router.route('/logout').get(userController.logoutUser)
router.route('/dashboard').get(authMiddleware, userController.getDashboardPage);

module.exports = router;
