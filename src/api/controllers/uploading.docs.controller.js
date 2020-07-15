const { validationResult } = require('express-validator');

const UploadingDocs = require('../models/uploading.docs.model');

exports.getAllFilesDoctor = (req, res, next) => {
  const userId = req.params.userId;
  UploadingDocs.find({ userId: userId })
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

  const document = req.file.path;
  const hospital = req.body.hospitalId;
  const user = req.body.userId;

  const uploadingDocs = new UploadingDocs({
    docURL: document,
    hospitalId: hospital,
    userId: user,
  });

  uploadingDocs
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
  UploadingDocs.findById(postId)
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
