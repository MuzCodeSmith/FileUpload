const express = require('express');
const router = express.Router();

// controllers
const {localFileUpload, imageUpload, videoUpload} = require('../controllers/fileUpload')

router.post('/localFileUpload',localFileUpload)
router.post('/imageUpload',imageUpload)
router.post('/videoUpload',videoUpload)

module.exports = router;