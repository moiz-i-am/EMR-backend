const express = require('express');
const userRoutes = require('./user.route');
const authRoutes = require('./auth.route');
const hospitalRoutes = require('./hospital.route');
const labRoutes = require('./lab.route');
const schedulingRoutes = require('./scheduling.route');

const router = express.Router();

/**
 * GET v1/status
 */
router.get('/status', (req, res) => res.send('OK'));

/**
 * GET v1/docs
 */
router.use('/docs', express.static('docs'));

router.use('/users', userRoutes);
router.use('/auth', authRoutes);
router.use('/hospital', hospitalRoutes);
router.use('/lab', labRoutes);
router.use('/scheduling', schedulingRoutes);

module.exports = router;
