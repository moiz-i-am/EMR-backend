const express = require('express');
const controller = require('../../controllers/uploading.controller');

const router = express.Router();

router
  .route('/labResults')
  .post();

router
  .route('/profilePicture')
  .post(controller.createImage);

router
  .route('/post')
  .get(controller.getPosts);

router
  .route('/post/:userId')
  .get(controller.getPost);

module.exports = router;
