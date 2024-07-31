const express = require('express');
const { handleScrollEvent } = require('../../controllers/scrollAvatarLogController');
const router = express.Router();

router.post("/", handleScrollEvent);

module.exports = router;
