const router = require('express').Router();
const { uploadFile } = require('../controllers/uploads');

router.post('/upload', uploadFile);

module.exports = router;
