const { validationResult } = require('express-validator');

const UploadingFile = require('../models/uploading-file.model');


exports.getAllFilesLab = (req, res, next) => {
  const labId = req.params.labId;
  UploadingFile.find({ labId: labId })
    .then((posts) => {
      res
        .status(200)
        .json({ message: 'fetched posts successfully', posts: posts });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.getAllFilesPatient = (req, res, next) => {
  const userId = req.params.userId;
  UploadingFile.find({ userId: userId })
    .then((posts) => {
      res
        .status(200)
        .json({ message: 'fetched posts successfully', posts: posts });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.createNewFile = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed, entered data is incorrect.');
    error.statusCode = 422;
    throw error;
  }

  if (!req.file) {
    const error = new Error('No File Provided.');
    error.statusCode = 422;
    throw error;
  }

  const file = req.file.path;
  const lab = req.body.labId;
  const user = req.body.userId;

  const uploadingFile = new UploadingFile({
    fileURL: file,
    labId: lab,
    userId: user,
  });

  uploadingFile
    .save()
    .then((result) => {
      res.status(201).json({
        message: 'Post created successfully!',
        post: result,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};


exports.getSingleFile = (req, res, next) => {

  const postId = req.params.postId;

  // Uploading.findOne({ userId: userId }).sort({ _id: -1 })
  UploadingFile.findById(postId)
    .then((post) => {
      if (!post) {
        const error = new Error('could not find post.');
        error.statusCode = 404;
        throw error;
      }
      res.status(200).json({ message: 'Post fetched.', post: post });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
