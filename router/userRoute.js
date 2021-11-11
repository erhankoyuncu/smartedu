const express = require("express")
const userController = require('../controllers/authController')
const authMiddleware = require('../middlewares/authMiddlewares');

const router = express.Router();

router.route('/signup').post(userController.createUser);   
router.route('/login').post(userController.loginUser);  
router.route('/logout').get(userController.logoutUser) 
router.route('/dashboard').get(authMiddleware, userController.getDashboardPage);

module.exports = router;