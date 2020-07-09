const express = require('express');
const controllerImage = require('../../controllers/uploading.controller');
const controllerFile = require('../../controllers/uploading-file.controller');

const router = express.Router();

router
  .route('/profilePicture')
  .post(controllerImage.createNewImage);

router
  .route('/profilePicture/:userId')
  .get(controllerImage.getSingleImage);

router
  .route('/post')
  .get(controllerImage.getPosts);

router
  .route('/labUpload')
  .post(controllerFile.createNewFile);

router
  .route('/labUpload/:postId')
  .get(controllerFile.getSingleFile);

router
  .route('/testResultsLab/:labId')
  .get(controllerFile.getAllFilesLab);

router
  .route('/testResultsPatient/:userId')
  .get(controllerFile.getAllFilesPatient);

module.exports = router;
