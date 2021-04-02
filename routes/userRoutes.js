const express = require('express');
const router = express.Router();
const userController = require('./../controllers/userController');

//! User Router with no neeed of ID
router
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.createNewUser);

//! User Router with need of ID
router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.patchUserById)
  .delete(userController.deleteUserById);

//! Exporting of Router Module
module.exports = router;
