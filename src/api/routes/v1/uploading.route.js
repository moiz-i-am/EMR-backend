const express = require('express');
const controllerImage = require('../../controllers/uploading.controller');
const controllerFile = require('../../controllers/uploading.file.controller');
const controllerDocuments = require('../../controllers/uploading.docs.controller');

const router = express.Router();

// profile picture uploading and fetching
router
  .route('/profilePicture')
  .post(controllerImage.createNewImage);

router
  .route('/profilePicture/:userId')
  .get(controllerImage.getSingleImage);

router
  .route('/post')
  .get(controllerImage.getPosts);

// lab uploading test results
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

// doctor uploading documents
router
  .route('/doctorUpload')
  .post(controllerDocuments.createNewFile);

router
  .route('/doctorUpload/:postId')
  .get(controllerDocuments.getSingleFile);

router
  .route('/docsUploadlistDoctor/:userId')
  .get(controllerDocuments.getAllFilesDoctor);


module.exports = router;
