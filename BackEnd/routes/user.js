const authController = require('../controllers/AuthController');
const middlewareController = require('../middleware/middlewareController');
const userController = require('../controllers/UserController');

const routes = require('express').Router();

//get all user
routes.get('/', middlewareController.verifyToken, userController.getAllUser);

//delete user
routes.delete("/:id", middlewareController.verifyTokenAndAdminAuth, userController.deleteUser);


module.exports = routes;