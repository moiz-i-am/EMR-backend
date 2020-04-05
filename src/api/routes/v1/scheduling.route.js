const express = require('express');
const validate = require('express-validation');
const controller = require('../../controllers/scheduling.controller');
const { authorize, ADMIN, LOGGED_USER } = require('../../middlewares/auth');
const { listSchedules } = require('../../validations/scheduling.validation');

const router = express.Router();


router
  .route('/')
  /**
   * @api {post} v1/scheduling create schedule
   * @apiDescription Get a list of users
   * @apiVersion 1.0.0
   * @apiName ListUsers
   * @apiGroup User
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
   * @apiSuccess {Object[]} users List of users.
   *
   * @apiError (Unauthorized 401)  Unauthorized  Only authenticated users can access the data
   * @apiError (Forbidden 403)     Forbidden     Only admins can access the data
   */
  .post(authorize(LOGGED_USER), controller.create);

router
  .route('/updateschedule')
  /**
   * @api {delete} v1/scheduling Delete schedule
   * @apiDescription Delete a schedule
   * @apiVersion 1.0.0
   * @apiName DeleteSchedule
   * @apiGroup schedule
   * @apiPermission schedule
   *
   * @apiHeader {String} Authorization   User's access token
   *
   * @apiSuccess (No Content 204)  Successfully deleted
   *
   * @apiError (Unauthorized 401) Unauthorized  Only authenticated users can delete the data
   * @apiError (Forbidden 403)    Forbidden     Only user with same id or admins can delete the data
   * @apiError (Not Found 404)    NotFound      User does not exist
   */
  .post(controller.update);

router
  .route('/deleteschedule')
  /**
   * @api {delete} v1/scheduling Delete schedule
   * @apiDescription Delete a schedule
   * @apiVersion 1.0.0
   * @apiName DeleteSchedule
   * @apiGroup schedule
   * @apiPermission schedule
   *
   * @apiHeader {String} Authorization   User's access token
   *
   * @apiSuccess (No Content 204)  Successfully deleted
   *
   * @apiError (Unauthorized 401) Unauthorized  Only authenticated users can delete the data
   * @apiError (Forbidden 403)    Forbidden     Only user with same id or admins can delete the data
   * @apiError (Not Found 404)    NotFound      User does not exist
   */
  .post(controller.remove);

router
  .route('/timeslots')
  /**
   * @api {get} v1/scheduling List Schedules
   * @apiDescription Get a list of Hospitals
   * @apiVersion 1.0.0
   * @apiName List Hospitals
   * @apiGroup Hospitals
   * @apiPermission admin
   *
   * @apiHeader {String} Authorization Hospital's access token
   *
   * @apiParam  {Number{1-}}         [page=1]     List page
   * @apiParam  {Number{1-100}}      [perPage=1]  Users per page
   * @apiParam  {String}             [name]       User's name
   * @apiParam  {String}             [email]      User's email
   * @apiParam  {String=user,admin}  [role]       User's role
   *
   * @apiSuccess {Object[]} users List of  Hospitals.
   *
   * @apiError (Unauthorized 401)  Unauthorized  Only authenticated users can access the data
   * @apiError (Forbidden 403)     Forbidden     Only admins can access the data
   */
  .post(validate(listSchedules), controller.list);

module.exports = router;
