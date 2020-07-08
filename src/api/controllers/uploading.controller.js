const { validationResult } = require('express-validator');

const Uploading = require('../models/uploading.model');


exports.getPosts = (req, res, next) => {
  Uploading.find()
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

exports.createImage = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed, entered data is incorrect.');
    error.statusCode = 422;
    throw error;
  }

  if (!req.file) {
    const error = new Error('No Image Provided.');
    error.statusCode = 422;
    throw error;
  }

  const file = req.file.path;
  const id = req.body.userId;

  const uploading = new Uploading({
    fileURL: file,
    userId: id,
  });

  uploading
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


exports.getPost = (req, res, next) => {

  const userId = req.params.userId;

  Uploading.findOne({ userId: userId }).sort({ _id: -1 })
  // Uploading.findById(userId)
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
