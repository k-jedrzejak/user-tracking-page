const express = require('express');
const { handleScrollEvent } = require('../controllers/logController');
const router = express.Router();

router.post("/", handleScrollEvent);

module.exports = router;
