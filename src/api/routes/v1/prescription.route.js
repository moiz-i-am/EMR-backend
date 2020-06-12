const express = require('express');
const validate = require('express-validation');
const controller = require('../../controllers/prescription.controller');
const { authorize, ADMIN, LOGGED_USER } = require('../../middlewares/auth');

const router = express.Router();


router
  .route('/')
  /**
   * @api {post} v1/prescription create prescription
   * @apiDescription make new prescription
   * @apiVersion 1.0.0
   * @apiName prescription
   * @apiGroup Prescription
   * @apiPermission admin
   *
   * @apiHeader {String} Authorization   User's access token
   *
   * @apiParam  {Number{1-}}         [page=1]     List page
   * @apiParam  {Number{1-100}}      [perPage=1]  Users per page
   * @apiParam  {String}             [name]       User's name
   * @apiParam  {String}             [email]      User's email
   * @apiParam  {String=user,admin}  [role]       User's role
   *
   * @apiSuccess {Object[]} prescription created.
   *
   * @apiError (Unauthorized 401)  Unauthorized  Only authenticated users can access the data
   * @apiError (Forbidden 403)     Forbidden     Only admins can access the data
   */
  .post(controller.create);

module.exports = router;
